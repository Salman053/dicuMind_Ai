"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"

interface CodeEditorProps {
  code: string
  setCode: (code: string) => void
}

export function CodeEditor({ code, setCode }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [language, setLanguage] = useState("javascript")

  useEffect(() => {
    if (code.includes("def ")) setLanguage("python")
    else if (code.includes("SELECT") || code.includes("INSERT")) setLanguage("sql")
    else if (code.includes("interface ") || code.includes(": ")) setLanguage("typescript")
    else if (code.includes("public class")) setLanguage("java")
    else setLanguage("javascript")
  }, [code])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
  }

  return (
    <div className="flex flex-col h-full ">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Code Input</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">{language}</span>
          <span className="text-xs text-muted-foreground">{code.split("\n").length} lines</span>
        </div>
      </div>
      <div className="flex-1 border border-border rounded-lg overflow-hidden bg-card flex flex-col">
        <div className="flex-1 relative overflow-hidden">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={handleChange}
            placeholder="Paste your code here... (JavaScript, Python, TypeScript, etc.)"
            className="absolute inset-0 w-full h-full p-4 bg-background text-foreground font-mono text-sm resize-none focus:outline-none border-none z-10 focus:ring-0 focus:border-0"
            style={{   caretColor: "white" }}
            spellCheck="false"
          />
          {/* <div className="absolute inset-0 p-4 pointer-events-none overflow-hidden">
            <SyntaxHighlighter code={code || "// Paste your code here..."} language={language} />
          </div> */}
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">Supports JavaScript, Python, TypeScript, Java, SQL, and more</p>
    </div>
  )
}
