const loaded = document.querySelector('.loading');
const btn = document.querySelectorAll('.btnHostel');

const email = window.localStorage.getItem('email');
/**
 * variables that stores the access to the buttons using ids
 * @type {object}
 * @constant
 */
const girlBtn = document.getElementById('btnG');
const boyBtn = document.getElementById('btnB');

const haveRoom = window.localStorage.getItem('haveRoom');

/**
 * if a user chooses a room, it addes a localstorage with the key of haveroom and it checks if the data stored is true if it is, user can't click on the button to choose the room page
 */
if (haveRoom === 'true') {
	btn.forEach((button) => {
		button.disabled = true;
		button.style.opacity = '0.4';
	});
}

/**
 * it chooses which of the gender hostel you are allowed to click on based on your gender
 */
function choosingButtonThatShouldWork() {
	let gender;
<<<<<<< HEAD
	fetch(`https://hostel-picking.herokuapp.com/getGender?email=${email}`)
=======
	fetch(`https://hostel-picking.herokuapp.com/getGender?email=${email}`, {
		mode: 'no-cors',
	})
>>>>>>> 0bede7f6b0edd0b90e170c25257ceacd08be9f6c
		.then((res) => {
			res.json().then((data) => {
				gender = data;
				if (gender === 'Female') {
					boyBtn.disabled = true;
					girlBtn.disabled = false;
				} else {
					boyBtn.disabled = false;
					girlBtn.disabled = true;
				}
				window.localStorage.setItem('gender', gender);
				btn.forEach((button) => {
					button.addEventListener('click', () => {
						window.location.href = './pages/PageChoosing/pagePicking.html';
					});
				});
				loaded.style.display = 'none';
			});
		})
		.catch((err) => {
			return err;
		});
}

function checkingRoom() {
<<<<<<< HEAD
	fetch(`https://hostel-picking.herokuapp.com/checkRoom?email=${email}`)
=======
	fetch(`https://hostel-picking.herokuapp.com/checkRoom?email=${email}`, {
		mode: 'no-cors',
	})
>>>>>>> 0bede7f6b0edd0b90e170c25257ceacd08be9f6c
		.then((res) => res.json())
		.then((data) => {
			data.forEach((result) => {
				const room = result.room;
				if (room === null || room === '') {
					window.localStorage.setItem('haveRoom', false);
				} else {
					window.localStorage.setItem('haveRoom', true);
				}
			});
			choosingButtonThatShouldWork();
		});
}

(() => {
	if (email === null || email === '') {
	} else {
		checkingRoom();
	}
})();
