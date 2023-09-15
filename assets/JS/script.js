const startButton = document.getElementById("start");
startButton.addEventListener("click" , closeDialog);
const dialog = document.getElementById("usernameDialog");
const username = document.getElementById("username");
const cards = document.querySelectorAll(".card"); // Changed 'card' to 'cards' for clarity
const scoreDiv = document.getElementById("score");
const userNameForm = document.getElementById("form");
const scoreTimerDiv = document.getElementById("score_timer");
const gameOverScreen = document.getElementById("game-over-screen")

const playButton = document.getElementById("playBtn")
playButton.addEventListener("click" , startGame)

const resetButton = document.getElementById('resetButton');
const timer = document.getElementById("timer")
const controls = document.getElementById("controls")

    resetButton.addEventListener('click', resetTimer);

let firstCard = null;
let score= 0;


function closeDialog() {
  if(username.value !="" && username.value.length <10){
    dialog.style.display = "none";
    
  }else if(userNameForm.firstElementChild.tagName != "H5"){
    const h5Element = document.createElement("h5");
    h5Element.textContent = "Error: Username Must Be Entered\n Must be Under 10 Characters"
    h5Element.style.color = "white"
    userNameForm.insertBefore(h5Element,userNameForm.firstChild)

  }else {
    userNameForm.firstChild.style.backgroundColor = "white"
    userNameForm.firstChild.style.color = "red"
    
  }
  
  
}

function startGame(){
  shuffle()
  startTimer()
  scoreTimerDiv.classList.add("flex-column")
  controls.style.display = "none"
  cards.forEach(function (card) {
    card.addEventListener("click", cardFlip)
  });
}

function resetGame(){
  location.reload()
}

let twoFlipped = false

function cardFlip() {
  const cardFront = this.querySelector(".front");
  const cardBack = this.querySelector(".back");
    if(!twoFlipped){
      if (cardFront.style.display === "none" || cardFront.style.display === "") {
        cardFront.style.display = "flex";
        cardBack.style.display = "none"; // Show the back when
      }
      checkMatch(this,cardBack,cardFront)
    }
    
    
  }
function checkMatch(card,cardBack,cardFront){
    if(firstCard != null){//if its not the first card to turn over
      twoFlipped = true
      let firstCardData = firstCard.dataset.image;
      if(firstCardData === card.dataset.image){//if cards match
        twoFlipped = false
          addScore()
          card.removeEventListener("click", cardFlip)
          firstCard =null
          firstCardData = null
      }else{//if cards dont match
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
    }else{//if it is the first card to turn over
      firstCard = card
      firstCard.removeEventListener("click",cardFlip)
    }
  }


    let timerInterval;
    let startTime;
    let running = false;


function startTimer() {
  elapsedTime = 45
  timerInterval = setInterval(()=>{
    elapsedTime--
    timer.innerHTML = `Time: ${elapsedTime}`
    if (elapsedTime === 0){
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
  scoreDiv.innerHTML = `Score: ${score}` 
  if (score === 60){
    clearInterval(timerInterval)
    gameOver()
  }
}

function gameOver(){
  cards.forEach(function (card) {
    card.removeEventListener("click", cardFlip)
  });
  dialog.style.display = "flex"
  userNameForm.style.display = "none"
  gameOverScreen.classList.remove("hide")
  gameOverScreen.classList.add("show")
  setTimeout(()=>{
    resetGame()
  },4000)
  
}

