const error = document.getElementById('error');
const email = document.getElementById('email');
const password = document.getElementById('pass');
const form = document.getElementById('form');
const loginWord = document.getElementById('loginWord');
const loading = document.querySelector('.loading');

let okay = {
	email: false,
<<<<<<< HEAD
=======
	password: false,
>>>>>>> 0bede7f6b0edd0b90e170c25257ceacd08be9f6c
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	onSubmitted(email.value, password.value);
<<<<<<< HEAD
	loginWord.style.display = 'none';
	loading.style.display = 'flex';
=======
>>>>>>> 0bede7f6b0edd0b90e170c25257ceacd08be9f6c
});

const repeat = (id) => {
	if (id) {
		if (error.innerHTML.includes(id)) {
			return true;
		}
	}
};

const deleting = () => {
	const interval = setInterval(() => {
		if (error.childElementCount === 0) {
			clearInterval(interval);
		} else {
			error.removeChild(error.firstElementChild);
		}
<<<<<<< HEAD
		loginWord.style.display = 'flex';
		loading.style.display = 'none';
=======
>>>>>>> 0bede7f6b0edd0b90e170c25257ceacd08be9f6c
	}, 2000);
};

const errorMessage = (message, id) => {
	const isTrue = repeat(id);
	if (isTrue === true) {
		return;
	}
	const node = document.createElement('p');
	const messageNode = document.createTextNode(message);
	node.id = id;
	node.appendChild(messageNode);
	error.appendChild(node);
};

const emailVali = (email) => {
	if (email.includes('@elizadeuniversity.edu.ng')) {
		okay.email = true;
	} else {
		errorMessage('This is not a school email', 'emailID');
		okay.email = false;
<<<<<<< HEAD
		deleting();
=======
>>>>>>> 0bede7f6b0edd0b90e170c25257ceacd08be9f6c
	}
};

function onSubmitted(email, password) {
	function loginSuc() {
		fetch(
			`https://hostel-picking.herokuapp.com/checkstudent?email=${email}&password=${password}`,
<<<<<<< HEAD
=======
			{
				mode: 'no-cors',
			},
>>>>>>> 0bede7f6b0edd0b90e170c25257ceacd08be9f6c
		)
			.then((res) => {
				switch (res.status) {
					case 500:
						errorMessage(`Email doesn't exist`, 'emailNot');
						break;
					case 502:
						errorMessage(`Password isn't correct`, 'passNot');
						break;
					case 200:
						window.localStorage.setItem('email', email);
						window.location.replace('../../index.html');
						break;
				}
			})
			.catch((err) => {
<<<<<<< HEAD
				return;
=======
				return err;
>>>>>>> 0bede7f6b0edd0b90e170c25257ceacd08be9f6c
			});
	}

	/**
	 * function to check if the user already has a room
	 */
	function checkingRoom() {
<<<<<<< HEAD
		fetch(`https://hostel-picking.herokuapp.com/checkRoom?email=${email}`).then(
			(res) => {
				res.json().then((data) => {
					data.forEach((result) => {
						const room = result.room;
						if (room === null || room === '') {
							window.localStorage.setItem('haveRoom', false);
						} else {
							window.localStorage.setItem('haveRoom', true);
						}
					});
					loginSuc();
				});
			},
		);
	}

	emailVali(email);
=======
		fetch(`https://hostel-picking.herokuapp.com/checkRoom?email=${email}`, {
			mode: 'no-cors',
		})
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
				loginSuc();
			});
	}

	emailVali(email);
	deleting();
>>>>>>> 0bede7f6b0edd0b90e170c25257ceacd08be9f6c

	switch (okay.email) {
		case false:
			break;
		case true:
			checkingRoom();
			break;
	}
}
