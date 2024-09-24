// Array to store place and person information with actual Kutch locations
const places = [
    // Must Visit
    { 
      index: 0, 
      category: "Must Visit", 
      title: "Rann of Kutch", 
      description: "A vast salt marsh known for its stunning white landscape and the Rann Utsav festival.", 
      tags: ["salt marsh", "Rann Utsav", "festival", "white landscape", "desert"]
    },
    { 
      index: 1, 
      category: "Must Visit", 
      title: "Kalo Dungar", 
      description: "The highest point in Kutch offering panoramic views of the Great Rann and the Pakistani border.", 
      tags: ["viewpoint", "highest point", "panoramic", "Great Rann", "border"]
    },
    { 
      index: 2, 
      category: "Must Visit", 
      title: "Mandvi Beach", 
      description: "A pristine beach ideal for relaxation and water activities, famous for its Vijay Vilas Palace.", 
      tags: ["beach", "Vijay Vilas Palace", "water activities", "relaxation", "pristine"]
    },
    { 
      index: 3, 
      category: "Must Visit", 
      title: "Banni Grasslands", 
      description: "A unique ecosystem home to diverse flora and fauna, perfect for wildlife enthusiasts.", 
      tags: ["grasslands", "wildlife", "ecosystem", "flora", "fauna"]
    },
    { 
      index: 4, 
      category: "Must Visit", 
      title: "Narayan Sarovar", 
      description: "A sacred lake surrounded by temples, attracting pilgrims and nature lovers alike.", 
      tags: ["sacred lake", "temples", "pilgrimage", "nature", "spiritual"]
    },
  
    // Hidden Gems
    { 
      index: 5, 
      category: "Hidden Gems", 
      title: "Kutch Desert Wildlife Sanctuary", 
      description: "A sanctuary that conserves the unique wildlife of the Kutch region, including the Indian wild ass.", 
      tags: ["wildlife sanctuary", "Indian wild ass", "conservation", "unique wildlife"]
    },
    { 
      index: 6, 
      category: "Hidden Gems", 
      title: "Bhujodi Village", 
      description: "A crafts village renowned for its handloom weaving and traditional Kutchi textiles.", 
      tags: ["crafts village", "handloom", "Kutchi textiles", "traditional", "weaving"]
    },
    { 
      index: 7, 
      category: "Hidden Gems", 
      title: "Kutch Museum", 
      description: "The oldest museum in Gujarat showcasing the rich cultural heritage and history of Kutch.", 
      tags: ["museum", "cultural heritage", "history", "Gujarat"]
    },
    { 
      index: 8, 
      category: "Hidden Gems", 
      title: "Aina Mahal", 
      description: "A historic palace in Bhuj with intricate mirror work and beautiful architecture.", 
      tags: ["historic palace", "mirror work", "architecture", "Bhuj"]
    },
    { 
      index: 9, 
      category: "Hidden Gems", 
      title: "Tera Fort", 
      description: "An ancient fort offering a glimpse into the region's regal past and architectural prowess.", 
      tags: ["ancient fort", "regal past", "architecture", "historical"]
    },
  
    // Unique Experiences
    { 
      index: 10, 
      category: "Unique Experiences", 
      title: "Rann Utsav", 
      description: "An annual cultural festival celebrating the art, music, and crafts of Kutch amidst the Rann of Kutch.", 
      tags: ["cultural festival", "art", "music", "crafts", "annual"]
    },
    { 
      index: 11, 
      category: "Unique Experiences", 
      title: "White Desert Safari", 
      description: "A thrilling safari experience across the vast white salt desert, ideal for adventure seekers.", 
      tags: ["safari", "white desert", "adventure", "thrilling"]
    },
    { 
      index: 12, 
      category: "Unique Experiences", 
      title: "Local Craft Workshops", 
      description: "Interactive workshops where visitors can learn traditional Kutchi crafts and textiles.", 
      tags: ["workshops", "crafts", "textiles", "interactive", "learn"]
    },
    { 
      index: 13, 
      category: "Unique Experiences", 
      title: "Sunset at Kalo Dungar", 
      description: "Witness breathtaking sunsets over the salt flats from the highest vantage point in Kutch.", 
      tags: ["sunset", "Kalo Dungar", "salt flats", "breathtaking", "vantage point"]
    },
    { 
      index: 14, 
      category: "Unique Experiences", 
      title: "Bird Watching in Banni", 
      description: "Experience diverse bird species in their natural habitat within the Banni Grasslands.", 
      tags: ["bird watching", "diverse species", "natural habitat", "Banni Grasslands"]
    },
  
    // Special
    { 
      index: 15, 
      category: "Special", 
      title: "Great Rann of Kutch", 
      description: "The largest salt desert in the world, known for its mesmerizing landscapes and vibrant festivals.", 
      tags: ["largest salt desert", "Great Rann", "mesmerizing landscapes", "festivals", "salt marsh"]
    }
  ];
  
  // Function to generate cards dynamically based on the array
  function generateCards() {
    const mustVisit = document.getElementById("mustVisit");
    const hiddenGems = document.getElementById("hiddenGems");
    const uniqueExperiences = document.getElementById("uniqueExperiences");
    // const special = document.getElementById("special"); // Uncomment if using Special category
  
    mustVisit.innerHTML = '';
    hiddenGems.innerHTML = '';
    uniqueExperiences.innerHTML = '';
    // special.innerHTML = ''; // Uncomment if using Special category
  
    places.forEach(place => {
      const imageName = place.title.toLowerCase().replace(/\s+/g, '_'); // e.g., "Rann of Kutch" -> "rann_of_kutch"
      const card = `
        <div class="card">
          <a href="place-detail.html?id=${place.index}" class="text-decoration-none text-dark">
            <img src="images/${imageName}.jpg" class="card-img-top" alt="${place.title}">
            <div class="card-body">
              <h5 class="card-title">${place.title}</h5>
              <p class="card-text">${place.description}</p>
            </div>
          </a>
        </div>
      `;
  
      // Add cards to the respective categories based on place.category
      if (place.category === "Must Visit") {
        mustVisit.innerHTML += card;
      } else if (place.category === "Hidden Gems") {
        hiddenGems.innerHTML += card;
      } else if (place.category === "Unique Experiences") {
        uniqueExperiences.innerHTML += card;
      } 
      // else if (place.category === "Special") { // If you have a Special category
      //   special.innerHTML += card;
      // }
    });
  }
  
  // Call this function once to load the cards on the page
  generateCards();
  
  // Enhanced Intent-based Search Functionality
  document.getElementById("searchInput").addEventListener("input", function () {
    const searchText = this.value.toLowerCase().trim();
    const allCards = document.querySelectorAll('.card-container .card');
    
    if (searchText === "") {
      // If search is empty, show all cards
      allCards.forEach(card => {
        card.style.display = "block";
      });
      return;
    }
  
    // Split searchText into individual keywords
    const keywords = searchText.split(/\s+/);
  
    allCards.forEach(card => {
      const link = card.querySelector('a');
      const urlParams = new URLSearchParams(link.search);
      const id = new URL(link.href).searchParams.get('id');
      const place = places.find(p => p.index == id);
      
      if (place) {
        // Check if all keywords are present in the tags
        const matchFound = keywords.every(keyword => 
          place.tags.some(tag => tag.toLowerCase().includes(keyword))
        );
        card.style.display = matchFound ? "block" : "none";
      }
    });
  });
  