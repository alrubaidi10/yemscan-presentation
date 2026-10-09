/* YemScan — Midterm Graduation Project Presentation Engine
   Follows Official UST Faculty Guidelines for Graduation Project (1)
   25-Slide Standard Academic Template (Cybersecurity & Networking)
   Supervised by: Dr. Aisha Al-Hadm · Academic Year: 2026-2027
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
    en: 'UST · Cybersecurity & Networking · Midterm Defense 2026-2027',
    ar: 'جامعة العلوم والتكنولوجيا · الأمن السيبراني والشبكات · مناقشة نصفية 2026-2027'
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
    en: 'An integrated external black-box reconnaissance and security scanning platform featuring multi-tool orchestration, security-reference enrichment, AES-256-GCM encrypted storage, and Gemini AI-assisted analysis.',
    ar: 'منصة متكاملة ومؤتمتة لاستطلاع وفحص أمن تطبيقات الويب (Black-Box)، تجمع بين تنسيق الأدوات المتعددة، الإثراء المرجعي للثغرات، التخزين المشفر بـ AES-256-GCM، والتحليل المدعوم بذكاء Gemini.'
  },
  corePipeline: { en: 'Workflow Pipeline', ar: 'مسار العمل المقترح' },
  projectTeam: { en: 'Project Team Members', ar: 'فريق عمل المشروع' },
  supervisorLbl: { en: 'Supervised By', ar: 'إشراف الدكتورة' },
  academicYear: { en: 'Academic Year', ar: 'العام الجامعي' },
  startBtn: { en: 'Start Presentation', ar: 'ابدأ العرض' },
  startText: { en: 'Start Presentation (25 Slides)', ar: 'ابدأ العرض التقديمي (25 شريحة معتمدة)' },
  disclaimerCover: {
    en: '⚠️ Midterm Defense Presentation · All security tool workflows are simulated demonstrations · No real scanning executed',
    ar: '⚠️ عرض مناقشة مشروع تخرج (1) · جميع عمليات الفحص محاكاة تعليمية وتوضيحية للمسار المقترح · لا يتم استهداف أو فحص أي أهداف حقيقية'
  },
  overview: { en: 'Overview', ar: 'الفهرس' },
  overviewTitle: { en: 'Slide Overview & Navigation (25 Slides)', ar: 'فهرس شرائح العرض والتنقل السريع (25 شريحة)' },
  overviewSub: { en: 'Official 25-slide structure aligned with UST Midterm Evaluation Guidelines', ar: 'الهيكل الرسمي المعتمد المكون من 25 شريحة وفق دليل تقييم مشاريع التخرج' },
  close: { en: 'Close', ar: 'إغلاق' },
  prev: { en: 'Prev', ar: 'السابق' },
  next: { en: 'Next', ar: 'التالي' },
  reduceMotion: { en: 'Reduce Motion', ar: 'تقليل الحركة' },
  jumpTo: { en: 'Slide', ar: 'شريحة' },
  shortcutsTitle: { en: 'Keyboard Shortcuts', ar: 'اختصارات لوحة المفاتيح' }
};

/* ============================================================
   25 SLIDES COMPLIANT WITH UST MIDTERM GUIDELINES (دليل العرض النصفي)
============================================================ */
const S = [];
const addSlide = (kicker, title, tagText, tagClass, note, renderFn) => {
  S.push({ kicker, title, tagText, tagClass, note, renderFn });
};

// 1. Title & Team (الشريحة 1)
addSlide(
  ['Slide 01: Title & Team', 'الشريحة 1: العنوان وفريق العمل'],
  ['Project Identity & Research Team', 'هوية المشروع، فريق العمل والإشراف'],
  ['Team & Supervision', 'الفريق والإشراف'], 'tag-sec',
  ['YemScan: Graduation Project (1) at UST, Faculty of Computing & IT, Department of Computer Science.',
   'مشروع YemScan: مقرر مشروع التخرج (1) بكلية الحاسبات وتكنولوجيا المعلومات - قسم علوم الحاسوب.'],
  () => `<div class="c-grid-2">
    ${A(0, `<div class="c-card-ic">🛡️</div>
      <h3 class="c-card-h" style="color:var(--teal); font-size:22px;">YemScan</h3>
      <p class="c-card-p" style="font-size:15px; margin-bottom:12px;"><b>${tr('Yemeni Web Attack and Vulnerability Scanner', 'الماسح اليمني لفحص ثغرات وهجمات الويب')}</b></p>
      <div style="font-size:13px; color:var(--text-muted); line-height:1.7;">
        <div><b>${tr('Institution:', 'المؤسسة:')}</b> ${tr('University of Science and Technology (UST)', 'جامعة العلوم والتكنولوجيا')}</div>
        <div><b>${tr('Faculty:', 'الكلية:')}</b> ${tr('Faculty of Computing & IT · Computer Science Dept', 'كلية الحاسبات وتكنولوجيا المعلومات · قسم علوم الحاسوب')}</div>
        <div><b>${tr('Specialization:', 'التخصص:')}</b> ${tr('Cybersecurity and Networking', 'الأمن السيبراني والشبكات')}</div>
        <div><b>${tr('Academic Year:', 'العام الجامعي:')}</b> 2026 - 2027</div>
        <div><b>${tr('Supervisor:', 'المشرف:')}</b> <span style="color:var(--violet); font-weight:800;">Dr. Aisha Al-Hadm (د. عائشة الهضم)</span></div>
      </div>`, 'c-card')}

    ${A(1, `<div class="c-card-ic">👥</div>
      <h3 class="c-card-h" style="color:var(--blue); font-size:20px;">${tr('Research & Engineering Team', 'فريق البحث والتطوير')}</h3>
      <div class="c-col" style="gap:8px; margin-top:8px;">
        <div class="member"><span class="m-icon">👤</span><span class="m-name">Mohammed Saleh Hatem</span><span class="m-id">202310400368</span></div>
        <div class="member"><span class="m-icon">👤</span><span class="m-name">Nassar Ahmed Al-Fattahi</span><span class="m-id">202310400349</span></div>
        <div class="member"><span class="m-icon">👤</span><span class="m-name">Mohammed Abdulwahid Alrubaidi</span><span class="m-id">202310100273</span></div>
        <div class="member"><span class="m-icon">👤</span><span class="m-name">Younes Mohammed Alsarory</span><span class="m-id">202310102399</span></div>
        <div class="member"><span class="m-icon">👤</span><span class="m-name">Abdulmajid Abulkarim Anqa</span><span class="m-id">202310102081</span></div>
      </div>`, 'c-card c-blue')}
  </div>`
);

// 2. Background / Context (الشريحة 2)
addSlide(
  ['Slide 02: Background', 'الشريحة 2: الخلفية والسياق'],
  ['Context: External Attack Surface & Web Exposure', 'السياق العام: سطح الهجوم الخارجي وتوسع تعرض الويب'],
  ['Background', 'الخلفية'], 'tag-sec',
  ['Accelerated digital migration creates dynamic subdomains, APIs, and services prone to external threats.',
   'التوسع الرقمي المتسارع يفرز أصولاً رقمية ونطاقات وواجهات API معرضة للهجمات الخارجية.'],
  () => `<div class="c-grid-3">
    ${A(0, `<span class="c-card-ic">🌐</span>
      <h3 class="c-card-h">${tr('Digital Asset Sprawl', 'توسع الأصول الرقمية')}</h3>
      <p class="c-card-p">${tr('Organizations rely heavily on microservices, exposed REST APIs, and third-party integrations forming complex attack perimeters.',
        'تعتمد المؤسسات والشركات على خدمات ويب موزعة، وواجهات برمجية مكشوفة، تشكل سطح هجوم ديناميكي يصعب حصره يدوياً.')}</p>`, 'c-card')}

    ${A(1, `<span class="c-card-ic">📊</span>
      <h3 class="c-card-h">${tr('Verizon DBIR 2025 Reality', 'واقع تقرير الاختراقات DBIR 2025')}</h3>
      <p class="c-card-p">${tr('Vulnerability exploitation accounted for 20% of analyzed initial breach access vectors (+34% increase relative to prior report).',
        'شكل استغلال الثغرات مدخل الوصول الأولي في 20% من حوادث الاختراق المحللة، بزيادة بلغت 34% مقارنة بالعام السابق.')}</p>
      <div class="stat-box">
        <div class="stat-num">20%</div>
        <div class="stat-txt"><b>${tr('Initial Access Vector', 'مدخل الاختراق الأولي')}</b><br>${tr('+34% Year-over-Year', '+34% زيادة سنوية')}</div>
      </div>`, 'c-card c-blue')}

    ${A(2, `<span class="c-card-ic">🎯</span>
      <h3 class="c-card-h">${tr('External Black-Box Testing', 'منهج الفحص الصندوق الأسود')}</h3>
      <p class="c-card-p">${tr('Assessing external vulnerabilities without source code access mirrors true adversary techniques, exposing vulnerabilities before exploitation.',
        'فحص المنظومة من الخارج بدون كود مصدري يحاكي بدقة تقنيات المهاجم الفعلي لاكتشاف الأخطاء وتصحيحها استباقياً.')}</p>`, 'c-card c-violet')}
  </div>`
);

