/* YemScan — Academic Graduation Project Presentation Engine
   University of Science and Technology · Faculty of Computing and Information Technology
   Cybersecurity & Networking · Academic Year 2026-2027
   Supervised by: Dr. Aisha Al-Hadm
   Team: Mohammed Saleh Hatem, Nassar Ahmed Al-Fattahi, Mohammed Abdulwahid Alrubaidi,
         Younes Mohammed Alsarory, Abdulmajid Abulkarim Anqa
*/
(function(){
'use strict';

let L = localStorage.getItem('ys_lang') || 'en';
let cur = -1; // -1: Cover screen, 0..N: Slides
let simTimer = null;

const tr = (en, ar) => (L === 'ar' ? ar : en);
const A = (i, html, cls) => `<div class="${cls || ''} anim" style="--i:${i}">${html}</div>`;

const I18N = {
  headerContext: {
    en: 'UST · Cybersecurity & Networking · 2026-2027',
    ar: 'جامعة العلوم والتكنولوجيا · الأمن السيبراني والشبكات · 2026-2027'
  },
  uniName: {
    en: 'University of Science and Technology · Faculty of Computing and Information Technology',
    ar: 'جامعة العلوم والتكنولوجيا · كلية الحاسبات وتكنولوجيا المعلومات'
  },
  uniDept: {
    en: 'Department of Computer Science · Major: Cybersecurity and Networking',
    ar: 'قسم علوم الحاسوب · تخصص: الأمن السيبراني والشبكات'
  },
  heroFullTitle: {
    en: 'Yemeni Web Attack and Vulnerability Scanner (YemScan)',
    ar: 'الماسح اليمني لفحص ثغرات وهجمات الويب (YemScan)'
  },
  heroDesc: {
    en: 'An integrated external black-box security scanning and reconnaissance platform with multi-tool orchestration, security-reference enrichment, AES-256-GCM encrypted storage, and Gemini AI-assisted analysis.',
    ar: 'منصة متكاملة ومؤتمتة لاستطلاع وفحص أمن تطبيقات الويب (Black-Box)، تجمع بين تنسيق الأدوات المتعددة، الإثراء المرجعي للثغرات، التخزين المشفر بـ AES-256-GCM، والتحليل المدعوم بذكاء Gemini.'
  },
  corePipeline: { en: 'Workflow Pipeline', ar: 'مسار العمل المقترح' },
  projectTeam: { en: 'Project Team Members', ar: 'فريق عمل المشروع' },
  supervisorLbl: { en: 'Supervised By', ar: 'إشراف الدكتورة' },
  academicYear: { en: 'Academic Year', ar: 'العام الجامعي' },
  startBtn: { en: 'Start Presentation', ar: 'ابدأ العرض' },
  startText: { en: 'Start Presentation', ar: 'ابدأ العرض التقديمي' },
  disclaimerCover: {
    en: '⚠️ Academic Defense Presentation · All security tool workflows are conceptual/simulated · No real targets are scanned',
    ar: '⚠️ عرض مناقشة مشروع تخرج · جميع عمليات الفحص محاكاة تعليمية وتوضيحية للمسار المقترح · لا يتم استهداف أو فحص أي أهداف حقيقية'
  },
  overview: { en: 'Overview', ar: 'الفهرس' },
  overviewTitle: { en: 'Slide Overview & Navigation', ar: 'فهرس شرائح العرض والتنقل السريع' },
  overviewSub: { en: 'Click on any slide to jump directly to that section', ar: 'انقر على أي شريحة للانتقال المباشر إليها أثناء المناقشة' },
  close: { en: 'Close', ar: 'إغلاق' },
  prev: { en: 'Prev', ar: 'السابق' },
  next: { en: 'Next', ar: 'التالي' },
  reduceMotion: { en: 'Reduce Motion', ar: 'تقليل الحركة' },
  jumpTo: { en: 'Slide', ar: 'شريحة' },
  shortcutsTitle: { en: 'Keyboard Shortcuts', ar: 'اختصارات لوحة المفاتيح' }
};

/* ============================================================
   SLIDE DEFINITIONS (20 Highly Detailed Academic Slides)
============================================================ */
const S = [];
const addSlide = (kicker, title, tagText, tagClass, note, renderFn) => {
  S.push({ kicker, title, tagText, tagClass, note, renderFn });
};

// 1. Introduction & Context
addSlide(
  ['Chapter 1: Introduction', 'الفصل 1: المقدمة'],
  ['Introduction & Threat Landscape', 'المقدمة ومشهد التهديدات المعاصر'],
  ['Context', 'السياق العام'], 'tag-sec',
  ['Accelerating digital transformation expands external exposure, making systematic black-box reconnaissance essential.',
   'تسارع التحول الرقمي يوسع نقاط التعرض الخارجية، مما يجعل الاستطلاع والفحص الصندوق الأسود ضرورة أمنية.'],
  () => `<div class="c-grid-3">
    ${A(0, `<span class="c-card-ic">🌐</span>
      <h3 class="c-card-h">${tr('Expanding Attack Surface', 'توسع سطح الهجوم الخارجي')}</h3>
      <p class="c-card-p">${tr('Modern organizations depend on distributed web apps, exposed APIs, dynamic microservices, and subdomains that form a complex external footprint.',
        'تعتمد المؤسسات على تطبيقات ويب موزعة، واجهات برمجية APIs مكشوفة، ونطاقات فرعية تشكل معاً مساحة هجوم معقدة يصعب تتبعها يدوياً.')}</p>`, 'c-card')}
    
    ${A(1, `<span class="c-card-ic">📊</span>
      <h3 class="c-card-h">${tr('Verizon DBIR 2025 Reality', 'بيانات تقرير الاختراقات 2025')}</h3>
      <p class="c-card-p">${tr('According to the 2025 DBIR, vulnerability exploitation represented an initial access vector in 20% of analyzed breaches (a 34% increase).',
        'وفقاً لتقرير Verizon DBIR 2025، كان استغلال الثغرات مدخل الاختراق الأولي في 20% من الحوادث (بزيادة 34% مقارنة بالتقرير السابق).')}</p>
      <div class="stat-box">
        <div class="stat-num">20%</div>
        <div class="stat-txt"><b>${tr('Initial Access Vector', 'متجه الوصول الأولي')}</b><br>${tr('+34% increase from 2024', '+34% زيادة عن العام السابق')}</div>
      </div>`, 'c-card c-blue')}

    ${A(2, `<span class="c-card-ic">🎯</span>
      <h3 class="c-card-h">${tr('The Black-Box Mandate', 'ضرورة نهج الصندوق الأسود')}</h3>
      <p class="c-card-p">${tr('Organizations require an external perspective: inspecting services and interfaces without source code access to mirror true adversary reconnaissance.',
        'تحتاج المؤسسات إلى فحص أمني بمنظور المهاجم الخارجي (Black-box) دون الوصول للكود المصدري، لاكتشاف الأصول المكشوفة قبل استغلالها.')}</p>`, 'c-card c-violet')}
  </div>`
);

// 2. Problem Statement
addSlide(
  ['Chapter 1: Problem Statement', 'الفصل 1: بيان المشكلة'],
  ['The Core Problem: Fragmentation & Cognitive Load', 'المشكلة الجوهرية: التشتت والعبء الإدراكي'],
  ['Problem', 'المشكلة'], 'tag-prop',
  ['Operating security tools in isolation generates disjointed telemetry and burdensome manual interpretation.',
   'تشغيل الأدوات الأمنية بشكل معزول يولد بيانات متباينة ويتطلب جهداً يدوياً شاقاً لتوحيدها وفهمها.'],
  () => `<div class="c-grid-3">
    ${A(0, `<span class="c-card-ic">🧩</span>
      <h3 class="c-card-h">${tr('Disjointed Multi-Tool Operations', 'تشتت الأدوات الأمنية')}</h3>
      <p class="c-card-p">${tr('Subdomain discovery, port scanning, API mapping, and vulnerability scanning are performed using separate standalone CLI utilities.',
        'تُجرى عمليات اكتشاف النطاقات الفرعية، مسح المنافذ، كشف الـ APIs، وفحص الثغرات عبر أدوات منفصلة لكل منها بيئة تشغيل خاصة.')}</p>
      <ul class="c-card-list">
        <li>${tr('Manual input/output chaining', 'نقل يدوي للمخرجات بين الأدوات')}</li>
        <li>${tr('High risk of human execution errors', 'عرضة للأخطاء البشرية والتأخير')}</li>
      </ul>`, 'c-card')}

    ${A(1, `<span class="c-card-ic">📑</span>
      <h3 class="c-card-h">${tr('Heterogeneous Data Formats', 'تباين صيغ المخرجات والنتائج')}</h3>
      <p class="c-card-p">${tr('Each security tool outputs arbitrary schema: raw text logs, non-standard JSON, or XML without standardized vulnerability correlation.',
        'تنتج كل أداة صيغاً متباينة (نصوص خام، JSON غير متجانس، أو XML) يصعب دمجها أو مقارنتها أو استخلاص صورة موحدة منها.')}</p>
      <ul class="c-card-list">
        <li>${tr('Redundant duplicate findings', 'تكرار النتائج بين الأدوات')}</li>
        <li>${tr('No standard risk classification', 'غياب تصنيف مخاطر موحد')}</li>
      </ul>`, 'c-card c-amber')}

    ${A(2, `<span class="c-card-ic">🧠</span>
      <h3 class="c-card-h">${tr('Lack of Context & Actionability', 'غياب السياق وإرشادات الحل')}</h3>
      <p class="c-card-p">${tr('Raw vulnerability outputs lack authoritative reference mappings (CVE/CWE/CVSS/OWASP) and concise remediation guidance for IT teams.',
        'تفتقر النتائج المباشرة إلى الربط المرجعي الموثوق وإرشادات المعالجة الواضحة القابلة للتطبيق العملي من فرق التطوير.')}</p>
      <ul class="c-card-list">
        <li>${tr('Difficult for non-security developers', 'صعوبة التفسير لغير المختصين')}</li>
        <li>${tr('Delayed remediation decisions', 'تأخر معالجة الثغرات الخطرة')}</li>
      </ul>`, 'c-card c-red')}
  </div>`
);

// 3. Project Idea & Paradigm
addSlide(
  ['Chapter 1: The Solution', 'الفصل 1: الفكرة والحل'],
  ['The YemScan Idea: Unified Autonomous Orchestration', 'فكرة YemScan: منصة موحدة لتنسيق الفحص الأمني'],
  ['Proposed Idea', 'الفكرة المقترحة'], 'tag-demo',
  ['A 6-phase pipeline that unifies discovery, scanning, normalization, enrichment, AI analysis, and reporting.',
   'مسار متكامل من 6 مراحل يجمع بين الاكتشاف، الفحص، المعالجة، الإثراء، التحليل الذكي، والتقارير.'],
  () => {
    const steps = [
      ['01', '🔭', 'Discover', 'اكتشاف', 'Subdomains & Ports', 'النطاقات والمنافذ'],
      ['02', '📡', 'Scan', 'فحص', 'Web & API Vulnerabilities', 'ثغرات الويب والـ APIs'],
      ['03', '⚙️', 'Process', 'معالجة', 'Normalize & Deduplicate', 'التوحيد وإلغاء التكرار'],
      ['04', '🏷️', 'Enrich', 'إثراء', 'CVE · CWE · CVSS · OWASP', 'ربط المراجع القياسية'],
      ['05', '🧠', 'Analyze', 'تحليل', 'Gemini AI Intelligence', 'تحليل ذكاء Gemini'],
      ['06', '📑', 'Report', 'تقرير', 'Executive & Technical', 'تقارير تنفيذية وفنية']
    ];
    return `<div class="c-col" style="align-items:center; gap:20px;">
      <div class="pipeline-flow">
        ${steps.map((s, idx) => (idx ? '<div class="pipe-conn">➜</div>' : '') +
          A(idx, `<div class="pn-step">PHASE ${s[0]}</div>
            <span class="pn-ic">${s[1]}</span>
            <div class="pn-title">${tr(s[2], s[3])}</div>
            <div class="pn-sub">${tr(s[4], s[5])}</div>`, 'pipe-node')).join('')}
      </div>
      <div class="stat-box" style="width:100%; max-width:920px;">
        <span style="font-size:32px;">💡</span>
        <div class="stat-txt">
          <b>${tr('The YemScan Paradigm:', 'جوهر مفهوم YemScan:')}</b> 
          ${tr('Transform disconnected CLI executions into a streamlined, encrypted, multi-tier intelligence pipeline where verified references remain authoritative, and AI serves strictly as an interpretive co-pilot.',
              'تحويل الأدوات المنفصلة إلى مسار أمني موحد ومحمي بتشفير AES-256-GCM، بحيث تظل المراجع الأمنية هي المرجع المعتمد، ويكون الذكاء الاصطناعي مساعداً تفسيرياً وإرشادياً.')}
        </div>
      </div>
    </div>`;
  }
);

// 4. Project Significance
addSlide(
  ['Chapter 1: Significance', 'الفصل 1: أهمية المشروع'],
  ['Project Significance Across Four Dimensions', 'أهمية المشروع وأبعاده الأربعة'],
  ['Significance', 'الأهمية'], 'tag-prop',
  ['YemScan addresses critical operational, technical, security, and research requirements.',
   'يقدم YemScan حلولاً لأبعاد أمنية وتقنية وبحثية وعملية جوهرية.'],
  () => `<div class="c-grid-4">
    ${A(0, `<span class="c-card-ic">🛡️</span>
      <h3 class="c-card-h">${tr('1. Security Significance', '1. الأهمية الأمنية')}</h3>
      <p class="c-card-p">${tr('Comprehensive external visibility into forgotten subdomains and shadow APIs, reducing attack surface exposure and supporting evidence-based risk prioritization.',
        'رؤية شاملة للأصول الرقمية والواجهات المهملة، مما يقلص سطح الهجوم ويدعم تحديد أولويات المخاطر.')}</p>`, 'c-card')}

    ${A(1, `<span class="c-card-ic">⚙️</span>
      <h3 class="c-card-h">${tr('2. Technical Significance', '2. الأهمية التقنية')}</h3>
      <p class="c-card-p">${tr('Containerized execution, structured normalization in PostgreSQL, and cryptographically verified storage using AES-256-GCM and envelope encryption.',
        'بيئة تنفيذ معزولة عبر Docker، توحيد البيانات في PostgreSQL، وتشفير معتمد بـ AES-256-GCM وتشفير المغلف.')}</p>`, 'c-card c-blue')}

    ${A(2, `<span class="c-card-ic">🔬</span>
      <h3 class="c-card-h">${tr('3. Research Significance', '3. الأهمية البحثية')}</h3>
      <p class="c-card-p">${tr('Demonstrates an applied blueprint for integrating open-source security tools with automated reference enrichment and an AI reasoning co-pilot.',
        'تقديم نموذج تطبيقي متكامل يدمج أدوات المصدر المفتوح مع الإثراء المرجعي وطبقة التحليل الذكي التفسيري.')}</p>`, 'c-card c-violet')}

    ${A(3, `<span class="c-card-ic">⏱️</span>
      <h3 class="c-card-h">${tr('4. Practical Significance', '4. الأهمية العملية')}</h3>
      <p class="c-card-p">${tr('Radical reduction in operational overhead for security teams, bridging the communication gap between technical findings and executive decision makers.',
        'تقليص جذري للوقت والجهد المبذول، وسد الفجوة بين التفاصيل الفنية المعقدة والقرارات التنفيذية العليا.')}</p>`, 'c-card c-amber')}
  </div>`
);

// 5. Main & Specific Objectives
addSlide(
  ['Chapter 1: Objectives', 'الفصل 1: الأهداف'],
  ['Main & Specific Project Objectives', 'أهداف المشروع: الهدف الرئيسي والأهداف المحددة'],
  ['Objectives', 'الأهداف'], 'tag-prop',
  ['Clear, measurable objectives covering discovery, black-box scanning, enrichment, AI, encryption, and reporting.',
   'أهداف واضحة تغطي الاستكشاف، الفحص، المعالجة، الإثراء، الذكاء الاصطناعي، التشفير، والتقارير.'],
  () => `<div class="c-grid-2">
    ${A(0, `<h3 class="c-card-h" style="color:var(--teal); font-size:20px;">🎯 ${tr('Main Project Objective', 'الهدف الرئيسي للمشروع')}</h3>
      <p class="c-card-p" style="font-size:15px; margin-bottom:12px;">${tr('To develop the YemScan platform for discovering and inventorying externally exposed digital assets and services, conducting security scans using a black-box approach, and processing, enriching, and analyzing scanning results in a structured manner to support the provision of appropriate recommendations and the generation of executive and technical reports.',
        'تطوير منصة YemScan لاكتشاف وحصر الأصول والخدمات الرقمية المكشوفة خارجياً، وإجراء الفحوصات الأمنية بنهج الصندوق الأسود، ومعالجة وإثراء وتحليل النتائج بأسلوب مهيكل لدعم تقديم التوصيات وإنتاج التقارير التنفيذية والفنية.')}</p>
      <div class="stat-box" style="margin-top:auto;">
        <span style="font-size:28px;">🔐</span>
        <div class="stat-txt"><b>${tr('AES-256-GCM & Envelope Encryption', 'تشفير AES-256-GCM والمغلف')}</b><br>${tr('Ensuring user-level data isolation & integrity', 'ضمان عزل بيانات الفحص وسريتها التامة')}</div>
      </div>`, 'c-card')}

    ${A(1, `<h3 class="c-card-h" style="color:var(--blue); font-size:20px;">📋 ${tr('Specific Operational Objectives', 'الأهداف التشغيلية المحددة')}</h3>
      <ul class="c-card-list" style="font-size:13px; line-height:1.7;">
        <li><b>${tr('1. Asset & Service Discovery:', '1. اكتشاف الأصول:')}</b> ${tr('Automate inventory of subdomains, open ports, and API paths.', 'أتمتة اكتشاف النطاقات الفرعية، المنافذ، ونقاط الـ API.')}</li>
        <li><b>${tr('2. Black-Box Scanning:', '2. الفحص الخارجي:')}</b> ${tr('Orchestrate tools in Sequential and Independent scanning modes.', 'تنسيق الأدوات بنمطي الفحص المتسلسل والمستقل.')}</li>
        <li><b>${tr('3. Data Processing & Enrichment:', '3. معالجة وإثراء البيانات:')}</b> ${tr('Deduplicate and map findings to CVE, CWE, CVSS, and OWASP Top 10.', 'إزالة التكرار وربط النتائج بمراجع CVE وCWE وCVSS وOWASP.')}</li>
        <li><b>${tr('4. AI-Based Remediation Analysis:', '4. التحليل الذكي:')}</b> ${tr('Deploy Gemini AI for plain-language interpretation and prioritization.', 'توظيف Gemini AI للشرح المبسط وتحديد أولويات المعالجة.')}</li>
        <li><b>${tr('5. Secure Dashboard & Cryptographic Access:', '5. الواجهة الآمنة والتشفير:')}</b> ${tr('RBAC isolation, user data privacy, and per-scan DEK/KEK encryption.', 'إدارة صلاحيات RBAC وعزل بيانات المستخدمين بمفاتيح DEK/KEK.')}</li>
        <li><b>${tr('6. Automated Dual-Format Reporting:', '6. إعداد التقارير:')}</b> ${tr('Produce Executive summaries and detailed Technical remediation reports.', 'توليد تقارير تنفيذية وفنية مؤتمتة ومشفرة.')}</li>
      </ul>`, 'c-card c-blue')}
  </div>`
);

// 6. External Attack Surface Mapping
addSlide(
  ['Chapter 2: Attack Surface', 'الفصل 2: سطح الهجوم'],
  ['External Attack Surface Decomposition', 'تفكيك سطح الهجوم الخارجي للويب'],
  ['Architecture', 'سطح الهجوم'], 'tag-prop',
  ['Reconnaissance precedes scanning: mapping every external digital entity that an attacker could reach.',
   'الاستطلاع يسبق الفحص: حصر كافة الكيانات الرقمية الخارجية التي يمكن أن يصل إليها المهاجم.'],
  () => {
    const nodes = [
      [683, 190, 'Primary Domain', 'النطاق الأساسي', 'Root Target Entry', 'نقطة البداية', true],
      [220, 70, 'Subdomains', 'النطاقات الفرعية', 'Subfinder Passive Recon', 'اكتشاف سلبي'],
      [220, 310, 'IPs & Hosts', 'العناوين والمستضيفات', 'Resolved DNS Records', 'سجلات DNS'],
      [683, 40, 'Open Ports', 'المنافذ المفتوحة', 'Naabu Fast Probing', 'فحص المنافذ السريع'],
      [683, 340, 'Live Web Services', 'خدمات الويب الحية', 'httpx HTTP/S Probing', 'التحقق من الخدمات النشطة'],
      [1146, 70, 'Endpoints & Forms', 'الصفحات والنماذج', 'Wapiti Input Crawler', 'زحف واستكشاف المدخلات'],
      [1146, 310, 'API Routes', 'مسارات الواجهات البرمجية', 'Kiterunner Wordlists', 'كشف مسارات API المخفية']
    ];
    const lines = nodes.slice(1).map(n => `<line x1="683" y1="190" x2="${n[0]}" y2="${n[1]}"/>`).join('');
    return `<div class="surface-map">
      <svg viewBox="0 0 1366 380">${lines}</svg>
      ${nodes.map((n, idx) => `<div class="map-node ${n[6] ? 'hub' : ''} anim" style="--i:${idx}; left:${n[0]}px; top:${n[1]}px;">
        <div class="map-node-h">${tr(n[2], n[3])}</div>
        <div class="map-node-sub">${tr(n[4], n[5])}</div>
      </div>`).join('')}
    </div>`;
  }
);

// 7. Methodology (Agile & DSR Principles)
addSlide(
  ['Chapter 1: Methodology', 'الفصل 1: المنهجية'],
  ['Iterative Development Methodology (Agile)', 'منهجية التطوير التكرارية (Agile)'],
  ['Methodology', 'المنهجية'], 'tag-prop',
  ['An iterative 6-phase engineering lifecycle adapting to findings, feedback, and security constraints.',
   'دورة حياة هندسية تكرارية من 6 مراحل تتكيف مع النتائج والتغذية الراجعة والضوابط الأمنية.'],
  () => {
    const phases = [
      ['01', 'Planning', 'التخطيط وتحديد المتطلبات', 'Define scope, tools, functional/non-functional needs, and security constraints.', 'تحديد النطاق والأدوات والمتطلبات الوظيفية والأمنية.'],
      ['02', 'System Design', 'تصميم النظام والمعمارية', 'Architect 5 layers, ERD schema, AES-256-GCM envelope encryption, and workflows.', 'تصميم الطبقات الـ5، مخطط ERD، وتشفير المغلف ومسار العمل.'],
      ['03', 'Development', 'التطوير التكراري', 'Implement FastAPI backend, React dashboard, tool workers, and Gemini integration.', 'بناء الواجهة الخلفية FastAPI والأمامية React وتكامل الأدوات والذكاء.'],
      ['04', 'Testing', 'الاختبار والتكامل', 'Verify tool execution, data normalization, authorized decryption, and performance.', 'اختبار تشغيل الأدوات، توحيد البيانات، وفك التشفير المصرح به.'],
      ['05', 'Deployment', 'النشر والتشغيل', 'Containerize components in Docker and evaluate in controlled pilot environments.', 'نشر المكونات داخل حاويات Docker والتقييم في بيئات تجريبية.'],
      ['06', 'Refinement', 'المراجعة والتحسين', 'Analyze results, assess against objectives, and refine platform capabilities.', 'مراجعة النتائج وتقييم تحقيق الأهداف وتطوير المنصة.']
    ];
    return `<div class="c-grid-3">
      ${phases.map((p, idx) => A(idx, `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-family:var(--font-mono); font-size:12px; font-weight:800; color:var(--teal);">STAGE ${p[0]}</span>
          <span style="font-size:16px;">🔄</span>
        </div>
        <h3 class="c-card-h" style="font-size:16px;">${tr(p[1], p[2])}</h3>
        <p class="c-card-p" style="font-size:13px;">${tr(p[3], p[4])}</p>`, 'c-card')).join('')}
    </div>`;
  }
);

// 8. The Proposed Scanning Modes (Sequential vs Independent)
addSlide(
  ['Chapter 3: Execution Modes', 'الفصل 3: أنماط الفحص'],
  ['Flexible Execution: Sequential vs Independent Scanning', 'مرونة التشغيل: الفحص المتسلسل مقابل الفحص المستقل'],
  ['Proposed Design', 'تصميم مقترح'], 'tag-prop',
  ['YemScan supports two modes: structured end-to-end pipeline or selective ad-hoc tool runs.',
   'يدعم YemScan نمطين: مسار متسلسل كامل يعتمد على مخرجات المراحل، أو تشغيل مستقل لأدوات محددة.'],
  () => `<div class="c-grid-2">
    ${A(0, `<div class="c-card-ic">🔄</div>
      <h3 class="c-card-h" style="color:var(--teal); font-size:20px;">${tr('Mode 1: Sequential Scanning', 'النمط 1: الفحص المتسلسل')}</h3>
      <p class="c-card-p" style="font-size:14px; margin-bottom:12px;">${tr('An orchestrated end-to-end pipeline where outputs from each stage are parsed and conditionally supplied as input to the next:',
        'مسار منسق كامل من البداية للنهاية بحيث تمرر مخرجات كل مرحلة كمدخلات مشروطة للمرحلة التالية:')}</p>
      <ul class="c-card-list" style="font-size:13px;">
        <li><b>Subfinder</b> ${tr('discovers subdomains → passed to Naabu', 'يكتشف النطاقات الفرعية ← تمرر لـ Naabu')}</li>
        <li><b>Naabu</b> ${tr('finds open ports → passed to httpx', 'يكتشف المنافذ المفتوحة ← تمرر لـ httpx')}</li>
        <li><b>httpx</b> ${tr('validates active HTTP/S web endpoints', 'يتحقق من الخدمات النشطة ومنافذ الويب')}</li>
        <li><b>Kiterunner</b> ${tr('discovers API routes on live endpoints', 'يكتشف مسارات الـ API في الخدمات الحية')}</li>
        <li><b>Nuclei & Wapiti</b> ${tr('perform targeted vulnerability scanning', 'ينفذان فحص الثغرات المستهدف على الأصول المؤكدة')}</li>
      </ul>
      <div class="stat-box" style="margin-top:14px;">
        <span style="font-size:24px;">🎯</span>
        <div class="stat-txt"><b>${tr('Maximum Coverage & Context', 'أقصى تغطية وسياق')}</b><br>${tr('Eliminates blind spots across the target infrastructure', 'يمنع النقاط العمياء عبر حصر كامل سطح الهدف')}</div>
      </div>`, 'c-card')}

    ${A(1, `<div class="c-card-ic">⚡</div>
      <h3 class="c-card-h" style="color:var(--blue); font-size:20px;">${tr('Mode 2: Independent Scanning', 'النمط 2: الفحص المستقل')}</h3>
      <p class="c-card-p" style="font-size:14px; margin-bottom:12px;">${tr('Allows security analysts to selectively launch individual tools on demand without running the entire reconnaissance sequence:',
        'يتيح لمحلل الأمن تشغيل أداة معينة أو مجموعة أدوات محددة مباشرة بحسب الحاجة دون انتظار كامل المسار:')}</p>
      <ul class="c-card-list" style="font-size:13px;">
        <li>${tr('Targeted ad-hoc port scanning with Naabu', 'فحص منافذ سريع ومستقل باستخدام Naabu')}</li>
        <li>${tr('Rapid specific CVE template checking via Nuclei', 'فحص ثغرة معينة بسرعة عبر قوالب Nuclei المخصصة')}</li>
        <li>${tr('Deep web application input auditing with Wapiti', 'فحص وتدقيق مدخلات الويب المعقدة عبر Wapiti')}</li>
        <li>${tr('Dedicated REST API route enumeration with Kiterunner', 'استكشاف مسارات الـ API فقط عبر Kiterunner')}</li>
      </ul>
      <div class="stat-box" style="margin-top:14px;">
        <span style="font-size:24px;">⏱️</span>
        <div class="stat-txt"><b>${tr('Rapid Focused Investigation', 'تحقيق سريع ومركز')}</b><br>${tr('Saves time and resources for specific validation tasks', 'يوفر الموارد والوقت عند الحاجة للتحقق من هدف معين')}</div>
      </div>`, 'c-card c-blue')}
  </div>`
);

// 9. Interactive Workflow Simulation
addSlide(
  ['Chapter 3: Proposed Method', 'الفصل 3: طريقة العمل المقترحة'],
  ['The Complete YemScan Scanning Workflow', 'مسار الفحص والتحليل المقترح في YemScan'],
  ['Interactive Demo', 'محاكاة توضيحية'], 'tag-demo',
  ['Discover → Scan → Process → Enrich → Analyze → Report. Interactive presentation simulator below.',
   'اكتشاف ← فحص ← معالجة ← إثراء ← تحليل ← تقرير. محاكاة توضيحية تفاعلية للعرض أدناه.'],
  () => {
    const pipeSteps = [
      ['01', '🔭', 'Discovery', 'الاستكشاف', 'Subfinder · Naabu · httpx · Kiterunner (APIs)'],
      ['02', '📡', 'Scanning', 'فحص الثغرات', 'Nuclei & Wapiti (Web & APIs)'],
      ['03', '⚙️', 'Processing', 'المعالجة', 'Normalization & Dedup'],
      ['04', '🏷️', 'Enrichment', 'الإثراء', 'CVE · CWE · CVSS · OWASP'],
      ['05', '🧠', 'AI Analysis', 'التحليل الذكي', 'Gemini 3.8 Flash Reasoning'],
      ['06', '📑', 'Reporting', 'التقارير', 'AES-256-GCM Encrypted Reports']
    ];
    return `<div class="c-col" style="align-items:center; gap:16px;">
      <div class="pipeline-flow" id="wfSimPipe">
        ${pipeSteps.map((s, idx) => (idx ? '<div class="pipe-conn">➜</div>' : '') +
          `<div class="pipe-node" data-sim-idx="${idx}">
            <div class="pn-step">STEP ${s[0]}</div>
            <span class="pn-ic">${s[1]}</span>
            <div class="pn-title">${tr(s[2], s[3])}</div>
            <div class="pn-sub">${s[4]}</div>
          </div>`).join('')}
      </div>

      <div class="sim-console">
        <div class="sim-header">
          <span>YEMSCAN WORKFLOW SIMULATOR (ACADEMIC DEMO)</span>
          <span id="simStatus">IDLE</span>
        </div>
        <div class="sim-output" id="simOutput">
          ${tr('[DEMO] Ready. Click "Simulate Scanning Process" to observe sequential data flow.',
               '[عرض تجريبي] جاهز. انقر على "محاكاة مسار الفحص" لمشاهدة تسلسل تدفق البيانات.')}
        </div>
        <div class="sim-bar"><div class="sim-bar-fill" id="simBarFill"></div></div>
      </div>

      <div style="display:flex; align-items:center; gap:16px; margin-top:2px;">
        <button class="btn-primary" id="simPlayBtn" style="padding:8px 20px; font-size:13px;">
          <span class="btn-ic">▶</span> ${tr('Simulate Scanning Process', 'محاكاة مسار الفحص')}
        </button>
        <span class="disclaimer-mini">
          ⚠️ ${tr('Visual animation only · No real security tools are launched', 'رسم متحرك توضيحي فقط · لا يتم تشغيل أدوات أمنية فعلية')}
        </span>
      </div>
    </div>`;
  }
);

// 10. Integrated Tools & Roles (Table 3.1)
addSlide(
  ['Chapter 3: Toolchain', 'الفصل 3: حزمة الأدوات'],
  ['Integrated Security Tools & Specialized Roles', 'الأدوات الأمنية المدمجة وأدوارها التخصصية'],
  ['Tools & Technologies', 'الأدوات والتقنيات'], 'tag-prop',
  ['Open-source security engines selected based on speed, accuracy, and output versatility.',
   'أدوات أمنية مفتوحة المصدر تم اختيارها بناءً على السرعة والدقة ومرونة المخرجات.'],
  () => {
    const tools = [
      ['Subfinder', 'ProjectDiscovery', 'Reconnaissance', 'اكتشاف النطاقات', 'Passive subdomain enumeration without querying target servers.', 'اكتشاف سلبي للنطاقات الفرعية دون إرسال طلبات للهدف.'],
      ['Naabu', 'ProjectDiscovery', 'Port Scanning', 'فحص المنافذ', 'High-speed SYN/TCP port scanning for open service discovery.', 'مسح منافذ سريع بتقنية SYN/TCP لتحديد الخدمات المكشوفة.'],
      ['httpx', 'ProjectDiscovery', 'Service Probing', 'استكشاف الويب', 'Validates live HTTP/HTTPS status, titles, technology stacks.', 'التحقق من عمل خدمات الويب، عناوينها، والتقنيات المستخدمة.'],
      ['Kiterunner', 'Assetnote', 'API Discovery', 'اكتشاف الـ APIs', 'High-performance API route and Swagger/GraphQL discovery.', 'اكتشاف مسارات واجهات التطبيقات البرمجية ونقاط النهاية.'],
      ['Nuclei', 'ProjectDiscovery', 'Vulnerability Scan', 'فحص الثغرات', 'Fast YAML-based template scanning for CVEs and misconfigs.', 'فحص سريع قائم على قوالب YAML لكشف الثغرات والأخطاء.'],
      ['Wapiti', 'Open Source', 'DAST Web Auditing', 'فحص تطبيقات الويب', 'Black-box web vulnerability scanner auditing forms & parameters.', 'فحص ديناميكي لمدخلات الويب (XSS, SQLi, SSRF, File Inclusion).']
    ];
    return `<div class="c-grid-3">
      ${tools.map((t, idx) => A(idx, `
        <div style="display:flex; justify-content:space-between; align-items:baseline; margin-bottom:4px;">
          <h3 class="c-card-h" style="color:var(--teal); font-size:18px;">${t[0]}</h3>
          <span style="font-size:11px; color:var(--text-dim); font-family:var(--font-mono);">${t[1]}</span>
        </div>
        <div style="font-size:12px; font-weight:700; color:var(--blue); margin-bottom:6px;">
          ${tr('Role: ' + t[2], 'الدور: ' + t[3])}
        </div>
        <p class="c-card-p" style="font-size:13px;">${tr(t[4], t[5])}</p>`, 'c-card')).join('')}
    </div>`;
  }
);

// 11. Data Processing, Normalization & Deduplication
addSlide(
  ['Chapter 3: Data Processing', 'الفصل 3: معالجة البيانات'],
  ['Data Processing, Normalization & Deduplication', 'معالجة البيانات: التوحيد وإزالة التكرار'],
  ['Processing', 'المعالجة'], 'tag-prop',
  ['Transforming messy raw tool outputs into unified, structured, and deduplicated database records.',
   'تحويل المخرجات الخام المتفرقة إلى سجلات موحدة ونظيفة وخالية من التكرار في قاعدة البيانات.'],
  () => {
    const stages = [
      ['Raw Outputs', 'المخرجات الخام', 'JSON / Text / XML streams from multiple CLI tools', 'ملفات وسجلات نصية متباينة'],
      ['Parse & Clean', 'التحليل والتنظيف', 'Extract relevant target, host, port, path, evidence', 'استخلاص الأهداف والمنافذ والأدلة'],
      ['Normalize', 'التوحيد القياسي', 'Convert into unified schema stored in PostgreSQL', 'تحويل الحقول إلى نموذج قياسي موحد'],
      ['Deduplicate', 'إزالة التكرار', 'Merge overlapping findings from Nuclei & Wapiti', 'دمج النتائج المتطابقة بين الأدوات'],
      ['Unified Assets', 'أصول موحدة', 'Consolidated asset graph with provenance links', 'شجرة أصول منظمة مع روابط المصدر']
    ];
    return `<div class="c-col" style="gap:16px;">
      <div class="pipeline-flow">
        ${stages.map((s, idx) => (idx ? '<div class="pipe-conn">➜</div>' : '') +
          A(idx, `<div class="pn-step">STAGE ${idx + 1}</div>
            <div class="pn-title" style="margin-top:6px;">${tr(s[0], s[1])}</div>
            <div class="pn-sub">${tr(s[2], s[3])}</div>`, 'pipe-node')).join('')}
      </div>
      <div class="c-grid-2" style="margin-top:6px;">
        ${A(5, `<h4 class="c-card-h" style="font-size:16px; color:var(--teal);">💾 ${tr('Hybrid Storage Paradigm', 'نموذج التخزين الهجين')}</h4>
          <p class="c-card-p">${tr('Raw tool output files are preserved in the encrypted File System for auditability and verification, while structured findings and relationships are normalized into PostgreSQL.',
            'تُحفظ ملفات المخرجات الخام كما هي في نظام ملفات مشفر لأغراض التدقيق والتحقق، بينما تُخزن النتائج المنظمة والعلاقات في PostgreSQL.')}</p>`, 'c-card')}
        ${A(6, `<h4 class="c-card-h" style="font-size:16px; color:var(--blue);">🔗 ${tr('Provenance & Traceability', 'تتبع أصل النتائج (Provenance)')}</h4>
          <p class="c-card-p">${tr('Every normalized finding maintains a strict foreign key link to its original raw execution record, ensuring complete transparency and zero fabricated evidence.',
            'ترتبط كل نتيجة معالجة برابط مفتاح أجنبي بسجل الأداة الخام الأصلية لضمان الشفافية وإمكانية مراجعة الدليل الفعلي.')}</p>`, 'c-card c-blue')}
      </div>
    </div>`;
  }
);

// 12. Security Reference Enrichment (Table 2.1)
addSlide(
  ['Chapter 2: Security References', 'الفصل 2: المراجع الأمنية'],
  ['Security Reference Enrichment: CVE, CWE, CVSS & OWASP', 'الإثراء المرجعي للثغرات: CVE وCWE وCVSS وOWASP'],
  ['References', 'المراجع الأمنية'], 'tag-prop',
  ['Grounding findings in globally recognized cybersecurity standards before AI analysis.',
   'ربط النتائج بالمعايير والمراجع الدولية المعترف بها قبل إرسالها للتحليل الذكي.'],
  () => {
    const refs = [
      ['CVE', 'Common Vulnerabilities and Exposures', 'MITRE Corporation', 'Standardized unique identifiers for publicly known vulnerabilities. Links findings to documented security advisories.', 'معرفات فريدة معتمدة عالمياً للثغرات البرمجية المعروفة، تربط النتيجة بالنشرات الأمنية الرسمية.'],
      ['CWE', 'Common Weakness Enumeration', 'MITRE Corporation', 'Categorizes underlying software and architectural flaws (e.g., CWE-79 for XSS, CWE-89 for SQL Injection).', 'تصنيف قياسي لأنواع نقاط الضعف البرمجية والتصميمية (مثل CWE-79 للـ XSS، وCWE-89 للحقن SQL).'],
      ['CVSS', 'Common Vulnerability Scoring System', 'FIRST Consortium', 'Quantifies vulnerability severity (Base Score 0.0 - 10.0) reflecting exploitability metrics and impact.', 'نظام قياسي لتقييم خطورة الثغرات من 0.0 إلى 10.0 بناءً على معايير سهولة الاستغلال والأثر.'],
      ['OWASP Top 10', 'Web Security Risks', 'OWASP Foundation', 'Maps findings to major application risk categories (e.g., Broken Access Control, Injection, Misconfiguration).', 'تصنيف وتأطير الثغرات ضمن أهم 10 مخاطر تهدد تطبيقات الويب (مثل خلل التحكم بالوصول والحقن).']
    ];
    return `<div class="c-grid-4">
      ${refs.map((r, idx) => A(idx, `
        <div style="font-family:var(--font-mono); font-size:26px; font-weight:900; color:var(--teal); margin-bottom:2px;">${r[0]}</div>
        <div style="font-size:12px; font-weight:700; color:var(--blue);">${r[1]}</div>
        <div style="font-size:11px; color:var(--text-dim); margin-bottom:8px;">${r[2]}</div>
        <p class="c-card-p" style="font-size:13px;">${tr(r[3], r[4])}</p>`, 'c-card c-' + ['blue', 'teal', 'violet', 'amber'][idx])).join('')}
    </div>`;
  }
);

// 13. AI Layer & Gemini Role (Strict Boundary)
addSlide(
  ['Chapter 3: AI Integration', 'الفصل 3: الذكاء الاصطناعي'],
  ['AI Analytical Layer: Gemini 3.8 Flash Integration', 'طبقة التحليل بالذكاء الاصطناعي: نموذج Gemini 3.8 Flash'],
  ['AI Co-Pilot', 'الذكاء الاصطناعي'], 'tag-prop',
  ['AI is an interpretive and remediation co-pilot; verified references remain the authoritative source.',
   'الذكاء الاصطناعي مساعد في التفسير والتوصيات؛ وتبقى المراجع القياسية هي المصدر المعتمد لتصنيف الثغرة.']
  , () => `<div class="c-grid-3">
    ${A(0, `<div class="c-card-ic">📥</div>
      <h3 class="c-card-h">${tr('Structured Input Submission', 'مدخلات منظمة ومحددة')}</h3>
      <p class="c-card-p">${tr('Only normalized, security-enriched findings are transmitted to Gemini API over encrypted HTTPS. Sensitive credentials and raw payloads are excluded.',
        'يتم إرسال نتائج موحدة ومثراة بالمراجع فقط عبر HTTPS مشفر، مع استبعاد أي بيانات حساسة أو مدخلات غير ضرورية لتقليل النطاق وحماية الخصوصية.')}</p>
      <ul class="c-card-list">
        <li>${tr('Minimization of external data', 'تقليل البيانات المرسلة خارجياً')}</li>
        <li>${tr('Encrypted in-transit via TLS', 'تشفير كامل أثناء النقل بـ TLS')}</li>
      </ul>`, 'c-card')}

    ${A(1, `<div class="c-card-ic" style="color:var(--violet);">✨</div>
      <h3 class="c-card-h" style="color:var(--violet); font-size:20px;">Gemini 3.8 Flash</h3>
      <p class="c-card-p">${tr('High-speed, low-latency reasoning model designed for structured summarization, technical explanation, and remediation prioritization.',
        'نموذج استدلال سريع وعالي الكفاءة مخصص لتلخيص النتائج، شرح التأثير الفني بأسلوب مفهوم، واقتراح أولويات الإصلاح.')}</p>
      <div class="stat-box" style="margin-top:14px; border-color:rgba(167,139,250,0.4);">
        <span style="font-size:24px;">🧠</span>
        <div class="stat-txt"><b>${tr('Interpretive Assistant', 'مساعد تحليلي وتفسيري')}</b><br>${tr('Provides actionable remediation steps', 'يقدم خطوات معالجة واضحة لفرق التطوير')}</div>
      </div>`, 'c-card c-violet')}

    ${A(2, `<div class="c-card-ic" style="color:var(--amber);">🛡️</div>
      <h3 class="c-card-h" style="color:var(--amber);">${tr('Strict Architectural Boundary', 'الحدود الهندسية الصارمة')}</h3>
      <p class="c-card-p">${tr('Crucial Design Principle: AI is NOT used as the authoritative source for assigning CVE IDs, CWE types, OWASP categories, or CVSS scores.',
        'مبدأ هندسي حاسم: لا يُستخدم الذكاء الاصطناعي كمصدر أولي لتعيين معرّفات CVE أو أنواع CWE أو درجات CVSS لمنع التخيل والهلوسة.')}</p>
      <ul class="c-card-list">
        <li>${tr('Prevents hallucinated vulnerabilities', 'يمنع اختلاق ثغرات وهمية')}</li>
        <li>${tr('Preserves deterministic evidence', 'يحافظ على الأدلة الفنية القطعية')}</li>
      </ul>`, 'c-card c-amber')}
  </div>`
);

// 14. System Architecture: 5 Layers (Figure 3.1)
addSlide(
  ['Chapter 3: System Architecture', 'الفصل 3: معمارية النظام'],
  ['5-Layer Modular System Architecture', 'معمارية النظام المعيارية المكونة من 5 طبقات'],
  ['Figure 3.1 Flow', 'مخطط المعمارية'], 'tag-prop',
  ['Decoupled architecture: Presentation, Application, Security Engine, Data Management, and AI/Reporting.',
   'معمارية مفصولة: طبقة العرض، طبقة التطبيق، محرك الفحص الأمني، إدارة البيانات، وطبقة الذكاء والتقارير.'],
  () => {
    const layers = [
      ['Layer 1', 'Presentation Layer', 'طبقة العرض والواجهة', 'React & TypeScript', [
        ['Interactive Web Dashboard', 'لوحة تحكم تفاعلية'],
        ['Target Input & Mode Select', 'إدخال الهدف ونمط الفحص'],
        ['Live Scan Status', 'متابعة حالة الفحص الحية'],
        ['Report Viewer', 'استعراض التقارير']
      ]],
      ['Layer 2', 'Application Layer', 'طبقة التطبيق والتنسيق', 'FastAPI (Python)', [
        ['Authentication & RBAC', 'المصادقة وصلاحيات RBAC'],
        ['Workflow Orchestration', 'تنسيق مسار الفحص'],
        ['Input & Scope Validation', 'التحقق من الهدف والنطاق'],
        ['Decryption Authorization', 'تفويض فك التشفير']
      ]],
      ['Layer 3', 'Security Execution Engine', 'محرك الفحص والتنفيذ', 'Docker Containers', [
        ['Subfinder (Subdomains)', 'Subfinder (النطاقات)'],
        ['Naabu (Ports)', 'Naabu (المنافذ)'],
        ['httpx & Kiterunner (Services & APIs)', 'httpx وKiterunner (الخدمات والـ APIs)'],
        ['Nuclei & Wapiti (Vulnerabilities)', 'Nuclei وWapiti (الثغرات)']
      ]],
      ['Layer 4', 'Data Management Layer', 'طبقة إدارة البيانات', 'PostgreSQL & File System', [
        ['AES-256-GCM Encrypted Storage', 'تخزين مشفر بـ AES-256-GCM'],
        ['Envelope Encryption (DEK/KEK)', 'تشفير المغلف (DEK/KEK)'],
        ['Normalized Findings DB', 'قاعدة بيانات النتائج الموحدة'],
        ['Raw Output Vault', 'مستودع المخرجات الخام']
      ]],
      ['Layer 5', 'AI & Reporting Layer', 'طبقة الذكاء والتقارير', 'Gemini 3.8 Flash & PDF Gen', [
        ['Gemini API via HTTPS', 'واجهة Gemini عبر HTTPS'],
        ['Remediation Advice Generator', 'مولد إرشادات المعالجة'],
        ['Executive Report Builder', 'بناء التقارير التنفيذية'],
        ['Technical Vulnerability Report', 'بناء التقارير الفنية']
      ]]
    ];
    return `<div class="arch-stack">
      ${layers.map((l, idx) => A(idx, `
        <div class="arch-layer-info">
          <span class="arch-layer-num">${l[0]}</span>
          <div class="arch-layer-name">${tr(l[1], l[2])}</div>
          <div class="arch-layer-tech">${l[3]}</div>
        </div>
        <div class="arch-boxes">
          ${l[4].map((b, bIdx) => `<div class="arch-pill ${['', 'blue', 'violet', 'amber'][bIdx % 4]}">
            <b>•</b> ${tr(b[0], b[1])}
          </div>`).join('')}
        </div>`, 'arch-layer')).join('')}
    </div>`;
  }
);

// 15. Cryptographic Security & Envelope Encryption
addSlide(
  ['Chapter 3: Security & Cryptography', 'الفصل 3: الأمان والتشفير'],
  ['Cryptographic Protection & Envelope Encryption', 'الأمان والتشفير وحماية البيانات: AES-256-GCM وتشفير المغلف'],
  ['Cryptographic Controls', 'ضوابط التشفير'], 'tag-sec',
  ['Multi-tiered confidentiality: per-scan DEK generation, KEK secrets management, and authenticated GCM tags.',
   'سرية متعددة المستويات: مفتاح DEK مستقل لكل فحص، حماية بمفتاح KEK، والتحقق من سلامة البيانات بـ GCM.'],
  () => `<div class="c-grid-3">
    ${A(0, `<div class="c-card-ic">🔑</div>
      <h3 class="c-card-h">${tr('Envelope Encryption Pattern', 'نمط تشفير المغلف (Envelope)')}</h3>
      <p class="c-card-p">${tr('A unique Data Encryption Key (DEK) is generated for each scanning job. The DEK is encrypted (wrapped) using a master Key Encryption Key (KEK) stored in an isolated secrets vault.',
        'يتم توليد مفتاح تشفير بيانات (DEK) فريد لكل عملية فحص، ثم يُغلف ويُشفر باستخدام مفتاح تشفير رئيسي (KEK) محفوظ في مستودع أسرار منفصل.')}</p>
      <ul class="c-card-list">
        <li>${tr('DEK wrapped inside PostgreSQL', 'تخزين DEK مغلفاً فقط في قاعدة البيانات')}</li>
        <li>${tr('No plaintext keys persisted', 'منع حفظ أي مفاتيح غير مشفرة على القرص')}</li>
      </ul>`, 'c-card')}

    ${A(1, `<div class="c-card-ic" style="color:var(--blue);">🛡️</div>
      <h3 class="c-card-h" style="color:var(--blue);">AES-256-GCM</h3>
      <p class="c-card-p">${tr('Authenticated encryption standard providing both confidentiality and cryptographic integrity verification via 128-bit authentication tags.',
        'معيار تشفير موثق يوفر السرية التامة ويكتشف أي تعديل غير مصرح به على الملفات والتقارير عبر وسوم المصادقة.')}</p>
      <div class="stat-box" style="margin-top:10px;">
        <span style="font-size:26px;">🔒</span>
        <div class="stat-txt"><b>${tr('Detects Tampering', 'كشف التلاعب فوراً')}</b><br>${tr('Tag verification required before decryption', 'التحقق الإلزامي من صحة الوسم قبل فك التشفير')}</div>
      </div>`, 'c-card c-blue')}

    ${A(2, `<div class="c-card-ic" style="color:var(--amber);">👥</div>
      <h3 class="c-card-h" style="color:var(--amber);">${tr('Strict RBAC & Privacy Boundary', 'عزل البيانات وصلاحيات RBAC')}</h3>
      <p class="c-card-p">${tr('Users access only their own targets, findings, and reports. Even the System Administrator is restricted to account management without application-level decryption access.',
        'عزل تام لبيانات المستخدمين؛ حتى مدير النظام يقتصر دوره على إدارة الحسابات ولا يملك صلاحية فك تشفير نتائج فحص المستخدمين.')}</p>
      <ul class="c-card-list">
        <li>${tr('Scoped access tokens & ownership checks', 'تحقق إلزامي من ملكية الحساب والهدف')}</li>
        <li>${tr('Bounded-memory decryption buffers', 'معالجة مشفرة محدودة الذاكرة')}</li>
      </ul>`, 'c-card c-amber')}
  </div>`
);

// 16. Database Design & ERD Entities (Table 3.2 & Figure 3.2)
addSlide(
  ['Chapter 3: Database Design', 'الفصل 3: قاعدة البيانات'],
  ['Database Design & Main Entities (ERD)', 'تصميم قاعدة البيانات والكيانات الرئيسية (ERD)'],
  ['Data Architecture', 'نموذج البيانات'], 'tag-prop',
  ['PostgreSQL relational schema separating operational management, assets, findings, and encrypted metadata.',
   'مخطط علائقي في PostgreSQL يفصل بين إدارة العمليات، الأصول، الثغرات الموحدة، والبيانات المشفرة.'],
  () => {
    const entities = [
      ['users', 'User accounts, credentials (hashed), roles (Admin/User)', 'حسابات المستخدمين والأدوار والكلمات المجزأة'],
      ['scan_jobs', 'Target domains/URLs, scanning mode, execution status, user link', 'أهداف الفحص ونمط التشغيل وحالة التنفيذ'],
      ['scan_stages', 'Tracks execution status and durations for each tool in the workflow', 'تتبع مراحل تنفيذ كل أداة في المسار'],
      ['raw_outputs', 'Paths and metadata of AES-256-GCM encrypted tool outputs on disk', 'مسارات وبيانات مخرجات الأدوات الخام المشفرة'],
      ['assets', 'Discovered hierarchical domains, subdomains, ports, endpoints, APIs', 'الأصول المكتشفة: نطاقات ومنافذ ومسارات'],
      ['findings', 'Normalized vulnerability findings associated with affected assets', 'النتائج والثغرات الأمنية الموحدة لكل أصل'],
      ['finding_sources', 'Many-to-many traceability resolving findings back to raw tool logs', 'ربط النتائج بسجلات الأدوات الخام الأصلية'],
      ['security_references', 'Stores standardized CVE identifiers, CWE flaws, CVSS, and OWASP tags', 'المراجع القياسية: CVE وCWE وCVSS وOWASP'],
      ['finding_references', 'Junction table linking findings to verified security references', 'ربط النتائج بالمراجع المعتمدة المقابلة لها'],
      ['ai_analyses', 'Stores Gemini AI analysis results, remediations, and prompt metadata', 'تحليلات نموذج Gemini وإرشادات المعالجة'],
      ['reports', 'Metadata and encrypted file paths for Executive & Technical PDF reports', 'بيانات ومسارات ملفات التقارير المشفرة'],
      ['scan_keys', 'Encrypted DEK blobs, KEK version identifiers, and IV/nonce metadata', 'مفاتيح DEK المغلفة وبيانات التشفير الخاصة بالفحص']
    ];
    return `<div class="c-grid-4">
      ${entities.map((e, idx) => A(idx, `
        <div style="font-family:var(--font-mono); font-size:14px; font-weight:800; color:var(--teal); margin-bottom:4px;">${e[0]}</div>
        <p class="c-card-p" style="font-size:12px; line-height:1.4;">${tr(e[1], e[2])}</p>`, 'c-card')).join('')}
    </div>`;
  }
);

// 17. Dual-Tier Reporting Architecture
addSlide(
  ['Chapter 3: Reporting', 'الفصل 3: التقارير'],
  ['Dual-Tier Reporting: Executive Summary & Technical Audit', 'نظام التقارير المزدوج: التقرير التنفيذي والتقرير الفني'],
  ['Reporting', 'التقارير'], 'tag-prop',
  ['Automated generation of audience-tailored reports combining verified references and AI remediation.',
   'توليد مؤتمت لتقارير تلائم فئات الجمهور المختلفة وتدمج المراجع المعتمدة وتوصيات الإصلاح.'],
  () => `<div class="c-grid-2" style="align-items:center;">
    <div class="c-col">
      ${A(0, `<h3 class="c-card-h" style="color:var(--teal); font-size:18px;">📊 ${tr('Executive Security Report', 'التقرير التنفيذي (Executive Report)')}</h3>
        <p class="c-card-p">${tr('Tailored for CISOs, leadership, and IT managers. Highlights high-level business risks, attack surface inventory counts, overall posture, and high-impact action items.',
          'مخصص للقيادات ومدراء تقنية المعلومات؛ يركز على مؤشرات الخطر الكلية، إحصائيات سطح الهجوم، ونظرة استراتيجية لمعالجة الثغرات دون إغراق في التفاصيل.')}</p>`, 'c-card')}

      ${A(1, `<h3 class="c-card-h" style="color:var(--blue); font-size:18px;">🛠️ ${tr('Technical Vulnerability Report', 'التقرير الفني المفصل (Technical Report)')}</h3>
        <p class="c-card-p">${tr('Designed for software engineers and cybersecurity specialists. Provides detailed findings, verified CVE/CWE/CVSS metadata, HTTP request/response proofs, and step-by-step remediation advice.',
          'مخصص لمهندسي البرمجيات وفرق الأمن السيبراني؛ يشتمل على أدلة الإثبات الفنية (PoC)، المراجع القياسية، وتوجيهات عملية لإصلاح كل ثغرة.')}</p>`, 'c-card c-blue')}
    </div>

    ${A(2, `<div class="report-specimen">
      <span class="rep-watermark">${tr('FICTIONAL SPECIMEN', 'نموذج تمثيلي فقط')}</span>
      <h4>${tr('YemScan Technical Assessment', 'تقرير تقييم YemScan الفني')}</h4>
      <div style="font-size:11px; color:#64748b; margin-bottom:8px;">Target: example.test · Mode: Sequential Scan · Scope: Authorized</div>
      
      <div class="rep-finding">
        <span class="rep-badge rep-high">HIGH</span>
        <div><b>CWE-79: Cross-Site Scripting (Reflected)</b><br><span style="font-size:11px; color:#475569;">Path: /api/v1/search?q= · CVSS 3.1: 7.2 · OWASP A03:2025</span></div>
      </div>
      <div class="rep-finding">
        <span class="rep-badge rep-med">MEDIUM</span>
        <div><b>CWE-200: Sensitive Information Exposure</b><br><span style="font-size:11px; color:#475569;">Server banner disclosure · CVSS: 5.3 · OWASP A05:2025</span></div>
      </div>
      <div class="rep-finding">
        <span class="rep-badge rep-low">LOW</span>
        <div><b>CWE-1021: Missing X-Frame-Options Header</b><br><span style="font-size:11px; color:#475569;">Potential Clickjacking risk · CVSS: 3.1 · OWASP A05:2025</span></div>
      </div>

      <div style="margin-top:10px; padding-top:8px; border-top:1px dashed #cbd5e1; font-size:11px; color:#0f766e;">
        <b>✨ Gemini Remediation Note:</b> ${tr('Implement strict Content-Security-Policy headers and sanitize search query parameters using context-aware HTML encoding.',
          'قم بتطبيق ترويسة Content-Security-Policy وفلترة مدخلات البحث عبر تشفير سياقي آمن لمنع تنفيذ الأكواد الخبيثة.')}
      </div>
    </div>`, '')}
  </div>`
);

// 18. Comparison with Related Systems (Table 2.2)
addSlide(
  ['Chapter 2: Related Work', 'الفصل 2: الأنظمة المقارنة'],
  ['Comparison with Related Systems & State-of-the-Art', 'مقارنة YemScan بالأنظمة والأدوات المشابهة (جدول 2.2)'],
  ['Table 2.2 Synthesis', 'المقارنة المرجعية'], 'tag-sec',
  ['Systematic comparison against standalone scanners (Nuclei, Wapiti) and frameworks (reNgine, FortiScan).',
   'مقارنة معيارية منهجية مع الأدوات الفردية وأطر العمل المشابهة لتوضيح الفجوة المعمارية.'],
  () => {
    const rows = [
      ['Centralized Web Dashboard for Scans', 'لوحة تحكم مركزية لإدارة الفحوصات', false, false, true, true, true],
      ['Integrated Subdomain & Port Discovery', 'اكتشاف متكامل للنطاقات والمنافذ', false, false, true, false, true],
      ['Multi-Tool Orchestration (Sequential/Independent)', 'تنسيق الأدوات بنمطي الفحص المتسلسل والمستقل', false, false, true, false, true],
      ['Standardized Data Normalization & Dedup', 'توحيد البيانات وإلغاء التكرار في قاعدة موحدة', false, false, true, false, true],
      ['Pre-AI Security Reference Enrichment (CVE/CWE/CVSS)', 'إثراء مرجعي مسبق ومنفصل للنتائج قبل الذكاء', false, false, false, false, true],
      ['AI-Assisted Remediation Analysis (Gemini)', 'تحليل وتفسير النتائج بالذكاء الاصطناعي', false, false, true, true, true],
      ['AES-256-GCM Envelope Encryption at Rest', 'حماية مشفرة بـ AES-256-GCM وتشفير المغلف', false, false, false, false, true],
      ['Automated Dual Executive/Technical Reports', 'إنتاج تقارير تنفيذية وفنية مؤتمتة', true, true, true, true, true]
    ];
    return `<div class="c-col">
      <table class="comp-table">
        <thead>
          <tr>
            <th>${tr('Comparison Criterion', 'معيار المقارنة')}</th>
            <th class="center">Nuclei</th>
            <th class="center">Wapiti</th>
            <th class="center">reNgine</th>
            <th class="center">FortiScan</th>
            <th class="center" style="color:var(--teal); background:rgba(45,212,191,0.15);">YemScan (Proposed)</th>
          </tr>
        </thead>
        <tbody>
          ${rows.map((r, idx) => `
            <tr class="${idx === 4 || idx === 6 ? 'highlight' : ''}">
              <td>${tr(r[0], r[1])}</td>
              <td class="center">${r[2] ? '<span class="comp-check">✔</span>' : '<span class="comp-cross">✖</span>'}</td>
              <td class="center">${r[3] ? '<span class="comp-check">✔</span>' : '<span class="comp-cross">✖</span>'}</td>
              <td class="center">${r[4] ? '<span class="comp-check">✔</span>' : '<span class="comp-cross">✖</span>'}</td>
              <td class="center">${r[5] ? '<span class="comp-check">✔</span>' : '<span class="comp-cross">✖</span>'}</td>
              <td class="center" style="background:rgba(45,212,191,0.08);">${r[6] ? '<span class="comp-check" style="font-size:18px;">✔</span>' : '<span class="comp-cross">✖</span>'}</td>
            </tr>`).join('')}
        </tbody>
      </table>
      <div style="font-size:12px; color:var(--text-dim); text-align:start; margin-top:4px;">
        * ${tr('Table 2.2 from thesis: Nuclei and Wapiti evaluated as standalone tools. YemScan specifically distinguishes explicit pre-AI reference enrichment and cryptographic storage protection.',
             'جدول 2.2 من وثيقة المشروع: قورنت Nuclei وWapiti كأدوات مستقلة. يتميز مقترح YemScan بوجود طبقة إثراء مرجعي مسبقة ومستقلة وتشفير المغلف لحماية البيانات.')}
      </div>
    </div>`;
  }
);

// 19. Project Scope & Ethical Delimitations
addSlide(
  ['Chapter 1: Project Scope', 'الفصل 1: نطاق المشروع'],
  ['Project Boundaries: In-Scope vs Out-of-Scope', 'حدود المشروع وضوابطه: داخل النطاق مقابل خارج النطاق'],
  ['Scope & Ethics', 'نطاق المشروع والأخلاقيات'], 'tag-sec',
  ['Responsible cybersecurity research: strict black-box reconnaissance without active exploitation or intrusion.',
   'بحث أمني مسؤول: فحص واستطلاع خارجي مضبوط دون أي محاولات استغلال هجومي أو اختراق.'],
  () => `<div class="c-grid-2">
    ${A(0, `<div class="c-card-ic" style="color:var(--teal);">✔</div>
      <h3 class="c-card-h" style="color:var(--teal); font-size:20px;">${tr('In-Scope (Covered by YemScan)', 'داخل نطاق العمل (In-Scope)')}</h3>
      <ul class="c-card-list" style="font-size:13.5px; line-height:1.7;">
        <li><b>${tr('External Black-Box Reconnaissance:', 'الاستطلاع الخارجي Black-Box:')}</b> ${tr('Discovering public subdomains, live services, and exposed endpoints.', 'اكتشاف النطاقات الفرعية العامة والخدمات المكشوفة.')}</li>
        <li><b>${tr('Multi-Tool Orchestration:', 'تنسيق الأدوات المتعددة:')}</b> ${tr('Sequential and independent execution modes in isolated containers.', 'تشغيل متسلسل ومستقل للأدوات داخل حاويات Docker معزولة.')}</li>
        <li><b>${tr('Data Normalization & Deduplication:', 'توحيد البيانات وإلغاء التكرار:')}</b> ${tr('Consolidating multi-tool outputs into structured relational records.', 'دمج مخرجات الأدوات وتوحيدها في قاعدة بيانات منظمة.')}</li>
        <li><b>${tr('Reference Enrichment:', 'الإثراء المرجعي:')}</b> ${tr('Correlating findings with CVE, CWE, CVSS, and OWASP Top 10.', 'ربط النتائج بمعايير CVE وCWE وCVSS وOWASP الدولية.')}</li>
        <li><b>${tr('AI-Assisted Interpretation:', 'التحليل الذكي:')}</b> ${tr('Plain-language summarization & remediation prioritization via Gemini.', 'تفسير النتائج واقتراح التوصيات عبر نموذج Gemini.')}</li>
        <li><b>${tr('AES-256-GCM Protection:', 'حماية البيانات بالتشفير:')}</b> ${tr('Cryptographic user data isolation and encrypted report storage.', 'عزل بيانات المستخدمين وتشفير المخرجات والتقارير.')}</li>
      </ul>`, 'c-card')}

    ${A(1, `<div class="c-card-ic" style="color:var(--red);">✖</div>
      <h3 class="c-card-h" style="color:var(--red); font-size:20px;">${tr('Out-of-Scope & Delimitations', 'خارج نطاق العمل والحدود الأخلاقية')}</h3>
      <ul class="c-card-list" style="font-size:13.5px; line-height:1.7;">
        <li><b>${tr('Active Exploitation:', 'الاستغلال الهجومي الفعلي:')}</b> ${tr('No payload delivery or compromise attempts against target databases.', 'لا يتضمن استغلال الثغرات أو محاولات اختراق قواعد البيانات.')}</li>
        <li><b>${tr('Unauthorized Testing:', 'الفحص دون تصريح مسبق:')}</b> ${tr('Strictly restricted to authorized targets with explicit permission.', 'الفحص مخصص للأهداف المصرح بها والمملوكة للمستخدم فقط.')}</li>
        <li><b>${tr('Internal Network Scanning:', 'مسح الشبكات الداخلية:')}</b> ${tr('Excludes intranet, internal routing, and corporate workstation auditing.', 'لا يشمل البنية الداخلية أو محطات العمل الداخلية للشركات.')}</li>
        <li><b>${tr('WAF / DDoS / CAPTCHA Bypass:', 'تجاوز جدران الحماية والـ WAF:')}</b> ${tr('Does not attempt evasion of cloud firewalls or DDoS defenses.', 'لا يسعى للالتفاف على الـ WAF أو أنظمة كشف الروبوتات CAPTCHA.')}</li>
        <li><b>${tr('Social Engineering & Brute-Force:', 'الهندسة الاجتماعية والتخمين:')}</b> ${tr('Excludes credential stuffing, phishing, and human-targeted tests.', 'مستبعد تماماً: هجمات التصيد وتخمين كلمات المرور.')}</li>
        <li><b>${tr('Zero-Knowledge Guarantee:', 'السرية الصفرية المطلقة:')}</b> ${tr('Not a zero-knowledge architecture; requires memory decryption during processing.', 'ليست بنية سرية صفرية لاحتياج فك التشفير بالذاكرة أثناء التحليل.')}</li>
      </ul>`, 'c-card c-red')}
  </div>`
);

// 20. Conclusion & Future Outlook
addSlide(
  ['Chapter 5: Conclusion', 'الفصل 5: الخاتمة والآفاق المستقبلية'],
  ['Conclusion & Key Contributions of YemScan', 'الخاتمة وأهم إسهامات مشروع YemScan'],
  ['Conclusion', 'الخاتمة'], 'tag-prop',
  ['Bridging the gap between automated black-box reconnaissance and actionable, encrypted intelligence.',
   'سد الفجوة بين استطلاع الويب المؤتمت والتحليل الذكي المحمي بالتشفير والقابل للتطبيق العملي.'],
  () => `<div class="c-col" style="align-items:center; gap:20px; text-align:center;">
    <div style="font-size:56px; font-weight:900; letter-spacing:2px; line-height:1; background:linear-gradient(120deg, #ffffff, #2dd4bf, #38bdf8); -webkit-background-clip:text; background-clip:text; color:transparent;">
      YemScan
    </div>
    <div style="font-size:18px; color:#e2e8f0; max-width:860px; line-height:1.5;">
      ${tr('A unified graduation project platform demonstrating that disparate open-source security tools can be orchestrated into an end-to-end black-box reconnaissance pipeline with rigorous reference enrichment, cryptographically protected storage, and AI-assisted remediation.',
           'مشروع تخرج تطبيقي يثبت إمكانية دمج وتنسيق أدوات الأمن المفتوحة المصدر ضمن مسار متكامل لاستطلاع الويب، مدعوم بالإثراء المرجعي الدقيق، حماية البيانات بتشفير AES-256-GCM، والاستفادة من ذكاء Gemini لتسهيل المعالجة.')}
    </div>

    <div class="c-grid-3" style="max-width:1100px; text-align:start;">
      ${A(0, `<h4 class="c-card-h" style="color:var(--teal); font-size:16px;">1. ${tr('Architectural Cohesion', 'التماسك المعماري')}</h4>
        <p class="c-card-p">${tr('Replaces scattered terminal commands with an orchestrated 6-phase pipeline supporting Sequential and Independent modes.',
          'استبدال الأوامر النصية المتفرقة بمسار أمني متكامل من 6 مراحل يدعم النمطين المتسلسل والمستقل.')}</p>`, 'c-card')}
      ${A(1, `<h4 class="c-card-h" style="color:var(--blue); font-size:16px;">2. ${tr('Authoritative Baseline', 'المرجعية الموثوقة')}</h4>
        <p class="c-card-p">${tr('Retains CVE, CWE, CVSS, and OWASP as the authoritative source of truth, utilizing AI strictly as an explanatory co-pilot.',
          'الاعتماد على المعايير العالمية كمصدر قطعي للحقائق الأمنية وتوظيف الذكاء الاصطناعي كمساعد تفسيري.')}</p>`, 'c-card c-blue')}
      ${A(2, `<h4 class="c-card-h" style="color:var(--violet); font-size:16px;">3. ${tr('Security & Privacy', 'الأمان وحماية الخصوصية')}</h4>
        <p class="c-card-p">${tr('Combines AES-256-GCM envelope encryption with RBAC, ensuring user isolation and secure report delivery.',
          'حماية تقارير وسجلات الفحص بتشفير المغلف AES-256-GCM وعزل البيانات بين المستخدمين وفق صلاحيات RBAC.')}</p>`, 'c-card c-violet')}
    </div>

    <div class="stat-box" style="margin-top:6px; border-color:var(--teal); padding:10px 24px;">
      <span style="font-size:24px;">🎓</span>
      <div class="stat-txt" style="font-size:15px;">
        <b>${tr('Thank You! We Welcome Questions from the Examination Committee', 'شكراً لحسن استماعكم! نرحب بأسئلة وملاحظات لجنة المناقشة الكريمة')}</b>
      </div>
    </div>
  </div>`
);

/* ============================================================
   ENGINE & STATE MANAGEMENT
============================================================ */
const $ = id => document.getElementById(id);

function updateStaticUI(){
  document.documentElement.lang = L;
  document.documentElement.dir = (L === 'ar') ? 'rtl' : 'ltr';
  document.body.dir = (L === 'ar') ? 'rtl' : 'ltr';

  // Translate all [data-i18n]
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if(I18N[k] && I18N[k][L]) el.textContent = I18N[k][L];
  });

  // Top Language Pill
  const topLangBtn = $('topLangBtn');
  if(topLangBtn){
    topLangBtn.querySelector('.l-en').classList.toggle('active-l', L === 'en');
    topLangBtn.querySelector('.l-ar').classList.toggle('active-l', L === 'ar');
  }

  $('jumpInput').max = S.length;
}

