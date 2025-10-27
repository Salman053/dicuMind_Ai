"use client";

import { useState } from "react";
import { StyleSelector } from "@/components/style-selector";
import { ExportMenu } from "@/components/export-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { TemplateSelector } from "@/components/template-selector";
import { ResizableLayout } from "@/components/resizable-layout";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [code, setCode] = useState("");
  const [documentation, setDocumentation] = useState("");
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [style, setStyle] = useState("detailed");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const API_KEY = "AIzaSyBhvqjKvVbJVUB_elFh6tnzTDVHUtN_PL8";
  const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  // --- 1️⃣ Generate AI Documentation ---
  const generateDocumentation = async () => {
    if (!code.trim()) return;
    setIsGenerating(true);
    setDocumentation("");

    try {
      const prompt = `
You are a professional technical writer and programmer.
Generate ${style} for this code with sections:
Overview, Purpose, Parameters, Returns, and Example Usage.

Code:
${code}
`;

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await response.json();
      const generatedText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No documentation generated.";
      setDocumentation(generatedText);
    } catch (error) {
      console.error("Error generating documentation:", error);
      setDocumentation(
        "⚠️ Failed to generate documentation. Please try again."
      );
    } finally {
      setIsGenerating(false);
    }
  };

  // --- 2️⃣ Generate AI Code Suggestions ---
  const generateAISuggestions = async () => {
    if (!code.trim()) return;
    setIsSuggesting(true);
    setAiSuggestions([]);

    try {
      const prompt = `
You are an expert software engineer.
Analyze the following code and give 5 specific improvement suggestions focusing on:
- Code quality
- Performance
- Readability
- Maintainability
- Best practices
- Code Complexity Runtime

Provide short actionable tips, 1–2 lines each.

Code:
${code}
`;

      const response = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const suggestions = text
        .split(/\n|-/)
        .map((line: any) => line.trim())
        .filter((line: any) => line.length > 5);

      setAiSuggestions(suggestions);
    } catch (error) {
      console.error("Error generating AI suggestions:", error);
      setAiSuggestions(["⚠️ Failed to generate AI suggestions. Try again."]);
    } finally {
      setIsSuggesting(false);
    }
  };

  const handleTemplateSelect = (template: string) => {
    setCode(template);
  };

  return (
    <div
      className={`min-h-screen bg-background ${theme === "dark" ? "dark" : ""}`}
    >
      <div className="bg-background text-foreground">
        {/* Header */}
        <header className="border-b border-border bg-card">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">DocuMind</h1>
                <p className="text-xs text-muted-foreground">
                  AI-Powered Documentation & Code Assistant
                </p>
              </div>
            </div>
            <ThemeToggle theme={theme} setTheme={setTheme} />
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-6">
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <TemplateSelector onSelect={handleTemplateSelect} />
            </div>
            <div className="flex gap-2">
              <StyleSelector style={style} setStyle={setStyle} />
              <Button
                onClick={generateDocumentation}
                disabled={!code.trim() || isGenerating}
              >
                {isGenerating ? "Generating..." : "Generate Docs"}
              </Button>
              <Button
                variant="secondary"
                onClick={generateAISuggestions}
                disabled={!code.trim() || isSuggesting}
              >
                {isSuggesting ? "Analyzing..." : "AI Suggestions"}
              </Button>
              <ExportMenu documentation={documentation} />
            </div>
          </div>

          {/* Editor + Documentation */}
          <ResizableLayout
            code={code}
            setCode={setCode}
            documentation={documentation}
            isGenerating={isGenerating}
          />

          {/* Suggestions Grid */}
          <div className="grid md:grid-cols-1 gap-6 mt-6">
            {/* <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
              <CodeSuggestions code={code} />
            </div> */}
            <div className="bg-card border border-border rounded-lg p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                AI-Powered Suggestions
              </h3>
              <ul className="space-y-2 max-h-64 overflow-y-auto">
                {aiSuggestions.length > 0 ? (
                  aiSuggestions.map((s, idx) => (
                    <li
                      key={idx}
                      className="text-xs text-foreground bg-primary/5 border border-primary/10 rounded-md p-2"
                    >
                      {s}
                    </li>
                  ))
                ) : (
                  <p className="text-xs text-muted-foreground italic">
                    No AI suggestions yet — click “AI Suggestions” to generate
                    them.
                  </p>
                )}
              </ul>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
