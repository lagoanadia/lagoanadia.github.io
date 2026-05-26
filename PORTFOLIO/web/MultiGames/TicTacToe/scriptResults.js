let scoreXEl = document.getElementById("scoreX");
let scoreOEl = document.getElementById("scoreO");
let scoreDrawEl = document.getElementById("scoreDraw");

scoreXEl.textContent = localStorage.getItem("scoreX");
scoreOEl.textContent = localStorage.getItem("scoreO");
scoreDrawEl.textContent = localStorage.getItem("scoreDraw");

window.addEventListener('load', () => {
  confetti();
});