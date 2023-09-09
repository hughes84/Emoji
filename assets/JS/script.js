const startButton = document.getElementById("start");
const dialog = document.getElementById("usernameDialog");
const username = document.getElementById("username");
const cards = document.querySelectorAll(".card"); // Changed 'card' to 'cards' for clarity
let firstCard = null;
let score= 0;
cards.forEach(function (card) {
  card.addEventListener("click", cardFlip)
});
function cardFlip() {
  const cardFront = this.querySelector(".front");
  const cardBack = this.querySelector(".back");
    if (cardFront.style.display === "none" || cardFront.style.display === "") {
      cardFront.style.display = "flex";
      cardBack.style.display = "none"; // Show the back when
    }
    checkMatch(this,cardBack,cardFront)
  }
function checkMatch(card,cardBack,cardFront){
    if(firstCard != null){//if its not the first card to turn over
      let firstCardData = firstCard.dataset.image;
      if(firstCardData === card.dataset.image){//if cards match
          console.log(score++)
          card.removeEventListener("click", event)
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
        }, 1000);
      }
    }else{//if it is the first card to turn over
      firstCard = card
      firstCard.removeEventListener("click",cardFlip)
    }
  }
// // Form start button closes the dialog box
// startButton.addEventListener("click", () => {
//     localStorage.setItem("username" , username.value);
//   dialog.style.display="none"
//   console.log(localStorage.getItem("username"))
// });


        let timerInterval;
        let startTime;
        let running = false;

        const timerElement = document.getElementById('timer');
        const startButton2 = document.getElementById('startButton2');
        const stopButton = document.getElementById('stopButton');
        const resetButton = document.getElementById('resetButton');

        startButton2.addEventListener('click', startTimer);
        stopButton.addEventListener('click', stopTimer);
        resetButton.addEventListener('click', resetTimer);

        function startTimer() {
            if (!running) {
                startTime = Date.now() - (startTime || 0);
                timerInterval = setInterval(updateTimer, 1000);
                running = true;
            }
        }

        function stopTimer() {
            if (running) {
                clearInterval(timerInterval);
                running = false;
            }
        }

        function resetTimer() {
            stopTimer();
            startTime = 0;
            updateTimerDisplay(0);
        }

        function updateTimer() {
            const elapsedTime = Date.now() - startTime;
            updateTimerDisplay(elapsedTime);
        }

        function updateTimerDisplay(elapsedTime) {
            const seconds = Math.floor(elapsedTime / 1000);
            timerElement.textContent = seconds + '  seconds';
        }
    
        