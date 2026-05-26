const observer = new IntersectionObserver(function(entries) {
  entries.forEach(function(entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible')
    }
  })
}, { threshold: 0.1 })
document.querySelectorAll('.reveal').forEach((el)=>{
    observer.observe(el)
})

fetch('projects.json')
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    data.forEach(function(project, index) {

      // create the main div
      const div = document.createElement('div')
      div.classList.add('works')

      // build the number
      const num = String(index + 1).padStart(2, '0')

      // build the tags HTML by looping through the tags array
      const tagsHTML = project.tags.map(function(tag) {
        return `<span class="tag">${tag}</span>`
      }).join('')

      // put it all together
      div.innerHTML = `
        <span class="project-num">${num}</span>
        <div class="project-info">
          <a href="${project.url}" target="_blank" class="project-title">${project.title}</a>
          <p class="project-desc">${project.description}</p>
          <div class="project-tags">${tagsHTML}</div>
        </div>
      `

      document.querySelector('.work-body').appendChild(div)
    })
  })
