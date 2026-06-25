const bookCover = document.getElementById('bookCover')
const bookPages = document.getElementById('bookPages')
const bookLeftPage = document.getElementById('bookLeftPage')
const bookRightPage = document.getElementById('bookRightPage')
const turnPage = document.getElementById('turnPage')
const bookPrev = document.getElementById('bookPrev')
const bookNext = document.getElementById('bookNext')

const innerPages = 42
const spreadSteps = Math.ceil(innerPages / 2)
const totalSteps = spreadSteps + 1

let currentBookStep = 0
let isBookAnimating = false

function getBookPageSrc(pageNumber) {
  return `images/book-spread${pageNumber}.png`
}

function renderBook() {
  if (!bookCover || !bookPages || !bookLeftPage || !bookRightPage) return

  if (currentBookStep === 0) {
    bookCover.src = 'images/book-cover-front.png'
    bookCover.classList.add('active')
    bookPages.classList.remove('active')
  } else if (currentBookStep === totalSteps) {
    bookCover.src = 'images/book-cover-back.png'
    bookCover.classList.add('active')
    bookPages.classList.remove('active')
  } else {
    const leftPage = currentBookStep * 2 - 1
    const rightPage = currentBookStep * 2

    bookCover.classList.remove('active')
    bookPages.classList.add('active')

    bookLeftPage.src = getBookPageSrc(leftPage)

    if (rightPage <= innerPages) {
      bookRightPage.src = getBookPageSrc(rightPage)
      bookRightPage.style.display = 'block'
    } else {
      bookRightPage.style.display = 'none'
    }
  }

  bookPrev.disabled = currentBookStep === 0 || isBookAnimating
  bookNext.disabled = currentBookStep === totalSteps || isBookAnimating
}

function nextBookPage() {
  if (isBookAnimating || currentBookStep >= totalSteps) return

  if (currentBookStep === 0) {
    currentBookStep++
    renderBook()
    return
  }

  if (currentBookStep === totalSteps - 1) {
    currentBookStep++
    renderBook()
    return
  }

  isBookAnimating = true
  renderBook()

  const oldRightPage = currentBookStep * 2
  turnPage.src = getBookPageSrc(oldRightPage)
  turnPage.className = 'turnPage turnNext'

  setTimeout(() => {
    currentBookStep++
    turnPage.className = 'turnPage'
    isBookAnimating = false
    renderBook()
  }, 900)
}

function prevBookPage() {
  if (isBookAnimating || currentBookStep <= 0) return

  if (currentBookStep === 1) {
    currentBookStep--
    renderBook()
    return
  }

  if (currentBookStep === totalSteps) {
    currentBookStep--
    renderBook()
    return
  }

  isBookAnimating = true
  renderBook()

  const oldLeftPage = currentBookStep * 2 - 1
  turnPage.src = getBookPageSrc(oldLeftPage)
  turnPage.className = 'turnPage turnPrev'

  setTimeout(() => {
    currentBookStep--
    turnPage.className = 'turnPage'
    isBookAnimating = false
    renderBook()
  }, 900)
}

if (bookPrev && bookNext) {
  bookPrev.addEventListener('click', prevBookPage)
  bookNext.addEventListener('click', nextBookPage)
  renderBook()
}

const agencyWrap = document.querySelector('.aboutAgencyWrap')
const agencyLeft = document.querySelector('.agencyCardLeft')
const agencyRight = document.querySelector('.agencyCardRight')

function moveAgencyCards() {
  if (!agencyWrap || !agencyLeft || !agencyRight) return

  const rect = agencyWrap.getBoundingClientRect()
  const maxScroll = agencyWrap.offsetHeight - window.innerHeight
  const currentScroll = Math.min(Math.max(-rect.top, 0), maxScroll)
  const progress = maxScroll > 0 ? currentScroll / maxScroll : 0

  const leftX = -progress * 12
  const rightX = progress * 12
  const leftRotate = -progress * 14
  const rightRotate = progress * 14

  agencyLeft.style.transform = `
    translateX(${leftX}vw)
    rotate(${leftRotate}deg)
  `

  agencyRight.style.transform = `
    translateX(${rightX}vw)
    rotate(${rightRotate}deg)
  `
}

if (window.innerWidth > 767) {
  window.addEventListener('scroll', moveAgencyCards)
  window.addEventListener('resize', moveAgencyCards)
  moveAgencyCards()
}

window.addEventListener('scroll', moveAgencyCards)
window.addEventListener('resize', moveAgencyCards)
moveAgencyCards()

const aboutSearchWrap = document.querySelector('.aboutSearchWrap')
const aboutSearchTrack = document.getElementById('aboutSearchTrack')
const aboutSearchCards = document.querySelectorAll('.aboutSearchCard')

function moveAboutSearchCards() {
  if (!aboutSearchWrap || !aboutSearchTrack) return

  const rect = aboutSearchWrap.getBoundingClientRect()
  const maxScroll = aboutSearchWrap.offsetHeight - window.innerHeight
  const currentScroll = Math.min(Math.max(-rect.top, 0), maxScroll)
  const progress = maxScroll > 0 ? currentScroll / maxScroll : 0

  const moveX = progress * -42
  aboutSearchTrack.style.transform = `translateX(${moveX}vw)`

  const moveY = progress * 2.5
  aboutSearchCards.forEach((card, index) => {
    if (index % 2 === 0) {
      card.style.transform = `translateY(${moveY}vw)`
    } else {
      card.style.transform = `translateY(-${moveY}vw)`
    }
  })
}

if (window.innerWidth > 767) {
  window.addEventListener('scroll', moveAboutSearchCards)
  window.addEventListener('resize', moveAboutSearchCards)
  moveAboutSearchCards()
}

const agentsWrap = document.querySelector('.aboutAgentsWrap')
const agent1 = document.querySelector('.agent1')
const agent2 = document.querySelector('.agent2')
const agent3 = document.querySelector('.agent3')
const agent4 = document.querySelector('.agent4')

function moveAgentsCards() {
  if (!agentsWrap || !agent1 || !agent2 || !agent3 || !agent4) return

  const rect = agentsWrap.getBoundingClientRect()
  const maxScroll = agentsWrap.offsetHeight - window.innerHeight
  const currentScroll = Math.min(Math.max(-rect.top, 0), maxScroll)
  const progress = maxScroll > 0 ? currentScroll / maxScroll : 0

  agent1.style.transform = `
    translateX(calc(-50% - ${progress * 24}vw))
    translateY(${progress * 1.5}vw)
    rotate(${-progress * 7}deg)
  `

  agent2.style.transform = `
    translateX(calc(-50% - ${progress * 8}vw))
    translateY(${-progress * 1}vw)
    rotate(${-progress * 2}deg)
  `

  agent3.style.transform = `
    translateX(calc(-50% + ${progress * 8}vw))
    translateY(${progress * 1}vw)
    rotate(${progress * 2}deg)
  `

  agent4.style.transform = `
    translateX(calc(-50% + ${progress * 24}vw))
    translateY(${progress * 1.5}vw)
    rotate(${progress * 7}deg)
  `
}

window.addEventListener('scroll', moveAgentsCards)
window.addEventListener('resize', moveAgentsCards)
moveAgentsCards()