// 3. Problem Statement (الشريحة 3)
addSlide(
  ['Slide 03: Problem Statement', 'الشريحة 3: المشكلة وأثرها'],
  ['Problem Statement: The Security Scanning Dilemma', 'بيان المشكلة: معضلة تشتت أدوات الفحص والأثر المترتب'],
  ['Problem', 'المشكلة'], 'tag-prop',
  ['Disjointed CLI utilities, incompatible telemetry schemas, and absence of standardized risk context.',
   'تشتت أدوات الفحص الفردية، تباين صيغ المخرجات، وغياب السياق المرجعي وإرشادات المعالجة.']
  , () => `<div class="c-grid-3">
    ${A(0, `<span class="c-card-ic">🧩</span>
      <h3 class="c-card-h">${tr('1. Tool Fragmentation', '1. تشتت الأدوات')}</h3>
      <p class="c-card-p">${tr('Separate CLI tools are required for subdomains (Subfinder), ports (Naabu), endpoints (httpx/Kiterunner), and flaws (Nuclei/Wapiti). Manual piping wastes critical response time.',
        'تتطلب كل مرحلة أداة منفصلة (Subfinder، Naabu، httpx، Kiterunner، Nuclei، Wapiti)، مما يستهلك وقتاً طويلاً في نقل المخرجات يدوياً.')}</p>`, 'c-card')}

    ${A(1, `<span class="c-card-ic">📑</span>
      <h3 class="c-card-h">${tr('2. Output Inconsistency', '2. تباين المخرجات')}</h3>
      <p class="c-card-p">${tr('Raw tool outputs (arbitrary JSON, XML, text) lack unified normalization. Duplicates clutter reports and obscure true severity.',
        'تنتج كل أداة صيغاً عشوائية (نصوص، JSON متباين، XML) يصعب دمجها وتؤدي إلى تكرار النتائج وتشتيت المحلل.')}</p>`, 'c-card c-amber')}

    ${A(2, `<span class="c-card-ic">⚠️</span>
      <h3 class="c-card-h">${tr('3. Lack of Remediation Context', '3. غياب سياق المعالجة')}</h3>
      <p class="c-card-p">${tr('Raw scanner logs rarely provide actionable remediation advice or correlated references (CVE/CWE/CVSS/OWASP), creating severe cognitive burden for developers.',
        'تفتقر المخرجات الأولية إلى ربط مرجعي قياسي أو خطوات علاج واضحة، مما يعيق فرق التطوير عن اتخاذ إجراءات إصلاح سريعة.')}</p>`, 'c-card c-red')}
  </div>`
);

// 4. Motivation / Significance (الشريحة 4)
addSlide(
  ['Slide 04: Motivation & Significance', 'الشريحة 4: الدافع وأهمية المشروع'],
  ['Project Significance Across Four Core Dimensions', 'أهمية المشروع وأبعاده الأربعة (أمنياً، تقنياً، بحثياً، وعملياً)'],
  ['Significance', 'الأهمية والدافع'], 'tag-sec',
  ['YemScan delivers holistic value across security visibility, engineering automation, and practical operation.',
   'يقدم YemScan قيمة شاملة عبر الرؤية الأمنية، الأتمتة الهندسية، والتشغيل العملي المحمي بالتشفير.'],
  () => `<div class="c-grid-4">
    ${A(0, `<span class="c-card-ic">🛡️</span>
      <h3 class="c-card-h">${tr('Security Impact', 'الأثر الأمني')}</h3>
      <p class="c-card-p">${tr('Expands visibility into shadow IT assets, exposed ports, and forgotten APIs, enabling proactive risk ranking.',
        'كشف الأصول الرقمية والواجهات المهملة، مما يقلص مساحة الهجوم ويدعم ترتيب المخاطر استناداً للأدلة.')}</p>`, 'c-card')}

    ${A(1, `<span class="c-card-ic">⚙️</span>
      <h3 class="c-card-h">${tr('Technical Rigor', 'الأثر التقني')}</h3>
      <p class="c-card-p">${tr('Orchestrates Docker-isolated engines, structured PostgreSQL relational schema, and AES-256-GCM envelope encryption.',
        'تنسيق الأدوات داخل حاويات Docker، وتخزين موحد في PostgreSQL، وحماية بتشفير المغلف AES-256-GCM.')}</p>`, 'c-card c-blue')}

    ${A(2, `<span class="c-card-ic">🔬</span>
      <h3 class="c-card-h">${tr('Research Value', 'الأثر البحثي')}</h3>
      <p class="c-card-p">${tr('Establishes an applied model combining open-source scanners with deterministic reference enrichment and AI co-pilots.',
        'نموذج تطبيقي يدمج أدوات المصدر المفتوح مع الإثراء المرجعي الموثوق وطبقة الذكاء التحليلي التفسيري.')}</p>`, 'c-card c-violet')}

    ${A(3, `<span class="c-card-ic">⏱️</span>
      <h3 class="c-card-h">${tr('Operational Gain', 'الأثر العملي')}</h3>
      <p class="c-card-p">${tr('Drastically slashes manual assessment hours, automating dual-tier reporting for executives and developers.',
        'تقليص ساعات العمل اليدوية بشكل كبير، وتوليد تقارير تنفيذية وفنية مؤتمتة ومشفرة.')}</p>`, 'c-card c-amber')}
  </div>`
);

// 5. Objectives (الشريحة 5)
addSlide(
  ['Slide 05: Objectives', 'الشريحة 5: أهداف المشروع'],
  ['Main & Specific Project Objectives', 'الهدف العام والأهداف التفصيلية القابلة للتحقق'],
  ['Objectives', 'الأهداف'], 'tag-prop',
  ['One primary goal supported by six measurable operational objectives.',
   'هدف رئيسي واحد مدعوم بستة أهداف تشغيلية وتطويرية محددة وقابلة للقياس.'],
  () => `<div class="c-grid-2">
    ${A(0, `<h3 class="c-card-h" style="color:var(--teal); font-size:20px;">🎯 ${tr('Primary Project Objective', 'الهدف العام للمشروع')}</h3>
      <p class="c-card-p" style="font-size:14.5px; line-height:1.6; margin-bottom:12px;">${tr('To design and build the YemScan platform for automated discovery and inventorying of externally exposed digital assets, executing black-box security scans, and normalizing, enriching, and analyzing results to produce structured remediation advice and dual-tier reports.',
        'تطوير منصة YemScan لاكتشاف وحصر الأصول والخدمات الرقمية المكشوفة خارجياً، وإجراء الفحوصات الأمنية بنهج الصندوق الأسود، ومعالجة وإثراء وتحليل النتائج بأسلوب مهيكل لدعم تقديم التوصيات وإنتاج التقارير التنفيذية والفنية.')}</p>
      <div class="stat-box">
        <span style="font-size:26px;">🔐</span>
        <div class="stat-txt"><b>${tr('Built-in Data Protection:', 'حماية البيانات المضمنة:')}</b> ${tr('AES-256-GCM envelope encryption with per-scan DEK keys.', 'تشفير المغلف AES-256-GCM مع مفتاح DEK مستقل لكل فحص.')}</div>
      </div>`, 'c-card')}

    ${A(1, `<h3 class="c-card-h" style="color:var(--blue); font-size:20px;">📋 ${tr('Specific Operational Objectives', 'الأهداف التشغيلية التفصيلية')}</h3>
      <ul class="c-card-list" style="font-size:12.5px; line-height:1.65;">
        <li><b>1. ${tr('Automated Discovery:', 'الاكتشاف المؤتمت:')}</b> ${tr('Map subdomains, open ports, and API paths via Subfinder, Naabu, and Kiterunner.', 'حصر النطاقات والمنافذ ومسارات الـ API.')}</li>
        <li><b>2. ${tr('Black-Box Scanning:', 'الفحص الخارجي:')}</b> ${tr('Support Sequential Pipeline and Independent tool execution.', 'دعم نمطي الفحص المتسلسل والمستقل.')}</li>
        <li><b>3. ${tr('Data Normalization & Dedup:', 'التوحيد وإلغاء التكرار:')}</b> ${tr('Consolidate findings and map to CVE, CWE, CVSS, and OWASP Top 10.', 'إلغاء التكرار والربط بالمعايير القياسية الدولية.')}</li>
        <li><b>4. ${tr('AI Remediation Co-Pilot:', 'التحليل الذكي:')}</b> ${tr('Deploy Gemini 3.8 Flash for plain-language interpretation and priority hints.', 'توظيف Gemini للشرح وتحديد أولويات المعالجة.')}</li>
        <li><b>5. ${tr('Secure Web Dashboard & RBAC:', 'لوحة التحكم وعزل البيانات:')}</b> ${tr('Role-based access, per-user data isolation, and cryptographic retrieval.', 'إدارة الصلاحيات وعزل بيانات المستخدمين المشفرة.')}</li>
        <li><b>6. ${tr('Dual-Tier Report Generation:', 'إنتاج التقارير:')}</b> ${tr('Generate encrypted Executive and Technical reports.', 'توليد التقارير التنفيذية والفنية المؤتمتة.')}</li>
      </ul>`, 'c-card c-blue')}
  </div>`
);

