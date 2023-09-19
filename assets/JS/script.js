//for start game button on username dialog
const startButton = document.getElementById("start");
//for play game button on game page
const playButton = document.getElementById("playBtn");
//for reset button to reload page
const resetButton = document.getElementById("resetButton");
//username dialog
const dialog = document.getElementById("usernameDialog");
//for username text content
const usernameElement = document.getElementById("username");
const userNameForm = document.getElementById("form");
//for playing cards
const cards = document.querySelectorAll(".card");
//for score and timer
const scoreElement = document.getElementById("score");
const timer = document.getElementById("timer");
//for game over screen
const gameOverScreen = document.getElementById("game-over-screen");
//for error in username dialog
const h5Element = document.createElement("h5"); 


//manage card flip
let firstCard = null;
let twoFlipped = false;
//count score
let score = 0;
//time game
let timerInterval;
let elapsedTime;
//username
let username;

//username dialog button
startButton.addEventListener("click", closeDialog);
//game buttons
playButton.addEventListener("click", startGame);
resetButton.addEventListener('click', resetGame);

/**function for checking if username is correct and notifying
 *  user of errors or if no errors hiding username dialog*/
function closeDialog() {
  if (userNameForm.firstElementChild.tagName != "H5") {
    h5Element.remove();
  }
  if (usernameElement.value != "" && usernameElement.value.length < 10) {
    dialog.style.display = "none";
    username = usernameElement.value;

  } else if (usernameElement.value === "") {
    h5Element.textContent = "Username Must Be Entered";
    h5Element.style.color = "red";
    userNameForm.insertBefore(h5Element, userNameForm.firstChild);

  } else if (usernameElement.value.length > 10) {
    h5Element.textContent = "Username Must Be Less Than 10 Characters";
    h5Element.style.color = "red";
    userNameForm.insertBefore(h5Element, userNameForm.firstChild);
  }
}

/**function that adds event listener to all cards and calls the shuffle function and start timer function*/
function startGame() {
  shuffle();
  startTimer();
  playButton.removeEventListener("click", startGame);
  cards.forEach(function (card) {
    card.addEventListener("click", cardFlip);
  });
}

/**function to reload page*/
function resetGame() {
  location.reload();
}

/**function to flip card that has been clicked*/
function cardFlip() {
  const cardFront = this.querySelector(".front");
  const cardBack = this.querySelector(".back");
  if (!twoFlipped) {
    if (cardFront.style.display === "none" || cardFront.style.display === "") {
      cardFront.style.display = "flex";
      cardBack.style.display = "none";
    }
    checkMatch(this, cardBack, cardFront);
  }
}

/**function to check if second card turned over matches the first one */
function checkMatch(card, cardBack, cardFront) {
  if (firstCard != null) {
    twoFlipped = true;
    let firstCardData = firstCard.dataset.image;
    if (firstCardData === card.dataset.image) {
      twoFlipped = false;
      addScore();
      card.removeEventListener("click", cardFlip);
      firstCard = null;
      firstCardData = null;
    } else {
      setTimeout(() => {
        cardFront.style.display = "none";
        cardBack.style.display = "flex";
        firstCard.addEventListener("click", cardFlip);
        firstCard.children[0].style.display = "none";
        firstCard.children[1].style.display = "flex";
        firstCard = null;
        firstCardData = null;
        twoFlipped = false;
      }, 1000);
    }
  } else {
    firstCard = card; //stores the first card click
    firstCard.removeEventListener("click", cardFlip);
  }
}

/**function to start the timer*/
function startTimer() {
  elapsedTime = 45;
  timerInterval = setInterval(() => {
    elapsedTime--;
    timer.innerHTML = `Time: ${elapsedTime}`;
    if (elapsedTime === 0) {
      clearInterval(timerInterval);
      gameOver();
    }
  }, 1000);
}

/**function to shuffle cards*/
function shuffle() {
  for (let card of cards) {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  }
}

/**game play score counter*/
function addScore() {
  score += 10;
  scoreElement.innerHTML = `${username}'s Score: ${score}`;
  if (score === 60) {
    clearInterval(timerInterval);
    gameOver();
  }
}

/**game over dialog and message*/
function gameOver() {
  cards.forEach(function (card) {
    card.removeEventListener("click", cardFlip);
  });
  dialog.style.display = "flex";
  userNameForm.style.display = "none";
  gameOverScreen.classList.remove("hide");
  gameOverScreen.classList.add("flex-column");
  const gameOverPElement = gameOverScreen.querySelector("p");
  if (score < 60 || elapsedTime === 0) {
    gameOverPElement.textContent = "Better Luck Next Time";
  } else {
    gameOverPElement.textContent = `Well done ${username} Your score was ${score}`;
  }

  setTimeout(() => {
    resetGame();
  }, 4000);

}

