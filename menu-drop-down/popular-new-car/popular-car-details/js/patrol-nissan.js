// Thumbnail gallery functionality
const thumbnails = document.querySelectorAll(".thumbnail");
const mainImage = document.getElementById("mainCarImage");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");

let currentImageIndex = 0;
const images = [
  "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=800",
  "https://images.pexels.com/photos/2127733/pexels-photo-2127733.jpeg?auto=compress&cs=tinysrgb&w=800",
];

// Thumbnail click functionality
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    currentImageIndex = index;
    updateMainImage();
    updateActiveThumbnail();
  });
});

// Navigation buttons
prevBtn.addEventListener("click", () => {
  currentImageIndex =
    currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
  updateMainImage();
  updateActiveThumbnail();
});

nextBtn.addEventListener("click", () => {
  currentImageIndex =
    currentImageIndex < images.length - 1 ? currentImageIndex + 1 : 0;
  updateMainImage();
  updateActiveThumbnail();
});

function updateMainImage() {
  mainImage.src = images[currentImageIndex];
}

function updateActiveThumbnail() {
  thumbnails.forEach((thumb, index) => {
    if (index === currentImageIndex) {
      thumb.classList.add("active");
    } else {
      thumb.classList.remove("active");
    }
  });
}

// Car Finance Calculator
function calculateLoan() {
  const downPayment =
    parseFloat(document.getElementById("downPayment").value) || 0;
  const loanTerm = parseInt(document.getElementById("loanTerm").value) || 0;

  if (downPayment <= 0) {
    alert("Please enter a valid down payment amount");
    return;
  }

  if (loanTerm <= 0) {
    alert("Please select a loan tenure");
    return;
  }

  // Simple calculation for demo purposes
  alert(
    `Calculation completed!\nDown Payment: AED ${downPayment}\nTenure: ${loanTerm} years`
  );
}

// Auto-calculate on input change
document.addEventListener("DOMContentLoaded", function () {
  const inputs = ["downPayment", "loanTerm"];

  inputs.forEach((inputId) => {
    const element = document.getElementById(inputId);
    if (element) {
      element.addEventListener("input", function () {
        // Optional: Add real-time validation here
      });
    }
  });
});

// Read More functionality
document.querySelector(".read-more").addEventListener("click", function () {
  const overview = document.querySelector(".car-overview p");
  const button = this;

  if (button.textContent === "Read More") {
    overview.style.maxHeight = "none";
    overview.style.webkitLineClamp = "unset";
    button.textContent = "Read Less";
  } else {
    overview.style.maxHeight = "4.8em";
    overview.style.webkitLineClamp = "3";
    button.textContent = "Read More";
  }
});

// Smooth animations for form interactions
document.querySelectorAll(".form-input, .form-select").forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.style.transform = "translateX(5px)";
  });

  input.addEventListener("blur", function () {
    this.parentElement.style.transform = "translateX(0)";
  });
});

// Button hover effects
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-2px)";
  });

  button.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0)";
  });
});

// Navigation functionality
const carsWrapper = document.getElementById("nissanCarsWrapper");
const leftArrow = document.getElementById("nissanLeftArrow");
const rightArrow = document.getElementById("nissanRightArrow");

const scrollAmount = 300; // pixels to scroll

function scrollCars(direction) {
  const currentScroll = carsWrapper.scrollLeft;
  const targetScroll =
    direction === "left"
      ? currentScroll - scrollAmount
      : currentScroll + scrollAmount;

  carsWrapper.scrollTo({
    left: targetScroll,
    behavior: "smooth",
  });
}

// Arrow button event listeners
leftArrow.addEventListener("click", () => scrollCars("left"));
rightArrow.addEventListener("click", () => scrollCars("right"));

// Car card click functionality
document.querySelectorAll(".nissan-car-card").forEach((card) => {
  card.addEventListener("click", function () {
    const carTitle = this.querySelector(".nissan-car-title").textContent;
    const carPrice = this.querySelector(".nissan-car-price").textContent;

    console.log(`Selected: ${carTitle} - ${carPrice}`);
    // Add your navigation logic here
    alert(`You selected: ${carTitle} - ${carPrice}`);
  });
});

// Touch/Swipe support for mobile
let startX = 0;
let currentX = 0;
let isDragging = false;

carsWrapper.addEventListener("touchstart", function (e) {
  startX = e.touches[0].clientX;
  isDragging = true;
});

carsWrapper.addEventListener("touchmove", function (e) {
  if (!isDragging) return;
  currentX = e.touches[0].clientX;
});

carsWrapper.addEventListener("touchend", function (e) {
  if (!isDragging) return;
  isDragging = false;

  const deltaX = startX - currentX;

  if (Math.abs(deltaX) > 50) {
    if (deltaX > 0) {
      scrollCars("right");
    } else {
      scrollCars("left");
    }
  }
});

// Update arrow visibility based on scroll position
function updateArrowVisibility() {
  const maxScroll = carsWrapper.scrollWidth - carsWrapper.clientWidth;
  const currentScroll = carsWrapper.scrollLeft;

  leftArrow.style.opacity = currentScroll > 0 ? "1" : "0.5";
  rightArrow.style.opacity = currentScroll < maxScroll ? "1" : "0.5";
}

carsWrapper.addEventListener("scroll", updateArrowVisibility);
window.addEventListener("resize", updateArrowVisibility);
updateArrowVisibility(); // Initial check

// Auto-scroll functionality (optional)
let autoScrollInterval;

function startAutoScroll() {
  autoScrollInterval = setInterval(() => {
    const maxScroll = carsWrapper.scrollWidth - carsWrapper.clientWidth;
    if (carsWrapper.scrollLeft >= maxScroll) {
      carsWrapper.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      scrollCars("right");
    }
  }, 5000); // Auto-scroll every 5 seconds
}

function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Start auto-scroll on page load (uncomment if you want this feature)
// startAutoScroll();

// Stop auto-scroll when user interacts
carsWrapper.addEventListener("mouseenter", stopAutoScroll);
carsWrapper.addEventListener("touchstart", stopAutoScroll);
leftArrow.addEventListener("click", stopAutoScroll);
rightArrow.addEventListener("click", stopAutoScroll);
