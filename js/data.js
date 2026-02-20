/**
 * data.js
 * Central data store — defines all 10 phases with their checklist items.
 * Referenced by dashboard.js and section.js.
 */

var RCM_SECTIONS = [
  {
    id: 'phase-1',
    phase: 'Phase 1',
    title: 'Service Scope Definition',
    description: 'Define the operational scope, range of services, and specialties to be handled as part of the RCM setup.',
    hasHelp: true,
    groups: [
      {
        title: 'Service Lines & Specialties',
        items: [
          'Define billing specialties and service lines to be covered',
          'Document payer mix: Commercial, Medicare, Medicaid, Self-pay',
          'Identify in-scope vs out-of-scope billing activities',
          'Confirm claim types: Professional (CMS-1500) and/or Institutional (UB-04)',
          'Define geographic service area and state-specific requirements'
        ]
      },
      {
        title: 'Operational Scope',
        items: [
          'Determine full-cycle vs partial RCM scope (front-end, mid-cycle, back-end)',
          'Define eligibility verification responsibilities',
          'Define prior authorisation workflow ownership',
          'Establish charge capture and coding responsibilities',
          'Confirm collections and patient billing scope'
        ]
      },
      {
        title: 'Contractual & Compliance',
        items: [
          'Review client contract and Statement of Work (SOW)',
          'Identify HIPAA Business Associate Agreement (BAA) requirements',
          'Confirm applicable state compliance requirements',
          'Define reporting and SLA obligations to client',
          'Document escalation and dispute resolution procedures'
        ]
      }
    ]
  },
  {
    id: 'phase-2',
    phase: 'Phase 2',
    title: 'Office Setup',
    description: 'Plan and execute the physical and operational office infrastructure required to support the RCM operation.',
    hasHelp: true,
    groups: [
      {
        title: 'Facility Planning',
        items: [
          'Identify and shortlist office locations (consider Infopark, Technopark, etc.)',
          'Evaluate co-working space vs dedicated office',
          'Calculate space requirements based on team size and growth plan',
          'Finalize office lease / agreement',
          'Plan office layout: billing stations, supervisor area, training room'
        ]
      },
      {
        title: 'Cost Estimation',
        items: [
          'Estimate monthly rent and utility costs',
          'Budget for furniture, workstations, and equipment',
          'Plan IT infrastructure budget (desktops, servers, networking)',
          'Include software licensing costs in budget',
          'Calculate per-seat cost and present to management'
        ]
      },
      {
        title: 'IT & Connectivity',
        items: [
          'Arrange high-speed internet (primary + redundant ISP)',
          'Plan VPN setup for secure client connectivity',
          'Deploy firewalls and endpoint security',
          'Set up LAN/Wi-Fi infrastructure',
          'Test connectivity speeds and failover'
        ]
      }
    ]
  },
  {
    id: 'phase-3',
    phase: 'Phase 3',
    title: 'Discovery & Information Gathering',
    description: 'Capture all client details, system information, payer contracts, and compliance documentation.',
    hasHelp: false,
    groups: [
      {
        title: 'Client Information',
        items: [
          'Collect client NPI (Individual and Group), Tax ID, and PTAN',
          'Gather provider credentialing documents',
          'Document practice specialties and provider roster',
          'Obtain payer contracts and fee schedules',
          'Identify client contacts: billing manager, office manager, physicians'
        ]
      },
      {
        title: 'Systems & Technology Audit',
        items: [
          'Identify current Practice Management System (PMS)',
          'Document EHR/EMR in use and version',
          'Review existing clearinghouse setup and enrollments',
          'Identify current billing workflows and bottlenecks',
          'Document current AR aging and denial rates'
        ]
      },
      {
        title: 'Payer Information',
        items: [
          'List all active payer contracts with contract numbers',
          'Identify payers requiring EDI enrollment',
          'Document ERA/EFT enrollment status per payer',
          'Note payer-specific billing rules and requirements',
          'Identify capitation vs fee-for-service contracts'
        ]
      }
    ]
  },
  {
    id: 'phase-4',
    phase: 'Phase 4',
    title: 'Systems & Technology',
    description: 'Configure and test all technical systems required for end-to-end RCM operations.',
    hasHelp: false,
    groups: [
      {
        title: 'Practice Management & EHR',
        items: [
          'Configure PMS with client settings, provider profiles, and fee schedules',
          'Set up user accounts and role-based access controls',
          'Configure payer insurance tables and claim defaults',
          'Test patient registration and scheduling workflows',
          'Validate charge capture and superbill setup'
        ]
      },
      {
        title: 'Clearinghouse & EDI',
        items: [
          'Set up clearinghouse account and link to PMS',
          'Complete EDI enrollment for all major payers',
          'Configure ERA/EFT enrollment and testing',
          'Test claim submission (837P/837I) and receipt of 277/999 acknowledgments',
          'Validate ERA (835) posting and reconciliation'
        ]
      },
      {
        title: 'VPN & Security',
        items: [
          'Configure VPN connection to client systems',
          'Test remote access to client PMS/EHR',
          'Install and configure endpoint protection on all workstations',
          'Set up multi-factor authentication (MFA) for system access',
          'Document all access credentials in secure vault'
        ]
      }
    ]
  },
  {
    id: 'phase-5',
    phase: 'Phase 5',
    title: 'SOPs & Compliance',
    description: 'Document all standard operating procedures and ensure full HIPAA and payer compliance readiness.',
    hasHelp: false,
    sopPage: '/sop-phase5.html',
    groups: [
      {
        title: 'Standard Operating Procedures',
        items: [
          'Complete SOP-001: Insurance Eligibility Verification',
          'Complete SOP-002: Patient Registration & Demographics',
          'Complete SOP-003: Medical Coding Compliance (ICD-10/CPT)',
          'Complete SOP-004: Claim Submission & Payer Follow-up',
          'Complete SOP-005: HIPAA Compliance & PHI Protection',
          'Complete SOP-006: Denial Management & Appeals',
          'Complete SOP-007: Payment Posting & Reconciliation',
          'Complete SOP-008: Business Associate Agreement Management'
        ]
      },
      {
        title: 'HIPAA & Compliance',
        items: [
          'Execute BAAs with all applicable vendors and sub-contractors',
          'Complete HIPAA training for all staff',
          'Implement PHI access controls and audit logging',
          'Document data breach response plan',
          'Conduct HIPAA risk assessment and document findings'
        ]
      },
      {
        title: 'Quality & Audit',
        items: [
          'Define coding audit schedule (monthly internal audit)',
          'Set up denial tracking log and root cause analysis process',
          'Establish billing accuracy benchmarks',
          'Create escalation matrix for compliance issues',
          'Schedule first compliance review for 30 days post go-live'
        ]
      }
    ]
  },
  {
    id: 'phase-6',
    phase: 'Phase 6',
    title: 'Reports & KPIs',
    description: 'Define the reporting framework, KPI targets, and dashboard metrics for ongoing performance management.',
    hasHelp: false,
    groups: [
      {
        title: 'Daily & Weekly Reports',
        items: [
          'Configure daily charge entry and claim submission reports',
          'Set up daily denial report by reason code',
          'Define weekly AR aging report (by payer and by aging bucket)',
          'Create collections and cash posting daily reconciliation report',
          'Build weekly productivity report by biller and coder'
        ]
      },
      {
        title: 'KPI Targets',
        items: [
          'Set Clean Claim Rate target (≥ 95%)',
          'Set Days in AR target (Commercial < 40 days, Medicare < 30 days)',
          'Set Denial Rate target (< 5%)',
          'Set Collection Rate target (≥ 96% of net collectible)',
          'Set First Pass Resolution Rate target (≥ 90%)'
        ]
      },
      {
        title: 'Dashboards & Monitoring',
        items: [
          'Build executive-level RCM scorecard',
          'Configure automated report distribution to client',
          'Set up denial trending dashboard',
          'Establish monthly performance review cadence',
          'Define escalation thresholds for KPI breaches'
        ]
      }
    ]
  },
  {
    id: 'phase-7',
    phase: 'Phase 7',
    title: 'Staffing & Training',
    description: 'Recruit, onboard, and train the revenue cycle team to full operational readiness.',
    hasHelp: false,
    groups: [
      {
        title: 'Recruitment',
        items: [
          'Define staffing plan and team structure',
          'Post job openings: billers, coders, AR callers, team lead',
          'Screen and interview candidates against defined skill requirements',
          'Verify certifications (CPC, CCS, CBCS) where required',
          'Complete background checks and reference verification'
        ]
      },
      {
        title: 'Onboarding',
        items: [
          'Complete HR onboarding and system access provisioning',
          'Conduct HIPAA and compliance training for all new hires',
          'Issue and secure signed confidentiality and NDA agreements',
          'Assign workstations and system logins',
          'Introduce team to SOPs and workflow documentation'
        ]
      },
      {
        title: 'Training',
        items: [
          'Train team on PMS/EHR navigation and billing workflows',
          'Conduct specialty-specific coding training',
          'Train AR team on payer portals and follow-up procedures',
          'Run mock billing scenarios and assess competency',
          'Certify team as ready for go-live production'
        ]
      }
    ]
  },
  {
    id: 'phase-8',
    phase: 'Phase 8',
    title: 'Pilot & Soft Go-Live',
    description: 'Execute a controlled pilot run with live claims and refine processes before full go-live.',
    hasHelp: false,
    groups: [
      {
        title: 'Pilot Preparation',
        items: [
          'Select pilot provider(s) or service line for initial go-live',
          'Confirm all system configurations are complete and tested',
          'Verify payer enrollments are active for pilot payers',
          'Brief client on pilot scope, timeline, and escalation contacts',
          'Confirm test claim submission and response cycles completed'
        ]
      },
      {
        title: 'Soft Go-Live Execution',
        items: [
          'Begin live charge capture and claim submission for pilot accounts',
          'Monitor daily claim acceptance rates and rejection queues',
          'Track first EOB/ERA receipts and validate payment posting',
          'Conduct daily team huddles to surface and resolve issues',
          'Document all issues in go-live issue log with resolution status'
        ]
      },
      {
        title: 'Sign-Off & Transition',
        items: [
          'Compile pilot performance metrics and present to client',
          'Obtain formal sign-off on go-live readiness',
          'Transition from parallel to full production billing',
          'Notify all stakeholders of successful go-live',
          'Initiate 30-day post-go-live monitoring plan'
        ]
      }
    ]
  },
  {
    id: 'phase-9',
    phase: 'Phase 9',
    title: 'Risks & Mitigation',
    description: 'Identify, assess, and plan mitigation strategies for key operational and compliance risks.',
    hasHelp: false,
    groups: [
      {
        title: 'Risk Identification',
        items: [
          'Document risk register for all identified operational risks',
          'Assess payer credentialing and enrollment delay risks',
          'Identify staff turnover and knowledge retention risks',
          'Assess technology failure and data security risks',
          'Document regulatory and compliance change risks'
        ]
      },
      {
        title: 'Mitigation Planning',
        items: [
          'Assign risk owner and mitigation action for each risk item',
          'Create contingency plan for key staff absence',
          'Establish backup internet and system failover procedures',
          'Plan cross-training program to reduce single points of failure',
          'Set up regular risk review cadence (monthly)'
        ]
      },
      {
        title: 'Monitoring & Controls',
        items: [
          'Implement audit log monitoring for PHI access',
          'Set up real-time alerts for claim rejection spikes',
          'Establish payer enrollment status monitoring',
          'Create KPI exception reporting and escalation triggers',
          'Document lessons learned from pilot phase'
        ]
      }
    ]
  },
  {
    id: 'phase-10',
    phase: 'Phase 10',
    title: 'Office Setup & Capacity Planning',
    description: 'Finalize long-term office capacity, infrastructure scaling, and location planning for growth.',
    hasHelp: false,
    groups: [
      {
        title: 'Location & Infrastructure',
        items: [
          'Finalize office location selection (Infopark, Technopark, or other)',
          'Complete detailed cost comparison across shortlisted locations',
          'Negotiate and execute final office lease agreement',
          'Complete office build-out, furniture, and workstation setup',
          'Commission IT infrastructure: servers, networking, security cameras'
        ]
      },
      {
        title: 'Capacity Planning',
        items: [
          'Map current headcount to current client volume',
          'Build 12-month hiring forecast based on client pipeline',
          'Define seat-to-staff ratios and space expansion triggers',
          'Plan for shift coverage to support US time zone alignment',
          'Estimate infrastructure scaling costs for projected growth'
        ]
      },
      {
        title: 'Business Continuity',
        items: [
          'Document Business Continuity Plan (BCP) for office operations',
          'Define remote/hybrid work policies for disaster scenarios',
          'Establish data backup and disaster recovery procedures',
          'Test BCP scenarios and document results',
          'Obtain management approval of finalized BCP'
        ]
      }
    ]
  }
];
