const buildings = document.querySelectorAll('.hostel-rooms');
const confirmButton = document.querySelector('.confirm-button');
const modal = document.querySelector('.confirmation-modal');
const modalBody = document.querySelector('.modal-body');

const buildingOne = document.querySelector('#hostelOne')
const buildingTwo = document.querySelector('#hostelTwo')

const selectedRoom = document.querySelector('#selected-room');
const selectedHostel = document.querySelector('#selected-hostel');

const yesButton = document.querySelector('#yes');
const noButton = document.querySelector('#no');

// generate the number of rooms
const generateRooms = (total) => {
  let rooms = Array(total)
    .fill()
    .map((_, i) => `<p class="room">M${i + 1}</p>`)
    .join('');

  for (let building of buildings) {
    building.innerHTML = rooms;
  }

  initializeRoomSelection();
}


// what to do when a use clicks on a room
const initializeRoomSelection = () => {
  let availableRooms = document.querySelectorAll('.room');
  for (room of availableRooms) {
    room.addEventListener('click', selectRoom);
  }
}

// checked which hostel the room picked belongs
const checkIfParent = (c) => {
  if (c.parentElement.id == 'hostelOne') {
    selectedHostel.innerText = 'Hostel One';
  } else if (c.parentElement.id == 'hostelTwo') {
    selectedHostel.innerText = 'Hostel Two';
  }
}

// displays the selected rooms
const selectRoom = (e) => {
  let info = {
    room: e.srcElement.innerText
  }

  // console.log(.parentElement);
  checkIfParent(e.srcElement);
  selectedRoom.innerText = info.room;
}

// toggle of the modal/popup
const toggleModal = () => {
  modal.classList.toggle('modal-visible');
}

// what triggers the popup
const initializeModal = () => {
  confirmButton.addEventListener('click', toggleModal);

  function buttonCanToogle(e) {
    e.addEventListener('click', toggleModal);
  }

  const buttons = [modal, yesButton, noButton];
  buttons.forEach(buttonCanToogle);

  modalBody.addEventListener('click', (e) => e.stopPropagation());
}

// creating and calling the function at the same time
(() => {
  generateRooms(50);
  initializeModal();
})();