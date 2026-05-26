let winnerMsg = document.getElementById("winnerMsg");
if(localStorage.getItem("winnerName") == "Draw!")
{
  winnerMsg.textContent = localStorage.getItem("winnerName");
}
else
{
  winnerMsg.textContent = localStorage.getItem("winnerName")+" wins! Points: "+localStorage.getItem("winner");
}

window.addEventListener('load', () => {
  confetti();
});