function renderAllSlides(){
  stopSimulator();
  $('slides').innerHTML = S.map((s, idx) => `
    <section class="slide" data-slide-idx="${idx}">
      <header class="s-head">
        <div class="s-meta">
          <div class="s-kicker">
            <span class="s-num-badge">${String(idx + 1).padStart(2, '0')}</span>
            <span>${tr(s.kicker[0], s.kicker[1])}</span>
          </div>
          <h2 class="s-title">${tr(s.title[0], s.title[1])}</h2>
        </div>
        <div class="s-tag ${s.tagClass}">${tr(s.tagText[0], s.tagText[1])}</div>
      </header>

      <div class="s-body">
        ${s.renderFn()}
      </div>

      <footer class="s-summary">
        <span class="sum-ic">💡</span>
        <div><b>${tr('Key Insight:', 'الخلاصة الجوهرية:')}</b> ${tr(s.note[0], s.note[1])}</div>
      </footer>
    </section>
  `).join('');

  // Overview Grid
  $('ovGrid').innerHTML = S.map((s, idx) => `
    <div class="ov-card" data-jump="${idx}">
      <div class="ov-card-num">SLIDE ${String(idx + 1).padStart(2, '0')} · ${tr(s.kicker[0], s.kicker[1])}</div>
      <div class="ov-card-title">${tr(s.title[0], s.title[1])}</div>
    </div>
  `).join('');

  // Help Modal Grid
  $('helpContent').innerHTML = (L === 'ar')
    ? `<div class="help-item"><kbd>→</kbd> / <kbd>Space</kbd> <span>الشريحة التالية</span></div>
       <div class="help-item"><kbd>←</kbd> <span>الشريحة السابقة</span></div>
       <div class="help-item"><kbd>Home</kbd> <span>الشريحة الأولى</span></div>
       <div class="help-item"><kbd>End</kbd> <span>الشريحة الأخيرة</span></div>
       <div class="help-item"><kbd>F</kbd> <span>ملء الشاشة</span></div>
       <div class="help-item"><kbd>O</kbd> <span>فهرس الشرائح</span></div>
       <div class="help-item"><kbd>L</kbd> <span>تبديل اللغة (EN / AR)</span></div>
       <div class="help-item"><kbd>M</kbd> <span>تقليل الحركة</span></div>
       <div class="help-item"><kbd>Esc</kbd> <span>إغلاق النوافذ</span></div>
       <div class="help-item"><kbd>?</kbd> <span>المساعدة</span></div>`
    : `<div class="help-item"><kbd>→</kbd> / <kbd>Space</kbd> <span>Next Slide</span></div>
       <div class="help-item"><kbd>←</kbd> <span>Previous Slide</span></div>
       <div class="help-item"><kbd>Home</kbd> <span>First Slide</span></div>
       <div class="help-item"><kbd>End</kbd> <span>Last Slide</span></div>
       <div class="help-item"><kbd>F</kbd> <span>Toggle Fullscreen</span></div>
       <div class="help-item"><kbd>O</kbd> <span>Toggle Overview</span></div>
       <div class="help-item"><kbd>L</kbd> <span>Switch Language</span></div>
       <div class="help-item"><kbd>M</kbd> <span>Reduce Motion</span></div>
       <div class="help-item"><kbd>Esc</kbd> <span>Close Modals</span></div>
       <div class="help-item"><kbd>?</kbd> <span>Help</span></div>`;

  updateStaticUI();
  displaySlide(cur);
}

