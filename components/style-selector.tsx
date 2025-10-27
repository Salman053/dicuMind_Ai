"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface StyleSelectorProps {
  style: string;
  setStyle: (style: string) => void;
}

export function StyleSelector({ style, setStyle }: StyleSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const styles = [
    {
      id: "detailed",
      label: "Detailed",
      description: "Comprehensive documentation",
    },
    { id: "concise", label: "Concise", description: "Quick reference and line by explanation" },
    {
      id: "api",
      label: "API Reference",
      description: "API-style documentation",
    },
    {
      id: "fix",
      label: "Fix the code",
      description: "Fix and refactor this code",
    },
  ];

  const currentStyle = styles.find((s) => s.id === style);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-card border border-border rounded-lg flex items-center gap-2 hover:bg-muted transition-colors"
      >
        <span className="text-sm font-medium">{currentStyle?.label}</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
          {styles.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setStyle(s.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 hover:bg-muted transition-colors ${
                style === s.id ? "bg-primary/10 border-l-2 border-primary" : ""
              }`}
            >
              <div className="font-medium text-sm">{s.label}</div>
              <div className="text-xs text-muted-foreground">
                {s.description}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
