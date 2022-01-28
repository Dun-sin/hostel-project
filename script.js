const roomChosen = document.getElementsByClassName('room');
const displayRoomChosen = document.getElementById('numberClicked');
const buildingChosen = document.getElementById('buildingChosen');
const building1 = document.getElementById('building1');
const building2 = document.getElementById('building2');
const popup = document.getElementById('popup');
const closeButton = document.getElementById('close');
const confirmButton = document.getElementById('confirm');
const noButton = document.getElementById('no');
const yesButton = document.getElementById('yes');

for (let i; i < roomChosen.length; i++) {
  namingRoom(room[i]);
}

function namingRoom(e) {
  e.addEventListener('click', () => {
    displayRoomChosen.innerText = e.innerText;
  })
}

// gets the element
// for (let i = 0; i < roomChosen.length; i++) {
//   // what to do when a number gets clicked
//   roomChosen[i].addEventListener('click', () => {
//     // checks if the number clicked is in a building to display which building gets clicked
//     if (building1 !== roomChosen[i] && building1.contains(roomChosen[i])) {
//       buildingChosen.innerText = 'Building 1';
//     } else if (
//       building2 !== roomChosen[i] &&
//       building2.contains(roomChosen[i])
//     ) {
//       buildingChosen.innerText = 'Building 2';
//     }
//     // displays the room chosen
//     displayRoomChosen.innerText = roomChosen[i].innerHTML;
//   });
// }

const settingToNone = (e) => {
  e.addEventListener('click', () => {
    popup.style.display = 'none';
  })
}

const arrayOfElements = [closeButton, noButton, yesButton];
arrayOfElements.forEach((e) => {
  settingToNone(e)
});

confirmButton.addEventListener('click', () => {
  popup.style.display = 'block';
});