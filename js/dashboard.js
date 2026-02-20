/**
 * dashboard.js
 * Renders the full dashboard: client selector, stats, status bar,
 * issues panel, sections grid, progress ring, and preview modal.
 */

document.addEventListener('DOMContentLoaded', function () {
  var clientId = ensureClient();

  initClientSelector();
  renderAll(clientId);

  /* Add-client button */
  var addBtn = document.getElementById('addClientBtn');
  if (addBtn) {
    addBtn.addEventListener('click', function () {
      var name = window.prompt('Enter new client name:');
      if (!name || !name.trim()) return;
      var newId = addClient(name.trim());
      initClientSelector();
      renderAll(newId);
    });
  }

  /* Modal close */
  var modalClose = document.getElementById('modalClose');
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  var backdrop = document.getElementById('sectionModal');
  if (backdrop) {
    backdrop.addEventListener('click', function (e) {
      if (e.target === backdrop) closeModal();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
});

/* ─── Client selector ───────────────────────────────────────────── */
function initClientSelector() {
  var sel = document.getElementById('clientSelect');
  if (!sel) return;
  var clients = getClients();
  var currentId = getSelectedClientId();
  sel.innerHTML = '';
  clients.forEach(function (c) {
    var opt = document.createElement('option');
    opt.value = c.id;
    opt.textContent = c.name;
    if (c.id === currentId) opt.selected = true;
    sel.appendChild(opt);
  });
  sel.onchange = function () {
    setSelectedClientId(sel.value);
    renderAll(sel.value);
  };
}

/* ─── Render everything ─────────────────────────────────────────── */
function renderAll(clientId) {
  renderProgressRing(clientId);
  renderClientStats();
  renderStatusBar();
  renderIssuesPanel(clientId);
  renderSectionsGrid(clientId);
}

/* ─── Progress ring ─────────────────────────────────────────────── */
function renderProgressRing(clientId) {
  var pct     = computeOverallProgress(clientId);
  var circle  = document.getElementById('progressCircle');
  var label   = document.getElementById('progressPercent');
  var circum  = 2 * Math.PI * 54; // r=54
  if (circle) {
    circle.style.strokeDasharray  = circum;
    circle.style.strokeDashoffset = circum - (circum * pct / 100);
  }
  if (label) label.textContent = pct + '%';
}

/* ─── Client stats cards ────────────────────────────────────────── */
function renderClientStats() {
  var container = document.getElementById('clientStats');
  if (!container) return;
  var clients    = getClients();
  var planned    = clients.filter(function (c) { return c.status === 'planned'; }).length;
  var inProgress = clients.filter(function (c) { return c.status === 'in_progress'; }).length;
  var live       = clients.filter(function (c) { return c.status === 'live'; }).length;

  container.innerHTML =
    statCard(clients.length, 'Total Clients', 'accent') +
    statCard(planned,        'Planned',        'planned') +
    statCard(inProgress,     'In Progress',    'inprogress') +
    statCard(live,           'Live',           'live');
}

function statCard(value, label, cls) {
  return '<div class="stat-card ' + cls + '">' +
    '<div class="stat-card-value">' + value + '</div>' +
    '<div class="stat-card-label">' + label + '</div>' +
    '</div>';
}

/* ─── Status bar ────────────────────────────────────────────────── */
function renderStatusBar() {
  var bar    = document.getElementById('statusBar');
  var legend = document.getElementById('statusLegend');
  if (!bar || !legend) return;

  var clients    = getClients();
  var total      = clients.length || 1;
  var planned    = clients.filter(function (c) { return c.status === 'planned'; }).length;
  var inProgress = clients.filter(function (c) { return c.status === 'in_progress'; }).length;
  var live       = clients.filter(function (c) { return c.status === 'live'; }).length;

  var segments = [
    { count: planned,    color: '#818cf8', label: 'Planned' },
    { count: inProgress, color: '#f59e0b', label: 'In Progress' },
    { count: live,       color: '#22c55e', label: 'Live' }
  ];

  bar.innerHTML = '';
  segments.forEach(function (seg) {
    if (!seg.count) return;
    var div = document.createElement('div');
    div.className = 'status-bar-segment';
    div.style.background = seg.color;
    div.style.width = Math.round((seg.count / total) * 100) + '%';
    bar.appendChild(div);
  });

  legend.innerHTML = segments.map(function (seg) {
    return '<div class="status-legend-item">' +
      '<span class="status-legend-dot" style="background:' + seg.color + '"></span>' +
      seg.label + ': ' + seg.count +
      '</div>';
  }).join('');
}

/* ─── Issues panel ──────────────────────────────────────────────── */
function renderIssuesPanel(clientId) {
  var panel = document.getElementById('issuesPanel');
  var list  = document.getElementById('issuesList');
  if (!panel || !list) return;

  var issues = getAllIssues(clientId).filter(function (i) { return !i.resolved; });
  if (!issues.length) {
    panel.classList.remove('has-issues');
    return;
  }
  panel.classList.add('has-issues');
  list.innerHTML = issues.map(function (issue) {
    var sec = RCM_SECTIONS.find(function (s) { return s.id === issue.sectionId; });
    var secTitle = sec ? sec.title : issue.sectionId;
    return '<div class="issue-item">' +
      '<span class="issue-sev ' + (issue.severity || 'medium') + '">' + (issue.severity || 'medium') + '</span>' +
      '<div class="issue-body">' +
        '<div class="issue-title">' + escHtml(issue.text) + '</div>' +
        '<div class="issue-meta">' + secTitle +
          (issue.assignee ? ' · ' + escHtml(issue.assignee) : '') +
          ' &nbsp;<a class="issue-link" href="/section.html?id=' + issue.sectionId + '">Open section →</a>' +
        '</div>' +
      '</div>' +
      '</div>';
  }).join('');
}

/* ─── Sections grid ─────────────────────────────────────────────── */
function renderSectionsGrid(clientId) {
  var grid = document.querySelector('.sections-grid');
  if (!grid) return;
  var data = getClientData(clientId);

  grid.innerHTML = RCM_SECTIONS.map(function (sec) {
    var prog  = computeSectionProgress(clientId, sec.id);
    var isComplete = data.completed.indexOf(sec.id) !== -1;
    var statusCls  = isComplete ? 'complete' : (prog.done > 0 ? 'in-progress' : 'not-started');
    var statusLbl  = isComplete ? 'Complete'  : (prog.done > 0 ? 'In Progress' : 'Not Started');

    var helpBtn = sec.hasHelp
      ? '<a href="/help-phase.html?id=' + sec.id + '" class="btn-card">Help</a>'
      : '';
    var sopBtn = sec.sopPage
      ? '<a href="' + sec.sopPage + '" class="btn-card">View SOPs</a>'
      : '';

    return '<div class="section-card ' + (isComplete ? 'complete' : '') + '">' +
      '<div class="section-card-top">' +
        '<span class="section-phase">' + sec.phase + '</span>' +
        '<span class="section-status-badge ' + statusCls + '">' + statusLbl + '</span>' +
      '</div>' +
      '<div class="section-title">' + sec.title + '</div>' +
      '<div class="section-desc">'  + sec.description + '</div>' +
      '<div class="section-progress">' +
        '<div class="section-progress-bar"><div class="section-progress-fill" style="width:' + prog.pct + '%"></div></div>' +
        '<div class="section-progress-label">' + prog.done + ' / ' + prog.total + ' items complete</div>' +
      '</div>' +
      '<div class="section-card-actions">' +
        helpBtn +
        sopBtn +
        '<button class="btn-card" data-id="' + sec.id + '" data-action="view">View</button>' +
        '<a href="/section.html?id=' + sec.id + '" class="btn-card primary">Open &amp; Edit</a>' +
      '</div>' +
    '</div>';
  }).join('');

  /* Wire View buttons */
  grid.querySelectorAll('[data-action="view"]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-id'), clientId);
    });
  });
}

