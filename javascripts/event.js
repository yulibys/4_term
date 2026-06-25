const openEventPopup = document.getElementById('openEventPopup')
const eventPopup = document.getElementById('eventPopup')
const eventPopupClose = document.getElementById('eventPopupClose')
const eventPopupOverlay = document.getElementById('eventPopupOverlay')
if (openEventPopup && eventPopup && eventPopupClose && eventPopupOverlay) {
  openEventPopup.addEventListener('click', () => {
    eventPopup.classList.add('active')
  })
  eventPopupClose.addEventListener('click', () => {
    eventPopup.classList.remove('active')
  })
  eventPopupOverlay.addEventListener('click', () => {
    eventPopup.classList.remove('active')
  })
}
const createTicketBtn = document.getElementById('createTicketBtn')
const ticketUserName = document.getElementById('ticketUserName')
const ticketNameResult = document.getElementById('ticketNameResult')
const eventPopupFormScreen = document.getElementById('eventPopupFormScreen')
const eventTicketScreen = document.getElementById('eventTicketScreen')
const eventTicketDone = document.getElementById('eventTicketDone')
if (
  createTicketBtn &&
  ticketUserName &&
  ticketNameResult &&
  eventPopupFormScreen &&
  eventTicketScreen &&
  eventTicketDone
) {
  createTicketBtn.addEventListener('click', () => {
    const userName = ticketUserName.value.trim()
    ticketNameResult.textContent = userName ? userName.toUpperCase() : 'КОЩЕЙ'
    eventPopupFormScreen.classList.add('hidden')
    eventTicketScreen.classList.remove('active')
    setTimeout(() => {
      eventTicketScreen.classList.add('active')
    }, 50)
  })
  eventTicketDone.addEventListener('click', () => {
    window.location.href = 'events.html'
  })
}
