// script.js

document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  setupNavigation();
  loadCurrentEvents();
  setupFormSubmission();
  showInitialSection();
}

function setupNavigation() {
  // Select all navigation links, including those in the header and elsewhere
  const allLinks = document.querySelectorAll('a[href^="#"]');

  allLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const sectionId = event.target.getAttribute("href").substring(1);
      navigateToSection(sectionId);
    });
  });
}

function navigateToSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.add("hidden");
  });

  // Show the selected section
  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.remove("hidden");
    selectedSection.scrollIntoView({ behavior: "smooth" });
  }

  // Update URL without page reload
  history.pushState(null, "", `#${sectionId}`);
}

function showInitialSection() {
  const initialSectionId = location.hash.substring(1) || "home-section";
  navigateToSection(initialSectionId);
}

function loadCurrentEvents() {
  const mockEvents = [
    {
      id: 1,
      title: "Global Climate Summit",
      date: "2024-07-15",
      description: "World leaders gather to discuss climate change policies.",
      category: "global",
    },
    {
      id: 2,
      title: "Major Tech Company Launches New Product",
      date: "2024-07-20",
      description: "Industry giant unveils revolutionary device.",
      category: "tech",
    },
    {
      id: 3,
      title: "International Film Festival Begins",
      date: "2024-08-01",
      description: "Celebrating diverse cinema from around the world.",
      category: "culture",
    },
    // Add more mock events as needed
  ];

  const eventList = document.querySelector(".event-list");
  if (eventList) {
    eventList.innerHTML = "";
    mockEvents.forEach((event) => {
      const eventElement = createEventElement(event);
      eventList.appendChild(eventElement);
    });
  }
  const eventSelect = document.getElementById("event-select");
  if (eventSelect) {
    eventSelect.innerHTML = '<option value="">Select an event</option>';
    mockEvents.forEach((event) => {
      const option = document.createElement("option");
      option.value = event.id;
      option.textContent = event.title;
      eventSelect.appendChild(option);
    });
  }

  setupEventFilters(mockEvents);
}

function createEventElement(event) {
  const eventDiv = document.createElement("div");
  eventDiv.className = `event-item ${event.category}`;

  eventDiv.innerHTML = `
        <h3>${event.title}</h3>
        <p class="event-date">Date: ${event.date}</p>
        <p class="event-description">${event.description}</p>
        <a href="#submit-entry-section" class="share-thoughts-btn" data-event-id="${event.id}">Share Your Thoughts</a>
    `;

  return eventDiv;
}

function setupEventFilters(events) {
  const filterButtons = document.querySelectorAll(".filter-btn");
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.getAttribute("data-filter");
      filterEvents(filter);

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
}

function filterEvents(category) {
  const eventItems = document.querySelectorAll(".event-item");
  eventItems.forEach((item) => {
    if (category === "all" || item.classList.contains(category)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function setupFormSubmission() {
  const form = document.querySelector("#submit-entry-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      submitEntry();
    });
  }
}

function submitEntry() {
  const eventSelect = document.getElementById("event-select");
  const entryText = document.getElementById("entry-text");

  if (eventSelect && entryText) {
    const selectedEvent = eventSelect.value;
    const entryContent = entryText.value;

    console.log("Submitting entry:", {
      event: selectedEvent,
      content: entryContent,
    });

    // Clear the form
    eventSelect.value = "";
    entryText.value = "";

    // Show a confirmation message
    alert("Thank you for sharing your perspective!");
  }
}

// Handle browser back/forward navigation
window.addEventListener("popstate", () => {
  const sectionId = location.hash.substring(1) || "home-section";
  navigateToSection(sectionId);
});
