/**
 * auth.js
 * Authentication helpers shared across all pages.
 * Provides: getAuthUser(), setAuthUser(), clearAuthUser()
 * Also wires the logout button and username display on DOMContentLoaded.
 */

function getAuthUser() {
  try { return JSON.parse(localStorage.getItem('rcm_user')) || null; } catch (e) { return null; }
}

function setAuthUser(user) {
  localStorage.setItem('rcm_user', JSON.stringify(user));
}

function clearAuthUser() {
  localStorage.removeItem('rcm_user');
}

document.addEventListener('DOMContentLoaded', function () {
  var user = getAuthUser();
  var userNameEl = document.getElementById('userName');
  var logoutBtn  = document.getElementById('logoutBtn');

  if (userNameEl) {
    userNameEl.textContent = user ? (user.name || user.username) : '';
  }

  if (logoutBtn) {
    if (!user) {
      logoutBtn.style.display = 'none';
    } else {
      logoutBtn.addEventListener('click', function () {
        clearAuthUser();
        window.location.href = '/';
      });
    }
  }
});
