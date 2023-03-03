// Handle user login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = loginForm.elements['username'].value;
  const password = loginForm.elements['password'].value;
  fetch('/login', {
    method: 'POST',
    body: JSON.stringify({username, password}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      // Redirect to dashboard page
      window.location.href = '/dashboard';
    } else {
      // Display error message
      const errorMessage = document.querySelector('#error-message');
      errorMessage.textContent = data.message;
    }
  })
  .catch(err => console.error(err));
});

// Handle user signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = signupForm.elements['username'].value;
  const email = signupForm.elements['email'].value;
  const password = signupForm.elements['password'].value;
  fetch('/signup', {
    method: 'POST',
    body: JSON.stringify({username, email, password}),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      // Redirect to dashboard page
      window.location.href = '/dashboard';
    } else {
      // Display error message
      const errorMessage = document.querySelector('#error-message');
      errorMessage.textContent = data.message;
    }
  })
  .catch(err => console.error(err));
});

// Handle user logout
const logoutButton = document.querySelector('#logout-button');
logoutButton.addEventListener('click', (e) => {
  e.preventDefault();
  fetch('/logout')
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      // Redirect to login page
      window.location.href = '/login';
    } else {
      console.error(data.message);
    }
  })
  .catch(err => console.error(err));
});

// Display user data on dashboard page
fetch('/userdata')
.then(res => res.json())
.then(data => {
  if (data.success) {
    // Display user data on dashboard page
    const userDataElement = document.querySelector('#user-data');
    userDataElement.textContent = JSON.stringify(data.userData, null, 2);
  } else {
    console.error(data.message);
  }
})
.catch(err => console.error(err));
