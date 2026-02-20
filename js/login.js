/**
 * login.js
 * Handles the login form on index.html.
 * Credentials are hardcoded here for a static deployment.
 * Default logins:
 *   username: admin    password: admin
 *   username: rcm      password: rcm2024
 */

var RCM_USERS = [
  { username: 'admin',  password: 'admin',   name: 'Administrator' },
  { username: 'rcm',    password: 'rcm2024', name: 'RCM Team'      }
];

document.addEventListener('DOMContentLoaded', function () {
  // If already logged in, go straight to dashboard
  if (getAuthUser()) {
    window.location.replace('/dashboard.html');
    return;
  }

  var form     = document.getElementById('loginForm');
  var errorEl  = document.getElementById('formError');
  var loginBtn = document.getElementById('loginBtn');

  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    errorEl.textContent = '';

    var username = (document.getElementById('username').value || '').trim();
    var password = document.getElementById('password').value || '';

    if (!username || !password) {
      errorEl.textContent = 'Please enter your username and password.';
      return;
    }

    loginBtn.disabled = true;
    loginBtn.classList.add('loading');

    // Simulate a brief async check
    setTimeout(function () {
      var user = null;
      for (var i = 0; i < RCM_USERS.length; i++) {
        if (RCM_USERS[i].username === username && RCM_USERS[i].password === password) {
          user = RCM_USERS[i];
          break;
        }
      }

      if (user) {
        setAuthUser({ username: user.username, name: user.name });
        window.location.href = '/dashboard.html';
      } else {
        errorEl.textContent = 'Invalid username or password. Please try again.';
        loginBtn.disabled = false;
        loginBtn.classList.remove('loading');
      }
    }, 500);
  });
});
