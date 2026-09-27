// ============================================
// SCROLL REVEAL (staggered, respects reduced motion)
// ============================================
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const revealObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll('.reveal, .grid-line').forEach(function(el, i) {
  if (!reduceMotion && !el.style.transitionDelay) {
    const siblings = Array.from(el.parentElement.children).filter(function(c) { return c.classList.contains('reveal') })
    const idx = siblings.indexOf(el)
    if (idx > 0) el.style.transitionDelay = (idx * 60) + 'ms'
  }
  revealObserver.observe(el)
})

// fallback: force-check anything already on-screen in case the observer's
// first callback races font swap / layout and never fires
function revealOnScreenNow() {
  document.querySelectorAll('.reveal, .grid-line').forEach(function(el) {
    if (el.classList.contains('visible')) return
    const r = el.getBoundingClientRect()
    if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible')
  })
}
window.addEventListener('load', revealOnScreenNow)
if (document.fonts && document.fonts.ready) document.fonts.ready.then(revealOnScreenNow)
setTimeout(revealOnScreenNow, 400)

// ============================================
// ACTIVE NAV LINK (sidebar + mobile menu)
// ============================================
const navLinks = document.querySelectorAll('[data-nav]')
const sections = ['hero', 'work', 'skills', 'experience', 'contact']
  .map(function(id) { return document.getElementById(id) })
  .filter(Boolean)

const navObserver = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      const id = entry.target.id
      navLinks.forEach(function(link) {
        link.classList.toggle('active', link.getAttribute('href') === '#' + id)
      })
    }
  })
}, { rootMargin: '-40% 0px -50% 0px' })

sections.forEach(function(s) { navObserver.observe(s) })

// ============================================
// MOBILE MENU
// ============================================
const mobileMenu = document.getElementById('mobileMenu')
const mobileMenuBtn = document.getElementById('mobileMenuBtn')
const mobileMenuClose = document.getElementById('mobileMenuClose')

function openMobileMenu() {
  mobileMenu.classList.add('open')
  mobileMenuBtn.setAttribute('aria-expanded', 'true')
  document.body.style.overflow = 'hidden'
}
function closeMobileMenu() {
  mobileMenu.classList.remove('open')
  mobileMenuBtn.setAttribute('aria-expanded', 'false')
  document.body.style.overflow = ''
}
if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileMenu)
if (mobileMenuClose) mobileMenuClose.addEventListener('click', closeMobileMenu)
mobileMenu.querySelectorAll('a').forEach(function(a) { a.addEventListener('click', closeMobileMenu) })

// ============================================
// PROJECTS — fetched from projects.json, rendered into .work-body
// ============================================
const cardBackgrounds = [
  'var(--card-orange)',
  'var(--card-red)',
  'var(--card-blue)',
  'var(--card-yellow)',
  'var(--card-blush)',
  'var(--card-green)',
  'linear-gradient(155deg, var(--card-orange), var(--card-red))',
  'linear-gradient(155deg, var(--card-blue), var(--card-blush))',
  'linear-gradient(155deg, var(--card-red), var(--card-orange))',
  'linear-gradient(155deg, var(--card-green), var(--card-blue))'
]

fetch('projects.json')
  .then(function(response) { return response.json() })
  .then(function(data) {
    const workBody = document.querySelector('.work-body')
    data.forEach(function(project, index) {
      const div = document.createElement('div')
      div.classList.add('works')
      div.style.background = cardBackgrounds[index % cardBackgrounds.length]

      const num = String(index + 1).padStart(2, '0')
      const tagsHTML = project.tags.map(function(tag) {
        return `<span class="tag">${tag}</span>`
      }).join('')

      div.innerHTML = `
        <span class="project-num">${num}</span>
        <div class="project-info">
          <a href="${project.url}" target="_blank" class="project-title">${project.title}</a>
          <p class="project-desc">${project.description}</p>
          <div class="project-tags">${tagsHTML}</div>
        </div>
      `
      workBody.appendChild(div)
      initCardHover(div)
    })
    initCarouselCenter()
  })

// hover: tilt the card toward the mouse and move the light with it
function initCardHover(card) {
  const link = card.querySelector('.project-title')

  card.addEventListener('mousemove', function(e) {
    if (reduceMotion) return
    const rect = card.getBoundingClientRect()
    // position of the mouse inside the card, from 0 to 1
    const x = (e.clientX - rect.left) / rect.width
    const y = (e.clientY - rect.top) / rect.height
    card.style.setProperty('--mx', (x * 100) + '%')
    card.style.setProperty('--my', (y * 100) + '%')
    // max 8 degrees of tilt; centre of the card = no tilt
    card.style.setProperty('--ry', ((x - 0.5) * 8) + 'deg')
    card.style.setProperty('--rx', ((0.5 - y) * 8) + 'deg')
  })

  card.addEventListener('mouseleave', function() {
    card.style.setProperty('--rx', '0deg')
    card.style.setProperty('--ry', '0deg')
  })

  // the whole card opens the project, not only the title
  card.addEventListener('click', function(e) {
    if (e.target.closest('a')) return
    window.open(link.href, '_blank', 'noopener')
  })
}

// centre-card scaling for the work carousel
function initCarouselCenter() {
  const track = document.querySelector('.work-body')
  const cards = document.querySelectorAll('.works')
  if (!track || !cards.length) return

  function updateCenter() {
    const trackRect = track.getBoundingClientRect()
    const center = trackRect.left + trackRect.width / 2
    let closest = null
    let closestDist = Infinity
    cards.forEach(function(card) {
      const rect = card.getBoundingClientRect()
      const cardCenter = rect.left + rect.width / 2
      const dist = Math.abs(cardCenter - center)
      if (dist < closestDist) { closestDist = dist; closest = card }
    })
    cards.forEach(function(card) { card.classList.toggle('is-center', card === closest) })
  }

  let ticking = false
  track.addEventListener('scroll', function() {
    if (!ticking) {
      requestAnimationFrame(function() { updateCenter(); ticking = false })
      ticking = true
    }
  })
  window.addEventListener('resize', updateCenter)
  updateCenter()
}

// ============================================
// EMAIL PANEL — fixes the "Send an email" mailto-only bug
// ============================================
const emailBackdrop = document.getElementById('emailBackdrop')
const emailClose = document.getElementById('emailClose')
const copyEmailBtn = document.getElementById('copyEmailBtn')
let lastFocused = null

function openEmailPanel(e) {
  if (e) e.preventDefault()
  lastFocused = document.activeElement
  emailBackdrop.classList.add('open')
  emailClose.focus()
}
function closeEmailPanel() {
  emailBackdrop.classList.remove('open')
  if (lastFocused) lastFocused.focus()
}

document.querySelectorAll('.email-trigger').forEach(function(el) {
  el.addEventListener('click', openEmailPanel)
})
emailClose.addEventListener('click', closeEmailPanel)
emailBackdrop.addEventListener('click', function(e) {
  if (e.target === emailBackdrop) closeEmailPanel()
})
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && emailBackdrop.classList.contains('open')) closeEmailPanel()
})

if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', function() {
    const email = 'lagoanadia@gmail.com'
    const done = function() {
      copyEmailBtn.classList.add('just-copied')
      setTimeout(function() { copyEmailBtn.classList.remove('just-copied') }, 1800)
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(email).then(done).catch(function() {
        fallbackCopy(email); done()
      })
    } else {
      fallbackCopy(email); done()
    }
  })
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  try { document.execCommand('copy') } catch (e) {}
  document.body.removeChild(ta)
}
