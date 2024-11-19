//Functions to facilitate a landing page

/**
 * Stores the current player and tiernumber in the local storage
 * @param {*} playerName
 * @param {*} tierNumber
 */
function storeCurrentPlayer(playerName, tierNumber) {
  localStorage.setItem("playerName", playerName);
  localStorage.setItem("tierNumber", tierNumber);
}

/**
 * Store the current player with current score into the local storage
 * @param {*} score
 */
function storePlayerScore(score, playtime) {
  const playerName = localStorage.getItem("playerName");
  const tierNumber = localStorage.getItem("tierNumber");
  const dateTimeNowString = JSON.stringify(new Date());

  const playerScore = {
    playerName: playerName,
    tierNumber: tierNumber,
    score: score,
    playtime: playtime,
    completedDateTimeString: dateTimeNowString,
  };

  let playerScoresArray = _getPlayerScoresFromStorage();
  playerScoresArray.push(playerScore);

  localStorage.setItem("playerScoresArray", JSON.stringify(playerScoresArray));
}

/**
 * Given a tierNumber and howManyScores, this function returns an array of
 * player scores that are most recent
 * Please note this method may contain different players
 *
 * @param {*} tierNumber
 * @param {*} howManyScores
 */
function getMostRecentScoresForLeaderboard(tierNumber, howManyScores) {
  let playerScoresArray = _getPlayerScoresFromStorage();

  let filteredArray = playerScoresArray.filter(
    (item) => item.tierNumber === tierNumber
  );

  let sortedArray = filteredArray.sort(function (playerScore1, playerScore2) {
    if (
      playerScore2.completedDateTimeString <
      playerScore1.completedDateTimeString
    )
      return -1;
    if (
      playerScore2.completedDateTimeString >
      playerScore1.completedDateTimeString
    )
      return 1;
    return 0;
  });

  if (howManyScores === 0) return sortedArray;
  else return sortedArray.slice(0, howManyScores);
}

/**
 * @param {*} playerName
 * @param {*} tierNumber
 * @param {*} howManyScores if 0 then all the results as is, else sliced results.
 * @returns an array of player scores object
 *
 * This is how we would call this function
 * let playerScoresMostRecent7 = getMostRecentScoresForLeaderboard("terry", 2, 7);
 *
 * This function will return an array like below
 * [{playerName:"terry", tierNumber: 2, score:20, completedDateTimeString:...},
 * {playerName:"terry", tierNumber: 2, score:21, completedDateTimeString:...}
 * ...
 * ]
 */
function getMostRecentPlayerScoresForLeaderboard(
  playerName,
  tierNumber,
  howManyScores
) {
  let playerScoresArray = _getPlayerScoresFromStorage();

  let filteredArray = playerScoresArray.filter(
    (item) =>
      item.playerName === playerName && Number(item.tierNumber) === tierNumber
  );

  if (!filteredArray) filteredArray = [];

  let sortedArray = filteredArray.sort(function (playerScore1, playerScore2) {
    if (
      playerScore2.completedDateTimeString <
      playerScore1.completedDateTimeString
    )
      return -1;
    if (
      playerScore2.completedDateTimeString >
      playerScore1.completedDateTimeString
    )
      return 1;
    return 0;
  });

  if (!sortedArray) sortedArray = [];
  if (howManyScores === 0) return sortedArray;
  else return sortedArray.slice(0, howManyScores);
}

/**
 * For a given player and tier, this function will return howmany number of top scores
 * @param {*} playerName
 * @param {*} tierNumber
 * @param {*} howMany
 * @returns an array of player score objects
 */
function getTopScoresForPlayerTier(playerName, tierNumber, howMany) {
  let playerScoresSortedDesc = _getPlayerScoresSortedDescendingForPlayerTier(
    playerName,
    tierNumber
  );
  if (howMany === 0) {
    return playerScoresSortedDesc;
  } else {
    return playerScoresSortedDesc.slice(0, howMany);
  }
}

/**
 * Gets the player details who scored the top most or the highest on a given tier
 * @param {*} tierNumber
 * @returns
 */
function getTopScorePlayerOnTier(tierNumber) {
  let sortedScores = _getPlayerScoresSortedByTierNumberDescending(tierNumber);
  if (sortedScores && sortedScores.length > 0) {
    return sortedScores[0];
  } else return [];
}

/**
 * Gets the player details who scored the least on a given tier
 * @param {*} tierNumber
 * @returns
 */
function getLowestScorePlayerOnTier(tierNumber) {
  let sortedScores = _getPlayerScoresSortedByTierNumberDescending(tierNumber);
  if (sortedScores && sortedScores.length > 0) {
    return sortedScores[sortedScores.length - 1];
  } else return [];
}

/* DO NOT USE THE FUNCTIONS THAT START WITH _ THESE ARE INTERNAL FUNCTION!! */
/* ------------------------------------------------------------------------ */

/**
 * @returns an array of all the player score objects
 */
function _getPlayerScoresFromStorage() {
  let playerScoresArray = null;

  let playerScoresArrayString = localStorage.getItem("playerScoresArray");
  if (!playerScoresArrayString) {
    playerScoresArray = [];
  } else {
    playerScoresArray = JSON.parse(playerScoresArrayString);
  }

  return playerScoresArray;
}

/**
 * This method sorts by descending order on a tier level
 * @param {*} tierNumber
 * @returns
 */
function _getPlayerScoresSortedByTierNumberDescending(tierNumber) {
  let playerScoresArray = _getPlayerScoresFromStorage();

  let filteredArray = playerScoresArray.filter(
    (item) => Number(item.tierNumber) === tierNumber
  );

  let sortedArray = filteredArray.sort(function (playerScore1, playerScore2) {
    if (playerScore2.score < playerScore1.score) return -1;
    if (playerScore2.score > playerScore1.score) return 1;
    return 0;
  });

  return sortedArray;
}

/**
 * This method sorts by descending order for a player on a tier level
 * @param {*} tierNumber
 * @returns
 */
function _getPlayerScoresSortedDescendingForPlayerTier(playerName, tierNumber) {
  let playerScoresArray = _getPlayerScoresFromStorage();

  let filteredArray = playerScoresArray.filter(
    (item) =>
      item.playerName == playerName && Number(item.tierNumber) === tierNumber
  );

  let sortedArray = filteredArray.sort(function (playerScore1, playerScore2) {
    if (playerScore2.score < playerScore1.score) return -1;
    if (playerScore2.score > playerScore1.score) return 1;
    return 0;
  });

  return sortedArray;
}
