// app.js

const API_BASE_URL = "http://localhost:8000"; // Replace with your actual backend URL

// Fetch and display events
async function fetchEvents() {
  try {
    const response = await fetch(`${API_BASE_URL}/events`);
    const events = await response.json();
    displayEvents(events);
  } catch (error) {
    console.error("Error fetching events:", error);
  }
}

function displayEvents(events) {
  const eventsContainer = document.getElementById("featured-events");
  eventsContainer.innerHTML =
    "<h3>Featured Current Events</h3><p>Explore the most significant events happening right now.</p>";
  events.forEach((event) => {
    const eventCard = document.createElement("div");
    eventCard.className = "event-card";
    eventCard.innerHTML = `
            <h4>${event.title}</h4>
            <p>${event.description}</p>
            <a href="#" onclick="fetchPostsForEvent('${event.id}')">View Entries</a>
        `;
    eventsContainer.appendChild(eventCard);
  });
}

// Fetch and display posts
async function fetchPosts() {
  try {
    const response = await fetch(`${API_BASE_URL}/posts`);
    const posts = await response.json();
    displayPosts(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
  }
}

function displayPosts(posts) {
  const postsContainer = document.getElementById("latest-entries");
  postsContainer.innerHTML =
    "<h3>Latest Entries</h3><p>Read recent first-hand accounts from our contributors.</p>";
  posts.forEach((post) => {
    const postSnippet = document.createElement("div");
    postSnippet.className = "post-snippet";
    postSnippet.innerHTML = `
            <h4>${post.title}</h4>
            <p>${post.content.substring(0, 100)}...</p>
            <a href="#" onclick="viewFullPost('${post.id}')">Read More</a>
        `;
    postsContainer.appendChild(postSnippet);
  });
}

// Fetch posts for a specific event
async function fetchPostsForEvent(eventId) {
  try {
    const response = await fetch(`${API_BASE_URL}/events/${eventId}`);
    const event = await response.json();
    displayEventPosts(event);
  } catch (error) {
    console.error("Error fetching posts for event:", error);
  }
}

function displayEventPosts(event) {
  const mainContent = document.getElementById("main-content");
  const section = document.createElement("section");
  section.className = "content-section";
  section.innerHTML = `
        <h2>${event.title}</h2>
        <p>${event.description}</p>
        <div id="event-posts"></div>
    `;
  mainContent.innerHTML = "";
  mainContent.appendChild(section);

  const eventPostsContainer = document.getElementById("event-posts");
  event.posts.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className = "post";
    postElement.innerHTML = `
            <h3>${post.title}</h3>
            <p>${post.content}</p>
        `;
    eventPostsContainer.appendChild(postElement);
  });
}

// View full post
async function viewFullPost(postId) {
  try {
    const response = await fetch(`${API_BASE_URL}/posts/${postId}`);
    const post = await response.json();
    displayFullPost(post);
  } catch (error) {
    console.error("Error fetching full post:", error);
  }
}

function displayFullPost(post) {
  const mainContent = document.getElementById("main-content");
  const section = document.createElement("section");
  section.className = "content-section";
  section.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <p>Date: ${post.date}</p>
        <p>Location: ${post.location}</p>
    `;
  mainContent.innerHTML = "";
  mainContent.appendChild(section);
}

// Create new post
async function createPost(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const postData = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(`${API_BASE_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });
    const newPost = await response.json();
    alert("Post created successfully!");
    form.reset();
    fetchPosts(); // Refresh the posts list
  } catch (error) {
    console.error("Error creating post:", error);
    alert("Error creating post. Please try again.");
  }
}

// Navigation functionality
function showSection(sectionId) {
  const sections = document.querySelectorAll(".content-section");
  sections.forEach((section) => section.classList.add("hidden"));
  const targetSection = document.getElementById(sectionId);
  if (targetSection) {
    targetSection.classList.remove("hidden");
  }
}

// Initialize the page
function init() {
  fetchEvents();
  fetchPosts();
  document
    .getElementById("submit-entry-form")
    .addEventListener("submit", createPost);

  // Setup navigation
  const navLinks = document.querySelectorAll("nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionId = link.getAttribute("href").substring(1);
      showSection(sectionId);
    });
  });

  // Show home section by default
  showSection("home-section");
}

// Run initialization when the DOM is loaded
document.addEventListener("DOMContentLoaded", init);
