const error = document.getElementById('error');
const email = document.getElementById('email');
const password = document.getElementById('pass');
const form = document.getElementById('form');

let okay = {
  email: false,
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  onSubmitted(email.value, password.value);
});

const repeat = (id) => {
  if (id) {
    if (error.innerHTML.includes(id)) {
      return true;
    }
  }
}

const deleting = () => {
  const interval = setInterval(() => {
    if (error.childElementCount === 0) {
      clearInterval(interval);
    } else {
      error.removeChild(error.firstElementChild);
    }
  }, 2000);
}

const errorMessage = (message, id) => {
  const isTrue = repeat(id);
  if (isTrue === true) {
    return;
  };
  const node = document.createElement('p');
  const messageNode = document.createTextNode(message);
  node.id = id;
  node.appendChild(messageNode);
  error.appendChild(node);
}

const emailVali = (email) => {
  if (email.includes('@elizadeuniversity.edu.ng')) {
    okay.email = true;
  } else {
    errorMessage('This is not a school email', 'emailID');
    okay.email = false;
  }
}


function onSubmitted(email, password) {
  function loginSuc() {
    fetch(`http://localhost:4000/checkstudent?email=${email}&password=${password}`)
      .then(res => {
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
      .catch(err => {
        console.log(err.status)
      })
  }

  emailVali(email);
  deleting();

  switch (okay.email) {
    case false:
      break;
    case true:
      loginSuc();
      break;
  }
}