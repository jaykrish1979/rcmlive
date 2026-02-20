/**
 * app.js
 * Shared utilities for client management, localStorage helpers, and toast notifications.
 * Loaded on all protected pages.
 */

/* ─── Toast ──────────────────────────────────────────────────────── */
function showToast(msg, type) {
  var t = document.createElement('div');
  t.className = 'toast' + (type ? ' ' + type : '');
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(function () { if (t.parentNode) t.parentNode.removeChild(t); }, 3000);
}

/* ─── Client management ─────────────────────────────────────────── */
function getClients() {
  try { return JSON.parse(localStorage.getItem('rcm_clients')) || []; } catch (e) { return []; }
}

function saveClients(clients) {
  localStorage.setItem('rcm_clients', JSON.stringify(clients));
}

function getSelectedClientId() {
  return localStorage.getItem('rcm_selected_client') || null;
}

function setSelectedClientId(id) {
  localStorage.setItem('rcm_selected_client', id);
}

/** Ensure at least one client exists and a selection is set. Returns selected client id. */
function ensureClient() {
  var clients = getClients();
  if (!clients.length) {
    var defaultClient = { id: 'client-1', name: 'Demo Client', status: 'in_progress' };
    clients = [defaultClient];
    saveClients(clients);
  }
  var sel = getSelectedClientId();
  if (!sel || !clients.find(function (c) { return c.id === sel; })) {
    sel = clients[0].id;
    setSelectedClientId(sel);
  }
  return sel;
}

function addClient(name) {
  var clients = getClients();
  var id = 'client-' + Date.now();
  clients.push({ id: id, name: name, status: 'planned' });
  saveClients(clients);
  setSelectedClientId(id);
  return id;
}

/* ─── Section progress ──────────────────────────────────────────── */
function getSectionProgress(clientId) {
  var key = 'rcm_progress_' + clientId;
  try { return JSON.parse(localStorage.getItem(key)) || {}; } catch (e) { return {}; }
}

function saveSectionProgress(clientId, progress) {
  localStorage.setItem('rcm_progress_' + clientId, JSON.stringify(progress));
}

/** Returns object: { completed: [sectionId, ...], checklist: { sectionId: { itemKey: true/false } } } */
function getClientData(clientId) {
  var key = 'rcm_data_' + clientId;
  try {
    return JSON.parse(localStorage.getItem(key)) || { completed: [], checklist: {}, issues: {} };
  } catch (e) {
    return { completed: [], checklist: {}, issues: {} };
  }
}

function saveClientData(clientId, data) {
  localStorage.setItem('rcm_data_' + clientId, JSON.stringify(data));
}

/** Returns % of total checklist items that are checked for a given client */
function computeOverallProgress(clientId) {
  var data = getClientData(clientId);
  var total = 0, done = 0;
  RCM_SECTIONS.forEach(function (sec) {
    sec.groups.forEach(function (grp) {
      grp.items.forEach(function (item, i) {
        total++;
        var key = generateChecklistKey(sec.id, grp.title, i);
        if (data.checklist[key]) done++;
      });
    });
  });
  return total ? Math.round((done / total) * 100) : 0;
}

/** Returns how many items are checked vs total for a single section */
function computeSectionProgress(clientId, sectionId) {
  var data = getClientData(clientId);
  var sec = RCM_SECTIONS.find(function (s) { return s.id === sectionId; });
  if (!sec) return { done: 0, total: 0, pct: 0 };
  var total = 0, done = 0;
  sec.groups.forEach(function (grp) {
    grp.items.forEach(function (item, i) {
      total++;
      var key = generateChecklistKey(sectionId, grp.title, i);
      if (data.checklist[key]) done++;
    });
  });
  var pct = total ? Math.round((done / total) * 100) : 0;
  return { done: done, total: total, pct: pct };
}

/** Returns all issues across all sections for a client */
function getAllIssues(clientId) {
  var data = getClientData(clientId);
  var all = [];
  Object.keys(data.issues || {}).forEach(function (sectionId) {
    (data.issues[sectionId] || []).forEach(function (issue) {
      all.push(Object.assign({}, issue, { sectionId: sectionId }));
    });
  });
  return all;
}

/* ─── Shared helpers ────────────────────────────────────────────── */
/** Generates the localStorage key for a checklist item (shared by all modules) */
function generateChecklistKey(sectionId, groupTitle, index) {
  return sectionId + '-' + groupTitle.replace(/\s+/g, '_') + '-' + index;
}

/** Escapes HTML special characters to prevent XSS */
function escHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
