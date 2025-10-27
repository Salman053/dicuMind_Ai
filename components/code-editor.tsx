"use client"

import React, { useEffect, useRef, useState } from "react"

interface CodeEditorProps {
  code: string
  setCode: (code: string) => void
}

export function CodeEditor({ code, setCode }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [language, setLanguage] = useState("detecting...")

  // 🔍 Smarter automatic language detection
  useEffect(() => {
    const detectLanguage = (code: string): string => {
      const lower = code.toLowerCase()

      // 🐍 Python
      if (/def\s+\w+\(.*\):|import\s+\w+|self|print\(|#/.test(lower))
        return "python"

      // 💻 JavaScript
      if (/function\s+\w+|const\s+\w+\s*=|let\s+\w+\s*=|=>|console\.log/.test(lower))
        return "javascript"

      // ⚙️ TypeScript
      if (/interface\s+\w+|type\s+\w+|:\s*\w+<.*>|\s*implements\s*/.test(lower))
        return "typescript"

      // ☕ Java
      if (/public\s+class\s+\w+|System\.out\.println|import\s+java\./.test(lower))
        return "java"

      // 🐘 SQL
      if (/\bselect\b|\bfrom\b|\bwhere\b|\bjoin\b|\binsert\b|\bupdate\b|\bdelete\b/.test(lower))
        return "sql"

      // 🐚 Shell
      if (/^#!\/bin\/bash|echo\s+|\$\(|fi|then/.test(lower))
        return "bash"

      // 🧱 HTML
      if (/<\/?[a-z][\s\S]*>/i.test(code))
        return "html"

      // 🎨 CSS
      if (/[.#]?\w+\s*\{\s*[^}]*\}/.test(code))
        return "css"

      // 🧩 JSON
      if (/^\s*\{[\s\S]*\}\s*$/.test(code))
        return "json"

      return "plaintext"
    }

    const detected = detectLanguage(code)
    setLanguage(detected)
  }, [code])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCode(e.target.value)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Code Input</h2>
        <div className="flex items-center gap-2">
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded capitalize">
            {language}
          </span>
          <span className="text-xs text-muted-foreground">
            {code.split("\n").length} lines
          </span>
        </div>
      </div>

      <div className="flex-1 border border-border rounded-lg overflow-hidden bg-card flex flex-col">
        <textarea
          ref={textareaRef}
          value={code}
          onChange={handleChange}
          placeholder="Paste your code here... (any language supported)"
          className="w-full h-full p-4 bg-background text-foreground font-mono text-sm resize-none focus:outline-none border-none focus:ring-0"
          style={{ caretColor: "white" }}
          spellCheck="false"
        />
      </div>

      <p className="text-xs text-muted-foreground mt-2">
        Auto-detects JavaScript, Python, TypeScript, Java, SQL, HTML, CSS, Bash, JSON
      </p>
    </div>
  )
}
