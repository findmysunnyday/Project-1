//Functions to facilitate a landing page



function storeCurrentUser(userName, tierNumber) {
    localStorage.setItem("userName", userName);
    localStorage.setItem("tierNumber", tierNumber);
}


function getMostRecentScoresForLeaderboard(tierNumber, numberOfScores) {

}

//EX: [{username:carlos tierNumber: 1 numberOfScores: 34}]
//under the 'userScoreArray' it will be stored like shopwn below
function getMostRecentUserScoresForLeaderboard(userName, tierNumber, numberOfScores) {
    
}


//Functions to facilitate Game Page


function storeUserScore(score) {
    const userName = localStorage.setItem("userName", userName)
    const tierNumber = localStorage.setItem("tierNumber", tierNumber)

    const userScore = {
        userName: userName,
        tierNumber: tierNumber,
        score: score,
    };
    
    let userScoresArray = _getUserScoresFromStorage();
  userScoresArray.push(userScore);

  localStorage.setItem("userScoresArray", JSON.stringify(userScoresArray));
}

function getMostRecentScoresForLeaderboard(userName, tierNumber, numberOfScores) {
    let userScoresArray = _getUserScoresFromStorage();
  
    let filteredArray = userScoresArray.filter(
      (item) => item.userName === userName && item.tierNumber === tierNumber
    );
  
    return filteredArray.slice(0, numberOfScores);
  }

 //DO NOT USE!! THIS IS AN INTERNAL FUNCTION!!
function _getUserScoresFromStorage() {
    let userScoresArray = null;
  
    let userScoresArrayString = localStorage.getItem("userScoresArray");
    if (!userScoresArrayString) {
      userScoresArray = [];
    } else {
      userScoresArray = JSON.parse(userScoresArrayString);
    }
  
    return userScoresArray;

}


function getTopScoreByTier(tierNumber) {



}


function getLowestScoreByTier(tierNumber) {



}


function getUserScoresByTier(userName, tierNumber) {



}


function getUserScoresByTier(userName, tierNumber, order) {



}