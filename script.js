// Load environment variables (only required if running Node.js server-side)
require('dotenv').config();

const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote-btn");
const categorySelect = document.getElementById("category");
const quoteContainer = document.getElementById("quote-container");
const loadingSpinner = document.getElementById("loading-spinner");

// Your gradients based on category
const gradients = {
  inspirational: "from-pink-200 to-purple-300",
  life: "from-blue-200 to-teal-300",
  success: "from-yellow-200 to-orange-300",
  humor: "from-green-200 to-yellow-300",
  art: "from-indigo-200 to-blue-500",
  beauty: "from-pink-300 to-red-400",
  change: "from-yellow-300 to-orange-500",
  courage: "from-red-200 to-yellow-400",
  dreams: "from-blue-300 to-indigo-500",
  education: "from-teal-300 to-green-400",
  experience: "from-purple-300 to-indigo-400",
  failure: "from-gray-400 to-red-500",
  family: "from-teal-400 to-green-300",
  fear: "from-red-300 to-black",
  fitness: "from-green-300 to-blue-400",
  food: "from-yellow-400 to-orange-300",
  future: "from-blue-500 to-purple-400",
  god: "from-yellow-400 to-red-500",
  happiness: "from-yellow-300 to-green-400",
  health: "from-green-300 to-teal-400",
  hope: "from-indigo-300 to-purple-400",
  money: "from-green-400 to-yellow-500",
  imagination: "from-pink-400 to-purple-600",
  knowledge: "from-blue-300 to-green-500",
  leadership: "from-indigo-300 to-red-400",
  learning: "from-blue-400 to-teal-500",
  love: "from-pink-400 to-red-400",
  marriage: "from-purple-400 to-red-400",
  friendship: "from-orange-300 to-yellow-500",
};

// Show loading spinner
function showLoading() {
  loadingSpinner.classList.remove("hidden");
  quoteText.classList.add("hidden");
  authorText.classList.add("hidden");
}

// Hide loading spinner
function hideLoading() {
  loadingSpinner.classList.add("hidden");
  quoteText.classList.remove("hidden");
  authorText.classList.remove("hidden");
}

// Adjust font size to ensure the quote fits within the card
function fitTextToContainer() {
  const containerHeight = quoteContainer.clientHeight;
  let fontSize = 24;  // Start with a large font size
  quoteText.style.fontSize = `${fontSize}px`;

  // Continue reducing font size until the text fits inside the container
  while (quoteText.scrollHeight > containerHeight && fontSize > 12) {
    fontSize--;
    quoteText.style.fontSize = `${fontSize}px`;
  }
}

// Fetch quote from API securely
async function getQuote(category) {
  showLoading();

  try {
    const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
      headers: { 'X-Api-Key': process.env.API_KEY } // Load API Key from environment variable
    });
    const data = await response.json();

    if (data.length > 0) {
      // Update quote and author
      quoteText.textContent = `"${data[0].quote}"`;
      authorText.textContent = `- ${data[0].author}`;
      fitTextToContainer(); // Adjust font size after loading
    } else {
      quoteText.textContent = "No quotes available for this category.";
      authorText.textContent = "";
    }

    // Change background gradient
    updateBackground(category);

  } catch (error) {
    console.error("Error fetching quote:", error);
    quoteText.textContent = "Oops! Something went wrong...";
    authorText.textContent = "";
  }

  hideLoading();
}

// Update background based on category
function updateBackground(category) {
  document.body.className = `min-h-screen flex items-center justify-center bg-gradient-to-r ${gradients[category]} text-gray-700`;
}

// Initial quote load
getQuote(categorySelect.value);

// Event listener for new quote button
newQuoteBtn.addEventListener("click", () => {
  const selectedCategory = categorySelect.value;
  getQuote(selectedCategory);
});

// Event listener for category change
categorySelect.addEventListener("change", () => {
  getQuote(categorySelect.value);
});