function displaySlide(index){
  stopSimulator();
  cur = Math.max(-1, Math.min(S.length - 1, index));
  const isPresenting = cur >= 0;

  $('cover').classList.toggle('hidden', isPresenting);
  $('slides').classList.toggle('hidden', !isPresenting);
  $('presFooter').classList.toggle('hidden', !isPresenting);

  document.querySelectorAll('.slide').forEach(sl => {
    const isActive = (+sl.dataset.slideIdx === cur);
    sl.classList.toggle('active', isActive);
  });

  document.querySelectorAll('.ov-card').forEach(c => {
    c.classList.toggle('active', +c.dataset.jump === cur);
  });

  if(isPresenting){
    const currentNum = String(cur + 1).padStart(2, '0');
    const totalNum = String(S.length).padStart(2, '0');
    $('slideCounter').textContent = `${currentNum} / ${totalNum}`;
    $('progFill').style.width = `${((cur + 1) / S.length) * 100}%`;
    $('jumpInput').value = cur + 1;

    // Attach simulation button if on Workflow slide (Slide 9, index 8)
    const playBtn = $('simPlayBtn');
    if(playBtn) playBtn.onclick = runWorkflowSimulator;
  }
}

function nextSlide(){ if(cur < S.length - 1) displaySlide(cur + 1); }
function prevSlide(){ if(cur > 0) displaySlide(cur - 1); else if(cur === 0) displaySlide(-1); }

