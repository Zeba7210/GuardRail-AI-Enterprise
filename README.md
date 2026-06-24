# 🛡️ GuardRail.AI - Enterprise Security Middleware Gateway

GuardRail.AI is an advanced **AI Safety Middleware Proxy and API Gateway** built on the MERN stack and powered by an Agentic AI framework. This platform provides 100% cloud protection for enterprise LLM applications against prompt injections, jailbreaks, data leaks (passwords, PINs, secret keys), and malicious security threats.

---

## 🚀 Key Project Architecture & Features

- **Layer 1: Edge Regex Pattern Filter** - Instantly detects and blocks direct sensitive keywords (passwords, credit cards, PINs, CVVs, secret keys) at the edge before hitting cloud database queries.
- **Layer 2: Real Generative AI Security Agent** - Transforms the Meta Llama 3.1 Model (via Groq Cloud) into an autonomous security guard using strict prompt engineering to evaluate complex role-play and semantic jailbreak attacks.
- **Fail-Secure System Mechanism** - Implements a 4-second timeout race logic setup. If the cloud AI fails to respond within the window, the system automatically activates a safety lockdown mode.
- **Live Audit Trail Dashboard** - Connected with MongoDB Atlas cloud to stream real-time audit trails and trigger sources straight to the frontend React dashboard for every evaluated query (`SAFE` or `BLOCKED`).
- **28 Automated Jest Crash Tests** - Features 28 core production regression tests fully certified inside an isolated database runtime environment using `mongodb-memory-server`.

---

## 📁 Repository Directory Structure

```text
GuardRail-AI-Enterprise/
├── BACKEND/
│   ├── models/
│   │   └── Log.js           # Live MongoDB Document Schemas
│   ├── server.js            # Core Express Server Framework & Routing Engine
│   └── security.test.js     # 28 Enterprise Jest Automated Test Cases
└── frontend/
    ├── src/
    │   ├── App.jsx          # Live Multi-Tier React UI Dashboard Component
    │   ├── main.jsx         # Virtual DOM Mounting React Engine
    │   └── index.css        # Live Tailwind CSS Design imports
    ├── index.html           # Main Application Bootstrap Root Entry Page
    ├── package.json         # Development Scripts Config
    └── vite.config.js       # Production Compilation Bundler Config
```

---

## 🛠️ Local Development & Quick Start

### 1. Run the Backend Server
```bash
cd BACKEND
npm install
npx nodemon server.js
```

### 2. Run the Automated Crash Tests
```bash
cd BACKEND
npx jest security.test.js
```

### 3. Run the React UI Frontend Dashboard
```bash
cd frontend
npm install
npm run dev
```

---
*Developed with ❤️ by Zeba Mukhtar during the Enterprise AI Engineering Simulation and Virtual Internship System.*
