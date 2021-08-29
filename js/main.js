let userScore = 0;
let computerScore = 0;
const userChoices = ["ROCK", "PAPER", "SCISSOR"]
const choiceToIndexMap = {
    "r" : 0, 
    "p" : 1,
    "s" : 2
}

let choiceBtns = document.querySelectorAll(".choice-selection-region");

for(let btn of choiceBtns) {
    btn.addEventListener('click', handleUserChoiceClick);
}

function handleUserChoiceClick(e) {

    const choice = e.currentTarget.parentElement.children[1].children[0].innerText;
    const randomChoice = userChoices[Math.floor(Math.random() * userChoices.length)];

    document.getElementById("user-prompt-action").style.display = "none";

    if(choice == randomChoice) {
        setUserPrompt("No one won ! It's a draw.", "o")
    } else {
        if(choice == "ROCK") {
            setUserPrompt("You won !", 'r');
            userScore += 1
        } else if(choice == "PAPER") {
            if(randomChoice == "ROCK") {
                setUserPrompt("You lose, computer chose Rock !", 'r')
                computerScore += 1
            } else {
                setUserPrompt("You lose, computer chose Scissor !", 's')
                computerScore += 1
            }
        } else {
            if(randomChoice == "ROCK") {
                setUserPrompt("You lose, computer chose Rock !", 'r')
                computerScore += 1
            } else {
                setUserPrompt("You won !", 's')
                userScore += 1
            }
        }

        updateScoresOnBoard();
    }
}

function updateScoresOnBoard() {
    document.getElementById("board-item1").innerHTML = userScore;
    document.getElementById("board-item2").innerHTML = computerScore;
    checkForWinner();
}

function checkForWinner() {
    if(userScore === 10 || computerScore === 10) {

        if(userScore === 10) {
            displayWinner();
        } else {
            displayLoseBanner();
        }
        resetGame();
    }
}

function resetGame() {

    userScore = 0;
    computerScore = 0;
    document.getElementById("board-item1").innerHTML = 0;
    document.getElementById("board-item2").innerHTML = 0;
    setTimeout(clearWinnerBanner, 5000);
    setTimeout(clearLoserBanner, 3000);

}

function clearWinnerBanner() {
    document.getElementById("user-move-selection").style.display = "flex";
    document.getElementById("display-winner-section").style.display = "none";
}

function displayWinner() {
    document.getElementById("user-move-selection").style.display = "none";
    document.getElementById("display-winner-section").style.display = "flex";
}

function setUserPrompt(message, winningChoice) {
    document.getElementById("user-result-action").style.display = "block";
    document.getElementById("user-result-action-text").innerHTML = message;
    if(choiceToIndexMap[winningChoice] != undefined) {
        choiceBtns[choiceToIndexMap[winningChoice]].style.borderColor = "#00ff21";
    }
    setTimeout(clearUserPrompt, 1000, winningChoice);
}

function clearUserPrompt(winningChoice) {
    document.getElementById("user-prompt-action").style.display = "block";
    document.getElementById("user-result-action").style.display = "none";
    if(choiceToIndexMap[winningChoice] != undefined) {
        choiceBtns[choiceToIndexMap[winningChoice]].style.borderColor = "red";
    }
}

function displayLoseBanner() {
    document.getElementById("user-move-selection").style.display = "none";
    document.getElementById("display-loser-section").style.display = "flex";
}

function clearLoserBanner() {
    document.getElementById("user-move-selection").style.display = "flex";
    document.getElementById("display-loser-section").style.display = "none";
}