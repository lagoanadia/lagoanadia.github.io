let profilePicture = document.querySelector(".profilePicture");
let input = document.querySelector("input");

input.onchange = function()
{
    profilePicture.src = URL.createObjectURL(input.files[0]);
}