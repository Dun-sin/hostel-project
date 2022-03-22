const loaded = document.querySelector('.loading');
const btn = document.querySelectorAll('.btnHostel');

const email = window.localStorage.getItem('email');

// buttons related to gender
const girlBtn = document.getElementById('btnG');
const boyBtn = document.getElementById('btnB');

let loadedInfo = {
	gender: false,
	room: false,
};

/**
 * it chooses which of the gender hostel you are allowed to click on based on your gender
 */
async function choosingButtonThatShouldWork() {
	let gender;
	fetch(`http://localhost:4000/getGender?email=${email}`)
		.then((res) => {
			res.json().then((data) => {
				gender = await data;
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

/**
 * function to check if the user already has a room
 */
async function checkingRoom() {
	fetch(`http://localhost:4000/checkRoom?email=${email}`)
		.then((res) => res.json())
		.then(
			(data) =>
				await data.forEach((result) => {
					const room = result.room;
					if (room === null || room === '') {
						window.localStorage.setItem('haveRoom', false);
					} else {
						window.localStorage.setItem('haveRoom', true);
					}
				}),
		);
}
