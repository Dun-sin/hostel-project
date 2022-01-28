const buildings = document.querySelectorAll('.hostel-rooms');
const confirmButton = document.querySelector('.confirm-button');
const modal = document.querySelector('.confirmation-modal');
const modalBody = document.querySelector('.modal-body');

const selectedRoom = document.querySelector('#selected-room');
const selectedHostel = document.querySelector('#selected-hostel');

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

const toggleModal = () => {
  modal.classList.toggle('modal-visible');
}

const initializeModal = () => {
  confirmButton.addEventListener('click', toggleModal);
  modal.addEventListener('click', toggleModal);
  modalBody.addEventListener('click', (e) => e.stopPropagation());
}

const initializeRoomSelection = () => {
  let availableRooms = document.querySelectorAll('.room');
  for (room of availableRooms) {
    room.addEventListener('click', selectRoom);
  }
}

const selectRoom = (e) => {
  let info = {
    hostel: e.srcElement.parentElement.dataset.hostel,
    room: e.srcElement.innerText,
  }

  selectedRoom.innerText = info.room;
  selectedHostel.innerText = info.hostel;
}

(() => {
  generateRooms(50);
  initializeModal();
})();