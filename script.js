// buttons for hostel
/**
 * variables that get the access to the buttons using ids
 *
 */
const btn = document.querySelectorAll('.btnHostel');
console.log(typeof btn);

// buttons related to gender
const girlBtn = document.getElementById('btnG');
const boyBtn = document.getElementById('btnB');

const boy = document.getElementById('boy');
const girl = document.getElementById('girl');

// local Storage
const email = window.localStorage.getItem('email');
const haveRoom = window.localStorage.getItem('haveRoom');

// loggin/loggedIn related
const shouldLoggin = document.getElementById('shouldLogin');
const loggedIn = document.getElementById('loggedIn');
const logout = document.getElementById('logout');
const userInfo = document.getElementById('userInfo');

if (email === null || email === '') {
	btn.forEach((button) => {
		button.disabled = true;
		button.style.opacity = '0.4';
	});
	loggedIn.style.display = 'none';
	shouldLoggin.style.display = 'flex';
} else {
	const gettingName = email.split('@')[0].split('.');
	const firstName =
		gettingName[0].charAt(0).toUpperCase() + gettingName[0].slice(1);
	const lastName =
		gettingName[1].charAt(0).toUpperCase() + gettingName[1].slice(1);
	userInfo.innerText = `${firstName} ${lastName}`;
	loggedIn.style.display = 'flex';
	shouldLoggin.style.display = 'none';
	choosingButtonThatShouldWork();
}

if (haveRoom === 'true') {
	btn.forEach((button) => {
		button.disabled = true;
		button.style.opacity = '0.4';
	});
}

logout.addEventListener('click', () => {
	window.localStorage.removeItem('email');
	window.localStorage.removeItem('gender');
	window.localStorage.removeItem('haveRoom');
	window.location.reload();
});

function choosingButtonThatShouldWork() {
	let gender;
	fetch(`http://localhost:4000/getGender?email=${email}`)
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
				checkingRoom();
			});
		})
		.catch((err) => {
			console.log(err);
		});
}

function checkingRoom() {
	fetch(`http://localhost:4000/checkRoom?email=${email}`)
		.then((res) => res.json())
		.then((data) =>
			data.forEach((result) => {
				const room = result.room;
				if (room === null || room === '') {
					window.localStorage.setItem('haveRoom', false);
				} else {
					window.localStorage.setItem('haveRoom', true);
				}
			}),
		);
}
