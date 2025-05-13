// app/transform/page.tsx
'use client';

import { useState } from 'react';

const presets = [
  { label: 'Budget Report', file: 'budget_report.xml' },
  { label: 'City Council Minutes', file: 'city_council_minutes.xml' },
  { label: 'School Inspection Report', file: 'school_inspection.xml' },
];

export default function TransformPage() {
  const [selectedFile, setSelectedFile] = useState('');
  const [xmlInput, setXmlInput] = useState('');
  const [jsonOutput, setJsonOutput] = useState('');
  const [xpathInfo, setXpathInfo] = useState('');

  const loadPreset = async (filename: string) => {
    const res = await fetch(`/xml/${filename}`);
    const text = await res.text();
    setXmlInput(text);
    setJsonOutput('');
    setXpathInfo('');
  };

  const handleTransform = () => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlInput, 'application/xml');

      const root = xmlDoc.documentElement.nodeName;
      let output: any = {};
      let xpaths: string[] = [];

      if (root === 'BudgetReport') {
        const departments = Array.from(xmlDoc.getElementsByTagName('Department')).map((el) => {
          xpaths.push(`/BudgetReport/Department[@name='${el.getAttribute('name')}']`);
          return {
            name: el.getAttribute('name'),
            allocated: el.getElementsByTagName('Allocated')[0]?.textContent,
            spent: el.getElementsByTagName('Spent')[0]?.textContent,
          };
        });
        output = {
          type: 'Budget Report',
          year: xmlDoc.getElementsByTagName('Year')[0]?.textContent,
          departments,
        };
        xpaths.push('/BudgetReport/Year');

      } else if (root === 'Meeting') {
        const members = Array.from(xmlDoc.getElementsByTagName('Member')).map((m) => m.textContent);
        const items = Array.from(xmlDoc.getElementsByTagName('Item')).map((item) => ({
          title: item.getElementsByTagName('Title')[0]?.textContent,
          decision: item.getElementsByTagName('Decision')[0]?.textContent,
        }));
        output = {
          type: 'Council Minutes',
          date: xmlDoc.getElementsByTagName('Date')[0]?.textContent,
          location: xmlDoc.getElementsByTagName('Location')[0]?.textContent,
          attendees: members,
          agenda: items,
        };
        xpaths.push('/Meeting/Date', '/Meeting/Location', '/Meeting/Attendees/Member', '/Meeting/Agenda/Item');

      } else if (root === 'Inspection') {
        const findings = Array.from(xmlDoc.getElementsByTagName('Finding')).map((f) => ({
          issue: f.getElementsByTagName('Issue')[0]?.textContent,
          severity: f.getElementsByTagName('Severity')[0]?.textContent,
        }));
        const recommendations = Array.from(xmlDoc.getElementsByTagName('Recommendation')).map((r) => r.textContent);
        output = {
          type: 'School Inspection',
          school: xmlDoc.getElementsByTagName('SchoolName')[0]?.textContent,
          date: xmlDoc.getElementsByTagName('Date')[0]?.textContent,
          findings,
          recommendations,
        };
        xpaths.push('/Inspection/SchoolName', '/Inspection/Date', '/Inspection/Findings/Finding', '/Inspection/Recommendations/Recommendation');
      }

      setJsonOutput(JSON.stringify(output, null, 2));
      setXpathInfo(xpaths.join('\n'));
    } catch (error) {
      setJsonOutput('Error parsing XML');
      setXpathInfo('');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4 pb-12">
      <h1 className="text-2xl font-bold mt-4 mb-2">XML ➝ JSON Transformation</h1>

      <select
        onChange={(e) => {
          setSelectedFile(e.target.value);
          loadPreset(e.target.value);
        }}
        className="border p-2 rounded w-full max-w-md"
        value={selectedFile}
      >
        <option value="">Select an XML preset...</option>
        {presets.map((preset) => (
          <option key={preset.file} value={preset.file}>
            {preset.label}
          </option>
        ))}
      </select>

      <textarea
        value={xmlInput}
        onChange={(e) => setXmlInput(e.target.value)}
        placeholder="Paste or load XML content here..."
        rows={10}
        className="w-full max-w-4xl font-mono border border-gray-300 rounded p-3"
      />

      <button
        onClick={handleTransform}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
      >
        Transform
      </button>

      {jsonOutput && (
        <pre className="w-full max-w-4xl bg-gray-100 border border-gray-300 rounded p-4 whitespace-pre-wrap overflow-x-auto">
          {jsonOutput}
        </pre>
      )}

      {xpathInfo && (
        <div className="w-full max-w-4xl mt-4">
          <h2 className="text-lg font-semibold mb-2">XPath Expressions Used</h2>
          <pre className="bg-gray-50 border border-gray-300 rounded p-3 text-sm text-gray-700 whitespace-pre-wrap">
            {xpathInfo}
          </pre>
        </div>
      )}
    </div>
  );
}
