# YemScan — Graduation Project Presentation
> **Yemeni Web Attack and Vulnerability Scanner (YemScan)**  
> University of Science and Technology (UST) · Faculty of Computing and Information Technology  
> Department of Computer Science · Major: Cybersecurity and Networking (2026-2027)

---

## 📌 Project Overview
**YemScan** is an academic graduation project that proposes an integrated web application security scanning and reconnaissance platform using an external black-box approach.

The platform orchestrates open-source security tools across a unified 6-phase pipeline:
$$\text{Discover} \longrightarrow \text{Scan} \longrightarrow \text{Process} \longrightarrow \text{Enrich} \longrightarrow \text{Analyze} \longrightarrow \text{Report}$$

### 🛡️ Core Architecture Features
1. **Multi-Tool Orchestration:** Sequential & Independent execution modes (Subfinder, Naabu, httpx, Kiterunner, Nuclei, Wapiti).
2. **Standardized Normalization:** Deduplicates and correlates heterogeneous outputs in PostgreSQL.
3. **Security Reference Enrichment:** Explicit mapping to CVE, CWE, CVSS, and OWASP Top 10 catalogs.
4. **AI Reasoning Co-Pilot:** Gemini 3.8 Flash for plain-language interpretation and remediation advice (references remain authoritative).
5. **Cryptographic Protection:** AES-256-GCM envelope encryption (per-scan DEK/KEK) and role-based data isolation (RBAC).

---

## 👥 Project Team & Supervision
* **Academic Supervisor:** Dr. Aisha Al-Hadm
* **Team Members:**
  * **Mohammed Saleh Hatem** (202310400368)
  * **Nassar Ahmed Al-Fattahi** (202310400349)
  * **Mohammed Abdulwahid Alrubaidi** (202310100273)
  * **Younes Mohammed Alsarory** (202310102399)
  * **Abdulmajid Abulkarim Anqa** (202310102081)

---

## 🚀 Presentation Features
* **Bilingual Support:** Full English and Academic Arabic (`EN` | `عربي`) with proper RTL layout.
* **16:9 Projector Optimized:** Responsive auto-scaling baseline designed for graduation defense committees.
* **Keyboard Navigation:**
  * `Space` / `→` : Next Slide
  * `←` : Previous Slide
  * `F` : Toggle Fullscreen
  * `O` : Toggle Slide Overview
  * `L` : Switch Language (EN / AR)
  * `M` : Toggle Reduce Motion
  * `?` : Show Shortcuts Help
* **Zero Security Risk:** Purely static presentation; all tool workflows are simulated animations for educational explanation.

---

## 🌐 Live Preview / Deployment
You can host this repository for free using **GitHub Pages** or **Netlify**:
1. Fork or clone this repository.
2. In GitHub repository settings, go to **Pages** → Source: `main` / `root` → Save.
3. Or deploy instantly to Netlify by linking your GitHub repository.