// 6. Project Scope & Delimitations (الشريحة 6)
addSlide(
  ['Slide 06: Scope & Delimitations', 'الشريحة 6: النطاق والمحددات'],
  ['Project Scope: In-Scope vs Out-of-Scope', 'نطاق المشروع وحدوده: ما يشمله وما هو خارج نطاقه'],
  ['Scope Boundaries', 'حدود النطاق'], 'tag-sec',
  ['Clear operational boundaries ensuring responsible, ethical, and feasible cybersecurity research.',
   'حدود تشغيلية واضحة تضمن بحثاً أمنياً مسؤولاً وأخلاقياً وقابلاً للتطبيق العملي.'],
  () => `<div class="c-grid-2">
    ${A(0, `<div class="c-card-ic" style="color:var(--teal);">✔</div>
      <h3 class="c-card-h" style="color:var(--teal); font-size:18px;">${tr('In-Scope (Covered in YemScan)', 'داخل نطاق العمل (In-Scope)')}</h3>
      <ul class="c-card-list" style="font-size:13px; line-height:1.65;">
        <li><b>${tr('External Black-Box Reconnaissance:', 'الاستطلاع الخارجي:')}</b> ${tr('Public subdomains, IP hosts, open ports, web services, API endpoints.', 'النطاقات العامة، المنافذ المفتوحة، الخدمات، ونقاط API.')}</li>
        <li><b>${tr('Tool Orchestration:', 'تنسيق الأدوات:')}</b> ${tr('Automated data handover in Sequential mode & ad-hoc Independent runs.', 'تمرير البيانات متسلسلاً أو التشغيل المستقل.')}</li>
        <li><b>${tr('Data Normalization:', 'توحيد البيانات:')}</b> ${tr('PostgreSQL relational storage with provenance links to raw outputs.', 'تخزين علائقي مع روابط التدقيق للمخرجات الخام.')}</li>
        <li><b>${tr('Security References & AI:', 'المراجع والذكاء:')}</b> ${tr('CVE/CWE/CVSS/OWASP enrichment + Gemini 3.8 Flash interpretation.', 'إثراء بالمعايير القياسية وشرح وتوصيات بذكاء Gemini.')}</li>
        <li><b>${tr('Cryptographic Privacy:', 'التشفير والخصوصية:')}</b> ${tr('AES-256-GCM envelope encryption protecting stored files & reports.', 'تشفير المغلف لحماية الملفات والتقارير في وضع السكون.')}</li>
      </ul>`, 'c-card')}

    ${A(1, `<div class="c-card-ic" style="color:var(--red);">✖</div>
      <h3 class="c-card-h" style="color:var(--red); font-size:18px;">${tr('Out-of-Scope (Delimitations)', 'خارج نطاق العمل والمحددات')}</h3>
      <ul class="c-card-list" style="font-size:13px; line-height:1.65;">
        <li><b>${tr('Active Exploitation:', 'الاستغلال الهجومي الفعلي:')}</b> ${tr('No compromise attempts, data exfiltration, or denial-of-service tests.', 'لا يشمل تنفيذ هجمات استغلالية أو اختراق قواعد البيانات.')}</li>
        <li><b>${tr('Unauthorized Testing:', 'الفحص دون تصريح:')}</b> ${tr('Restricted strictly to authorized scopes and verified domain owners.', 'مقتصر تماماً على الأهداف المصرح بها والمملوكة للمستخدم.')}</li>
        <li><b>${tr('Internal Networks:', 'الشبكات الداخلية:')}</b> ${tr('Excludes internal LAN/Active Directory infrastructure auditing.', 'لا يشمل فحص البنية الشبكية الداخلية أو أجهزة الموظفين.')}</li>
        <li><b>${tr('WAF/DDoS/CAPTCHA Bypass:', 'تجاوز جدران الحماية:')}</b> ${tr('Does not attempt evasion of cloud firewalls or bot protections.', 'لا يسعى للالتفاف على الـ WAF أو أنظمة الكابتشا.')}</li>
        <li><b>${tr('Social Engineering:', 'الهندسة الاجتماعية:')}</b> ${tr('Excludes phishing, password cracking, or credential brute-force.', 'مستبعد تماماً: هجمات التصيد وتخمين كلمات المرور.')}</li>
      </ul>`, 'c-card c-red')}
  </div>`
);

// 7. Existing Systems / Related Work (الشريحة 7)
addSlide(
  ['Slide 07: Related Work', 'الشريحة 7: الأنظمة السابقة'],
  ['Related Work & Existing Security Solutions', 'الأعمال والأنظمة السابقة: تقييم الأدوات وأطر العمل الحالية'],
  ['Literature Review', 'مراجعة الأدبيات'], 'tag-sec',
  ['Reviewing standalone scanners and frameworks to identify functional boundaries.',
   'مراجعة الأدوات المنفصلة وأطر العمل لتحديد حدودها التشغيلية وأوجه القصور.'],
  () => {
    const systems = [
      ['Nuclei (ProjectDiscovery)', 'Standalone Template Scanner', 'Fast YAML template scanning; excels at known CVE detection but lacks attack surface discovery, API routing, and AI synthesis.', 'أداة سريعة لفحص القوالب، ممتازة في كشف CVEs المعروفة لكنها لا تدير الاستكشاف أو الـ APIs أو التحليل الذكي.'],
      ['Wapiti (Open Source)', 'Standalone DAST Crawler', 'Black-box web vulnerability scanner auditing input fields; lacks subdomain enumeration, port mapping, and data normalization.', 'أداة فحص ديناميكية ممتازة للمدخلات، لكنها تفتقر لاكتشاف النطاقات، فحص المنافذ، وتوحيد المخرجات.'],
      ['reNgine Framework', 'Reconnaissance Platform', 'Coordinates OSINT tools with a dashboard; supports LLMs but lacks pre-AI deterministic reference enrichment and envelope encryption.', 'إطار استطلاع متميز ينسق الأدوات، لكنه يفتقر لمرحلة إثراء مرجعي مسبقة منفصلة عن الذكاء والتشفير المغلف.'],
      ['FortiScan (UST 2024)', 'Financial App Scanner', 'Undergraduate project using Wapiti and GPT-4 for financial apps; limited single-tool scope without multi-stage reconnaissance or AES encryption.', 'مشروع تخرج لتقييم التطبيقات المالية باستخدام Wapiti وGPT-4، نطاقه أداة واحدة دون استكشاف شامل أو تشفير.']
    ];
    return `<div class="c-grid-2">
      ${systems.map((s, idx) => A(idx, `
        <div style="font-size:16px; font-weight:800; color:var(--teal); margin-bottom:2px;">${s[0]}</div>
        <div style="font-size:12px; font-weight:700; color:var(--blue); margin-bottom:6px;">${s[1]}</div>
        <p class="c-card-p" style="font-size:13px;">${tr(s[2], s[3])}</p>`, 'c-card')).join('')}
    </div>`;
  }
);

// 8. Gap Analysis / Limitations (الشريحة 8)
addSlide(
  ['Slide 08: Research Gap', 'الشريحة 8: الفجوة البحثية'],
  ['Research & Technical Gap (Comparative Synthesis)', 'الفجوة البحثية والتقنية: أوجه القصور في الأنظمة السابقة'],
  ['Table 2.2 Gap', 'الفجوة المعمارية'], 'tag-prop',
  ['Existing tools either isolate scanning or couple AI without verified reference integrity or cryptographic controls.',
   'الأنظمة الحالية إما تعزل الأدوات أو تدمج الذكاء دون ضبط المرجعية الموثوقة أو ضوابط التشفير.'],
  () => {
    const gaps = [
      ['Fragmented Workflows', 'تشتت مسارات العمل', 'Tools run independently with zero automated sequential handover between discovery, APIs, and flaw detection.', 'تعمل الأدوات بشكل منفصل دون تسليم آلي للبيانات بين مراحل الاستكشاف والـ APIs وفحص الثغرات.'],
      ['Arbitrary Output Schemas', 'عشوائية صيغ المخرجات', 'Absence of standardized relational normalization and provenance links between findings and original evidence.', 'غياب التوحيد القياسي العلائقي وروابط التتبع بين النتيجة المعالجة ودليل الأداة الخام.'],
      ['AI Hallucination Risk', 'مخاطر تخيل الذكاء الاصطناعي', 'Existing AI scanners prompt LLMs to classify CVE/CVSS directly, risking hallucinated severity scores without deterministic grounding.', 'تعتمد بعض الأنظمة على الذكاء لتحديد درجات الخطورة مباشرة مما يولد هلوسة أمنية خطرة.'],
      ['Unencrypted Stored Telemetry', 'تخزين البيانات دون تشفير', 'Sensitive vulnerability findings and target asset inventories are stored unencrypted at rest across servers.', 'تُخزن تقارير الفحص وسجلات الثغرات الحساسة كملفات غير مشفرة على الخوادم.']
    ];
    return `<div class="c-grid-2">
      ${gaps.map((g, idx) => A(idx, `
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:6px;">
          <span style="font-size:20px; color:var(--amber);">⚠️</span>
          <h3 class="c-card-h" style="font-size:17px; color:#ffffff;">${tr(g[0], g[1])}</h3>
        </div>
        <p class="c-card-p">${tr(g[2], g[3])}</p>`, 'c-card c-amber')).join('')}
    </div>`;
  }
);