/* ============================================================
   WORKFLOW SIMULATOR (Visual animation only)
============================================================ */
function stopSimulator(){
  if(simTimer){ clearInterval(simTimer); simTimer = null; }
}

function runWorkflowSimulator(){
  stopSimulator();
  const nodes = document.querySelectorAll('#wfSimPipe .pipe-node');
  const barFill = $('simBarFill');
  const out = $('simOutput');
  const status = $('simStatus');
  if(!nodes.length) return;

  const simLogs = [
    ['[DEMO] Stage 1: Discovering subdomains with Subfinder and active ports with Naabu...',
     '[محاكاة] المرحلة 1: اكتشاف النطاقات الفرعية بـ Subfinder والمنافذ المفتوحة بـ Naabu...'],
    ['[DEMO] Stage 2: Probing live web endpoints via httpx & enumerating API routes with Kiterunner...',
     '[محاكاة] المرحلة 2: التحقق من الخدمات الحية بـ httpx وكشف مسارات الواجهات بـ Kiterunner...'],
    ['[DEMO] Stage 3: Executing template security checks via Nuclei & crawling forms with Wapiti...',
     '[محاكاة] المرحلة 3: فحص قوالب الثغرات بـ Nuclei وفحص مدخلات الويب عبر Wapiti...'],
    ['[DEMO] Stage 4: Ingesting raw CLI outputs into PostgreSQL; normalizing fields & deduplicating records...',
     '[محاكاة] المرحلة 4: استيعاب المخرجات الخام في PostgreSQL؛ توحيد الحقول وإلغاء التكرار...'],
    ['[DEMO] Stage 5: Associating findings with authoritative CVE, CWE, CVSS, and OWASP Top 10 catalogs...',
     '[محاكاة] المرحلة 5: ربط النتائج بالمراجع المعتمدة CVE وCWE وCVSS وOWASP Top 10...'],
    ['[DEMO] Stage 6: Passing enriched context to Gemini 3.8 Flash; generating Executive & Technical Reports...',
     '[محاكاة] المرحلة 6: إرسال السياق لنموذج Gemini؛ وإنشاء التقارير التنفيذية والفنية المشفرة بـ AES-256-GCM...']
  ];

  let step = 0;
  status.textContent = 'RUNNING';
  status.style.color = 'var(--teal)';

  const tick = () => {
    nodes.forEach((n, idx) => n.classList.toggle('on', idx === step));
    barFill.style.width = `${((step + 1) / nodes.length) * 100}%`;
    out.textContent = tr(simLogs[step][0], simLogs[step][1]);
    step++;

    if(step >= nodes.length){
      stopSimulator();
      setTimeout(() => {
        nodes.forEach(n => n.classList.remove('on'));
        out.textContent = tr(
          '[DEMO COMPLETE] Simulation finished successfully. All raw outputs encrypted with AES-256-GCM at rest.',
          '[اكتملت المحاكاة] انتهى العرض التوضيحي بنجاح. تم حفظ كافة المخرجات مشفرة بـ AES-256-GCM.'
        );
        status.textContent = 'COMPLETED';
        status.style.color = 'var(--green)';
      }, 1200);
    }
  };

  tick();
  simTimer = setInterval(tick, 1400);
}

