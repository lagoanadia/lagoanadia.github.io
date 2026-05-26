let container = document.querySelector(".postsContainer");
let uploadButton = document.querySelector(".upload");
let textarea = document.querySelector(".write");
let myUsername = prompt("Enter your username");

let textParts1 = [
    "Excited to share that",
    "Proud to announce that",
    "Happy to report that",
    "Thrilled to mention that",
    "Grateful to note that"
];

let textParts2 = [
    "our garden is thriving this season.",
    "the new plant batch has arrived successfully.",
    "community engagement has never been stronger.",
    "we reached a new milestone in sustainable growth.",
    "the composting initiative is showing great results."
];

let firstNames = ["Alex", "Jordan", "Morgan", "Taylor", "Casey", "Riley", "Jamie", "Avery"];
let lastNames = ["Green", "Bloom", "Rivers", "Forrest", "Stone", "Fields", "Meadows", "Woods"];
let years = ["2018", "2019", "2020", "2021", "2022", "2023", "2024"];

let photos = [
    "images/1.jpg", "images/2.jpg", "images/3.jpg", "images/4.jpg", "images/5.jpg",
    "images/6.jpg", "images/7.jpg", "images/8.jpg", "images/9.jpg", "images/10.jpg",
    "images/11.jpg", "images/12.jpg"
];

function randomItem(array) 
{
    return array[Math.floor(Math.random() * array.length)];
}

function generateUsername() 
{
    return randomItem(firstNames) + randomItem(lastNames) + randomItem(years);
}

function generateText() 
{
    return randomItem(textParts1) + " " + randomItem(textParts2);
}

function createPosts(text, isOwn) 
{
    // Create the individual post container
    let post = document.createElement("div");
    post.classList.add("post");
    if (isOwn) post.classList.add("myPost");

    // Create the profile section
    let profile = document.createElement("div");
    profile.classList.add("profile");
    post.appendChild(profile);

    // Create and add the username
    let user = document.createElement("div");
    user.classList.add("user");
    user.textContent = isOwn ? myUsername : generateUsername();
    profile.appendChild(user);

    // Create and add the profile picture
    let profilePic = document.createElement("img");
    profilePic.classList.add("profilePic");
    profilePic.src = isOwn ? "images/11.jpg" : randomItem(photos);
    profile.appendChild(profilePic);

    // Create and add the post content
    let content = document.createElement("div");
    content.classList.add("content");
    content.textContent = text || generateText();
    post.appendChild(content);

    // Create the like button
    let likeButton = document.createElement("button");
    likeButton.classList.add("like");
    likeButton.textContent = "❤︎";
    post.appendChild(likeButton);

    // Create the like counter
    let numLikes = 0;
    let counter = document.createElement("div");
    counter.textContent = numLikes;
    post.appendChild(counter);

    // Every 10 seconds, randomly increase the like count
    setInterval(function generateLikes() {
        numLikes += Math.floor(Math.random() * 5) + 1;
        counter.textContent = numLikes;
    }, 10000);

    // Toggle like on click: add or remove one like and update the button color
    let liked = false;
    likeButton.addEventListener("click", function () {
        if (liked) {
            numLikes--;
            likeButton.style.color = "rgb(176, 103, 175)";
            liked = false;
        } else {
            numLikes++;
            likeButton.style.color = "magenta";
            liked = true;
        }
        counter.textContent = numLikes;
    });

    // Add the completed post to the top of the posts container
    container.prepend(post);
}

// Upload button: validate input and create a personal post
uploadButton.addEventListener("click", function () 
{
    if (textarea.value === "") {
        alert("Please write something before posting!");
    } else {
        createPosts(textarea.value, true); // isOwn = true marks this as your post
        textarea.value = "";
    }
});

// Automatically generate a new community post every 4 seconds
setInterval(createPosts, 4000);