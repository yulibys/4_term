const wrap = document.querySelector('.screen1Wrap')
const cards = [
  { el: document.querySelector('.rect1'), startTop: 0, angle: -90 },
  { el: document.querySelector('.rect2'), startTop: 11.6, angle: 0 },
  { el: document.querySelector('.rect3'), startTop: 33, angle: 180 },
  { el: document.querySelector('.rect4'), startTop: 45.6, angle: 90 }
].filter((card) => card.el)
function getProgress() {
  if (!wrap) return 0
  const rect = wrap.getBoundingClientRect()
  const maxScroll = wrap.offsetHeight - window.innerHeight
  const scrolled = Math.min(Math.max(-rect.top, 0), maxScroll)
  return maxScroll > 0 ? scrolled / maxScroll : 0
}
function setStartPosition() {
  cards.forEach((card) => {
    card.el.style.top = `${card.startTop}vw`
    card.el.style.transform = 'translateX(-50%)'
    card.el.style.opacity = '1'
    card.el.style.zIndex = '50'
  })
}
function animateCards() {
  if (!wrap || cards.length === 0) return
  const progress = getProgress()
  if (progress <= 0.001) {
    setStartPosition()
    requestAnimationFrame(animateCards)
    return
  }
  const wheelCenter = 27.5
  const radiusY = 14.5
  const radiusZ = 8
  const rotation = progress * 360
  cards.forEach((card) => {
    const angle = card.angle + rotation
    const rad = (angle * Math.PI) / 180
    const y = Math.sin(rad) * radiusY
    const z = Math.cos(rad) * radiusZ
    const top = wheelCenter + y
    const scale = 0.82 + ((z + radiusZ) / (radiusZ * 2)) * 0.22
    card.el.style.top = `${top}vw`
    card.el.style.transform = `
      translateX(-50%)
      translateY(-50%)
      translateZ(${z}vw)
      scale(${scale})
    `
    card.el.style.zIndex = z > 0 ? '150' : '50'
    card.el.style.opacity = '1'
  })
  requestAnimationFrame(animateCards)
}
setStartPosition()
animateCards()
const charactersWrap = document.querySelector('.screen2Content2Wrap')
const downColumns = document.querySelectorAll('.columnDown')
const upColumns = document.querySelectorAll('.columnUp')
function moveCharactersByScroll() {
  if (!charactersWrap) return
  const rect = charactersWrap.getBoundingClientRect()
  const maxScroll = charactersWrap.offsetHeight - window.innerHeight
  const currentScroll = Math.min(Math.max(-rect.top, 0), maxScroll)
  const progress = maxScroll > 0 ? currentScroll / maxScroll : 0
  const move = progress * 5
  downColumns.forEach((column) => {
    column.style.transform = `translate3d(0, ${move}vw, 0)`
  })
  upColumns.forEach((column) => {
    column.style.transform = `translate3d(0, -${move}vw, 0)`
  })
}
window.addEventListener('scroll', moveCharactersByScroll)
window.addEventListener('resize', moveCharactersByScroll)
moveCharactersByScroll()
const screen2Content3Wrap = document.querySelector('.screen2Content3Wrap')
const eventsTrack = document.getElementById('eventsTrack')
const eventDown = document.querySelectorAll('.eventDown')
const eventUp = document.querySelectorAll('.eventUp')
function moveEventsByScroll() {
  if (!screen2Content3Wrap || !eventsTrack) return
  const rect = screen2Content3Wrap.getBoundingClientRect()
  const maxScroll = screen2Content3Wrap.offsetHeight - window.innerHeight
  const currentScroll = Math.min(Math.max(-rect.top, 0), maxScroll)
  const progress = maxScroll > 0 ? currentScroll / maxScroll : 0
  const moveX = progress * -42
  const moveY = progress * 6
  eventsTrack.style.transform = `translateX(${moveX}vw)`
  eventDown.forEach((card) => {
    card.style.transform = `translateY(${moveY}vw)`
  })
  eventUp.forEach((card) => {
    card.style.transform = `translateY(-${moveY}vw)`
  })
}
window.addEventListener('scroll', moveEventsByScroll)
window.addEventListener('resize', moveEventsByScroll)
moveEventsByScroll()
const screen2Content4Wrap = document.querySelector('.screen2Content4Wrap')
const productLeft = document.querySelector('.productCardLeft')
const productRight = document.querySelector('.productCardRight')
const productBig = document.querySelector('.productCardBig')
function moveProductsByScroll() {
  if (!screen2Content4Wrap || !productLeft || !productRight || !productBig) {
    return
  }
  const rect = screen2Content4Wrap.getBoundingClientRect()
  const maxScroll = screen2Content4Wrap.offsetHeight - window.innerHeight
  const currentScroll = Math.min(Math.max(-rect.top, 0), maxScroll)
  const progress = maxScroll > 0 ? currentScroll / maxScroll : 0
  const straightProgress = Math.min(progress / 0.45, 1)
  const rotateProgress = Math.min(Math.max((progress - 0.35) / 0.65, 0), 1)
  const leftX = -50 - straightProgress * 110
  const rightX = -50 + straightProgress * 110
  const leftRotate = -rotateProgress * 13
  const rightRotate = rotateProgress * 13
  productLeft.style.transform = `
    translateX(${leftX}%)
    rotate(${leftRotate}deg)
  `
  productRight.style.transform = `
    translateX(${rightX}%)
    rotate(${rightRotate}deg)
  `
  productBig.style.transform = `
    translateX(-50%)
    scale(${1 - progress * 0.02})
  `
}
window.addEventListener('scroll', moveProductsByScroll)
window.addEventListener('resize', moveProductsByScroll)
moveProductsByScroll()
