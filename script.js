/**
 * gets the element of the hostel container
 * @type {object}
 * @constant
 */
const boy = document.getElementById('boy');
const girl = document.getElementById('girl');

/**
 * variables that stores the access to the button elements related to login/out
 * @type {object}
 * @constant
 */
const shouldLoggin = document.getElementById('shouldLogin');
const loggedIn = document.getElementById('loggedIn');
const logout = document.getElementById('logout');
const userInfo = document.getElementById('userInfo');

// const email = window.localStorage.getItem('email');
// const btn = document.querySelectorAll('.btnHostel');
// const loaded = document.querySelector('.loading');

/**
 * Checks if there's the email data stored in localstorage
 */
if (email === null || email === '') {
	btn.forEach((button) => {
		/**
		 * disables the button so clicking on it won't work and reduces the opacity
		 */
		button.disabled = true;
		button.style.opacity = '0.4';
	});

	/**
	 * turns the display of the logged in section to none and shows the other one
	 */
	loaded.style.display = 'none';
	loggedIn.style.display = 'none';
	shouldLoggin.style.display = 'flex';
} else {
	/**
	 * gets the email, removes everything after the @ and turns the first name and last name into the user name
	 */
	const gettingName = email.split('@')[0].split('.');
	const firstName =
		gettingName[0].charAt(0).toUpperCase() + gettingName[0].slice(1);
	const lastName =
		gettingName[1].charAt(0).toUpperCase() + gettingName[1].slice(1);
	userInfo.innerText = `${firstName} ${lastName}`;
	loggedIn.style.display = 'flex';
	shouldLoggin.style.display = 'none';
}

/**
 * adds a click event listener to the logout button and it removes everything from the local storage
 */
logout.addEventListener('click', () => {
	window.localStorage.removeItem('email');
	window.localStorage.removeItem('gender');
	window.localStorage.removeItem('haveRoom');
	window.location.reload();
});
