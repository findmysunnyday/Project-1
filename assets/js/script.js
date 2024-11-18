function showNotification(message) {
  const notification = document.getElementById("notification");
  notification.textContent = message;
  notification.classList.remove("d-none");
  setTimeout(() => {
    notification.classList.add("d-none");
  }, 3000); // Hides after 3 seconds
}

if (typeof gamePage !== "undefined") {
  console.log(
    "Game Page Visibility:",
    gamePage?.classList?.contains("d-none") || "Undefined"
  );
}

let gridElement = document.getElementById("grid");

if (gridElement) {
  console.log(
    "Grid Visibility:",
    document.getElementById("grid").classList.contains("d-none")
  );
  document.getElementById("grid").classList.remove("d-none");
}

//---------- Game Logic ----------//
function showGameMode() {
  const mode =
    new URLSearchParams(window.location.search).get("mode") || "classic";

  if (mode === "classic") {
    let classicGameContainer = document.getElementById(
      "classic-game-container"
    );
    if (classicGameContainer) {
      classicGameContainer.classList.remove("d-none");
      startClassicGame();
    }
  } else if (mode === "flash-match") {
    document.getElementById("flash-match-container").classList.remove("d-none");
    startFlashMatch();
  }
}

window.onload = showGameMode;

// Shared functions for both game modes
function createGrid(containerId) {
  const grid = document.getElementById(containerId);
  grid.innerHTML = ""; // Clears the existing grid

  for (let i = 0; i < 16; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-item");
    square.addEventListener("click", () => handleSquareClick(square));
    grid.appendChild(square);
  }

  console.log("Grid created");
}

function handleSquareClick(square) {
  if (square.classList.contains("active-square")) {
    // Increase score and update display
    score++;
    clicksAchieved++;
    updateScore();

    console.log("Square clicked successfully!");
    console.log("Score:", score, "Clicks Achieved:", clicksAchieved);

    // Checks if the player has reached the target clicks
    if (clicksAchieved >= targetClicks) {
      endGame();
      return;
    }

    // Moves the green square to a new location
    highlightRandomSquare();
    square.classList.add("clicked");
    setTimeout(() => square.classList.remove("clicked"), 200);
  } else {
    // Handles incorrect clicks (if needed)
    square.classList.add("wrong-click");
    setTimeout(() => square.classList.remove("wrong-click"), 300);
  }
}

// Unified event listeners
let startButtonElement = document.getElementById("start-btn");
if (startButtonElement) {
  document.getElementById("start-btn").addEventListener("click", () => {
    console.log("Start button clicked");
    startClassicGame();
  });
}
