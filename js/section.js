/**
 * section.js
 * Renders the section detail page (/section/<id>).
 * Reads the section ID from the URL path, populates checklist, detail table,
 * issues block, and handles save/complete actions.
 */

document.addEventListener('DOMContentLoaded', function () {
  /* Derive section id: query param ?id=phase-1 first, then URL path fallback */
  var _sp = new URLSearchParams(window.location.search);
  var sectionId = _sp.get('id') || (function() {
    var parts = window.location.pathname.split('/').filter(Boolean);
    return parts[parts.length - 1] || '';
  }());

  var sec = RCM_SECTIONS.find(function (s) { return s.id === sectionId; });
  if (!sec) {
    document.getElementById('sectionTitle').textContent = 'Section not found';
    document.getElementById('sectionDesc').textContent  = 'Please return to the Dashboard and select a valid section.';
    return;
  }

  var clientId = ensureClient();
  var data     = getClientData(clientId);

  /* ── Title & description ── */
  document.title = 'RCM Portal | ' + sec.title;
  document.getElementById('sectionTitle').textContent = sec.phase + ' – ' + sec.title;
  document.getElementById('sectionDesc').textContent  = sec.description;

  /* ── Render checklist ── */
  renderChecklist(sec, clientId, data);

  /* ── Render detail table ── */
  renderDetailTable(sec, clientId, data);

  /* ── Render issues block ── */
  renderIssuesBlock(sec, clientId, data);

  /* ── Save button ── */
  document.getElementById('saveBtn').addEventListener('click', function () {
    saveClientData(clientId, data);
    showToast('Progress saved.', 'success');
  });

  /* ── Complete button ── */
  document.getElementById('completeBtn').addEventListener('click', function () {
    if (data.completed.indexOf(sectionId) === -1) {
      data.completed.push(sectionId);
    }
    saveClientData(clientId, data);
    showToast(sec.title + ' marked as complete!', 'success');
    setTimeout(function () { window.location.href = '/dashboard.html'; }, 1200);
  });
});

/* ─── Checklist rendering ────────────────────────────────────────── */
function renderChecklist(sec, clientId, data) {
  var container = document.getElementById('sectionContent');
  if (!container) return;
  container.innerHTML = '';

  /* Help banner for phases that have deep-dive docs */
  if (sec.hasHelp) {
    var banner = document.createElement('div');
    banner.className = 'section-help-banner';
    banner.innerHTML = '<p>📖 This phase has detailed reference documentation.</p>' +
      '<a href="/help-phase.html?id=' + sec.id + '">View Phase Help Guide →</a>';
    container.appendChild(banner);
  }

  /* SOP banner for Phase 5 */
  if (sec.sopPage) {
    var sopBanner = document.createElement('div');
    sopBanner.className = 'section-help-banner';
    sopBanner.innerHTML = '<p>📋 Full SOP documentation is available for this phase.</p>' +
      '<a href="' + sec.sopPage + '">Open SOPs & Compliance Library →</a>';
    container.appendChild(sopBanner);
  }

  sec.groups.forEach(function (grp) {
    var groupDiv = document.createElement('div');
    groupDiv.className = 'checklist-group';

    var title = document.createElement('div');
    title.className = 'checklist-group-title';
    title.textContent = grp.title;
    groupDiv.appendChild(title);

    var list = document.createElement('div');
    list.className = 'checklist-items-list';

    grp.items.forEach(function (item, i) {
      var key = generateChecklistKey(sec.id, grp.title, i);
      var checked = !!data.checklist[key];

      var row = document.createElement('label');
      row.className = 'checklist-row' + (checked ? ' checked' : '');

      var cb = document.createElement('input');
      cb.type    = 'checkbox';
      cb.checked = checked;
      cb.addEventListener('change', function () {
        data.checklist[key] = cb.checked;
        row.classList.toggle('checked', cb.checked);
        saveClientData(clientId, data);
      });

      var lbl = document.createElement('span');
      lbl.className = 'checklist-row-label';
      lbl.textContent = item;

      row.appendChild(cb);
      row.appendChild(lbl);
      list.appendChild(row);
    });

    groupDiv.appendChild(list);
    container.appendChild(groupDiv);
  });
}

