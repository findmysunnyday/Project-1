let playerName = "";
let score = 0;
let isGameRunning = false;
let activeSquare = null;
let clicksAchieved = 0;
let targetClicks = 10;
let tierSpeed = 1000;
let startTime, timerInterval;
let tierSelected = false;
let currentTier = 0;
let selectedButton = null;

let playTime = 0;

// Elements
const startPage = document.getElementById("start-page");
const gamePage = document.getElementById("game-page");
const playerNameInput = document.getElementById("player-name");
const startBtn = document.getElementById("start-btn");
const timerDisplay = document.getElementById("timer");
const scoreDisplay = document.getElementById("score");
const grid = document.getElementById("grid");

window.addEventListener("load", () => {
  console.log("Page loaded - resetting tier selection");
  tierSelected = false;
  currentTier = 0;
  playTime = 0;
  const buttons = document.querySelectorAll(".tier-button");
  buttons.forEach((btn) => btn.classList.remove("active"));
  let tierLabelElement = document.getElementById("tier-label");
  if (tierLabelElement) {
    document.getElementById("tier-label").textContent = "";
  }
});

// Event Listener for Start Button
startBtn.addEventListener("click", () => {
  // Gets the player's name from the input field
  playerName = playerNameInput.value.trim();
  console.log("Player name entered:", playerName);
  console.log("Tier selected:", tierSelected);

  // Checks if player name is provided
  if (!playerName) {
    showNotification("Please enter your Name!");
    console.log("Name missing - notification shown");
    return; // Stop the function if the name is missing
  }

  // Checks if a tier is selected
  if (!tierSelected) {
    showNotification("Please select a Tier!");
    console.log("Tier not selected - notification shown");
    return; // Stop the function if no tier is selected
  }

  // If both validations pass, start the game
  console.log("Starting game...");
  startClassicGame();
});

// Tier Button Functionalities
function setTier(tier, button) {
  const buttons = document.querySelectorAll(".tier-button");
  const leaderboardContainer = document.getElementById("leaderboard-container");

  // Deactivates the current button if clicked again
  if (button === selectedButton) {
    console.log("Deselecting current tier:", currentTier);
    button.classList.remove("active");
    selectedButton = null;
    tierSelected = false;
    currentTier = 0;
    leaderboardContainer.classList.add("d-none"); // Hides leaderboard
    resetTierSettings();
    return;
  }

  // Deactivates all other buttons
  buttons.forEach((btn) => btn.classList.remove("active"));

  // Activates the clicked button
  button.classList.add("active");
  selectedButton = button;
  tierSelected = true; // Sets to true only when a button is clicked
  currentTier = tier;

  // Updates tier settings based on the selected tier
  if (currentTier === 1) {
    tierSpeed = 1500;
    targetClicks = 15;
  } else if (currentTier === 2) {
    tierSpeed = 1000;
    targetClicks = 20;
  } else if (currentTier === 3) {
    tierSpeed = 700;
    targetClicks = 25;
  }

  leaderboardContainer.classList.remove("d-none");
  leaderboardContainer.classList.add("d-block");
  console.log("Tier selected:", currentTier);
  console.log("Tier speed:", tierSpeed, "Target clicks:", targetClicks);
  playerName = playerNameInput.value.trim();
  displayLeaderboard(playerName, currentTier);
}

function resetTierSettings() {
  tierSpeed = 1500;
  targetClicks = 15;
  document.getElementById("tier-label").textContent = "";
  console.log("Tier settings reset to default");
}

function startClassicGame() {
  // Gets references to the elements
  const welcomeMessageContainer = document.getElementById(
    "welcome-message-container"
  );
  const gameModeTitle = document.getElementById("game-mode-title");
  const leaderboardContainer = document.getElementById("leaderboard-container");
  const playerNameInput = document.getElementById("player-name");

  // Gets the player's name
  playerName = playerNameInput.value.trim();
  if (!playerName) {
    showNotification("Please enter your Name!");
    return;
  }

  if (!tierSelected) {
    showNotification("Please select a Tier!");
    return;
  }
  playTime = 0;

  console.log("Starting the game...");

  storeCurrentPlayer(playerName, currentTier);

  // Displays the welcome message with the player's name
  const welcomeMessage = document.getElementById("welcome-message");
  welcomeMessage.textContent = `Welcome, ${playerName}! Good luck!`;
  welcomeMessageContainer.classList.remove("d-none");

  // Hides the leaderboard and game mode title
  gameModeTitle.classList.add("d-none");
  leaderboardContainer.classList.add("d-none");

  // Shows the game page and hide the start page
  const startPage = document.getElementById("start-page");
  const gamePage = document.getElementById("game-page");
  startPage.classList.add("d-none");
  gamePage.classList.remove("d-none");

  // Initializes the game
  score = 0;
  clicksAchieved = 0;
  isGameRunning = true;
  updateScore();
  createGrid("grid");
  highlightRandomSquare();

  startTimer();
}