/* ============================================================
   RESPONSIVE 16:9 AUTO-SCALING
============================================================ */
function fitStage(){
  const baseW = 1366, baseH = 768;
  const scale = Math.min(window.innerWidth / baseW, window.innerHeight / baseH);
  $('stage').style.transform = `scale(${scale})`;
  $('stage').style.margin = `${-(baseH * (1 - scale)) / 2}px ${-(baseW * (1 - scale)) / 2}px`;
}

function toggleFullscreen(){
  if(!document.fullscreenElement){
    (document.documentElement.requestFullscreen || (() => {})).call(document.documentElement).catch(() => {});
  } else {
    document.exitFullscreen();
  }
}

function switchLanguage(){
  L = (L === 'en') ? 'ar' : 'en';
  localStorage.setItem('ys_lang', L);
  renderAllSlides();
}

function toggleReduceMotion(enable){
  document.body.classList.toggle('reduce-motion', enable);
  $('modeBtn').classList.toggle('f-btn-primary', enable);
  localStorage.setItem('ys_rm', enable ? '1' : '0');
}

/* ============================================================
   EVENT BINDINGS
============================================================ */
$('startBtn').onclick = () => { toggleFullscreen(); displaySlide(0); };
$('nextBtn').onclick = nextSlide;
$('prevBtn').onclick = prevSlide;

