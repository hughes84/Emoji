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