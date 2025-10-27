"use client"

import { Moon, Sun } from "lucide-react"

interface ThemeToggleProps {
  theme: "light" | "dark"
  setTheme: (theme: "light" | "dark") => void
}

export function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg border border-border hover:bg-muted transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}
