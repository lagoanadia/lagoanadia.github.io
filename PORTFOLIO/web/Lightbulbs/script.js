let cell = document.querySelectorAll(".cell");

for(let i=0; i< cell.length; i++)
{

    cell[i].addEventListener("click",()=>{
        cell[i].classList.toggle("unactive");
        console.log("hi");
    });
}