// Car features data
const carDefinitionsFeatures = [
    {
        name: 'ABS (Anti-lock Brake System)',
        definition: 'A safety system that prevents the wheels from locking up during braking, allowing the driver to maintain steering control.'
    },
    {
        name: 'EBD (Electronic Brakeforce Distribution)',
        definition: 'An electronic system that maximizes brake efficiency during panic stops.'
    },
    {
        name: 'Intelligent Emergency Call',
        definition: 'A button placed overhead in the cabin that is linked to emergency services (police, ambulance, fire department) and can be used in case of an emergency or severe accident.'
    },
    {
        name: 'Front Crumple Zone',
        definition: 'A structural feature designed to absorb impact energy during a collision, protecting passengers in the cabin.'
    },
    {
        name: 'Rear Crumple Zone',
        definition: 'A structural safety feature at the rear of the vehicle designed to absorb impact energy during rear-end collisions.'
    },
    {
        name: 'Surround Camera',
        definition: 'A 360-degree camera system that provides a bird\'s eye view around the vehicle for enhanced parking and maneuvering.'
    },
    {
        name: 'Central Locking',
        definition: 'A system that allows all doors to be locked or unlocked simultaneously from a single point.'
    },
    {
        name: 'Power Steering',
        definition: 'A system that uses hydraulic or electric assistance to reduce the effort needed to turn the steering wheel.'
    },
    {
        name: 'Ambient Lighting',
        definition: 'Interior lighting that creates atmosphere and enhances the cabin\'s aesthetic appeal during nighttime driving.'
    },
    {
        name: 'CD Player',
        definition: 'An in-car entertainment system component that plays compact discs for audio playback.'
    },
    {
        name: 'MP3',
        definition: 'Digital audio format support that allows playback of compressed music files through the car\'s audio system.'
    },
    {
        name: 'AUX',
        definition: 'An auxiliary input that allows external audio devices to be connected to the car\'s sound system.'
    },
    {
        name: 'Bluetooth',
        definition: 'Wireless technology that enables hands-free calling and audio streaming from compatible devices.'
    },
    {
        name: 'Push Button Start',
        definition: 'A keyless ignition system that allows the engine to be started with the push of a button instead of turning a key.'
    }
];

// FAQ data
const carDefinitionsFaqData = [
    {
        question: 'What does Cool box mean?',
        answer: 'A comfort feature that is usually integrated into the center armrest of the driver and front seat passenger, allowing users to carry cool drinks despite warm ambient temperatures.'
    },
    {
        question: 'What does Emergency Brake Assist mean?',
        answer: 'An electronic system that maximizes brake efficiency during panic stops.'
    },
    {
        question: 'What does Apple CarPlay mean?',
        answer: 'A mobile app developed by Apple to mirror features from an iOS device, such as an iPhone, to the vehicle\'s infotainment screen.'
    },
    {
        question: 'What does Intelligent Emergency Call mean?',
        answer: 'A button placed overhead in the cabin that is linked to emergency services (police, ambulance, fire department) and can be used in case of an emergency or severe accident.'
    },
    {
        question: 'What does Hybrid mean?',
        answer: 'A vehicle that combines the use of an internal combustion engine and an electric motor. Hybrids are known to be more powerful and more fuel efficient than traditional automobiles.'
    }
];

// DOM elements
const carDefinitionsSearchInput = document.getElementById('carDefinitionsSearchInput');
const carDefinitionsSearchBtn = document.getElementById('carDefinitionsSearchBtn');
const carDefinitionsDropdown = document.getElementById('carDefinitionsDropdown');
const carDefinitionsFeaturesList = document.getElementById('carDefinitionsFeaturesList');
const carDefinitionsFilterInput = document.getElementById('carDefinitionsFilterInput');
const carDefinitionsFaqContainer = document.getElementById('carDefinitionsFaqContainer');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    carDefinitionsPopulateFeaturesList();
    carDefinitionsRenderFAQ();
    carDefinitionsSetupEventListeners();
});

// Populate features list
function carDefinitionsPopulateFeaturesList(filter = '') {
    carDefinitionsFeaturesList.innerHTML = '';
    
    const filteredFeatures = carDefinitionsFeatures.filter(feature =>
        feature.name.toLowerCase().includes(filter.toLowerCase())
    );
    
    filteredFeatures.forEach(feature => {
        const li = document.createElement('li');
        li.className = 'car-definitions-feature-item';
        li.textContent = feature.name;
        li.addEventListener('click', () => carDefinitionsSelectFeature(feature));
        carDefinitionsFeaturesList.appendChild(li);
    });
    
    if (filteredFeatures.length === 0) {
        const li = document.createElement('li');
        li.className = 'car-definitions-feature-item';
        li.textContent = 'No features found';
        li.style.color = '#9ca3af';
        li.style.fontStyle = 'italic';
        carDefinitionsFeaturesList.appendChild(li);
    }
}

// Select feature
function carDefinitionsSelectFeature(feature) {
    carDefinitionsSearchInput.value = feature.name;
    carDefinitionsHideDropdown();
    
    // Scroll to the corresponding FAQ if it exists
    const faqItems = document.querySelectorAll('.car-definitions-faq-item');
    faqItems.forEach(item => {
        const questionText = item.querySelector('.car-definitions-faq-question').textContent;
        if (questionText.toLowerCase().includes(feature.name.toLowerCase()) ||
            feature.name.toLowerCase().includes(questionText.toLowerCase())) {
            item.scrollIntoView({ behavior: 'smooth' });
            // Expand the FAQ item
            setTimeout(() => {
                item.classList.add('car-definitions-active');
            }, 500);
        }
    });
}