// 9. Proposed Solution & Value (الشريحة 9)
addSlide(
  ['Slide 09: Proposed Solution', 'الشريحة 9: الحل المقترح'],
  ['The Proposed YemScan Solution: 6-Phase Architecture', 'الحل المقترح: منصة YemScan وقيمتها المضافة'],
  ['Solution Architecture', 'الحل المقترح'], 'tag-demo',
  ['An integrated paradigm: Discover → Scan → Process → Enrich → Analyze → Report.',
   'نموذج عمل متكامل: اكتشاف ← فحص ← معالجة ← إثراء مرجعي ← تحليل ذكي ← تقارير مشفرة.'],
  () => {
    const phases = [
      ['01', '🔭', 'Discover', 'اكتشاف', 'Subdomains, ports & APIs', 'النطاقات والمنافذ والـ APIs'],
      ['02', '📡', 'Scan', 'فحص', 'Web & API vulnerability audit', 'فحص ثغرات الويب والواجهات'],
      ['03', '⚙️', 'Process', 'معالجة', 'Normalize schema & deduplicate', 'توحيد البيانات وإزالة التكرار'],
      ['04', '🏷️', 'Enrich', 'إثراء', 'CVE · CWE · CVSS · OWASP', 'ربط المراجع الدولية المعتمدة'],
      ['05', '🧠', 'Analyze', 'تحليل', 'Gemini AI remediation co-pilot', 'تحليل وتوصيات ذكاء Gemini'],
      ['06', '📑', 'Report', 'تقرير', 'AES-256-GCM encrypted reports', 'تقارير تنفيذية وفنية مشفرة']
    ];
    return `<div class="c-col" style="align-items:center; gap:18px;">
      <div class="pipeline-flow">
        ${phases.map((p, idx) => (idx ? '<div class="pipe-conn">➜</div>' : '') +
          A(idx, `<div class="pn-step">PHASE ${p[0]}</div>
            <span class="pn-ic">${p[1]}</span>
            <div class="pn-title">${tr(p[2], p[3])}</div>
            <div class="pn-sub">${tr(p[4], p[5])}</div>`, 'pipe-node')).join('')}
      </div>
      <div class="stat-box" style="width:100%; max-width:960px;">
        <span style="font-size:32px;">💡</span>
        <div class="stat-txt">
          <b>${tr('Core Value Proposition:', 'القيمة المضافة الجوهرية للحل:')}</b> 
          ${tr('YemScan transforms fragmented CLI tools into an automated, cryptographically secure reconnaissance pipeline where verified references remain the authoritative source of truth, and Gemini acts strictly as an explanatory co-pilot.',
               'تحويل الأدوات المنفصلة إلى مسار أمني مؤتمت ومحمي بتشفير AES-256-GCM، بحيث تظل المعايير الدولية هي المرجع القطعي، ويكون الذكاء الاصطناعي مساعداً تفسيرياً وإرشادياً.')}
        </div>
      </div>
    </div>`;
  }
);

// 10. System Overview / Architecture: 5 Layers (الشريحة 10)
addSlide(
  ['Slide 10: System Architecture', 'الشريحة 10: معمارية النظام'],
  ['5-Layer Modular Architecture (Figure 3.1 Flow)', 'معمارية النظام المعيارية المكونة من 5 طبقات (مخطط 3.1)'],
  ['Architecture Flow', 'المعمارية العامة'], 'tag-prop',
  ['Clean architectural separation of presentation, business logic, containerized tools, encrypted data, and AI.',
   'فصل معماري منظم بين واجهة العرض، منطق التطبيق، أدوات الفحص المعزولة، البيانات المشفرة، وطبقة الذكاء.'],
  () => {
    const layers = [
      ['Layer 1', 'Presentation Layer', 'طبقة العرض والواجهة', 'React & TypeScript', 'Interactive Dashboard · Target Input · Live Scan Monitor · Report Viewer'],
      ['Layer 2', 'Application Layer', 'طبقة التطبيق والتنسيق', 'FastAPI Backend', 'Orchestration Engine · RBAC Access Control · Scope Validation · Decryption Auth'],
      ['Layer 3', 'Security Execution Engine', 'محرك الفحص والتنفيذ', 'Docker Containers', 'Subfinder · Naabu · httpx · Kiterunner · Nuclei · Wapiti (Isolated execution)'],
      ['Layer 4', 'Data Management Layer', 'طبقة إدارة البيانات', 'PostgreSQL & File System', 'AES-256-GCM Envelope Encryption · Relational Normalized DB · Raw Output Vault'],
      ['Layer 5', 'AI & Reporting Layer', 'طبقة الذكاء والتقارير', 'Gemini 3.8 Flash & PDF Engine', 'AI Summarization & Remediation Advice · Executive & Technical Report Generator']
    ];
    return `<div class="arch-stack">
      ${layers.map((l, idx) => A(idx, `
        <div class="arch-layer-info">
          <span class="arch-layer-num">${l[0]}</span>
          <div class="arch-layer-name">${tr(l[1], l[2])}</div>
          <div class="arch-layer-tech">${l[3]}</div>
        </div>
        <div class="arch-boxes">
          <div class="arch-pill ${['', 'blue', 'violet', 'amber', ''][idx]}">
            <b>•</b> ${l[4]}
          </div>
        </div>`, 'arch-layer')).join('')}
    </div>`;
  }
);

// 11. Development Methodology: Agile & Sprints (الشريحة 11)
addSlide(
  ['Slide 11: Development Methodology', 'الشريحة 11: منهجية التطوير'],
  ['Agile Incremental Lifecycle & Sprints', 'منهجية التطوير التكرارية (Agile) وتقسيم الـ Sprints'],
  ['Methodology', 'المنهجية'], 'tag-prop',
  ['Agile principles allow progressive iteration across requirements, tool chaining, encryption, and evaluation.',
   'اعتماد دورة حياة Agile التكرارية يتيح التطوير المرحلي والتكيف مع التحديات الأمنية.'],
  () => {
    const sprints = [
      ['Sprint 1', 'Requirements & Architecture', 'تحليل المتطلبات وتصميم المعمارية', 'Completed', 'badge-done', 'Scope definition, tool selection, 5-layer design, and ERD data modeling.'],
      ['Sprint 2', 'Reconnaissance Chaining', 'ربط أدوات الاستكشاف والاستطلاع', 'Completed', 'badge-done', 'Integration of Subfinder, Naabu, and httpx within containerized workers.'],
      ['Sprint 3', 'API & Vulnerability Scanners', 'دمج فحص الـ APIs والثغرات', 'Completed', 'badge-done', 'Kiterunner API routing + Nuclei YAML & Wapiti DAST execution pipelines.'],
      ['Sprint 4', 'Normalization & Enrichment', 'توحيد البيانات والإثراء المرجعي', 'In Progress', 'badge-wip', 'PostgreSQL schema ingestion, deduplication, and CVE/CWE/CVSS matching.'],
      ['Sprint 5', 'Cryptographic Security & AI', 'التشفير وحماية البيانات وGemini', 'In Progress', 'badge-wip', 'AES-256-GCM envelope encryption, Gemini API integration, and reports.']
    ];
    return `<div class="c-col" style="gap:10px;">
      ${sprints.map((s, idx) => A(idx, `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-family:var(--font-mono); font-size:13px; font-weight:800; color:var(--teal);">${s[0]}</span>
            <b style="font-size:15px; color:#ffffff;">${tr(s[1], s[2])}</b>
          </div>
          <span class="status-badge ${s[4]}">${s[3]}</span>
        </div>
        <p class="c-card-p" style="font-size:13px;">${s[5]}</p>`, 'c-card')).join('')}
    </div>`;
  }
);

