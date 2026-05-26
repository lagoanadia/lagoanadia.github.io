let buttons = document.querySelectorAll("button");
let toReveal = document.getElementById("toReveal");
let playerContainer = document.getElementById("playerContainer");
let quit = document.getElementById("quit");

playerContainer.textContent = localStorage.getItem("playerName")+":"; //create manually to display player's name received by input 
let wins = document.createElement("div");
wins.className = "amount";
wins.id = "wins";

playerContainer.appendChild(wins);
let draws = document.getElementById("draws");
let losses = document.getElementById("losses");

let cWins = 0;
let cDraws = 0;
let cLosses = 0;

wins.textContent = cWins;
draws.textContent = cDraws;
losses.textContent = cLosses;


//aligning the choices with the corresponding image
let options = ["rock","paper","scissors"];
let img = ["images/rock.jpg", "images/paper.jpg", "images/scissors.jpg"];


// addEventListener Syntax = element.addEventListener(event, function, useCapture);
// the eventListener saves the targeted event's id under event.
for(let i=0; i < buttons.length; i++)
{
   buttons[i].addEventListener("click",reveal); 
}


//generate a random choice 
function reveal(event)
{
   // disable all buttons to process each round 
   buttons.forEach(button => 
   {
      button.disabled = true;
   });

   toReveal.src = img[Math.floor(Math.random()*img.length)];
   choices(event);

   // enable again after 1 second
   setTimeout(() => {

      buttons.forEach(button =>
      {
         button.disabled = false;
         toReveal.src = "images/toreveal.jpg";
      });

   }, 1000);
}


//establish what each player chose
let computerChoice="";
function choices(event)
{
   let playerChoice = event.currentTarget.id;

   for(let i=0; i<img.length;i++)
   {
      //find out what the computer chose by looking for one of the keywords. 
      if(toReveal.src.includes(img[i]))
      {
         computerChoice = options[i];
      }
   }
   console.log(playerChoice);
   console.log(computerChoice); 
   console.log("////////////////");

   check(playerChoice, computerChoice);
}

// light up the winner's counter after each turn
function check(playerChoice, computerChoice) 
{
 
   if (playerChoice === computerChoice) {
      cDraws++;
      wins.classList.remove("lightPlayer");
      losses.classList.remove("lightComputer");
   } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
   ) {
      cWins++;
      wins.classList.add("lightPlayer");
      losses.classList.remove("lightComputer");
   } else {
      cLosses++;
      losses.classList.add("lightComputer");
      wins.classList.remove("lightPlayer");
   }
   //update interface
   wins.textContent = cWins;
   draws.textContent = cDraws;
   losses.textContent = cLosses;
}

//log winner and its points when quit is clicked
quit.addEventListener("click",()=>{
   if(cWins > cLosses)
   {
      localStorage.setItem("winner",cWins);
      localStorage.setItem("winnerName",localStorage.getItem("playerName"));
   }
   else if(cWins < cLosses)
   {
      localStorage.setItem("winner",cLosses);
      localStorage.setItem("winnerName","Computer");
   }
   else if(cWins === cLosses)
   {
      localStorage.setItem("winner",cDraws);
      localStorage.setItem("winnerName","Draw!");
   }
   
});