// Show/hide dropdown
function carDefinitionsShowDropdown() {
    carDefinitionsDropdown.classList.remove('car-definitions-hidden');
    carDefinitionsPopulateFeaturesList();
}

function carDefinitionsHideDropdown() {
    carDefinitionsDropdown.classList.add('car-definitions-hidden');
}

// Render FAQ section
function carDefinitionsRenderFAQ() {
    carDefinitionsFaqContainer.innerHTML = '';
    
    carDefinitionsFaqData.forEach((faq, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'car-definitions-faq-item';
        
        faqItem.innerHTML = `
            <button class="car-definitions-faq-question" data-index="${index}">
                ${faq.question}
                <span class="car-definitions-faq-chevron">⌄</span>
            </button>
            <div class="car-definitions-faq-answer">
                <p>${faq.answer}</p>
            </div>
        `;
        
        carDefinitionsFaqContainer.appendChild(faqItem);
    });
}

// Setup event listeners
function carDefinitionsSetupEventListeners() {
    // Search input click - show dropdown
    carDefinitionsSearchInput.addEventListener('click', carDefinitionsShowDropdown);
    
    // Search input focus - show dropdown
    carDefinitionsSearchInput.addEventListener('focus', carDefinitionsShowDropdown);
    
    // Filter input
    carDefinitionsFilterInput.addEventListener('input', (e) => {
        carDefinitionsPopulateFeaturesList(e.target.value);
    });
    
    // Search button
    carDefinitionsSearchBtn.addEventListener('click', () => {
        const searchTerm = carDefinitionsSearchInput.value.trim();
        if (searchTerm) {
            // Find matching feature
            const matchingFeature = carDefinitionsFeatures.find(feature =>
                feature.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            
            if (matchingFeature) {
                carDefinitionsSelectFeature(matchingFeature);
            } else {
                alert('Feature not found. Please select from the dropdown.');
            }
        }
    });
    
    // FAQ accordion
    carDefinitionsFaqContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('car-definitions-faq-question')) {
            const faqItem = e.target.closest('.car-definitions-faq-item');
            const isActive = faqItem.classList.contains('car-definitions-active');
            
            // Close all FAQ items
            document.querySelectorAll('.car-definitions-faq-item').forEach(item => {
                item.classList.remove('car-definitions-active');
            });
            
            // Toggle current item
            if (!isActive) {
                faqItem.classList.add('car-definitions-active');
            }
        }
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.car-definitions-search-container')) {
            carDefinitionsHideDropdown();
        }
    });
    
    // Handle escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            carDefinitionsHideDropdown();
        }
    });
}

// Search functionality
carDefinitionsSearchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    
    if (searchTerm === '') {
        carDefinitionsSearchInput.placeholder = 'All Features';
    }
    
    carDefinitionsPopulateFeaturesList(searchTerm);
    
    if (searchTerm.length > 0) {
        carDefinitionsShowDropdown();
    }
});

// Prevent form submission on Enter key
carDefinitionsSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        carDefinitionsSearchBtn.click();
    }
});









// Header load (Top Header + Navbar)
function initializeDropdown() {
  // Add hover event listeners to new dropdown
  const newDropdown = document.querySelector('.new-dropdown');
  const dropdownContent = document.querySelector('.dropdown-content');
  
  if (newDropdown && dropdownContent) {
    newDropdown.addEventListener('mouseenter', function() {
      clearTimeout(dropdownTimeout);
      dropdownContent.classList.add('show');
    });
    
    newDropdown.addEventListener('mouseleave', function() {
      dropdownTimeout = setTimeout(() => {
        dropdownContent.classList.remove('show');
      }, 300);
    });
    
    // Keep dropdown open when hovering over dropdown content
    dropdownContent.addEventListener('mouseenter', function() {
      clearTimeout(dropdownTimeout);
    });
    
    dropdownContent.addEventListener('mouseleave', function() {
      dropdownTimeout = setTimeout(() => {
        dropdownContent.classList.remove('show');
      }, 300);
    });
    
    // Add hover event listeners to tab links
    const tabLinks = document.querySelectorAll('.tab-link');
    console.log("Found tab links:", tabLinks.length);
    
    tabLinks.forEach((tabLink) => {
      tabLink.addEventListener("mouseenter", function() {
        const tabId = this.getAttribute("data-tab");
        if (tabId) {
          // Remove active class from all tab links
          const allTabLinks = document.querySelectorAll(".tab-link");
          allTabLinks.forEach((link) => link.classList.remove("active"));
          
          // Add active class to current tab link
          this.classList.add("active");
          
          // Hide all tab contents
          const allTabContents = document.querySelectorAll(".tab-content");
          allTabContents.forEach((content) => content.classList.remove("active"));
          
          // Show the selected tab content
          const selectedContent = document.getElementById(tabId + "-content");
          if (selectedContent) {
            selectedContent.classList.add("active");
            console.log("Tab content shown:", tabId + "-content");
          }
        }
      });
    });
  }
  
  // Add hover effects to interactive items
  const interactiveItems = document.querySelectorAll('.style-item, .brand-item');
  
  interactiveItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
    });
    
    item.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
  
}