console.log("Game started");
console.log(
  "Grid should be visible:",
  document.getElementById("grid").classList.contains("d-none")
);
console.log("Highlighting square...");

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
    timerDisplay.textContent = `Time: ${elapsedTime}s`;
  }, 100);
}

function updateScore() {
  scoreDisplay.textContent = `Score: ${score}`;
}

function highlightRandomSquare() {
  // Removes the active class from the previous square, if any
  if (activeSquare) {
    activeSquare.classList.remove("active-square");
  }

  const squares = document.querySelectorAll(".grid-item");
  if (squares.length === 0) {
    console.error("No squares found");
    return;
  }

  // Randomly selects a new square
  const randomIndex = Math.floor(Math.random() * squares.length);
  activeSquare = squares[randomIndex];
  activeSquare.classList.add("active-square");

  console.log("New active square index:", randomIndex);
}

function endGame() {
  isGameRunning = false;

  /* begin score calculation and stoering the score  */
  let timedifference = Date.now() - startTime;

  const seconds = Math.floor(timedifference / 1000); // Whole seconds
  const milliseconds = timedifference % 1000; //
  let playtime = `${seconds}.${milliseconds}`;

  let elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
  let player_score = Math.round((10 / elapsedTime) * targetClicks);
  storePlayerScore(player_score, playtime);
  /* end score calculation and storing the score */

  clearInterval(timerInterval);
  showNotification(`Congratulations! You reached ${targetClicks} clicks!`);
  let value = "happy";
  if (currentTier === 1 && elapsedTime > 13) {
    value = "sleepy";
  } else if (currentTier === 2 && elapsedTime > 15) {
    value = "sleepy";
  } else if (currentTier === 3 && elapsedTime > 17) {
    value = "sleepy";
  }

  localStorage.setItem("effects", value);
  redirectPage("finaleffects.html");
  //resetGame();
}

function resetGame() {
  // Gets references to the elements
  const welcomeMessageContainer = document.getElementById(
    "welcome-message-container"
  );
  const gameModeTitle = document.getElementById("game-mode-title");
  const leaderboardContainer = document.getElementById("leaderboard-container");

  // Hides the welcome message and show the game mode title and leaderboard
  welcomeMessageContainer.classList.add("d-none");
  gameModeTitle.classList.remove("d-none");
  leaderboardContainer.classList.remove("d-none");
  displayLeaderboard(playerName, currentTier);

  // Resets the start page and game page visibility
  const startPage = document.getElementById("start-page");
  const gamePage = document.getElementById("game-page");
  startPage.classList.remove("d-none");
  gamePage.classList.add("d-none");

  // Resets game variables
  isGameRunning = false;
  score = 0;
  clicksAchieved = 0;
  playTime = 0;
}

function displayLeaderboard(playerName, tierNumber) {
  console.log(`displayLeaderboard ${playerName}, ${tierNumber}`);
  const leaderboardList = document.getElementById("leaderboard-list");
  leaderboardList.replaceChildren();

  let playerScoresArray = getTopScoresForPlayerTier(playerName, tierNumber, 7);
  /*
  let playerScoresArray = getMostRecentPlayerScoresForLeaderboard(
    playerName,
    tierNumber,
    7
  );
    */
  if (playerScoresArray && playerScoresArray.length > 0) {
    let h2 = document.createElement("h5");
    h2.setAttribute("class", "leaderboard-subtitle");
    h2.innerText = "Your recent top speeds!";
    leaderboardList.appendChild(h2);

    playerScoresArray.forEach((element) => {
      let div = document.createElement("div");
      div.setAttribute("class", "leaderboard-row");

      let span1 = document.createElement("span");
      span1.innerText = playerName;
      div.appendChild(span1);
      let span2 = document.createElement("span");
      span2.innerText = element.playtime;
      div.appendChild(span2);
      let span3 = document.createElement("span");
      span3.innerHTML = getStarRating(tierNumber, element.playtime);
      div.appendChild(span3);
      leaderboardList.appendChild(div);
    });
  }
}

function getStarRating(tier, timeTaken) {
  let stars = "";
  if (tier === 1) {
    if (timeTaken <= 10.5) stars = "⭐⭐⭐";
    else if (timeTaken <= 12.5) stars = "⭐⭐";
    else stars = "⭐";
  } else if (tier === 2) {
    if (timeTaken <= 14.6) stars = "⭐⭐⭐";
    else if (timeTaken <= 16.3) stars = "⭐⭐";
    else stars = "⭐";
  } else if (tier === 3) {
    if (timeTaken <= 16.8) stars = "⭐⭐⭐";
    else if (timeTaken <= 19.2) stars = "⭐⭐";
    else stars = "⭐";
  }
  return stars;
}

let redirectURL = "";

const redirectPage = function (url) {
  redirectURL = url;
  location.assign(url);
};
