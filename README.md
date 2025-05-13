# E-archive-demo

A 3-page portfolio webapp simulating archival data transformation, metadata editing (CRUD), and OAIS model mapping — built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

This project demonstrates how modern web technologies can be used to simulate digital archiving workflows, inspired by standards like OAIS and archival concepts such as SIP/AIP/DIP and METS/XML structures.

---

## Pages Overview

### 1. `Transform`
Simulates **data ingest and transformation**:
- Upload or load a preset XML document
- Transform it into JSON client-side using parsing or mock XSLT logic
- Display both XML and JSON side by side
- Annotated explanations of mapping logic

### 2. `CRUD`
Simulates **basic metadata record editing**:
- List view of “archival deliveries”
- Add new delivery records (Create)
- Edit existing ones (Update)
- Soft delete functionality (mark as deleted)
- Reset to demo dataset

> Note: This page demonstrates CRUD functionality, not full metadata lifecycle or schema enforcement.

### 3. `OAIS`
Conceptual **mapping to the OAIS reference model**:
- Lists which OAIS functional entities are simulated
- Shows which parts are omitted (e.g. METS packaging, long-term preservation)
- Textual explanation only (no functional logic)
- Page styled in line with the dark theme used site-wide

---

## 🔧 Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **React Hooks**
- **In-memory data only** (no external DB)
- **No external state library** (lightweight useState/useEffect)

---

## 🔪 Deployment

This project is optimized for deployment on **Vercel**:
```bash
# Clone the repo
git clone https://github.com/yourusername/e-archive-demo

# Install dependencies
npm install

# Run the development server
npm run dev

# Visit in browser
http://localhost:3000
```

---

## Project Structure

```
/app
  layout.tsx         # Root layout and header (with home icon)
  page.tsx           # Landing page with visual intro and nav
  /transform         # XML ➔ JSON transformation page
  /crud              # Metadata CRUD UI with reset logic
  /oais              # Conceptual OAIS model mapping
/lib
  data.ts            # Demo metadata records and reset logic
  xmlTransform.ts    # XML parsing/transformation logic
/public/assets
  background.webp    # Artistic landing page illustration
/styles
  globals.css        # Tailwind setup
```

---

## Credits and Transparency

This portfolio project was built by **Dennis Jensen**, with the goal of showcasing:
- Frontend UI and component design
- Basic client-side data workflows
- Conceptual modeling inspired by archival standards

To create this, I used the help of **OpenAI tools** in the following ways:
- Text content suggestions for explanatory sections, xmls, database and OAIS descriptions.
- mage generation for the landing page illustration.
- Code refactoring and best-practice guidance on layout, Tailwind usage, and state handling.

The intention behind this project is educational, and no production-level preservation logic or standards-compliance is implemented.

---

## Author

**Dennis Jensen**  
Developer, educator, and open archival systems enthusiast.  
Location: Sweden | Languages: English, Danish, Swedish


---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
