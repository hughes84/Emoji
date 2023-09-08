const startButton = document.getElementById("start");
const dialog = document.getElementById("usernameDialog");
const username = document.getElementById("username");
const cardBack = document.querySelectorAll(".back")

cardBack.forEach(function(button){
    button.addEventListener("click", function(){
        
    })
})


  dialog.showModal();
  

// Form start button closes the dialog box
startButton.addEventListener("click", () => {
    localStorage.setItem("username" , username.value);
  dialog.style.display="none"
  console.log(localStorage.getItem("username"))
});

