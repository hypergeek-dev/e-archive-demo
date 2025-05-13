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
  const [output, setOutput] = useState('');
  const [xpathInfo, setXpathInfo] = useState('');

  const loadPreset = async (filename: string) => {
    const res = await fetch(`/xml/${filename}`);
    const text = await res.text();
    setXmlInput(text);
    setOutput('');
    
  };

  const handleTransform = async () => {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(xmlInput, 'text/xml');

      const xsltString = `<?xml version="1.0" encoding="UTF-8"?>
        <xsl:stylesheet version="1.0"
          xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
          <xsl:output method="text" />
          <xsl:template match="/">
            <xsl:text>{</xsl:text>
            <xsl:choose>
              <xsl:when test="BudgetReport">
                <xsl:text>\n  \"type\": \"Budget Report\",</xsl:text>
                <xsl:text>\n  \"year\": \"</xsl:text><xsl:value-of select="BudgetReport/Year"/><xsl:text>\",</xsl:text>
                <xsl:text>\n  \"departments\": [</xsl:text>
                <xsl:for-each select="BudgetReport/Department">
                  <xsl:text>{\"name\": \"</xsl:text><xsl:value-of select="@name"/><xsl:text>\", \"allocated\": \"</xsl:text><xsl:value-of select="Allocated"/><xsl:text>\", \"spent\": \"</xsl:text><xsl:value-of select="Spent"/><xsl:text>\"}</xsl:text>
                  <xsl:if test="position() != last()">
                    <xsl:text>,</xsl:text>
                  </xsl:if>
                </xsl:for-each>
                <xsl:text>]</xsl:text>
              </xsl:when>
              <xsl:when test="Meeting">
                <xsl:text>\n  \"type\": \"City Council Minutes\",</xsl:text>
                <xsl:text>\n  \"date\": \"</xsl:text><xsl:value-of select="Meeting/Date"/><xsl:text>\",</xsl:text>
                <xsl:text>\n  \"location\": \"</xsl:text><xsl:value-of select="Meeting/Location"/><xsl:text>\",</xsl:text>
                <xsl:text>\n  \"attendees\": [</xsl:text>
                <xsl:for-each select="Meeting/Attendees/Member">
                  <xsl:text>\"</xsl:text><xsl:value-of select="."/><xsl:text>\"</xsl:text>
                  <xsl:if test="position() != last()">
                    <xsl:text>, </xsl:text>
                  </xsl:if>
                </xsl:for-each>
                <xsl:text>],</xsl:text>
                <xsl:text>\n  \"agenda\": [</xsl:text>
                <xsl:for-each select="Meeting/Agenda/Item">
                  <xsl:text>{\"title\": \"</xsl:text><xsl:value-of select="Title"/><xsl:text>\", \"decision\": \"</xsl:text><xsl:value-of select="Decision"/><xsl:text>\"}</xsl:text>
                  <xsl:if test="position() != last()">
                    <xsl:text>, </xsl:text>
                  </xsl:if>
                </xsl:for-each>
                <xsl:text>]</xsl:text>
              </xsl:when>
              <xsl:when test="Inspection">
                <xsl:text>\n  \"type\": \"School Inspection\",</xsl:text>
                <xsl:text>\n  \"school\": \"</xsl:text><xsl:value-of select="Inspection/SchoolName"/><xsl:text>\",</xsl:text>
                <xsl:text>\n  \"date\": \"</xsl:text><xsl:value-of select="Inspection/Date"/><xsl:text>\",</xsl:text>
                <xsl:text>\n  \"findings\": [</xsl:text>
                <xsl:for-each select="Inspection/Findings/Finding">
                  <xsl:text>{\"issue\": \"</xsl:text><xsl:value-of select="Issue"/><xsl:text>\", \"severity\": \"</xsl:text><xsl:value-of select="Severity"/><xsl:text>\"}</xsl:text>
                  <xsl:if test="position() != last()">
                    <xsl:text>, </xsl:text>
                  </xsl:if>
                </xsl:for-each>
                <xsl:text>],</xsl:text>
                <xsl:text>\n  \"recommendations\": [</xsl:text>
                <xsl:for-each select="Inspection/Recommendations/Recommendation">
                  <xsl:text>\"</xsl:text><xsl:value-of select="."/><xsl:text>\"</xsl:text>
                  <xsl:if test="position() != last()">
                    <xsl:text>, </xsl:text>
                  </xsl:if>
                </xsl:for-each>
                <xsl:text>]</xsl:text>
              </xsl:when>
              <xsl:otherwise>
                <xsl:text>\n  \"error\": \"Unsupported document structure.\"</xsl:text>
              </xsl:otherwise>
            </xsl:choose>
            <xsl:text>\n}</xsl:text>
          </xsl:template>
        </xsl:stylesheet>`;

      const xsltDoc = parser.parseFromString(xsltString, 'text/xml');
      const processor = new XSLTProcessor();
      processor.importStylesheet(xsltDoc);

      const transformed = processor.transformToFragment(xmlDoc, document);
      setOutput(transformed.textContent || '');
      setXpathInfo(`
/BudgetReport/Year
/BudgetReport/Department/@name
/BudgetReport/Department/Allocated
/BudgetReport/Department/Spent
/Meeting/Date
/Meeting/Location
/Meeting/Attendees/Member
/Meeting/Agenda/Item/Title
/Meeting/Agenda/Item/Decision
/Inspection/SchoolName
/Inspection/Date
/Inspection/Findings/Finding/Issue
/Inspection/Findings/Finding/Severity
/Inspection/Recommendations/Recommendation
`);
    } catch (err) {
      setOutput('❌ XSLT Transformation failed');
      setXpathInfo('');
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 px-4 pb-12">
      <h1 className="text-2xl font-bold mt-4 mb-2">XML ➝ JSON (via XSLT) Transformation</h1>

      <select
        onChange={(e) => {
          setSelectedFile(e.target.value);
          loadPreset(e.target.value);
        }}
        className="border p-2 rounded w-full max-w-md bg-white text-gray-800 dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
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
        className="w-full max-w-4xl font-mono border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-black dark:text-white rounded p-3"
      />

      <button
        onClick={handleTransform}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
      >
        Transform
      </button>

      {output && (
        <pre className="w-full max-w-4xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded p-4 whitespace-pre-wrap overflow-x-auto">
          {output}
        </pre>
      )}

      {output && xpathInfo && (
        <div className="w-full max-w-4xl mt-4">
          <h2 className="text-lg font-semibold mb-2">XPath Expressions Used</h2>
          <pre className="bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded p-3 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
            {xpathInfo}
          </pre>
        </div>
      )}
    </div>
  );
}
