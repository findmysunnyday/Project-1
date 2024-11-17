const tier1BtnElement = document.querySelector("#tier1-btn");
const tier2BtnElement = document.querySelector("#tier2-btn");
const tier3BtnElement = document.querySelector("#tier3-btn");

tier1BtnElement.addEventListener("click", displayLeaderboard);
tier2BtnElement.addEventListener("click", displayLeaderboard);
tier3BtnElement.addEventListener("click", displayLeaderboard);


function displayLeaderboard (event) {
    console.log(event.currentTarget);
    const whichButton = event.currentTarget;
    let tierNumber = 0

    if (whichButton.id === "tier1-btn") {
        tierNumber = 1
        //CALL JEFFREYs STORAGE.js from below userScores
    }
    if (whichButton.id === "tier2-btn") {
        tierNumber = 2
    }
    if (whichButton.id === "tier3-btn") {
        tierNumber = 3
    }
    // use this when jeffrey is done: const userScores = getUserScores(tierNumber);
    const userScores = [
        {
            userId: "jen",
            score: "30"
        },
        {
            userId: "alex",
            score: "29"
        },
        {
            userId: "carlos",
            score: "29"
        },	
        {
            userId: "jeffrey",
            score: "25"
        },
        {
            userId: "edison",
            score: "24"
        },	
    ];
const ulElement = document.querySelector("#leaderboard-list");

 userScores.forEach(element => {
   const liElement = document.createElement("li");
   liElement.innerHTML = `${element.userId} ${element.score}`;
   ulElement.appendChild(liElement);
 });
}


/* const userScores = [
	{
		userId: "jen",
		score: "30"
	},
	{
		userId: "alex",
		score: "29"
	},
	{
		userId: "carlos",
		score: "29"
	},	
	{
		userId: "jeffrey",
		score: "25"
	},
	{
		userId: "edison",
		score: "24"
	},	
]; */