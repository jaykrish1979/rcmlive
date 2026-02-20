/**
 * phase-help-data.js
 * Detailed phase-level documentation displayed in help-phase.html.
 * Keys match the section IDs in data.js (phase-1, phase-2, etc.).
 */

var PHASE_HELP = {

  'phase-1': {
    phase:   'Phase 1',
    title:   'Service Scope Definition',
    content: `
<h2>Overview</h2>
<p>Phase 1 establishes the operational foundation for the entire RCM engagement. Clearly defining service scope prevents scope creep, aligns team expectations, and ensures the right resources are assigned from day one.</p>

<h2>Key Objectives</h2>
<ul>
  <li>Identify all specialties and service lines included in the RCM engagement.</li>
  <li>Confirm the claim types to be processed (Professional CMS-1500, Institutional UB-04, or both).</li>
  <li>Define the full revenue cycle scope — front-end (eligibility, registration, authorisation), mid-cycle (coding, charge capture), and back-end (claim submission, AR follow-up, denials, posting).</li>
  <li>Document payer mix and identify highest-volume / highest-risk payers.</li>
  <li>Establish the contractual obligations, SLAs, and reporting requirements agreed with the client.</li>
</ul>

<h2>Service Line Considerations</h2>
<p>Different specialties carry unique billing nuances. For example:</p>
<ul>
  <li><strong>Primary Care / Family Medicine:</strong> High E&amp;M volume, strong focus on eligibility verification and patient financial responsibility.</li>
  <li><strong>Surgery / Procedures:</strong> Complex coding (CPT, modifiers), prior authorisation, and operative report review are critical.</li>
  <li><strong>Radiology / Pathology:</strong> Global vs professional billing split, technical component vs professional component.</li>
  <li><strong>Mental Health / Behavioral:</strong> Specific payer limitations, session limits, and managed care plan rules.</li>
  <li><strong>DME / Home Health:</strong> HCPCS coding, certificate of medical necessity (CMN), and Medicare documentation requirements.</li>
</ul>

<h2>Payer Mix Analysis</h2>
<p>Understanding the payer mix early allows the team to prioritise:</p>
<ul>
  <li>EDI enrollment and ERA/EFT setup for top payers by volume.</li>
  <li>Payer-specific training for billing rules, timely filing deadlines, and appeal processes.</li>
  <li>Contract rate review and underpayment tracking for major commercial payers.</li>
</ul>

<h2>HIPAA &amp; Contractual Requirements</h2>
<p>Before any PHI is shared, ensure:</p>
<ul>
  <li>A signed Business Associate Agreement (BAA) is in place with the client.</li>
  <li>The Statement of Work (SOW) clearly documents the scope, pricing, SLAs, and escalation procedures.</li>
  <li>Data handling obligations, breach notification timelines, and audit rights are documented.</li>
</ul>

<h2>Deliverables</h2>
<ul>
  <li>Signed client contract and BAA</li>
  <li>Service scope document (specialties, claim types, payer list)</li>
  <li>Completed Phase 1 checklist in the portal</li>
</ul>`
  },

  'phase-2': {
    phase:   'Phase 2',
    title:   'Office Setup',
    content: `
<h2>Overview</h2>
<p>Phase 2 covers the physical and operational infrastructure needed to run an offshore RCM operation from Kerala, India. A well-planned office setup directly impacts productivity, data security, and client confidence.</p>

<h2>Location Selection</h2>
<p>For a healthcare BPO in Kerala, the following locations are recommended for evaluation:</p>
<ul>
  <li><strong>Infopark, Kochi (Kakkanad):</strong> Established IT/ITES park, good connectivity, available co-working and dedicated spaces, talent pool proximity.</li>
  <li><strong>Technopark, Thiruvananthapuram:</strong> Larger campus, cost-effective, suitable for larger teams.</li>
  <li><strong>Cyberpark, Kozhikode:</strong> Emerging IT hub, lower costs, good for satellite operations.</li>
  <li><strong>Custom office space:</strong> For mature operations seeking full branding and infrastructure control.</li>
</ul>

<h2>Infrastructure Requirements</h2>
<ul>
  <li><strong>Workstations:</strong> Dedicated billing workstations with sufficient RAM (16GB+), SSD storage, and dual monitors recommended for billers and coders.</li>
  <li><strong>Internet:</strong> Primary fiber connection (100 Mbps+) with a secondary ISP as failover. Static IPs required for VPN whitelisting.</li>
  <li><strong>VPN:</strong> Site-to-site or user VPN to client systems. Client must whitelist Kochi IP ranges.</li>
  <li><strong>Physical security:</strong> Access card entry, CCTV coverage, clean-desk policy for PHI-handling areas.</li>
  <li><strong>Power:</strong> UPS and generator backup for all critical systems.</li>
</ul>

<h2>Cost Estimation (Indicative)</h2>
<ul>
  <li>Co-working seat: ₹8,000–₹15,000/month per seat (Infopark)</li>
  <li>Dedicated office (1,000–1,500 sq ft): ₹40,000–₹80,000/month</li>
  <li>Workstation (desktop + monitor): ₹60,000–₹80,000 one-time</li>
  <li>Primary internet (100 Mbps leased line): ₹15,000–₹25,000/month</li>
  <li>Security setup (CCTV, access cards): ₹50,000–₹1,00,000 one-time</li>
</ul>

<h2>HIPAA Physical Safeguards</h2>
<p>The physical workspace must comply with HIPAA physical safeguard requirements:</p>
<ul>
  <li>Workstation screens must not be visible to non-authorised personnel.</li>
  <li>Printed documents containing PHI must be shredded immediately after use.</li>
  <li>Physical access to the billing area must be restricted to authorised staff only.</li>
  <li>Visitors must be escorted at all times in PHI-handling areas.</li>
</ul>

<h2>Deliverables</h2>
<ul>
  <li>Signed office lease or co-working agreement</li>
  <li>IT infrastructure procurement and setup</li>
  <li>Internet and VPN connectivity confirmed</li>
  <li>Physical security measures in place</li>
  <li>Completed Phase 2 checklist in the portal</li>
</ul>`
  }
};
