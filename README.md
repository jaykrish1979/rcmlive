# RCM Go-Live Portal

A browser-based portal for planning and tracking the complete setup of a US Healthcare Revenue Cycle Management (RCM) operation. It guides your team through **ten phases** — from defining service scope to pilot go-live — with interactive checklists, data tables, issue tracking, SOP documents, and progress reporting.

---

## 🖥️ How to See It — 3 Options

### Option 1 — Netlify (Recommended, no install needed)

The site is deployed automatically from this repository via Netlify.

1. Open the **Netlify URL** shown in your repository's deployment settings (or ask your administrator for the link).
2. You will land on the **Login page**.
3. Sign in with one of the credentials below.

---

### Option 2 — Run Locally (Python, no install needed)

You need Python 3 installed (comes pre-installed on macOS and Linux; download from [python.org](https://python.org) on Windows).

```bash
# 1. Clone the repo (if you haven't already)
git clone https://github.com/jaykrish1979/rcmlive.git
cd rcmlive

# 2. Start the built-in web server
python3 -m http.server 8000

# 3. Open your browser and go to:
#    http://localhost:8000
```

Then sign in with one of the credentials below.

---

### Option 3 — Open Directly in Browser (simplest)

```bash
# macOS
open index.html

# Windows (run in Command Prompt)
start index.html

# Linux
xdg-open index.html
```

> **Note:** Some JS features (localStorage) behave better over `http://` than `file://`. Use Option 2 for the best experience.

---

## 🔐 Login Credentials

| Username | Password | Role |
|----------|----------|------|
| `admin`  | `admin`  | Administrator |
| `rcm`    | `rcm2024` | RCM Team |

---

## 📸 Screenshots

### Login Page
![Login](https://github.com/user-attachments/assets/923e2883-67b4-4616-800a-616aef8154b0)

---

### Dashboard — All 10 Phases
![Dashboard](https://github.com/user-attachments/assets/91cd07db-0d48-4ba0-a12e-89c49c69abd9)

---

### Section Page — Phase 1 (Checklist + Detail Table + Issues)
![Section Page](https://github.com/user-attachments/assets/855294b8-5143-45b1-9f84-1f0cdfe1fbac)

---

### Phase 5 — SOPs & Compliance Library
![SOPs Page](https://github.com/user-attachments/assets/564bab40-4ca2-438c-beef-7c344184ea53)

---

## 🗂️ Pages & URLs

| Page | URL | Description |
|------|-----|-------------|
| Login | `/` or `/index.html` | Sign in |
| Dashboard | `/dashboard.html` | Overview of all 10 phases, client stats, progress ring |
| Section | `/section.html?id=phase-1` | Checklist, detail table, and issues for any phase (change `phase-1` to `phase-2` … `phase-10`) |
| Phase Help | `/help-phase.html?id=phase-1` | Detailed reference guide for Phase 1 or Phase 2 |
| SOPs | `/sop-phase5.html` | Phase 5 SOP library with PDF-viewer modal (8 SOPs) |
| Help | `/help.html` | General help & reference guide |

---

## 📋 The 10 Go-Live Phases

| # | Phase | Description |
|---|-------|-------------|
| 1 | Service Scope Definition | Define specialties, payer mix, claim types, and SOW |
| 2 | Office Setup | Facility, IT infrastructure, and cost estimation |
| 3 | Discovery & Information Gathering | Client info, system audit, payer contracts |
| 4 | Systems & Technology | PMS, EHR, clearinghouse, VPN, EDI setup |
| 5 | SOPs & Compliance | 8 SOPs, HIPAA, BAAs, quality audits |
| 6 | Reports & KPIs | Daily reports, KPI targets, dashboards |
| 7 | Staffing & Training | Recruitment, onboarding, team training |
| 8 | Pilot & Soft Go-Live | Controlled pilot, issue log, client sign-off |
| 9 | Risks & Mitigation | Risk register, contingency plans, monitoring |
| 10 | Office Setup & Capacity Planning | Location, lease, infrastructure, BCP |

---

## 💾 Data Storage

All progress is stored in your **browser's localStorage** — no server or database required. This means:

- Data is saved **per browser, per device**.
- Clearing browser data will reset progress.
- For team sharing, export data or use the same browser profile.

---

## 🏗️ Project Structure

```
rcmlive/
├── index.html          # Login page
├── dashboard.html      # Main dashboard
├── section.html        # Phase detail / checklist page
├── help-phase.html     # Phase-level reference docs
├── sop-phase5.html     # Phase 5 SOP library
├── help.html           # General help guide
├── _redirects          # Netlify SPA routing
├── css/
│   └── styles.css      # Full design system
└── js/
    ├── protection.js   # Auth guard (redirect if not logged in)
    ├── auth.js         # getAuthUser / logout helpers
    ├── login.js        # Login form logic
    ├── data.js         # All 10 phase definitions & checklist items
    ├── app.js          # Shared utilities (client, progress, escHtml)
    ├── dashboard.js    # Dashboard rendering & modal
    ├── section.js      # Section page rendering & save/complete
    └── phase-help-data.js  # Phase 1 & 2 reference documentation
```

---

## 🚀 Deploying to Netlify (free)

1. Push this repo to GitHub (already done).
2. Go to [netlify.com](https://netlify.com) → **Add new site** → **Import an existing project**.
3. Connect your GitHub account and select `jaykrish1979/rcmlive`.
4. Leave **Build command** and **Publish directory** blank (it's a static site).
5. Click **Deploy site**.
6. Your site will be live at a `*.netlify.app` URL within seconds.

The `_redirects` file is already present and handles clean URL routing automatically.