/* ─── Detail table ───────────────────────────────────────────────── */
function renderDetailTable(sec, clientId, data) {
  var block = document.getElementById('detailTableBlock');
  if (!block) return;

  /* Only show for phases that have a meaningful table */
  var tables = {
    'phase-1': {
      title: 'Service & Payer Summary',
      cols:  ['Specialty / Service', 'Payer Type', 'Claim Form', 'Notes'],
      rows:  5
    },
    'phase-2': {
      title: 'Office Cost Estimation',
      cols:  ['Cost Item', 'Monthly Estimate (₹)', 'Annual Estimate (₹)', 'Notes'],
      rows:  6
    },
    'phase-3': {
      title: 'Client Information Register',
      cols:  ['Item', 'Value / Reference', 'Verified', 'Notes'],
      rows:  6
    },
    'phase-4': {
      title: 'Systems Inventory',
      cols:  ['System / Tool', 'Vendor', 'Status', 'Notes'],
      rows:  5
    },
    'phase-6': {
      title: 'KPI Targets',
      cols:  ['KPI Metric', 'Target', 'Current Baseline', 'Notes'],
      rows:  5
    },
    'phase-7': {
      title: 'Staffing Plan',
      cols:  ['Role', 'Headcount Required', 'Hire Date Target', 'Status'],
      rows:  5
    }
  };

  var tblDef = tables[sec.id];
  if (!tblDef) { block.style.display = 'none'; return; }

  /* Load saved table values */
  var savedTable = (data.tables && data.tables[sec.id]) || [];

  block.innerHTML = '<h2>' + tblDef.title + '</h2>';
  var table = document.createElement('table');
  table.className = 'detail-table';

  /* Header */
  var thead = document.createElement('thead');
  var hr = document.createElement('tr');
  tblDef.cols.forEach(function (col) {
    var th = document.createElement('th');
    th.textContent = col;
    hr.appendChild(th);
  });
  thead.appendChild(hr);
  table.appendChild(thead);

  /* Body */
  var tbody = document.createElement('tbody');
  for (var r = 0; r < tblDef.rows; r++) {
    var tr = document.createElement('tr');
    tblDef.cols.forEach(function (col, c) {
      var td = document.createElement('td');
      var inp = document.createElement('input');
      inp.type        = 'text';
      inp.placeholder = col;
      inp.value       = (savedTable[r] && savedTable[r][c]) ? savedTable[r][c] : '';
      inp.dataset.row = r;
      inp.dataset.col = c;
      inp.addEventListener('input', function () {
        if (!data.tables) data.tables = {};
        if (!data.tables[sec.id]) data.tables[sec.id] = [];
        if (!data.tables[sec.id][+this.dataset.row]) data.tables[sec.id][+this.dataset.row] = [];
        data.tables[sec.id][+this.dataset.row][+this.dataset.col] = this.value;
        saveClientData(clientId, data);
      });
      td.appendChild(inp);
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  block.appendChild(table);
}

/* ─── Issues block ───────────────────────────────────────────────── */
function renderIssuesBlock(sec, clientId, data) {
  var block = document.getElementById('issuesBlock');
  if (!block) return;

  if (!data.issues) data.issues = {};
  if (!data.issues[sec.id]) data.issues[sec.id] = [];

  block.innerHTML = '<h2>Issues &amp; Action Items</h2>';

  /* Add-issue row */
  var addRow = document.createElement('div');
  addRow.className = 'issues-block-add';

  var textInput = document.createElement('input');
  textInput.type        = 'text';
  textInput.placeholder = 'Describe an issue or action item…';

  var sevSel = document.createElement('select');
  ['high', 'medium', 'low'].forEach(function (s) {
    var o = document.createElement('option');
    o.value = s; o.textContent = s.charAt(0).toUpperCase() + s.slice(1);
    sevSel.appendChild(o);
  });
  sevSel.value = 'medium';

  var assignInput = document.createElement('input');
  assignInput.type        = 'text';
  assignInput.placeholder = 'Assignee (optional)';
  assignInput.style.maxWidth = '160px';

  var addBtn = document.createElement('button');
  addBtn.className   = 'btn-secondary';
  addBtn.textContent = '+ Add';
  addBtn.style.whiteSpace = 'nowrap';
  addBtn.addEventListener('click', function () {
    var txt = textInput.value.trim();
    if (!txt) return;
    data.issues[sec.id].push({
      id:       Date.now(),
      text:     txt,
      severity: sevSel.value,
      assignee: assignInput.value.trim(),
      resolved: false,
      date:     new Date().toLocaleDateString()
    });
    saveClientData(clientId, data);
    textInput.value    = '';
    assignInput.value  = '';
    refreshIssueList();
  });

  addRow.appendChild(textInput);
  addRow.appendChild(sevSel);
  addRow.appendChild(assignInput);
  addRow.appendChild(addBtn);
  block.appendChild(addRow);

  var listDiv = document.createElement('div');
  listDiv.className = 'issues-list';
  block.appendChild(listDiv);

  function refreshIssueList() {
    listDiv.innerHTML = '';
    var issues = data.issues[sec.id] || [];
    if (!issues.length) {
      listDiv.innerHTML = '<p class="issues-empty">No issues logged for this section.</p>';
      return;
    }
    issues.forEach(function (issue, idx) {
      var item = document.createElement('div');
      item.className = 'issue-item';
      item.innerHTML =
        '<span class="issue-sev ' + issue.severity + '">' + issue.severity + '</span>' +
        '<div class="issue-body">' +
          '<div class="issue-title">' + escHtml(issue.text) + '</div>' +
          '<div class="issue-meta">' +
            (issue.assignee ? 'Assignee: ' + escHtml(issue.assignee) + ' · ' : '') +
            'Added: ' + issue.date +
          '</div>' +
        '</div>' +
        '<label style="display:flex;align-items:center;gap:0.4rem;font-size:0.78rem;color:var(--text-muted);flex-shrink:0;">' +
          '<input type="checkbox"' + (issue.resolved ? ' checked' : '') + '> Resolved' +
        '</label>';
      item.querySelector('input[type="checkbox"]').addEventListener('change', function () {
        data.issues[sec.id][idx].resolved = this.checked;
        saveClientData(clientId, data);
      });
      listDiv.appendChild(item);
    });
  }
  refreshIssueList();
}

/* escHtml() and generateChecklistKey() are defined in app.js */
