"use client";

import { Download, Copy, FileJson, FileText, FileType } from "lucide-react";
import { useState } from "react";
import { jsPDF } from "jspdf";
import { Document, Packer, Paragraph, TextRun, HeadingLevel } from "docx";

interface ExportMenuProps {
  documentation: string;
}

export function ExportMenu({ documentation }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(documentation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const element = document.createElement("a");
    const file = new Blob([documentation], { type: "text/markdown" });
    element.href = URL.createObjectURL(file);
    element.download = "documentation.md";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadJSON = () => {
    const json = JSON.stringify({ documentation, generatedAt: new Date().toISOString() }, null, 2);
    const element = document.createElement("a");
    const file = new Blob([json], { type: "application/json" });
    element.href = URL.createObjectURL(file);
    element.download = "documentation.json";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // 📘 Generate nicely formatted PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const margin = 40;
    const lineHeight = 18;
    const maxWidth = 520;

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(18);
    doc.text("📘 DocuMind — AI-Generated Documentation", margin, 60);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text(`Generated on: ${new Date().toLocaleString()}`, margin, 80);

    doc.setFontSize(12);
    doc.setTextColor(30);

    // Split text into lines that fit on the page
    const lines = doc.splitTextToSize(documentation, maxWidth);
    doc.text(lines, margin, 120, { maxWidth, lineHeightFactor: 1.4 });

    doc.save("documentation.pdf");
  };

  // 📄 Generate DOCX file with professional formatting
  const handleDownloadDOCX = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "📘 DocuMind — AI-Generated Documentation",
              heading: HeadingLevel.HEADING_1,
              spacing: { after: 300 },
            }),
            new Paragraph({
              text: `Generated on: ${new Date().toLocaleString()}`,
              style: "Date",
              spacing: { after: 200 },
            }),
            ...documentation
              .split("\n")
              .filter((line) => line.trim() !== "")
              .map(
                (line) =>
                  new Paragraph({
                    children: [new TextRun({ text: line, size: 22 })],
                    spacing: { after: 200 },
                  })
              ),
          ],
        },
      ],
    });

    const blob = await Packer.toBlob(doc);
    const element = document.createElement("a");
    element.href = URL.createObjectURL(blob);
    element.download = "documentation.docx";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  if (!documentation) {
    return (
      <button
        disabled
        className="px-4 py-2 bg-muted text-muted-foreground rounded-lg opacity-50 cursor-not-allowed"
      >
        <Download size={18} />
      </button>
    );
  }

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-card border border-border rounded-lg hover:bg-muted transition-colors"
      >
        <Download size={18} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-10">
          <button
            onClick={handleCopy}
            className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-center gap-2"
          >
            <Copy size={16} />
            <span className="text-sm">{copied ? "Copied!" : "Copy to Clipboard"}</span>
          </button>

          <button
            onClick={handleDownloadMarkdown}
            className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-center gap-2 border-t border-border"
          >
            <FileText size={16} />
            <span className="text-sm">Download as Markdown</span>
          </button>

          <button
            onClick={handleDownloadJSON}
            className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-center gap-2 border-t border-border"
          >
            <FileJson size={16} />
            <span className="text-sm">Download as JSON</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-center gap-2 border-t border-border"
          >
            <FileType size={16} />
            <span className="text-sm">Download as PDF</span>
          </button>

          <button
            onClick={handleDownloadDOCX}
            className="w-full text-left px-4 py-3 hover:bg-muted transition-colors flex items-center gap-2 border-t border-border"
          >
            <FileType size={16} />
            <span className="text-sm">Download as DOCX</span>
          </button>
        </div>
      )}
    </div>
  );
}
