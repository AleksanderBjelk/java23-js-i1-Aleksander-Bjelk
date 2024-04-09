//alla variabler som kommer användas
const player1El = document.querySelector(".player_0");
const player2El = document.querySelector(".player_1");
const currentPointsP1El = document.getElementById("currentPoints_P0");
const currentPointsP2El = document.getElementById("currentPoints_P1");
const totalPointsP1El = document.getElementById("tPoints_P0");
const totalPointsP2El = document.getElementById("tPoints_P1");

const diceEl = document.querySelector(".dice");
const btnNew = document.getElementById("newRoundButton");
const btnRoll = document.getElementById("rollDice");
const btnFreeze = document.getElementById("freezeButton");

const playerNameDisplay_0 = document.getElementById("playerNameDisplay_0");
const playerNameDisplay_1 = document.getElementById("playerNameDisplay_1");
const playerNameInput_0 = document.getElementById("playerNameInput_0");
const playerNameInput_1 = document.getElementById("playerNameInput_1");

let scores;
let currentScore;
let activePlayer;
let playing;
let roundCount = 0;

//hantera tärningens funktion:
btnRoll.addEventListener("click", function () {
    if (playing) {
        //generar en slumpmässig siffra melan 1-6
        const dice = Math.floor(Math.random() * 6)+1;
        console.log(dice);

        //Ändrar bild utifrån vad vi får från det generade nummret (bilderna har siffror i namnet)
        diceEl.src = `images/dice-${dice}.png`;

        //Kollar om tärningen inte är en etta och då ger poäng, om det är ett kallar vi på-->
        //switchplayer funktionen som byter spelare
        if (dice !== 1) {
            currentScore += dice;
            document.getElementById(
                `currentPoints_P${activePlayer}`
            ).textContent = currentScore;
        } else {
            diceEl.src = `images/dice-${dice}.png`;
            switchPlayer();
        }
    }
});

//fungerar så att om den aktiva spelaren byts sätts de nuvarnda poängen till noll
//den ändrar att om spelaren är 1 blir den 0 och vise versa
const switchPlayer = function () {
    document.getElementById(`currentPoints_P${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1El.classList.toggle("playerActive");
    player2El.classList.toggle("playerActive");
};

//Hanterar sparandet av poängen
btnFreeze.addEventListener("click", function () {
    if (playing) {
        //lägger till poängen på dem totala poängen
        scores[activePlayer] += currentScore;

        document.getElementById(`tPoints_P${activePlayer}`).textContent =
            scores[activePlayer];

        // kollar om poängen är högre eller lika med 100, då stoppar spelet
        if (scores[activePlayer] >= 100) {
            playing = false;

            //Hanterar vinnaren och lägger till rätt CSS
            document
                .querySelector(`.player_${activePlayer}`)
                .classList.add("winnerPlayer");
            document
                .querySelector(`.player_${activePlayer}`)
                .classList.remove("playerActive");
        } else {
            switchPlayer();
        }
    }
});

//knapp för att starta en ny omgång och kallar på funktionen som hanterar det
btnNew.addEventListener("click", function () {
    startNewRound();
});

//räknar omgångerna och nolställer alla värden
const startNewRound = function () {
    roundCount++;

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    //nollställer alla visuella element
    totalPointsP1El.textContent = 0;
    totalPointsP2El.textContent = 0;
    currentPointsP1El.textContent = 0;
    currentPointsP2El.textContent = 0;

    player1El.classList.remove("winnerPlayer");
    player2El.classList.remove("winnerPlayer");
    player1El.classList.add("playerActive");
    player2El.classList.remove("playerActive");
    document.querySelector(
        ".currentRounds"
    ).textContent = `Antal rundor: ${roundCount}`;
};

//Hur spelet ska startas från allra första början
const init = function () {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;

    totalPointsP1El.textContent = 0;
    totalPointsP2El.textContent = 0;
    currentPointsP1El.textContent = 0;
    currentPointsP2El.textContent = 0;

    player1El.classList.remove("winnerPlayer");
    player2El.classList.remove("winnerPlayer");
    player1El.classList.add("playerActive");
    player2El.classList.remove("playerActive");

    document.querySelector(
        ".currentRounds"
    ).textContent = `Antal rundor: ${roundCount}`;
};

playerNameInput_0.addEventListener("input", function () {
    playerNameDisplay_0.textContent = playerNameInput_0.value || "Spelare 1";
});

playerNameInput_1.addEventListener("input", function () {
    playerNameDisplay_1.textContent = playerNameInput_1.value || "Spelare 2";
});

init();