// 12. Methodology-Specific Progress: Increments (الشريحة 12)
addSlide(
  ['Slide 12: Progress by Increments', 'الشريحة 12: التقدم الفعلي حسب الزيادات'],
  ['Actual Progress: Functional Increments Delivered', 'التقدم الفعلي: الزيادات الوظيفية (Increments) المنجزة'],
  ['Working Increments', 'الزيادات الوظيفية'], 'tag-sec',
  ['Demonstrating actual progress with verifiable functional increments rather than subjective percentages.',
   'إثبات التقدم الفعلي بالأدلة والزيادات الوظيفية المنجزة بدلاً من النسب التقديرية غير المبررة.'],
  () => {
    const incs = [
      ['Increment 1: Core Reconnaissance Engine', 'الزيادة 1: محرك الاستكشاف الأساسي', 'Completed', 'badge-done', 'Functional pipeline chaining Subfinder → Naabu → httpx. Discovers domains, active IPs, open ports, and confirmed web services.'],
      ['Increment 2: API & Dynamic Vulnerability Probing', 'الزيادة 2: فحص الـ APIs وثغرات الويب', 'Completed', 'badge-done', 'Kiterunner endpoint enumeration fed directly into Nuclei and Wapiti containerized scanners.'],
      ['Increment 3: Relational Ingestion & Deduplication', 'الزيادة 3: استيعاب البيانات وإزالة التكرار', 'In Progress', 'badge-wip', 'PostgreSQL tables parsing raw CLI logs into structured unified findings with provenance links.'],
      ['Increment 4: AES-256-GCM Encryption & Gemini Co-Pilot', 'الزيادة 4: التشفير المغلف وذكاء Gemini', 'In Progress', 'badge-wip', 'Per-scan DEK cryptographic management, HTTPS data minimization, and automated dual-tier report templates.']
    ];
    return `<div class="c-grid-2">
      ${incs.map((inc, idx) => A(idx, `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <h3 class="c-card-h" style="font-size:16px; color:var(--teal);">${tr(inc[0], inc[1])}</h3>
          <span class="status-badge ${inc[3]}">${inc[2]}</span>
        </div>
        <p class="c-card-p">${inc[4]}</p>`, 'c-card')).join('')}
    </div>`;
  }
);

// 13. Requirements Engineering Progress (الشريحة 13)
addSlide(
  ['Slide 13: Requirements Progress', 'الشريحة 13: تقدم هندسة المتطلبات'],
  ['Requirements Progress: Functional & Non-Functional', 'تقدم هندسة المتطلبات: المتطلبات الوظيفية وغير الوظيفية'],
  ['Requirements Engineering', 'المتطلبات'], 'tag-prop',
  ['Formal specifications defined in Chapter 1 & 3 of project documentation.',
   'توثيق المواصفات والمتطلبات الرسمية كما وردت في الفصول 1 و3 من وثيقة المشروع.'],
  () => `<div class="c-grid-2">
    ${A(0, `<h3 class="c-card-h" style="color:var(--teal); font-size:18px;">📋 ${tr('Functional Requirements Status', 'حالة المتطلبات الوظيفية (FR)')}</h3>
      <ul class="c-card-list">
        <li><b>FR-1: Target & Scope Validation:</b> ${tr('Domain/URL validation and authorized boundary checks.', 'التحقق من صحة الهدف ونطاق الفحص المصرح به.')} <span class="status-badge badge-done">Done</span></li>
        <li><b>FR-2: Sequential & Independent Modes:</b> ${tr('Configurable execution pipelines for multi-tool tasks.', 'دعم نمطي الفحص المتسلسل والمستقل.')} <span class="status-badge badge-done">Done</span></li>
        <li><b>FR-3: Output Ingestion & Normalization:</b> ${tr('Transforming raw logs into relational schema.', 'توحيد مخرجات الأدوات في جداول علائقية.')} <span class="status-badge badge-wip">In Progress</span></li>
        <li><b>FR-4: Security Reference Enrichment:</b> ${tr('Mapping findings to CVE, CWE, CVSS, and OWASP.', 'ربط النتائج بالمعايير القياسية.')} <span class="status-badge badge-wip">In Progress</span></li>
        <li><b>FR-5: AI-Assisted Remediation:</b> ${tr('Gemini prompt generation and plain-text guidance.', 'توليد إرشادات المعالجة عبر Gemini.')} <span class="status-badge badge-wip">In Progress</span></li>
        <li><b>FR-6: Encrypted Dual Reporting:</b> ${tr('Executive & Technical PDF/JSON report compilation.', 'إنتاج التقارير التنفيذية والفنية المشفرة.')} <span class="status-badge badge-plan">Planned</span></li>
      </ul>`, 'c-card')}

    ${A(1, `<h3 class="c-card-h" style="color:var(--blue); font-size:18px;">🔒 ${tr('Non-Functional Requirements Status', 'حالة المتطلبات غير الوظيفية (NFR)')}</h3>
      <ul class="c-card-list">
        <li><b>NFR-1: Performance & Isolation:</b> ${tr('Docker execution isolated from web dashboard requests.', 'عزل بيئة تشغيل الأدوات عن خادم الويب.')} <span class="status-badge badge-done">Done</span></li>
        <li><b>NFR-2: Cryptographic Confidentiality:</b> ${tr('AES-256-GCM protecting stored files and reports at rest.', 'حماية الملفات والتقارير بتشفير GCM.')} <span class="status-badge badge-wip">In Progress</span></li>
        <li><b>NFR-3: Multi-User Data Isolation:</b> ${tr('RBAC ensuring users only access their own scan results.', 'عزل تام لبيانات الفحص بين المستخدمين.')} <span class="status-badge badge-done">Done</span></li>
        <li><b>NFR-4: Integrity & Provenance:</b> ${tr('Cryptographic authentication tags verify raw log tamper-evidence.', 'التحقق من وسوم المصادقة لمنع التلاعب.')} <span class="status-badge badge-wip">In Progress</span></li>
        <li><b>NFR-5: Error Resiliency:</b> ${tr('Tool failures recorded gracefully without stopping pipeline.', 'معالجة انهيار أي أداة دون إيقاف المسار.')} <span class="status-badge badge-done">Done</span></li>
      </ul>`, 'c-card c-blue')}
  </div>`
);

