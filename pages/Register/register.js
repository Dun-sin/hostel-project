// form parent
const form = document.getElementById('form');

// form input
const fName = document.getElementById('fname');
const lName = document.getElementById('lname');
const em = document.getElementById('email');
const pass = document.getElementById('pass');
const cpass = document.getElementById('cpass');

// select input
const faculty = document.getElementById('fac');
const programme = document.getElementById('programme');
const gender = document.getElementById('gender');

// error
const error = document.getElementById('error');

let okay = {
	firstName: false,
	lastName: false,
	email: false,
	confirmPass: false,
	fac: false,
	program: false,
	gen: false,
};

form.addEventListener('submit', (e) => {
	e.preventDefault();
	collectingInfo(
		fName.value,
		lName.value,
		em.value,
		pass.value,
		cpass.value,
		faculty.value,
		programme.value,
		gender.value,
	);
});

const genderVali = (gen) => {
	if (gen === 'Select Your Gender') {
		errorMessage('Please select your gender', 'genderID');
		okay.gen = false;
	} else {
		okay.gen = true;
	}
};

const facultyVali = (fac) => {
	if (fac === 'Select Your Faculty') {
		errorMessage('Please select your Faculty', 'facID');
		okay.fac = false;
	} else {
		okay.fac = true;
	}
};

const programVali = (program) => {
	if (program === 'Select Your Programme') {
		errorMessage('Please select your Program', 'programID');
		okay.program = false;
	} else {
		okay.program = true;
	}
};

const errorMessage = (message, id) => {
	const repeat = (id) => {
		if (id) {
			if (error.innerHTML.includes(id)) {
				return true;
			}
		}
	};
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

const firstLastNameVali = (firstName, lastName) => {
	if (firstName.length > 3) {
		okay.firstName = true;
	} else {
		okay.firstName = false;
		errorMessage('First Name must be more than 3 letters', 'firstID');
	}
	if (lastName.length > 3) {
		okay.lastName = true;
	} else {
		okay.lastName = false;
		errorMessage('Last Name must be more than 3 letters', 'lastID');
	}
};

const emailVali = (first, last, email) => {
	const splitted = email.split('@')[0];
	const combine = `${first.toLowerCase()}.${last.toLowerCase()}`;
	if (email.includes('@elizadeuniversity.edu.ng') && splitted.includes('.')) {
		if (splitted === combine) {
			okay.email = true;
		} else {
			errorMessage('This is not a school email', 'emailID');
			okay.email = false;
		}
	} else {
		errorMessage('This is not a school email', 'emailID');
		okay.email = false;
	}
};

const passwordVali = (password, confirmPassword) => {
	const lenpass = new RegExp('^(?=.{8,})');
	const lowLetter = new RegExp('^(?=.*[a-z])');
	const upLetter = new RegExp('^(?=.*[A-Z])');
	const numLetter = new RegExp('^(?=.*[0-9])');
	if (lenpass.test(password)) {
		if (lowLetter.test(password)) {
			if (upLetter.test(password)) {
				if (numLetter.test(password)) {
					if (password === confirmPassword) {
						okay.confirmPass = true;
					} else {
						okay.confirmPass = false;
						errorMessage('Passwords do not match', 'cpassID');
					}
				} else {
					errorMessage('Password must have a number');
				}
			} else {
				errorMessage('Password must have a upper case letter');
			}
		} else {
			errorMessage(`Password must have a lower case letter`);
		}
	} else {
		errorMessage(`Password must be 8 letters or more`, 'lenID');
	}
};

const isOkayTrue = (obj) => {
	for (var o in obj) if (!obj[o]) return false;

	return true;
};

const deleting = () => {
	const interval = setInterval(() => {
		if (error.childElementCount === 0) {
			clearInterval(interval);
		} else {
			error.removeChild(error.firstElementChild);
		}
	}, 2000);
};

const collectingInfo = (
	firstName,
	lastName,
	email,
	password,
	confirmPassword,
	faculty,
	programme,
	gender,
) => {
	const submit = () => {
		function addStudents() {
			firstName = firstName.toLowerCase();
			lastName = lastName.toLowerCase();
			fetch(
				`https://hostel-picking.herokuapp.com/addstudent?fName=${firstName}&lName=${lastName}&email=${email}&password=${password}&faculty=${faculty}&programme=${programme}&gender=${gender}`,
			).then((res) => {
				switch (res.status) {
					case 409:
						errorMessage('Already Registered', 'regID');
						break;
					case 200:
						window.localStorage.setItem('email', email);
						window.location.replace('../../index.html');
						break;
				}
				res.json();
			});
		}

		addStudents(
			firstName,
			lastName,
			email,
			confirmPassword,
			faculty,
			programme,
		);
	};

	firstLastNameVali(firstName, lastName);
	emailVali(firstName, lastName, email);
	passwordVali(password, confirmPassword);
	facultyVali(faculty);
	programVali(programme);
	genderVali(gender);
	deleting();

	switch (isOkayTrue(okay)) {
		case false:
			break;
		case true:
			submit();
			break;
	}
};
