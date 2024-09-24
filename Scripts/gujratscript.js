import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyC6P7wlNv0qLL634yoLAVFC_8Pjjn_dRvA",
    authDomain: "novavault.firebaseapp.com",
    databaseURL: "https://novavault-default-rtdb.firebaseio.com/",
    projectId: "novavault",
    storageBucket: "novavault.appspot.com",
    messagingSenderId: "882868843122",
    appId: "1:882868843122:web:45750d9a47d97a6486c8eb",
    measurementId: "G-M2C71W3JJ7"
  };

// Initialize Firebase and Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fetch data from Firestore for a given collection
async function fetchCollectionData(collectionName) {
    const querySnapshot = await getDocs(collection(db, collectionName));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}


// Render cards for a specific container
function renderCards(items, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    items.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="card-info">
                <h3 class="card-title">${item.name}</h3>
                ${item.type ? `<p class="card-subtitle">${item.type}</p>` : ''}
                ${item.category ? `<p class="card-subtitle">${item.category}</p>` : ''}
                <div class="card-summary">
                    <p>${item.summary}</p>
                </div>
            </div>
        `;
        card.addEventListener('click', () => showModal(item));
        container.appendChild(card);
    });
    setTimeout(() => addScrollAnimation(), 100); // For scroll animations
}

// Show modal when clicking on a card
function showModal(item) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <img src="${item.image}" alt="${item.name}" style="width: 100%; height: auto;">
            <h2>${item.name}</h2>
            ${item.type ? `<p><strong>Type:</strong> ${item.type}</p>` : ''}
            ${item.category ? `<p><strong>Category:</strong> ${item.category}</p>` : ''}
            <p>${item.summary}</p>
        </div>
    `;
    document.body.appendChild(modal);
    modal.style.display = 'block';

    modal.querySelector('.close').onclick = () => {
        modal.style.opacity = '0';
        setTimeout(() => document.body.removeChild(modal), 300);
    };
}

// Filter items based on search term and other filters
function filterItems(items, searchTerm, typeFilter = null, categoryFilter = null) {
    return items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                              item.summary.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = !typeFilter || typeFilter === 'all' || item.type === typeFilter;
        const matchesCategory = !categoryFilter || categoryFilter === 'all' || item.category === categoryFilter;
        return matchesSearch && matchesType && matchesCategory;
    });
}

// Update and render the filtered results
function updateResults(places, cuisines, events) {
    const searchTerm = document.getElementById('searchInput').value;
    const typeFilter = document.getElementById('typeFilter')?.value || null;
    const categoryFilter = document.getElementById('categoryFilter')?.value || null;

    const filteredPlaces = filterItems(places, searchTerm, typeFilter, categoryFilter);
    const filteredCuisines = filterItems(cuisines, searchTerm);
    const filteredEvents = filterItems(events, searchTerm);

    renderCards(filteredPlaces, 'places-container');
    renderCards(filteredCuisines, 'cuisines-container');
    renderCards(filteredEvents, 'events-container');

    document.getElementById('places-count').textContent = filteredPlaces.length;
    document.getElementById('cuisines-count').textContent = filteredCuisines.length;
    document.getElementById('events-count').textContent = filteredEvents.length;
}

// Initialize the page and fetch data from Firestore
async function init() {
    // Fetch data from Firestore
    const places = await fetchCollectionData('places');
    const cuisines = await fetchCollectionData('cuisines');
    const events = await fetchCollectionData('events');

    // Render initial cards
    renderCards(places, 'places-container');
    renderCards(cuisines, 'cuisines-container');
    renderCards(events, 'events-container');

    // Set up navigation, search, and filtering
    initializeNavigation();
    initializeSearch(() => updateResults(places, cuisines, events));
    addScrollAnimation();
    showSection('overview');
}

// Initialize navigation functionality
function initializeNavigation() {
    const navButtons = document.querySelectorAll('.nav-button');
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            showSection(button.dataset.section);
        });
    });
}

// Initialize search functionality with debouncing
function initializeSearch(updateCallback) {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    searchInput.addEventListener('input', debounce(updateCallback, 300));
    searchButton.addEventListener('click', updateCallback);

    if (document.getElementById('typeFilter')) {
        document.getElementById('typeFilter').addEventListener('change', updateCallback);
    }
    if (document.getElementById('categoryFilter')) {
        document.getElementById('categoryFilter').addEventListener('change', updateCallback);
    }
}

// Helper: Debounce function for search
function debounce(func, delay) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// Scroll animation for cards
function addScrollAnimation() {
    const cards = document.querySelectorAll('.card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('card-visible');
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => observer.observe(card));
}

// Show and hide sections of the page
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        if (section.id === `${sectionId}-section`) {
            section.classList.remove('hidden-section');
            setTimeout(() => section.classList.add('active-section'), 50);
        } else {
            section.classList.remove('active-section');
            setTimeout(() => section.classList.add('hidden-section'), 300);
        }
    });
}

// Start the initialization
init();
