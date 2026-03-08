// Get elements
var userList    = document.getElementById("userList");
var userDetails = document.getElementById("userDetails");
var loadingMsg  = document.getElementById("loadingMsg");
var searchInput = document.getElementById("searchInput");
var reloadBtn   = document.getElementById("reloadBtn");

// Store all users globally for search filter
var allUsers = [];

// ── Fetch users from API ──────────────────────────────────────────
function fetchUsers() {
  // Clear old data and show loading
  userList.innerHTML = "";
  userDetails.style.display = "none";
  loadingMsg.textContent = "Loading...";

  // Task 1: Fetch from API
  fetch("https://jsonplaceholder.typicode.com/users")
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      allUsers = data;

      // Task 3: Remove loading message
      loadingMsg.textContent = "";

      // Display users in list
      displayUsers(allUsers);
    })
    // Task 4: Error handling
    .catch(function() {
      loadingMsg.textContent = "Failed to fetch data";
    });
}


// ── Display users in the list ─────────────────────────────────────
function displayUsers(users) {
  userList.innerHTML = "";

  users.forEach(function(user) {
    var li = document.createElement("li");
    li.textContent = user.name;

    // Task 2: Show details on click
    li.addEventListener("click", function() {
      userDetails.style.display = "block";
      userDetails.innerHTML =
        "<h3>" + user.name + "</h3>" +
        "<p>Email: " + user.email + "</p>" +
        "<p>Phone: " + user.phone + "</p>" +
        "<p>Website: " + user.website + "</p>";
    });

    userList.appendChild(li);
  });
}


// ── Task 5: Search filter ─────────────────────────────────────────
searchInput.addEventListener("input", function() {
  var searchText = searchInput.value.toLowerCase();

  var filtered = allUsers.filter(function(user) {
    return user.name.toLowerCase().includes(searchText);
  });

  displayUsers(filtered);
});


// ── Task 6: Reload button ─────────────────────────────────────────
reloadBtn.addEventListener("click", function() {
  searchInput.value = "";
  fetchUsers();
});


// ── Load users when page opens ────────────────────────────────────
fetchUsers();
