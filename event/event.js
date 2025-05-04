// Responsive Sidebar Toggle
document.addEventListener("DOMContentLoaded", () => {
  const menuIcon = document.getElementById("menu-icon");
  const sidebar = document.getElementById("sidebar");
  const closeIcon = document.getElementById("close-icon");

  menuIcon.addEventListener("click", () => {
    sidebar.classList.add("active");
  });

  closeIcon.addEventListener("click", () => {
    sidebar.classList.remove("active");
  });

  // Close sidebar when clicking outside (optional)
  window.addEventListener("click", (e) => {
    if (e.target === sidebar) {
      sidebar.classList.remove("active");
    }
  });
});

// Animating the Explore text - Droping letter
document.addEventListener("DOMContentLoaded", () => {
  const textElement = document.getElementById("animatedText");
  const text = textElement.textContent;
  textElement.textContent = "";

  [...text].forEach((letter, i) => {
    const span = document.createElement("span");
    span.textContent = letter;
    span.classList.add("letter");
    span.style.animationDelay = `${i * 0.1}s`;
    textElement.appendChild(span);
  });
});

//Button Animation
document.querySelectorAll(".categories-btn").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".categories-btn")
      .forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

const words = [
  "Coding",
  "Circuits and robotics",
  "Business",
  "Brainstorming",
  "Mics",
  "Gaming",
];
const target = document.getElementById("animatedText");

let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeWriter() {
  const currentWord = words[wordIndex];
  const visibleText = currentWord.substring(0, charIndex);
  target.textContent = visibleText;

  if (!isDeleting) {
    if (charIndex < currentWord.length) {
      charIndex++;
      setTimeout(typeWriter, 150);
    } else {
      // Pause when full word is typed
      isDeleting = true;
      setTimeout(typeWriter, 1000); // wait before deleting
    }
  } else {
    if (charIndex > 0) {
      charIndex--;
      setTimeout(typeWriter, 100);
    } else {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      setTimeout(typeWriter, 300); // short pause before typing next
    }
  }
}

window.onload = typeWriter;

const searchInput = document.getElementById("searchInput");
const categoryButtons = document.querySelectorAll(".categories-btn");
const eventCards = document.querySelectorAll(".event-card");

let activeCategory = "all";

// Handle category button click
categoryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    categoryButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    activeCategory = button.textContent.trim().toLowerCase();
    filterEvents();
  });
});

// Handle search input
searchInput.addEventListener("input", () => {
  filterEvents();
});

// Main filter function
function filterEvents() {
  const searchTerm = searchInput.value.trim().toLowerCase();

  eventCards.forEach((card) => {
    const cardCategory =
      card.getAttribute("data-category")?.toLowerCase() || "";
    const cardTitleElement = card.querySelector("h3");
    const cardTitle = cardTitleElement
      ? cardTitleElement.textContent.toLowerCase()
      : "";

    const matchesCategory =
      activeCategory === "all" || cardCategory === activeCategory;
    const matchesSearch = cardTitle.includes(searchTerm);

    card.style.display = matchesCategory && matchesSearch ? "block" : "none";
  });
}




