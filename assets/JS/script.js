const startButton = document.getElementById("start");
const playButton = document.getElementById("playBtn")
const dialog = document.getElementById("usernameDialog");
const usernameElement = document.getElementById("username");
const cards = document.querySelectorAll(".card"); // Changed 'card' to 'cards' for clarity
const scoreDiv = document.getElementById("score");
const userNameForm = document.getElementById("form");
const scoreTimerDiv = document.getElementById("score_timer");
const gameOverScreen = document.getElementById("game-over-screen");
const resetButton = document.getElementById("resetButton");
const timer = document.getElementById("timer")
const controls = document.getElementById("controls")

let firstCard = null;
let score = 0;
let timerInterval;
let elapsedTime
let twoFlipped = false
let username

playButton.addEventListener("click", startGame)
startButton.addEventListener("click", closeDialog);
resetButton.addEventListener('click', resetGame);

function closeDialog() {
  if (usernameElement.value != "" && usernameElement.value.length < 10) {
    dialog.style.display = "none";
    username = usernameElement.value

  } else if (userNameForm.firstElementChild.tagName != "H5") {
    const h5Element = document.createElement("h5");
    h5Element.textContent = "Username Must Be Entered"
    h5Element.style.color = "red"
    userNameForm.insertBefore(h5Element, userNameForm.firstChild)

  } else {
    userNameForm.firstChild.style.backgroundColor = "white"
    userNameForm.firstChild.style.color = "red"

  }


}

function startGame() {
  shuffle()
  startTimer()
  cards.forEach(function (card) {
    card.addEventListener("click", cardFlip)
  });
}

function resetGame() {
  location.reload()
}

function cardFlip() {
  const cardFront = this.querySelector(".front");
  const cardBack = this.querySelector(".back");
  if (!twoFlipped) {
    if (cardFront.style.display === "none" || cardFront.style.display === "") {
      cardFront.style.display = "flex";
      cardBack.style.display = "none"; // Show the back when
    }
    checkMatch(this, cardBack, cardFront)
  }


}
function checkMatch(card, cardBack, cardFront) {
  if (firstCard != null) {//if its not the first card to turn over
    twoFlipped = true
    let firstCardData = firstCard.dataset.image;
    if (firstCardData === card.dataset.image) {//if cards match
      twoFlipped = false
      addScore()
      card.removeEventListener("click", cardFlip)
      firstCard = null
      firstCardData = null
    } else {//if cards dont match
      setTimeout(() => {
        cardFront.style.display = "none";
        cardBack.style.display = "flex"; // Hide the back when showing the front
        firstCard.addEventListener("click", cardFlip);
        firstCard.children[0].style.display = "none";
        firstCard.children[1].style.display = "flex"; // Hide the back when showing the front
        firstCard = null
        firstCardData = null
        twoFlipped = false
      }, 1000);
    }
  } else {//if it is the first card to turn over
    firstCard = card
    firstCard.removeEventListener("click", cardFlip)
  }
}

function startTimer() {
  elapsedTime = 45
  timerInterval = setInterval(() => {
    elapsedTime--
    timer.innerHTML = `Time: ${elapsedTime}`
    if (elapsedTime === 0) {
      clearInterval(timerInterval);
      gameOver()
    }
  }, 1000);


}

function resetTimer() {
  stopTimer();
  startTime = 0;
  updateTimerDisplay(0);
}

function shuffle() {
  for (let card of cards) {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  }
}

function addScore() {
  score += 10
  scoreDiv.innerHTML = `${username}'s Score: ${score}`
  if (score === 60) {
    clearInterval(timerInterval)
    gameOver()
  }
}

function gameOver() {
  cards.forEach(function (card) {
    card.removeEventListener("click", cardFlip)
  });
  dialog.style.display = "flex"

  userNameForm.style.display = "none"
  gameOverScreen.classList.remove("hide")
  gameOverScreen.classList.add("flex-column")
  const gameOverPElement = gameOverScreen.querySelector("p")
  if (score < 60 || elapsedTime === 0) {
    gameOverPElement.textContent = "Better Luck Next Time"
  } else {
    gameOverPElement.textContent = `Well done ${username} Your score was ${score}`
  }

  setTimeout(() => {
    resetGame()
  }, 4000)

}

