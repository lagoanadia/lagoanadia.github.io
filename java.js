// scroll reveal (same as main site)
const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, { threshold: 0.1 })
document.querySelectorAll('.reveal').forEach(function(el) {
  observer.observe(el)
})

// project data
const projects = [
  {
    title: "Calculator",
    subtitle: "Java",
    description: "A calculator built in Java. My first structured OOP program — handling operations, edge cases, and building logic from scratch without shortcuts.",
    tags: ["Java", "OOP"],
    url: "https://github.com/lagoanadia",
    images: ["img/calc1.png", "img/calc2.png", "img/calc3.png"]
  },
  {
    title: "TicTacToe",
    subtitle: "Java",
    description: "Classic game built from scratch in Java. Covers win detection, turn management, and game state — all the logic you'd rather not debug at midnight.",
    tags: ["Java", "OOP"],
    url: "https://github.com/lagoanadia/TicTacToe_JS",
    images: ["img/tictactoe1.png", "img/tictactoe2.png", "img/tictactoe3.png"]
  }
]

let currentSlide = 0

function renderProject(index) {
  const p = projects[index]

  // build selector active state
  document.querySelectorAll('.selector-btn').forEach(function(btn, i) {
    btn.classList.toggle('active', i === index)
  })

  // build slideshow
  currentSlide = 0
  const slideshow = document.getElementById('slideshow')
  slideshow.innerHTML = p.images.map(function(src, i) {
    return `
      <div class="slide ${i === 0 ? 'active' : ''}">
        <img src="${src}" alt="${p.title} screenshot ${i + 1}">
      </div>
    `
  }).join('') + `
    <div class="slide-controls">
      <button class="slide-btn" onclick="prevSlide()">← Prev</button>
      <span class="slide-counter" id="counter">1 / ${p.images.length}</span>
      <button class="slide-btn" onclick="nextSlide()">Next →</button>
    </div>
  `

  // build detail
  const tagsHTML = p.tags.map(function(tag) {
    return `<span class="tag">${tag}</span>`
  }).join('')

  document.getElementById('detail').innerHTML = `
    <div class="exp-date">Java Project</div>
    <h2>${p.title} <em>/</em><br>${p.subtitle}</h2>
    <p>${p.description}</p>
    <div class="project-tags">${tagsHTML}</div>
    <a href="${p.url}" target="_blank" class="github-link">View on GitHub ↗</a>
  `
}

function goToSlide(n) {
  const slides = document.querySelectorAll('.slide')
  slides[currentSlide].classList.remove('active')
  currentSlide = (n + slides.length) % slides.length
  slides[currentSlide].classList.add('active')
  document.getElementById('counter').textContent = `${currentSlide + 1} / ${slides.length}`
}

function prevSlide() { goToSlide(currentSlide - 1) }
function nextSlide() { goToSlide(currentSlide + 1) }

// build selector buttons
const selector = document.getElementById('selector')
projects.forEach(function(p, i) {
  const btn = document.createElement('button')
  btn.classList.add('selector-btn')
  btn.textContent = p.title
  btn.addEventListener('click', function() { renderProject(i) })
  selector.appendChild(btn)
})

// render first project on load
renderProject(0)