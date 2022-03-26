if (email === null || email === '' || email === undefined) {
	window.location.replace('../Login/Login.html');
}

// Elements SECTIONS
const buildings = document.querySelectorAll('.hostel-rooms');
const confirmButton = document.querySelector('.confirm-button');
const modal = document.querySelector('.confirmation-modal');
const modalBody = document.querySelector('.modal-body');

const girlsHostel = document.querySelector('.girlshostel');
const boysHostel = document.querySelector('.boyshostel');

const selectedRoom = document.querySelector('#selected-room');
const level = document.querySelector('#level');

const yesButton = document.querySelector('#yes');
const noButton = document.querySelector('#no');

// error messages
const takenError = document.getElementById('taken');
const pickedError = document.getElementById('picked');
const errorContainer = document.getElementById('errors');

const gender = window.localStorage.getItem('gender');

const unavailableRoom = [];

// API SECTION
function addroom(email, room, level) {
	fetch(
		`https://hostel-picking.herokuapp.com/addRoom?email=${email}&room=${room}&level=${level}`,
	)
		.then((res) => {
			switch (res.status) {
				case 400:
					pickedError.style.display = 'block';
					break;
			}
			res.json();
			window.location.replace('../../index.html');
		})
		.catch((err) => err);
}

// ROOM SECTION
if (gender === 'Female') {
	girlsHostel.style.display = 'flex';
	boysHostel.style.display = 'none';
	checkUnavailableRoomGirl();
} else {
	girlsHostel.style.display = 'none';
	boysHostel.style.display = 'flex';
	checkUnavailableRoomBoy();
}

// generate the number of rooms
const generateRooms = (total, bedNo) => {
	let rooms = Array(total)
		.fill()
		.map((_, i) => noForGender(i))
		.join('');
	for (let building of buildings) {
		building.innerHTML = rooms;
	}

	function noForGender(i) {
		if (bedNo === 2) {
			return `
          <p class="room">${i + 1}A</p>
          <p class="room">${i + 1}B</p>
          `;
		} else if (bedNo === 4) {
			return `
        <p class="room">${i + 1}A</p>
        <p class="room">${i + 1}B</p>
        <p class="room">${i + 1}C</p>
        <p class="room">${i + 1}D</p>
        `;
		}
		return '';
	}

	initializeRoomSelection();
};

// what to do when a use clicks on a room
const initializeRoomSelection = () => {
	let haveRoom = window.localStorage.getItem('haveRoom');
	let availableRooms = document.querySelectorAll('.room');
	for (room of availableRooms) {
		if (haveRoom === 'false') {
			removeRoom();
			room.addEventListener('click', selectRoom);
		} else if (haveRoom === 'true') {
			removeRoom();
			room.style.opacity = 0.4;
			confirmButton.style.display = 'none';
		}
	}

	function removeRoom() {
		for (let i = 0; i < unavailableRoom.length; i++) {
			if (room.innerText === unavailableRoom[i]) {
				room.style.display = 'none';
			}
		}
	}
};

// displays the selected rooms
const selectRoom = (e) => {
	let info = {
		room: e.srcElement.innerText,
	};

	selectedRoom.innerText = info.room;
	takenError.style.display = 'none';
};

// MODAL SECTION
// toggle of the modal/popup
const toggleModal = () => {
	modal.classList.toggle('modal-visible');
};

// what triggers the popup
const initializeModal = () => {
	confirmButton.addEventListener('click', toggleModal);

	function buttonCanToogle(e) {
		e.addEventListener('click', toggleModal);
	}

	// what happens when you click on yes
	yesButton.addEventListener('click', () => {
		const room = selectedRoom.innerText;
		try {
			if (room === undefined || room === null || room === '...') {
				createError('Pick a room', `notPicked`);
			} else {
				let email = window.localStorage.getItem('email');
				const levelCondition = levelVali(level.value);
				if (levelCondition === false) {
					return;
				} else {
					const levelValue = level.value;
					if (haveRoom === 'true') {
						createError('You already have a room', 'existingRoom');
					} else {
						addroom(email, room, levelValue);
					}
				}
			}
		} catch (err) {
			return err;
		} finally {
			toggleModal();
			window.location.replace('../../index.html');
		}
	});

	const buttons = [modal, noButton];
	buttons.forEach(buttonCanToogle);

	modalBody.addEventListener('click', (e) => e.stopPropagation());
};

// function that creates the error messages
function createError(message, id) {
	const repeat = (id) => {
		if (id) {
			if (errorContainer.innerHTML.includes(id)) {
				return true;
			}
		}
	};
	const isTrue = repeat(id);
	if (isTrue === true) {
		return;
	} else {
		const node = document.createElement('p');
		const messageNode = document.createTextNode(message);
		node.id = id;
		node.appendChild(messageNode);
		errorContainer.appendChild(node);
		setTimeout(() => {
			node.remove();
		}, 3000);
	}
}

function levelVali(level) {
	if (level === 'Select a Level') {
		createError('Please select your Level', 'levelID');
		return false;
	} else if (level === '100' || level === '200') {
		return true;
	}
}

function checkUnavailableRoomGirl() {
	fetch(`https://hostel-picking.herokuapp.com/getUnavailableRoomGirl`)
		.then((res) => res.json())
		.then((data) => {
			data.forEach((result) => {
				unavailableRoom.push(result.room);
			});
			loaded.style.display = 'none';
			creatingRooms(50, 2);
		});
}

function checkUnavailableRoomBoy() {
	fetch(`https://hostel-picking.herokuapp.com/getUnavailableRoomBoy`)
		.then((res) => res.json())
		.then((data) => {
			data.forEach((result) => {
				unavailableRoom.push(result.room);
			});
			loaded.style.display = 'none';
			creatingRooms(50, 4);
		});
}

// creating and calling the function at the same time
function creatingRooms(number, numOfBed) {
	generateRooms(number, numOfBed);
	initializeModal();
}
