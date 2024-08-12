const BaseAPI = "http://localhost:8000";

async function fetchEvents() {
  try {
    const response = await fetch(`${BaseAPI}/events`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const events = await response.json();
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

async function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const entryData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`${BaseAPI}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entryData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Entry submitted successfully:", result);
    alert(
      "Your thoughts have been added to the archive. Thank you for contributing!"
    );
    form.reset();
  } catch (error) {
    console.error("Error submitting entry:", error);
    alert("There was an error submitting your entry. Please try again.");
  }
}

// Setup the event submission form
function setupEventForm() {
  const form = document.getElementById("submit-entry-form");
  if (form) {
    form.addEventListener("submit", handleFormSubmit);
  }
}

// Initialize the page
document.addEventListener("DOMContentLoaded", () => {
  setupEventForm();
});
