/**
 * protection.js
 * Runs first on every protected page. Redirects to login if no session exists.
 * index.html is NOT protected (it is the login page).
 */
(function () {
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  var isLoginPage = path === '' || path === '/' || path === '/index.html';
  if (isLoginPage) return; // login page never needs protection

  var user = null;
  try { user = JSON.parse(localStorage.getItem('rcm_user')); } catch (e) {}
  if (!user || !user.username) {
    window.location.replace('/');
  }
}());
