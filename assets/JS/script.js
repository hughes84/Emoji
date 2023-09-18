/*for start game button on username dialog*/
const startButton = document.getElementById("start");
/*for play game button on game page*/
const playButton = document.getElementById("playBtn");
/*for reset button to return to username dialog*/
const resetButton = document.getElementById("resetButton");
/*for username text content*/
const dialog = document.getElementById("usernameDialog");
const usernameElement = document.getElementById("username");
const userNameForm = document.getElementById("form");
/*for playing cards*/
const cards = document.querySelectorAll(".card");
/*for score and timer*/
const scoreDiv = document.getElementById("score");
const timer = document.getElementById("timer");
/*for game over screen*/
const gameOverScreen = document.getElementById("game-over-screen");
/*for error*/
const h5Element = document.createElement("h5");


/*manage card flip*/
let firstCard = null;
let twoFlipped = false;
/*count score*/
let score = 0;
/*time game*/
let timerInterval;
let elapsedTime;
/*username*/
let username;

/*game buttons*/
playButton.addEventListener("click", startGame);
startButton.addEventListener("click", closeDialog);
resetButton.addEventListener('click', resetGame);

/*username dialog function*/
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

/*game works functions*/
function startGame() {
  shuffle();
  startTimer();
  playButton.removeEventListener("click", startGame);
  cards.forEach(function (card) {
    card.addEventListener("click", cardFlip);
  });
}

/*bring user back to username dialog*/
function resetGame() {
  location.reload();
}

/*game play card flip*/
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

/*game play card matching */
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
    firstCard = card;
    firstCard.removeEventListener("click", cardFlip);
  }
}

/*game play timer*/
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

/*game play shuffle cards*/
function shuffle() {
  for (let card of cards) {
    let ramdomPos = Math.floor(Math.random() * 12);
    card.style.order = ramdomPos;
  }
}

/*game play score counter*/
function addScore() {
  score += 10;
  scoreDiv.innerHTML = `${username}'s Score: ${score}`;
  if (score === 60) {
    clearInterval(timerInterval);
    gameOver();
  }
}

/*game over screen and message*/
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

