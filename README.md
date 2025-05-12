# e-archive-demo
A 3-page portfolio webapp simulating archival data transformation, metadata CRUD, and OAIS model mapping — built with Next.js, TypeScript, and Tailwind CSS.
---

## 📄 Pages Overview

### 1. `/transform`
Simulates ingest and transformation:
- Upload or load preset XML
- Transform it into JSON using client-side tools (XPath/XSLT or XML parser)
- Display original and transformed data side by side
- Explain mapping and logic

### 2. `/crud`
Simulates metadata management and access:
- View list of "archive deliveries"
- Add new delivery (Create)
- Edit existing entries (Update)
- Mark entries as "soft deleted" (simulated Delete)
- Reset to demo data

### 3. `/oais`
Conceptual mapping to OAIS model:
- Diagram of 6 OAIS functional areas
- Text showing how this demo represents them
- Optional PDF/image download

---

## 🔧 Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React hooks** for state management
- **No database**: all data lives in memory

---

## 🚀 Running Locally

```bash
# Clone this repo
https://github.com/yourusername/skanearkiv-demo

# Install dependencies
npm install

# Run development server
npm run dev

# Open in browser
http://localhost:3000
```

---

## 🧪 Deployment
This site can be deployed to **Vercel** easily with no additional setup.

---

## 🗂️ Folder Structure (Preview)

```
/app
  layout.tsx         # Shared layout + navigation
  page.tsx           # Landing page (optional)
  /transform         # XML ➝ JSON transformation demo
  /crud              # CRUD simulation with memory data
  /oais              # OAIS conceptual overview
/lib
  data.ts            # Initial memory data & reset logic
  xmlTransform.ts    # Parser or transformation logic
/styles
  globals.css        # Tailwind setup
```

---

## 🙋‍♂️ Author
