let textarea = document.getElementById("textarea");
let start = document.getElementById("start");

start.addEventListener("click", (e)=>{
   
    if(textarea.value=="")
    {
        e.preventDefault();
        alert("Write your name!");
    }
    else
    {
        localStorage.setItem("playerName", textarea.value);
        console.log(localStorage.getItem("playerName"));
    }
});