/* ─── Modal ──────────────────────────────────────────────────────── */
function openModal(sectionId, clientId) {
  var sec = RCM_SECTIONS.find(function (s) { return s.id === sectionId; });
  if (!sec) return;

  document.getElementById('modalPhase').textContent = sec.phase;
  document.getElementById('modalTitle').textContent = sec.title;

  var prog = computeSectionProgress(clientId, sectionId);
  var data = getClientData(clientId);
  var body = '';

  body += '<p>' + sec.description + '</p>';
  body += '<p style="font-size:0.8rem;color:var(--text-muted);">Progress: ' + prog.done + ' / ' + prog.total + ' items (' + prog.pct + '%)</p>';

  // Show first group's items as a preview checklist
  var firstGroup = sec.groups[0];
  if (firstGroup) {
    body += '<h3>' + firstGroup.title + '</h3><ul class="modal-checklist">';
    firstGroup.items.forEach(function (item, i) {
      var key = generateChecklistKey(sectionId, firstGroup.title, i);
      var checked = !!data.checklist[key];
      body += '<li class="modal-checklist-item">' +
        '<span class="modal-check-icon ' + (checked ? '' : 'empty') + '">' + (checked ? '✓' : '○') + '</span>' +
        escHtml(item) + '</li>';
    });
    body += '</ul>';
    if (sec.groups.length > 1) {
      body += '<p style="font-size:0.78rem;color:var(--text-faint);">+ ' + (sec.groups.length - 1) + ' more group(s) — click Open &amp; Edit to see all.</p>';
    }
  }

  document.getElementById('modalBody').innerHTML = body;

  var footer = '<button class="btn-secondary" onclick="closeModal()">Close</button>' +
    '<a href="/section.html?id=' + sectionId + '" class="btn-primary" style="text-decoration:none;">Open &amp; Edit</a>';
  if (sec.hasHelp) {
    footer = '<a href="/help-phase.html?id=' + sectionId + '" class="btn-secondary" style="text-decoration:none;margin-right:auto;">Help docs</a>' + footer;
  }
  document.getElementById('modalFooter').innerHTML = footer;

  var backdrop = document.getElementById('sectionModal');
  if (backdrop) backdrop.removeAttribute('hidden');
}

function closeModal() {
  var backdrop = document.getElementById('sectionModal');
  if (backdrop) backdrop.setAttribute('hidden', '');
}

/* escHtml() and generateChecklistKey() are defined in app.js */
