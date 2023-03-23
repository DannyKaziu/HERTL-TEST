const nhlPlayers = [
  "Connor McDavid",
  "Sidney Crosby",
  "Auston Matthews",
  "Nathan MacKinnon",
  "Alex Ovechkin"
];

const playerGuess = document.getElementById("playerGuess");
const submitGuess = document.getElementById("submitGuess");
const gameMessage = document.getElementById("gameMessage");
const remainingGuesses = document.getElementById("remainingGuesses");

let randomPlayer = nhlPlayers[Math.floor(Math.random() * nhlPlayers.length)];
let guessesLeft = 8;

remainingGuesses.textContent = `Remaining guesses: ${guessesLeft}`;

function submit() {
  const guess = playerGuess.value.trim().toLowerCase(); // Convert the guess to lowercase

  if (guessesLeft > 0) {
    if (guess === randomPlayer.toLowerCase()) { // Convert the actual player name to lowercase
      gameMessage.textContent = "Congratulations! You guessed the correct player!";
      gameMessage.style.color = "green";
      submitGuess.disabled = true;
    } else {
      guessesLeft--;
      if (guessesLeft === 0) {
        gameMessage.textContent = `Sorry, you've run out of guesses. The correct player was ${randomPlayer}.`;
        gameMessage.style.color = "red";
        submitGuess.disabled = true;
      } else {
        gameMessage.textContent = "Incorrect guess, try again!";
        gameMessage.style.color = "orange";
      }
    }
    remainingGuesses.textContent = `Remaining guesses: ${guessesLeft}`;
    playerGuess.value = "";
  }
}
