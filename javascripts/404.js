const burgerBtn = document.getElementById('burgerBtn')
const menuPopup = document.getElementById('menuPopup')
const menuPopupToggle = document.getElementById('menuPopupToggle')
burgerBtn.addEventListener('click', (e) => {
  e.stopPropagation()
  menuPopup.classList.toggle('active')
})
menuPopupToggle.addEventListener('click', (e) => {
  e.stopPropagation()
  menuPopup.classList.remove('active')
})
menuPopup.addEventListener('click', (e) => {
  e.stopPropagation()
})
document.addEventListener('click', () => {
  menuPopup.classList.remove('active')
})