$('topLangBtn').onclick = switchLanguage;
$('topFsBtn').onclick = toggleFullscreen;
$('topOvBtn').onclick = () => $('overview').classList.toggle('hidden');
$('ovClose').onclick = () => $('overview').classList.add('hidden');

$('modeBtn').onclick = () => toggleReduceMotion(!document.body.classList.contains('reduce-motion'));
$('helpBtn').onclick = () => $('helpModal').classList.toggle('hidden');
$('helpClose').onclick = () => $('helpModal').classList.add('hidden');

$('jumpInput').onchange = e => {
  const v = parseInt(e.target.value, 10);
  if(v >= 1 && v <= S.length) displaySlide(v - 1);
  e.target.blur();
};

$('ovGrid').onclick = e => {
  const card = e.target.closest('.ov-card');
  if(card){
    displaySlide(+card.dataset.jump);
    $('overview').classList.add('hidden');
  }
};

// Stage click navigation (Right half = Next, Left half = Prev, flipped in RTL)
$('stage').addEventListener('click', e => {
  if(cur < 0 || e.target.closest('button, input, .sim-console, .ov-card, .help-inner')) return;
  const rect = $('stage').getBoundingClientRect();
  const isRight = (e.clientX - rect.left) > (rect.width / 2);
  const rtl = (L === 'ar');
  (isRight !== rtl) ? nextSlide() : prevSlide();
});

