'use client';

import { useEffect, useState } from 'react';

interface DocumentEntry {
  id: number;
  documentType: string;
  year: number;
  status: string;
  sourceSystem: string;
  archivist: string;
}

export default function CRUDPage() {
  const [documents, setDocuments] = useState<DocumentEntry[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Partial<DocumentEntry>>({});

  useEffect(() => {
    resetToInitial();
  }, []);

  const resetToInitial = async () => {
    const res = await fetch('/data/documents.json');
    const data = await res.json();
    setDocuments(data);
    setEditingId(null);
    setForm({});
  };

  const handleEdit = (doc: DocumentEntry) => {
    setEditingId(doc.id);
    setForm(doc);
  };

  const handleSave = () => {
    if (!form.id) return;
    setDocuments((docs) =>
      docs.map((d) => (d.id === form.id ? { ...(d as DocumentEntry), ...(form as DocumentEntry) } : d))
    );
    setEditingId(null);
    setForm({});
  };

  const handleDelete = (id: number) => {
    setDocuments((docs) => docs.filter((d) => d.id !== id));
  };

  const [query, setQuery] = useState('');
const [typeFilter, setTypeFilter] = useState('');
const [statusFilter, setStatusFilter] = useState('');
const [filtered, setFiltered] = useState<DocumentEntry[] | null>(null);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Municipal e-Archive: Document Registry</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-4">
  <input
    type="text"
    placeholder="Search by archivist..."
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    className="border px-3 py-2 rounded w-full bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
  />
  <select
    value={typeFilter}
    onChange={(e) => setTypeFilter(e.target.value)}
    className="border px-3 py-2 rounded w-full bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
  >
    <option value="">All Types</option>
    {[...new Set(documents.map((d) => d.documentType))].map((type) => (
      <option key={type} value={type}>{type}</option>
    ))}
  </select>
  <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
    className="border px-3 py-2 rounded w-full bg-white text-black dark:bg-gray-900 dark:text-white dark:border-gray-600"
  >
    <option value="">All Status Values</option>
    {[...new Set(documents.map((d) => d.status))].map((status) => (
      <option key={status} value={status}>{status}</option>
    ))}
  </select>
  <div className="sm:col-span-3 flex flex-wrap gap-2 mt-2">
    <button
      onClick={() => {
        const q = query.toLowerCase();
        setFiltered(
          documents.filter(
            (d) =>
              (!typeFilter || d.documentType === typeFilter) &&
              (!statusFilter || d.status === statusFilter) &&
              d.archivist.toLowerCase().includes(q)
          )
        );
      }}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
    >
      Search
    </button>
    <button
      onClick={() => {
        setQuery('');
        setTypeFilter('');
        setStatusFilter('');
        setFiltered(null);
      }}
      className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
    >
      Reset Filters
    </button>
  </div>
</div>

      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100 dark:bg-gray-800">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Type</th>
            <th className="p-2 border">Year</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Source System</th>
            <th className="p-2 border">Archivist</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {(filtered ?? documents).map((doc) => (
            <tr key={doc.id} className="border-t">
              <td className="p-2 border">{doc.id}</td>
              <td className="p-2 border">
                {editingId === doc.id ? (
                  <input
                    type="text"
                    value={form.documentType || ''}
                    onChange={(e) => setForm({ ...form, documentType: e.target.value })}
                    className="w-full border px-1"
                  />
                ) : (
                  doc.documentType
                )}
              </td>
              <td className="p-2 border">
                {editingId === doc.id ? (
                  <input
                    type="number"
                    value={form.year || ''}
                    onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
                    className="w-full border px-1"
                  />
                ) : (
                  doc.year
                )}
              </td>
              <td className="p-2 border">
                {editingId === doc.id ? (
                  <input
                    type="text"
                    value={form.status || ''}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full border px-1"
                  />
                ) : (
                  doc.status
                )}
              </td>
              <td className="p-2 border">
                {editingId === doc.id ? (
                  <input
                    type="text"
                    value={form.sourceSystem || ''}
                    onChange={(e) => setForm({ ...form, sourceSystem: e.target.value })}
                    className="w-full border px-1"
                  />
                ) : (
                  doc.sourceSystem
                )}
              </td>
              <td className="p-2 border">
                {editingId === doc.id ? (
                  <input
                    type="text"
                    value={form.archivist || ''}
                    onChange={(e) => setForm({ ...form, archivist: e.target.value })}
                    className="w-full border px-1"
                  />
                ) : (
                  doc.archivist
                )}
              </td>
              <td className="p-2 border text-center">
                {editingId === doc.id ? (
                  <button
                    onClick={handleSave}
                    className="text-sm px-2 py-1 bg-green-600 text-white rounded"
                  >
                    Save
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(doc)}
                      className="text-sm px-2 py-1 bg-blue-500 text-white rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="text-sm px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        onClick={resetToInitial}
        className="mt-6 bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
      >
        Reset to Initial Data
      </button>
    </div>
  );
}
