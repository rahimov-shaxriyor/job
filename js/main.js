import { getData } from "./getData.js"

// get elements from html
const themeBtn = document.querySelector(".theme-controller")
const jobsList = document.querySelector('.jobs-list')
const filterDiv = document.querySelector('.filter')

// get theme from localstorage
let theme = localStorage.getItem("theme") || ""
if (theme) {
  document.body.classList.add(theme)
  themeBtn.children[0].classList.toggle("hidden")
  themeBtn.children[1].classList.toggle("hidden")
}

// change mode
themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark-mode')
  themeBtn.children[0].classList.toggle("hidden")
  themeBtn.children[1].classList.toggle("hidden")
  
  if (document.body.classList.contains('dark-mode')) {
    localStorage.setItem('theme', 'dark-mode')
  } else {
    localStorage.setItem('theme', '')
  }

})

let skillsArr = []

const getTime = (create_time) => {
  const now = new Date()
  const created = new Date(create_time)
  const ms = now - created

  const days = Math.floor(ms / (1000 * 60 * 60 * 24))
  const weeks = Math.floor(days / 7)
  const months = Math.floor(days / 30)

  if (days === 0) {
    return 'today'
  } else if (days < 7) {
    return days + 'd ago'
  } else if (weeks < 4) {
    return weeks + 'w ago'
  } else {
    return months + 'mo ago'
  }

}

// update UI
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
    section3content.textContent = `${getTime(worker.create_time)} • ${worker.work_time} • ${worker.work_place}`
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

        // filter by skills
        btn.addEventListener('click', async () => {
          if (!skillsArr.includes(skill)) {
            skillsArr.push(btn.textContent)

            filterDiv.style.display = 'flex'
            const skillBtn = document.createElement('button')
            skillBtn.textContent = skillsArr.at(-1)
            skillBtn.classList.add('skillBtn')


            let clearBtn = document.querySelector('.clearBtn')
            if (!clearBtn) {
              clearBtn = document.createElement('button')
              clearBtn.textContent = 'Clear'
              clearBtn.classList.add('clearBtn')
              
              clearBtn.addEventListener('click', async () => {
                filterDiv.style.display = 'none'
                filterDiv.innerHTML = ''
                skillsArr = []
                let arr = await getData()
                updateUI(arr.data)
              })
            }
            
            filterDiv.append(skillBtn, clearBtn)

            const data = await getData()
            const filteredArr = data.data.filter(worker => skillsArr.every(s => worker.skills.includes(s)))
            updateUI(filteredArr)

          }
        })
        
      })
    }

    li.append(div_left, div_right)
    jobsList.append(li)
  })
}

let arr = await getData()
updateUI(arr.data)

