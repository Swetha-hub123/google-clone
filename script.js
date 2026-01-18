async function search() {
  const query = document.getElementById("searchInput").value.trim().toLowerCase();
  const resultsDiv = document.getElementById("results");
  const historyDiv = document.getElementById("history");
  const suggestionsList = document.getElementById("suggestions");
  resultsDiv.innerHTML = "";
  suggestionsList.innerHTML = "";

  if (!query) return;

  saveToHistory(query);
  displayHistory();

  const response = await fetch("data.json");
  const data = await response.json();

  if (data[query]) {
    const item = data[query];
    const resultLink = document.createElement("a");
    resultLink.href = item.url;
    resultLink.innerText = item.title;
    resultLink.target = "_blank";
    resultsDiv.appendChild(resultLink);
  } else {
    resultsDiv.innerHTML = "❌ No results found. Try: amazon, meesho, flipkart...";
  }
}

function lucky() {
  window.open("https://www.google.com/doodles", "_blank");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}

function saveToHistory(query) {
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  if (!history.includes(query)) {
    history.push(query);
    localStorage.setItem("searchHistory", JSON.stringify(history));
  }
}

function displayHistory() {
  const historyDiv = document.getElementById("history");
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
  historyDiv.innerHTML = "<h3>Search History</h3>";
  history.reverse().forEach(item => {
    const entry = document.createElement("div");
    entry.innerText = item;
    historyDiv.appendChild(entry);
  });
}

document.addEventListener("DOMContentLoaded", displayHistory);

async function showSuggestions() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const suggestionsList = document.getElementById("suggestions");
  suggestionsList.innerHTML = "";

  const response = await fetch("data.json");
  const data = await response.json();

  const matches = Object.keys(data).filter(key => key.startsWith(input));
  matches.forEach(match => {
    const li = document.createElement("li");
    li.innerText = match;
    li.onclick = () => {
      document.getElementById("searchInput").value = match;
      suggestionsList.innerHTML = "";
    };
    suggestionsList.appendChild(li);
  });
}