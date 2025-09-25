document.addEventListener("DOMContentLoaded", function () {
  // Tab functionality
  const toyotaTabBtns = document.querySelectorAll(".toyota-tab-button");
  const toyotaTabContents = document.querySelectorAll(".toyota-tab-content");
  const toyotaPrevBtn = document.getElementById("toyotaPrevBtn");
  const toyotaNextBtn = document.getElementById("toyotaNextBtn");

  let toyotaCurrentPage = 0;
  const toyotaCardsPerPage = 4;

  // Tab switching functionality
  toyotaTabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all tabs and contents
      toyotaTabBtns.forEach((tab) => tab.classList.remove("toyota-tab-active"));
      toyotaTabContents.forEach((content) =>
        content.classList.remove("toyota-content-active")
      );

      // Add active class to clicked tab
      btn.classList.add("toyota-tab-active");

      // Show corresponding content
      const tabId = btn.getAttribute("data-tab");
      document
        .getElementById(`toyotaTab${tabId}`)
        .classList.add("toyota-content-active");

      // Reset to first page when switching tabs
      toyotaCurrentPage = 0;
      updateToyotaCardsDisplay();
    });
  });

  // Function to update cards display
  function updateToyotaCardsDisplay() {
    const activeTab = document.querySelector(
      ".toyota-tab-content.toyota-content-active"
    );
    const allCards = activeTab.querySelectorAll(".toyota-car-card");
    const totalCards = allCards.length;
    const totalPages = Math.ceil(totalCards / toyotaCardsPerPage);

    // Hide all cards first
    allCards.forEach((card) => {
      card.style.display = "none";
    });

    // Show cards for current page
    const startIndex = toyotaCurrentPage * toyotaCardsPerPage;
    const endIndex = Math.min(startIndex + toyotaCardsPerPage, totalCards);

    for (let i = startIndex; i < endIndex; i++) {
      if (allCards[i]) {
        allCards[i].style.display = "block";
      }
    }

    // Update navigation buttons
    toyotaPrevBtn.disabled = toyotaCurrentPage === 0;
    toyotaNextBtn.disabled = toyotaCurrentPage >= totalPages - 1;

    // Update button opacity
    toyotaPrevBtn.style.opacity = toyotaCurrentPage === 0 ? "0.3" : "1";
    toyotaNextBtn.style.opacity =
      toyotaCurrentPage >= totalPages - 1 ? "0.3" : "1";
  }

  // Previous button functionality
  toyotaPrevBtn.addEventListener("click", () => {
    if (toyotaCurrentPage > 0) {
      toyotaCurrentPage--;
      updateToyotaCardsDisplay();
    }
  });

  // Next button functionality
  toyotaNextBtn.addEventListener("click", () => {
    const activeTab = document.querySelector(
      ".toyota-tab-content.toyota-content-active"
    );
    const totalCards = activeTab.querySelectorAll(".toyota-car-card").length;
    const totalPages = Math.ceil(totalCards / toyotaCardsPerPage);

    if (toyotaCurrentPage < totalPages - 1) {
      toyotaCurrentPage++;
      updateToyotaCardsDisplay();
    }
  });

  // Initialize display
  updateToyotaCardsDisplay();

  // Handle window resize
  window.addEventListener("resize", () => {
    updateToyotaCardsDisplay();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      toyotaPrevBtn.click();
    } else if (e.key === "ArrowRight") {
      toyotaNextBtn.click();
    }
  });

  // Touch/swipe functionality for mobile
  let toyotaStartX = 0;
  let toyotaIsDragging = false;

  const toyotaCardsWrapper = document.querySelector(".toyota-cards-wrapper");

  toyotaCardsWrapper.addEventListener("touchstart", (e) => {
    toyotaStartX = e.touches[0].clientX;
    toyotaIsDragging = true;
  });

  toyotaCardsWrapper.addEventListener("touchmove", (e) => {
    if (!toyotaIsDragging) return;
    e.preventDefault();
  });

  toyotaCardsWrapper.addEventListener("touchend", (e) => {
    if (!toyotaIsDragging) return;
    toyotaIsDragging = false;

    const endX = e.changedTouches[0].clientX;
    const diffX = toyotaStartX - endX;

    if (Math.abs(diffX) > 50) {
      // Minimum swipe distance
      if (diffX > 0) {
        // Swipe left - go to next
        toyotaNextBtn.click();
      } else {
        // Swipe right - go to previous
        toyotaPrevBtn.click();
      }
    }
  });
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