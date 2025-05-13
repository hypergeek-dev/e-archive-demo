// app/oais/page.tsx

export default function OAISPage() {
    return (
      <main className="min-h-screen flex flex-col items-center justify-start px-4 py-10 text-center bg-black text-white">
        <h1 className="text-3xl font-bold mb-6">OAIS Model Alignment</h1>
  
        <p className="text-lg text-gray-300 mb-6 max-w-2xl">
          This page outlines how the features of this demo project conceptually align with the OAIS (Open Archival Information System) reference model for digital preservation. It demonstrates selected components in a simplified form, while intentionally omitting others.
        </p>
  
        <section className="max-w-2xl w-full mb-10 text-left">
          <h2 className="text-xl font-semibold mb-2 text-white">✅ Included Concepts</h2>
          <ul className="list-disc ml-6 text-gray-300 space-y-2">
            <li><strong>Ingest:</strong> Simulated via XML-to-JSON transformation.</li>
            <li><strong>Data Management:</strong> Basic CRUD operations on metadata entries.</li>
            <li><strong>Access:</strong> Retrieval of metadata records via navigation and user interface.</li>
          </ul>
        </section>
  
        <section className="max-w-2xl w-full mb-10 text-left">
          <h2 className="text-xl font-semibold mb-2 text-white">🚫 Not Included</h2>
          <ul className="list-disc ml-6 text-gray-300 space-y-2">
            <li><strong>METS Packaging:</strong> No implementation of METS or other standard packaging formats for Submission Information Packages (SIP), Archival Information Packages (AIP), or Dissemination Information Packages (DIP).</li>
            <li><strong>Archival Storage:</strong> Data persistence is simulated only in memory or local runtime state; no long-term storage is implemented.</li>
            <li><strong>Preservation Planning:</strong> No automated integrity checking, format migration, or long-term risk strategies are included.</li>
            <li><strong>Administration:</strong> No roles, audits, or admin controls exist within this prototype.</li>
          </ul>
        </section>
  
        <p className="text-gray-500 max-w-2xl">
          This alignment is intended for illustrative purposes only and is not a full OAIS-compliant implementation.
        </p>
      </main>
    );
  }
  