document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
  initApp().catch((error) => console.error("Error initializing app:", error));
});

async function initApp() {
  setupNavigation();
  await loadCurrentEvents();
  setupFormSubmission();
  setupShareThoughtsButtons();
  showInitialSection();
}

function setupNavigation() {
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
  document.querySelectorAll(".content-section").forEach((section) => {
    section.classList.add("hidden");
  });

  const selectedSection = document.getElementById(sectionId);
  if (selectedSection) {
    selectedSection.classList.remove("hidden");
    if (sectionId !== "home-section") {
      setTimeout(() => {
        const headerHeight = document.querySelector("header").offsetHeight;
        const yOffset = -headerHeight - 10; // Extra 10px for breathing room
        const y =
          selectedSection.getBoundingClientRect().top +
          window.pageYOffset +
          yOffset;
        window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
      }, 0);
    } else {
      window.scrollTo(0, 0);
    }
  }

  history.pushState(null, "", `#${sectionId}`);
}

function showInitialSection() {
  const initialSectionId = "home-section";
  navigateToSection(initialSectionId);
  window.scrollTo(0, 0);
}

async function loadCurrentEvents() {
  try {
    const events = await fetchEvents();
    displayEvents(events);
    populateEventSelect(events);
  } catch (error) {
    console.error("Error loading current events:", error);
  }
}

function displayEvents(events) {
  const eventList = document.querySelector(".event-list");
  if (eventList) {
    eventList.innerHTML = "";
    events.forEach((event) => {
      const eventElement = createEventElement(event);
      eventList.appendChild(eventElement);
    });
  }
}

function createEventElement(event) {
  const eventDiv = document.createElement("div");
  eventDiv.className = "event-item";

  eventDiv.innerHTML = `
    <h3>${event.title}</h3>
    <p class="event-date">Date: ${new Date(event.date).toLocaleDateString()}</p>
    <p class="event-description">${truncateDescription(
      event.description,
      100
    )}</p>
    <a href="#submit-entry-section" class="share-thoughts-btn" data-event-id="${
      event._id
    }">Share Your Thoughts</a>
  `;

  return eventDiv;
}

function setupShareThoughtsButtons() {
  document.addEventListener("click", function (e) {
    if (e.target && e.target.classList.contains("share-thoughts-btn")) {
      e.preventDefault();
      const eventId = e.target.getAttribute("data-event-id");
      navigateToSection("submit-entry-section");
      selectEventInDropdown(eventId);
    }
  });
}

function selectEventInDropdown(eventId) {
  const eventSelect = document.getElementById("event-select");
  if (eventSelect) {
    eventSelect.value = eventId;
  }
}
function truncateDescription(description, maxLength) {
  if (description.length <= maxLength) return description;
  return description.substr(0, maxLength) + "...";
}

function populateEventSelect(events) {
  const eventSelect = document.getElementById("event-select");
  if (eventSelect) {
    eventSelect.innerHTML = '<option value="">Select an event</option>';
    events.forEach((event) => {
      const option = document.createElement("option");
      option.value = event._id;
      option.textContent = event.title;
      eventSelect.appendChild(option);
    });
  }
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

    // Here you would typically send this data to your server
    // For now, we'll just clear the form and show a confirmation
    eventSelect.value = "";
    entryText.value = "";
    alert("Thank you for sharing your perspective!");
  }
}

// Handle browser back/forward navigation
window.addEventListener("popstate", () => {
  const sectionId = location.hash.substring(1) || "home-section";
  if (sectionId === "home-section") {
    window.scrollTo(0, 0);
  }
  navigateToSection(sectionId);
});

// Toggle mobile menu
function toggleMenu() {
  const nav = document.querySelector("nav ul");
  nav.classList.toggle("show");
}

// Add event listener to menu icon
document.querySelector(".menu-icon").addEventListener("click", toggleMenu);

// Close menu when a link is clicked
document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector("nav ul").classList.remove("show");
  });
});
