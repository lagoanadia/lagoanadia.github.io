let p1Toggle = document.getElementById("p1Toggle");
let p2Toggle = document.getElementById("p2Toggle");
let start = document.getElementById("start");

function toggleType(button)
{
    if(button.textContent === "Human")
    {
        button.textContent = "AI";
        button.classList.add("active");
    }
    else
    {
        button.textContent = "Human";
        button.classList.remove("active");
    }
}

p1Toggle.addEventListener("click", () => toggleType(p1Toggle));
p2Toggle.addEventListener("click", () => toggleType(p2Toggle));

start.addEventListener("click", (e) => {
    localStorage.setItem("p1Type", p1Toggle.textContent);
    localStorage.setItem("p2Type", p2Toggle.textContent);
});