// Comprehensive Keyboard Navigation
window.addEventListener('keydown', e => {
  if(e.target.tagName === 'INPUT') return;
  const k = e.key;
  const rtl = (L === 'ar');

  if(k === 'Escape'){
    $('overview').classList.add('hidden');
    $('helpModal').classList.add('hidden');
    return;
  }
  if(k === 'ArrowRight' || k === 'PageDown' || k === ' '){
    e.preventDefault();
    (k === 'ArrowRight' && rtl) ? prevSlide() : nextSlide();
  } else if(k === 'ArrowLeft' || k === 'PageUp'){
    e.preventDefault();
    (k === 'ArrowLeft' && rtl) ? nextSlide() : prevSlide();
  } else if(k === 'Home'){
    displaySlide(0);
  } else if(k === 'End'){
    displaySlide(S.length - 1);
  } else if(/^f$/i.test(k)){
    toggleFullscreen();
  } else if(/^o$/i.test(k)){
    $('overview').classList.toggle('hidden');
  } else if(/^l$/i.test(k)){
    switchLanguage();
  } else if(/^m$/i.test(k)){
    toggleReduceMotion(!document.body.classList.contains('reduce-motion'));
  } else if(k === '?'){
    $('helpModal').classList.toggle('hidden');
  }
});

window.addEventListener('resize', fitStage);
document.addEventListener('fullscreenchange', fitStage);

// Initial bootstrap
toggleReduceMotion(localStorage.getItem('ys_rm') === '1');
renderAllSlides();
fitStage();

})();