// 14. Analysis Progress: Attack Surface Decomposition (الشريحة 14)
addSlide(
  ['Slide 14: Analysis Progress', 'الشريحة 14: التحليل وتفكيك سطح الهجوم'],
  ['Analysis Progress: Attack Surface Graph & Decomposition', 'النماذج التحليلية: تفكيك سطح الهجوم الخارجي للويب'],
  ['Attack Surface Model', 'نموذج سطح الهجوم'], 'tag-prop',
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

// 15. Design Progress: Database ERD Schema (الشريحة 15)
addSlide(
  ['Slide 15: Design Progress (ERD)', 'الشريحة 15: تصميم قاعدة البيانات ERD'],
  ['Design Progress: Entity-Relationship Diagram (Figure 3.2)', 'تقدم التصميم: مخطط الكيانات والعلاقات لقاعدة البيانات (ERD)'],
  ['Database Design', 'تصميم قاعدة البيانات'], 'tag-prop',
  ['PostgreSQL relational schema separating operational management, assets, findings, and encrypted metadata.',
   'مخطط علائقي في PostgreSQL يفصل بين إدارة العمليات، الأصول، الثغرات الموحدة، والبيانات المشفرة.'],
  () => {
    const entities = [
      ['users', 'User credentials (hashed), roles (Admin/User)', 'حسابات المستخدمين والأدوار والكلمات المجزأة'],
      ['scan_jobs', 'Target domains, mode, execution status, user link', 'أهداف الفحص ونمط التشغيل وحالة التنفيذ'],
      ['scan_stages', 'Tracks execution status for each tool in the workflow', 'تتبع مراحل تنفيذ كل أداة في المسار'],
      ['raw_outputs', 'Paths of AES-256-GCM encrypted tool outputs on disk', 'مسارات مخرجات الأدوات الخام المشفرة'],
      ['assets', 'Discovered hierarchical domains, ports, APIs', 'الأصول المكتشفة: نطاقات ومنافذ ومسارات'],
      ['findings', 'Normalized vulnerability findings per asset', 'النتائج والثغرات الأمنية الموحدة لكل أصل'],
      ['finding_sources', 'Traceability linking findings back to raw tool logs', 'ربط النتائج بسجلات الأدوات الخام الأصلية'],
      ['security_references', 'Stores CVE identifiers, CWE, CVSS, and OWASP tags', 'المراجع القياسية: CVE وCWE وCVSS وOWASP'],
      ['finding_references', 'Junction table linking findings to verified references', 'ربط النتائج بالمراجع المعتمدة المقابلة لها'],
      ['ai_analyses', 'Gemini AI summaries and remediation metadata', 'تحليلات نموذج Gemini وإرشادات المعالجة'],
      ['reports', 'Metadata and paths for encrypted PDF reports', 'بيانات ومسارات ملفات التقارير المشفرة'],
      ['scan_keys', 'Encrypted DEK blobs, KEK version, and IV nonces', 'مفاتيح DEK المغلفة وبيانات التشفير']
    ];
    return `<div class="c-grid-4">
      ${entities.map((e, idx) => A(idx, `
        <div style="font-family:var(--font-mono); font-size:14px; font-weight:800; color:var(--teal); margin-bottom:4px;">${e[0]}</div>
        <p class="c-card-p" style="font-size:12px; line-height:1.4;">${tr(e[1], e[2])}</p>`, 'c-card')).join('')}
    </div>`;
  }
);

// 16. Implementation Progress: Built Components (الشريحة 16)
addSlide(
  ['Slide 16: Implementation Progress', 'الشريحة 16: تقدم التنفيذ البرمجي'],
  ['Implementation Progress: Developed Modules & Status', 'تقدم التنفيذ البرمجي: المكونات المطورة وحالة الإنجاز الفعلي'],
  ['Implementation Evidence', 'أدلة التنفيذ'], 'tag-sec',
  ['Clear audit of backend controllers, frontend views, Docker runners, and crypto routines.',
   'حصر دقيق للمكونات البرمجية التي تم تطويرها فعلياً ومستوى جاهزيتها التشغيلية.'],
  () => {
    const modules = [
      ['FastAPI Orchestration Core', 'نواة التنسيق في FastAPI', '90% Implemented', 'badge-done', 'REST endpoints managing scan jobs, mode switching, tool queueing, and status monitoring.'],
      ['Docker Worker Sandboxes', 'بيئات تشغيل الأدوات في Docker', '85% Implemented', 'badge-done', 'Containerized scripts wrapping Subfinder, Naabu, httpx, Kiterunner, Nuclei, and Wapiti.'],
      ['PostgreSQL Schema & Migrations', 'قاعدة البيانات PostgreSQL', '80% Implemented', 'badge-done', 'Tables for scans, stages, assets, findings, and cryptographic metadata created.'],
      ['AES-256-GCM Envelope Encryption', 'تشفير المغلف AES-256-GCM', '70% Implemented', 'badge-wip', 'Python cryptography module routines generating per-scan DEKs and validating GCM authentication tags.'],
      ['React & TypeScript Dashboard', 'لوحة التحكم React وTypeScript', '75% Implemented', 'badge-wip', 'Web dashboard for scan configuration, real-time stage tracking, and asset visualization.'],
      ['Gemini 3.8 Flash AI Integration', 'تكامل ذكاء Gemini 3.8 Flash', '60% Implemented', 'badge-wip', 'API client formatting structured findings into prompts for plain-language remediation summaries.']
    ];
    return `<div class="c-grid-3">
      ${modules.map((m, idx) => A(idx, `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
          <h4 class="c-card-h" style="font-size:15px; color:var(--teal); margin:0;">${tr(m[0], m[1])}</h4>
          <span class="status-badge ${m[3]}">${m[2]}</span>
        </div>
        <p class="c-card-p" style="font-size:12.5px;">${m[4]}</p>`, 'c-card')).join('')}
    </div>`;
  }
);

// 17. Technologies & Tools: Table 3.1 (الشريحة 17)
addSlide(
  ['Slide 17: Technologies & Tools', 'الشريحة 17: التقنيات والأدوات المستخدمة'],
  ['Technology Stack & Open-Source Security Tools', 'حزمة التقنيات البرمجية والأدوات الأمنية المختارة (جدول 3.1)'],
  ['Technology Stack', 'حزمة التقنيات'], 'tag-sec',
  ['Production-grade open-source tools chosen for speed, reliability, and automation.',
   'حزمة برمجية وأمنية قياسية تم اختيارها بعناية لتحقيق السرعة والموثوقية والأتمتة.'],
  () => {
    const tech = [
      ['Python & FastAPI', 'Backend Development', 'تطوير الواجهة الخلفية والخدمات', 'Asynchronous API endpoints, task orchestration, and background worker queues.'],
      ['React & TypeScript', 'Frontend Dashboard', 'تطوير لوحة التحكم التفاعلية', 'Responsive web UI, scan configuration forms, and asset visualization graphs.'],
      ['PostgreSQL', 'Structured Data Storage', 'إدارة البيانات المنظمة', 'Storing normalized findings, asset trees, scan metadata, and encrypted keys.'],
      ['Docker Containers', 'Runtime Sandboxing', 'عزل بيئة تشغيل الأدوات', 'Isolating security tool dependencies and execution environments from host OS.'],
      ['AES-256-GCM', 'Cryptographic Storage', 'التشفير وحماية البيانات', 'Authenticated encryption protecting raw logs and generated reports at rest.'],
      ['Subfinder & Naabu', 'Reconnaissance', 'اكتشاف النطاقات والمنافذ', 'High-speed passive subdomain enumeration and fast SYN/TCP port probing.'],
      ['httpx & Kiterunner', 'Service & API Discovery', 'كشف الخدمات ومسارات API', 'Live HTTP/S service validation and high-speed API route discovery.'],
      ['Nuclei & Wapiti', 'Vulnerability Scanning', 'فحص الثغرات والمدخلات', 'YAML template-based CVE matching and dynamic black-box input auditing.'],
      ['Gemini 3.8 Flash', 'AI Remediation Layer', 'طبقة التحليل بالذكاء الاصطناعي', 'Interpreting technical findings and generating developer remediation summaries.']
    ];
    return `<div class="c-grid-3">
      ${tech.map((t, idx) => A(idx, `
        <div style="font-size:16px; font-weight:800; color:var(--teal); margin-bottom:2px;">${t[0]}</div>
        <div style="font-size:12px; font-weight:700; color:var(--blue); margin-bottom:6px;">${tr(t[1], t[2])}</div>
        <p class="c-card-p" style="font-size:12.5px;">${t[3]}</p>`, 'c-card')).join('')}
    </div>`;
  }
);

// 18. Working Prototype / Demo (الشريحة 18)
addSlide(
  ['Slide 18: Working Prototype', 'الشريحة 18: النموذج الأولي العامل والمحاكاة'],
  ['Working Prototype & Simulated Scanning Pipeline', 'النموذج الأولي العامل: محاكاة تفاعلية لمسار الفحص الكامل'],
  ['Interactive Demo', 'محاكاة تفاعلية'], 'tag-demo',
  ['Observe how data flows sequentially through the 6-phase reconnaissance pipeline.',
   'محاكاة عملية لكيفية تدفق البيانات بالتسلسل عبر مراحل الاستكشاف والفحص والمعالجة والذكاء.'],
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

// 19. Testing Progress & Verification (الشريحة 19)
addSlide(
  ['Slide 19: Testing Progress', 'الشريحة 19: خطة وتقدم الاختبارات'],
  ['Testing Progress: Controlled Laboratory Verification', 'تقدم الاختبارات: التحقق المخبري في بيئات مضبوطة ومصرحة'],
  ['Verification Plan', 'خطة الاختبارات'], 'tag-sec',
  ['Midterm testing focuses on unit verification, tool sandboxing, and output parsing reliability.',
   'يركز الاختبار النصفي على فحص صحة المكونات البرمجية، عزل الحاويات، ودقة معالجة المخرجات.'],
  () => {
    const tests = [
      ['Unit & API Endpoint Testing', 'اختبار الوحدات والواجهات البرمجية', 'Passed (18/20)', 'badge-done', 'Verifying FastAPI route handlers, token authentication, and scan job parameter validation.'],
      ['Docker Sandbox Isolation', 'اختبار عزل الحاويات في Docker', 'Passed (All)', 'badge-done', 'Confirming tool execution restrictions, bounded resource memory limits, and process cleanup.'],
      ['Data Parsing & Deduplication', 'اختبار تحليل وتوحيد البيانات', 'Passed (Sample tests)', 'badge-done', 'Validating JSON output parser against mock Nuclei and Wapiti logs to verify deduplication logic.'],
      ['Cryptographic Tag Validation', 'اختبار وسوم التشفير والمصادقة', 'Passed', 'badge-done', 'Testing AES-256-GCM authentication tag verification; confirming rejection of tampered ciphertext.'],
      ['AI Prompt Formatting', 'اختبار صياغة مدخلات الذكاء', 'In Progress', 'badge-wip', 'Benchmarking Gemini API latency and validating that prompts omit sensitive credentials and raw tokens.']
    ];
    return `<div class="c-col" style="gap:10px;">
      ${tests.map((t, idx) => A(idx, `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:16px; color:var(--teal);">🧪</span>
            <b style="font-size:15px; color:#ffffff;">${tr(t[0], t[1])}</b>
          </div>
          <span class="status-badge ${t[3]}">${t[2]}</span>
        </div>
        <p class="c-card-p" style="font-size:12.5px;">${t[4]}</p>`, 'c-card')).join('')}
    </div>`;
  }
);

// 20. Preliminary Results & Evaluation (الشريحة 20)
addSlide(
  ['Slide 20: Preliminary Results', 'الشريحة 20: النتائج الأولية والتقييم'],
  ['Preliminary Results & Technical Validation', 'النتائج الأولية والتقييم الفني لمنصة YemScan'],
  ['Preliminary Results', 'النتائج الأولية'], 'tag-sec',
  ['Initial laboratory runs confirm effective orchestration, schema normalization, and reference correlation.',
   'تؤكد التجارب المخبرية الأولية كفاءة تنسيق الأدوات، توحيد البيانات، والربط بالمعايير القياسية.'],
  () => `<div class="c-grid-3">
    ${A(0, `<div class="c-card-ic">🔄</div>
      <h3 class="c-card-h">${tr('Automated Handover Efficiency', 'كفاءة التسليم المؤتمت بين الأدوات')}</h3>
      <p class="c-card-p">${tr('Sequential handover from Subfinder → Naabu → httpx → Kiterunner operates without manual intervention, eliminating manual terminal piping.',
        'يعمل التسليم الآلي بين الأدوات بسلاسة تامة دون تدخل يدوي، مما يوفر أكثر من 80% من وقت الربط اليدوي.')}</p>`, 'c-card')}

    ${A(1, `<div class="c-card-ic" style="color:var(--blue);">📊</div>
      <h3 class="c-card-h" style="color:var(--blue);">${tr('Deduplication & Data Hygiene', 'إزالة التكرار ونظافة البيانات')}</h3>
      <p class="c-card-p">${tr('Laboratory tests with simulated overlapping scan outputs confirmed that duplicate vulnerability findings are cleanly consolidated.',
        'أثبتت الاختبارات المخبرية أن النتائج المكررة بين الأدوات تُدمج بدقة في سجل واحد مع الحفاظ على أدلة الإثبات الأصلية.')}</p>`, 'c-card c-blue')}

    ${A(2, `<div class="c-card-ic" style="color:var(--violet);">🏷️</div>
      <h3 class="c-card-h" style="color:var(--violet);">${tr('Reference Grounding Success', 'دقة الإثراء المرجعي الموثوق')}</h3>
      <p class="c-card-p">${tr('Explicit mapping of normalized flaws to CVE and CWE catalogs prevented hallucinated scores, ensuring reliable inputs for Gemini summaries.',
        'الربط الصريح بالمعايير الدولية المعتمدة منع تماماً ظاهرة الهلوسة وقدم بيانات موثوقة لنموذج Gemini.')}</p>`, 'c-card c-violet')}
  </div>`
);

// 21. Challenges & Risks (الشريحة 21)
addSlide(
  ['Slide 21: Challenges & Risks', 'الشريحة 21: التحديات والمخاطر'],
  ['Technical Challenges Encountered & Mitigation Strategies', 'التحديات والمخاطر التقنية التي واجهت الفريق وكيف تمت معالجتها'],
  ['Risk Management', 'إدارة المخاطر'], 'tag-prop',
  ['Transparent risk assessment and engineering solutions aligned with evaluation guidelines.',
   'عرض شفاف للتحديات الهندسية والإجراءات المتخذة لمعالجتها وفق متطلبات دليل التقييم.'],
  () => {
    const risks = [
      ['Inconsistent Tool Output Schemas', 'اختلاف تنسيق مخرجات الأدوات', 'CLI scanners produce divergent JSON, plain text, and XML.', 'Built custom intermediate parsing and normalization adapter modules.', 'Resolved', 'badge-done'],
      ['Long-Running Scan Timeouts', 'بطء وعمليات الفحص الطويلة', 'Port and vulnerability scanning may block web server threads.', 'Decoupled execution via asynchronous FastAPI background workers.', 'Resolved', 'badge-done'],
      ['AI Hallucination & Token Costs', 'مخاطر هلوسة الذكاء وتكلفة الـ API', 'Large raw outputs exceed context windows and risk inaccurate CVSS.', 'Minimized submitted data; strictly restricted AI to remediation explanation.', 'Resolved', 'badge-done'],
      ['Key Management Overhead', 'تعقيدات إدارة وتشفير المفاتيح', 'Encrypting every finding field increases database latency.', 'Adopted envelope encryption (per-scan DEK) with memory caching during active runs.', 'In Progress', 'badge-wip']
    ];
    return `<div class="c-col">
      <table class="comp-table">
        <thead>
          <tr>
            <th>${tr('Challenge / Risk', 'التحدي / الخطر التقني')}</th>
            <th>${tr('Root Cause', 'السبب')}</th>
            <th>${tr('Action Taken / Mitigation', 'الإجراء المتخذ والمعالجة')}</th>
            <th class="center">${tr('Status', 'الحالة')}</th>
          </tr>
        </thead>
        <tbody>
          ${risks.map(r => `
            <tr>
              <td><b>${tr(r[0], r[1])}</b></td>
              <td>${r[2]}</td>
              <td>${r[3]}</td>
              <td class="center"><span class="status-badge ${r[5]}">${r[4]}</span></td>
            </tr>`).join('')}
        </tbody>
      </table>
    </div>`;
  }
);

// 22. Changes & Adaptations (الشريحة 22)
addSlide(
  ['Slide 22: Adaptations', 'الشريحة 22: التعديلات والتحسينات'],
  ['Architectural Changes & Design Adaptations', 'التعديلات والقرارات الهندسية المتخذة بناءً على التغذية الراجعة'],
  ['Agile Adaptations', 'القرارات الهندسية'], 'tag-sec',
  ['Demonstrating team maturity by explaining design decisions and refinements during implementation.',
   'إظهار نضج الفريق الهندسي عبر توضيح القرارات التقنية التي تم تكييفها أثناء التطوير.'],
  () => `<div class="c-grid-3">
    ${A(0, `<div class="c-card-ic">🔧</div>
      <h3 class="c-card-h">${tr('Separating Scanning from Web Server', 'فصل الفحص عن خادم الويب')}</h3>
      <p class="c-card-p">${tr('Initial Design: Running tools directly in the backend process. Adaptation: Containerized Docker workers triggered asynchronously to guarantee dashboard responsiveness and security isolation.',
        'التصميم الأولي: تشغيل الأدوات داخل خادم الواجهة مباشرة. القرار المتخذ: عزل الأدوات داخل حاويات Docker مستقلة لضمان استقرار وسرعة لوحة التحكم.')}</p>`, 'c-card')}

    ${A(1, `<div class="c-card-ic" style="color:var(--amber);">🛡️</div>
      <h3 class="c-card-h" style="color:var(--amber);">${tr('Strict AI Boundary Definition', 'تحديد حدود الذكاء الاصطناعي الصارمة')}</h3>
      <p class="c-card-p">${tr('Initial Idea: Let AI predict CVE numbers. Adaptation: Confined AI strictly to remediation summaries and narrative reporting; CVE/CWE mapping is strictly handled by deterministic databases.',
        'الفكرة الأولية: جعل الذكاء يحدد معرّفات CVE. القرار المتخذ: حصر الذكاء في الشرح والتوصيات فقط، وتثبيت المراجع عبر قواعد بيانات محددة وقطعية.')}</p>`, 'c-card c-amber')}

    ${A(2, `<div class="c-card-ic" style="color:var(--teal);">🔐</div>
      <h3 class="c-card-h" style="color:var(--teal);">${tr('Adopting Envelope Encryption', 'اعتماد تشفير المغلف (Envelope)')}</h3>
      <p class="c-card-p">${tr('Initial Idea: Single static encryption key. Adaptation: Implemented per-scan Data Encryption Keys (DEKs) wrapped by a master Key Encryption Key (KEK) to ensure strict cryptographic tenant isolation.',
        'الفكرة الأولية: مفتاح تشفير ثابت. القرار المتخذ: توليد مفتاح DEK مستقل لكل فحص مشفر بمفتاح KEK رئيسي لضمان أعلى درجات الخصوصية.')}</p>`, 'c-card c-blue')}
  </div>`
);

// 23. Remaining Work (الشريحة 23)
addSlide(
  ['Slide 23: Remaining Work', 'الشريحة 23: الأعمال المتبقية'],
  ['Remaining Work Packages for Project (2)', 'حزم الأعمال المتبقية لاستكمال المشروع (مشروع تخرج 2)'],
  ['Future Work Packages', 'الأعمال المتبقية'], 'tag-prop',
  ['Structured task breakdown to transition from working prototype to comprehensive final defense.',
   'خطة عمل واضحة ومجدولة للانتقال من مرحلة النموذج الأولي إلى التسليم النهائي المكتمل.'],
  () => {
    const remaining = [
      ['WP-1: Complete Normalization Engine', 'استكمال محرك توحيد وتصفية البيانات', 'Finalize JSON parsers for remaining edge-case tool outputs and complete deduplication unit tests.', 'High Priority · Weeks 1-3'],
      ['WP-2: Finalize Gemini Prompt Pipelines', 'استكمال تكامل وتوليد توصيات Gemini', 'Tune system prompts for remediation summaries and implement token-budgeting and rate limiting.', 'High Priority · Weeks 4-5'],
      ['WP-3: Dual-Tier PDF Report Generator', 'بناء مولد التقارير التنفيذية والفنية (PDF)', 'Implement report builder rendering branded, encrypted Executive summaries and Technical audits.', 'Medium Priority · Weeks 6-8'],
      ['WP-4: Comprehensive Lab Evaluation', 'إجراء التجارب والتقييم المخبري الموسع', 'Deploy YemScan in test lab environments against benchmark web apps (e.g. OWASP Juice Shop).', 'High Priority · Weeks 9-11'],
      ['WP-5: Documentation & Final Thesis', 'إكمال التوثيق النهائي والرسالة الأكاديمية', 'Complete Chapters 4 and 5, compile experimental data, and prepare final defense demonstration.', 'Mandatory · Weeks 12-14']
    ];
    return `<div class="c-col" style="gap:10px;">
      ${remaining.map((w, idx) => A(idx, `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <b style="font-size:15px; color:var(--teal);">${tr(w[0], w[1])}</b>
          <span style="font-family:var(--font-mono); font-size:11px; color:var(--amber); font-weight:700;">${w[3]}</span>
        </div>
        <p class="c-card-p" style="font-size:13px;">${w[2]}</p>`, 'c-card')).join('')}
    </div>`;
  }
);

// 24. Updated Schedule / Gantt Chart (الشريحة 24)
addSlide(
  ['Slide 24: Updated Schedule', 'الشريحة 24: الجدول الزمني المحدث'],
  ['Updated Project Schedule & Milestone Roadmap', 'الجدول الزمني المحدث وخريطة المعالم الرئيسية (Milestones)'],
  ['Project Roadmap', 'الجدول الزمني'], 'tag-sec',
  ['Realistic, timeline-based schedule aligned with semester milestones for Graduation Project (2).',
   'جدول زمني واقعي ومحدد التواريخ متوافق مع معالم الفصل الدراسي لمقرر مشروع التخرج (2).'],
  () => {
    const milestones = [
      ['Phase 1: Foundation & Design', 'المرحلة 1: التأسيس والتصميم', 'Oct - Dec 2026', 'Completed', 'badge-done', 'Requirements, architecture, literature review, and database ERD design.'],
      ['Phase 2: Prototype Reconnaissance', 'المرحلة 2: النموذج الأولي للاستكشاف', 'Jan - Feb 2027', 'Completed', 'badge-done', 'Docker chaining of Subfinder, Naabu, httpx, Kiterunner, Nuclei, Wapiti.'],
      ['Phase 3: Data & Crypto Integration', 'المرحلة 3: تكامل البيانات والتشفير', 'Mar 2027', 'Current Stage', 'badge-wip', 'PostgreSQL normalization, AES-256-GCM envelope encryption, Midterm Defense.'],
      ['Phase 4: AI & Reporting Modules', 'المرحلة 4: وحدات الذكاء والتقارير', 'Apr 2027', 'Planned', 'badge-plan', 'Gemini remediation engine, dual-tier PDF builder, and frontend finishing.'],
      ['Phase 5: Laboratory Testing & Defense', 'المرحلة 5: التقييم والمناقشة النهائية', 'May - Jun 2027', 'Planned', 'badge-plan', 'Controlled lab testing, thesis completion, and final graduation defense.']
    ];
    return `<div class="c-col" style="gap:10px;">
      ${milestones.map((m, idx) => A(idx, `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:4px;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span style="font-family:var(--font-mono); font-size:12px; color:var(--blue); font-weight:700;">${m[2]}</span>
            <b style="font-size:15px; color:#ffffff;">${tr(m[0], m[1])}</b>
          </div>
          <span class="status-badge ${m[4]}">${m[3]}</span>
        </div>
        <p class="c-card-p" style="font-size:12.5px;">${m[5]}</p>`, 'c-card')).join('')}
    </div>`;
  }
);

// 25. Conclusion / Next Steps (الشريحة 25)
addSlide(
  ['Slide 25: Conclusion', 'الشريحة 25: الخاتمة والخطوات التالية'],
  ['Conclusion, Current Status & Examination Q&A', 'الخاتمة: خلاصة التقدم، الوضع الحالي، وأسئلة لجنة المناقشة'],
  ['Conclusion & Q&A', 'الخاتمة والمناقشة'], 'tag-sec',
  ['Midterm defense proves sound methodology, clear engineering progress, and a solid roadmap for completion.',
   'يؤكد العرض النصفي سلامة المنهجية المتبعة، التقدم الهندسي الملموس، ووضوح خطة استكمال المشروع.']
  , () => `<div class="c-col" style="align-items:center; gap:18px; text-align:center;">
    <div style="font-size:52px; font-weight:900; letter-spacing:2px; line-height:1; background:linear-gradient(120deg, #ffffff, #2dd4bf, #38bdf8); -webkit-background-clip:text; background-clip:text; color:transparent;">
      YemScan
    </div>
    <div style="font-size:16px; color:#e2e8f0; max-width:880px; line-height:1.5;">
      ${tr('Midterm Evaluation Summary: The team has successfully established the theoretical foundation, designed the 5-layer modular architecture, built the containerized reconnaissance toolchain, and verified prototype feasibility. We are firmly on track to complete the platform in Graduation Project (2).',
           'خلاصة التقييم النصفي: نجح الفريق في إرساء الأساس النظري، وتصميم معمارية النظام ذات الـ 5 طبقات، وبناء بيئة تشغيل الأدوات المعزولة في Docker، والتحقق من جدوى النموذج الأولي. ويسير المشروع بخطى واثقة ومدروسة نحو الإنجاز النهائي.')}
    </div>

    <div class="c-grid-3" style="max-width:1100px; text-align:start;">
      ${A(0, `<h4 class="c-card-h" style="color:var(--teal); font-size:15px;">1. ${tr('Methodological Rigor', 'انضباط المنهجية')}</h4>
        <p class="c-card-p" style="font-size:12.5px;">${tr('Systematic Agile increments with working code and documented requirements.', 'تطبيق عملي لمنهجية Agile عبر زيادات وظيفية كودية حقيقية.')}</p>`, 'c-card')}
      ${A(1, `<h4 class="c-card-h" style="color:var(--blue); font-size:15px;">2. ${tr('Architectural Feasibility', 'جدوى المعمارية')}</h4>
        <p class="c-card-p" style="font-size:12.5px;">${tr('Proven chaining of open-source tools with deterministic reference grounding.', 'نجاح ربط الأدوات مفتوحة المصدر مع تثبيت المرجعية القياسية.')}</p>`, 'c-card c-blue')}
      ${A(2, `<h4 class="c-card-h" style="color:var(--violet); font-size:15px;">3. ${tr('Security & Integrity', 'الأمان والموثوقية')}</h4>
        <p class="c-card-p" style="font-size:12.5px;">${tr('Cryptographic protection (AES-256-GCM) protecting telemetry data and reports.', 'حماية مشفرة وموثقة لبيانات وتقارير الفحص في وضع السكون.')}</p>`, 'c-card c-violet')}
    </div>

    <div class="stat-box" style="margin-top:4px; border-color:var(--teal); padding:10px 24px;">
      <span style="font-size:24px;">🎓</span>
      <div class="stat-txt" style="font-size:15px;">
        <b>${tr('Thank you! We welcome all questions and constructive feedback from the examination committee.', 'شكراً لحسن استماعكم! نرحب بكافة أسئلة وملاحظات لجنة المناقشة والتقييم الكريمة.')}</b>
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
       <div class="help-item"><kbd>O</kbd> <span>فهرس الشرائح (25 شريحة)</span></div>
       <div class="help-item"><kbd>L</kbd> <span>تبديل اللغة (EN / AR)</span></div>
       <div class="help-item"><kbd>M</kbd> <span>تقليل الحركة</span></div>
       <div class="help-item"><kbd>Esc</kbd> <span>إغلاق النوافذ</span></div>
       <div class="help-item"><kbd>?</kbd> <span>المساعدة</span></div>`
    : `<div class="help-item"><kbd>→</kbd> / <kbd>Space</kbd> <span>Next Slide</span></div>
       <div class="help-item"><kbd>←</kbd> <span>Previous Slide</span></div>
       <div class="help-item"><kbd>Home</kbd> <span>First Slide</span></div>
       <div class="help-item"><kbd>End</kbd> <span>Last Slide</span></div>
       <div class="help-item"><kbd>F</kbd> <span>Toggle Fullscreen</span></div>
       <div class="help-item"><kbd>O</kbd> <span>Toggle Overview (25 Slides)</span></div>
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

    // Attach simulation button if on Workflow slide (Slide 18, index 17)
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
    ['[DEMO] Stage 1: Discovering subdomains via Subfinder, active ports via Naabu, and live HTTP/S endpoints...',
     '[محاكاة] المرحلة 1: اكتشاف النطاقات الفرعية بـ Subfinder والمنافذ المفتوحة بـ Naabu وخدمات الويب الحية...'],
    ['[DEMO] Stage 2: Enumerating API routes with Kiterunner & auditing web flaws with Nuclei & Wapiti...',
     '[محاكاة] المرحلة 2: كشف مسارات الـ APIs عبر Kiterunner وفحص ثغرات الويب عبر Nuclei وWapiti...'],
    ['[DEMO] Stage 3: Ingesting raw CLI outputs into PostgreSQL; normalizing fields & deduplicating records...',
     '[محاكاة] المرحلة 3: استيعاب المخرجات الخام في PostgreSQL؛ توحيد الحقول وإلغاء التكرار...'],
    ['[DEMO] Stage 4: Grounding findings with authoritative CVE, CWE, CVSS, and OWASP Top 10 catalogs...',
     '[محاكاة] المرحلة 4: ربط النتائج بالمراجع المعتمدة CVE وCWE وCVSS وOWASP Top 10...'],
    ['[DEMO] Stage 5: Passing enriched context to Gemini 3.8 Flash for plain-language remediation advice...',
     '[محاكاة] المرحلة 5: إرسال السياق لنموذج Gemini للحصول على إرشادات وتوصيات المعالجة...'],
    ['[DEMO] Stage 6: Compiling Executive and Technical Reports encrypted at rest with AES-256-GCM...',
     '[محاكاة] المرحلة 6: توليد التقارير التنفيذية والفنية المشفرة بـ AES-256-GCM في وضع السكون...']
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
