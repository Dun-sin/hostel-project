const email = window.localStorage.getItem('email');
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

// variable to determine if user already has a room

// API SECTION
function addroom(email, room, level) {
	fetch(
		`http://localhost:4000/addRoom?email=${email}&room=${room}&level=${level}`,
	)
		.then((res) => {
			switch (res.status) {
				case 400:
					pickedError.style.display = 'block';
					break;
			}
			res.json();
		})
		.catch((err) => console.log(err));
}

// ROOM SECTION
if (gender === 'Female') {
	girlsHostel.style.display = 'flex';
	boysHostel.style.display = 'none';
} else {
	girlsHostel.style.display = 'none';
	boysHostel.style.display = 'flex';
}

// generate the number of rooms
const generateRooms = (total) => {
	let rooms = Array(total)
		.fill()
		.map((_, i) => `<p class="room">${i + 1}</p>`)
		.join('');

	for (let building of buildings) {
		building.innerHTML = rooms;
	}

	initializeRoomSelection();
};

// what to do when a use clicks on a room
const initializeRoomSelection = () => {
	let haveRoom = window.localStorage.getItem('haveRoom');
	let availableRooms = document.querySelectorAll('.room');
	for (room of availableRooms) {
		if (haveRoom === 'false') {
			room.addEventListener('click', selectRoom);
		} else if (haveRoom === 'true') {
			room.style.opacity = 0.4;
			confirmButton.style.display = 'none';
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
					addroom(email, room, levelValue);
					window.location.replace('../../index.html');
				}
			}
		} catch (err) {
			console.log(err);
		} finally {
			toggleModal();
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
	if (level === 'pick your level') {
		createError('Please select your Level', 'levelID');
		return false;
	} else {
		return true;
	}
}

// creating and calling the function at the same time
(() => {
	generateRooms(50);
	initializeModal();
})();
