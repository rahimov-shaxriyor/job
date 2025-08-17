import { getData } from "./getData.js"

const themeBtn = document.querySelector(".theme-controller")
const moon = themeBtn.querySelector(".fa-moon")
const sun = themeBtn.querySelector(".fa-sun")
const jobsList = document.querySelector('.jobs-list')

if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark-mode")
  moon.style.display = "none"
  sun.style.display = "inline-block"
} else {
  moon.style.display = "inline-block"
  sun.style.display = "none"
}

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode")

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("theme", "dark")
    moon.style.display = "none"
    sun.style.display = "flex"
  } else {
    localStorage.setItem("theme", "light")
    moon.style.display = "flex"
    sun.style.display = "none"
  }
})

const updateUI = (arr) => {
  jobsList.innerHTML = ''
  arr.forEach(worker => {
    const li = document.createElement('li')
    li.classList.add('li-style')
    
    // left-part
    const div_left = document.createElement('div')
    div_left.classList.add('div-left')
    const div_left_content = document.createElement('div')
    div_left_content.classList.add('div-left-content')
    const div_left_img = document.createElement('div')
    const img = document.createElement('img')
    img.src = worker.image
    div_left_img.append(img)

    const section1 = document.createElement('section')
    section1.classList.add('section1')
    const section2 = document.createElement('section')
    const section3 = document.createElement('section')
    
    const compNameP = document.createElement('p')
    compNameP.classList.add('company-name')
    section1.append(compNameP)
    compNameP.textContent = worker.company_name
    if (worker.isNew) {
      const newP = document.createElement('p')
      newP.classList.add('isNew')
      newP.textContent = 'NEW!'
      section1.append(newP)
    }
    if (worker.isFeatured) {
      const featuredP = document.createElement('p')
      featuredP.classList.add('isFeatured')
      featuredP.textContent = 'FEATURED'
      section1.append(featuredP)
      const span = document.createElement('span')
      span.classList.add('green-span')
      li.append(span)
    }

    const titleP = document.createElement('p')
    titleP.classList.add('title')
    titleP.textContent = worker.title
    section2.append(titleP)
    
    const section3content = document.createElement('p')
    section3content.textContent = `${worker.create_time} • ${worker.work_time} • ${worker.work_place}`
    section3.append(section3content)

    div_left_content.append(section1, section2, section3)
    div_left.append(div_left_img, div_left_content)

    // right-part
    const div_right = document.createElement('div')
    div_right.classList.add('div-right')
    if (worker.skills) {
      worker.skills.forEach(skill => {
        const btn = document.createElement('button')
        btn.classList.add('btn')
        btn.textContent = skill
        div_right.append(btn)
      })
    }

    li.append(div_left, div_right)
    jobsList.append(li)
  })
}
let arr = await getData()
updateUI(arr.data)

