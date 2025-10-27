"use client"

import { AlertCircle, Lightbulb, CheckCircle2, AlertTriangle } from "lucide-react"

interface Suggestion {
  type: "error" | "warning" | "info" | "success"
  message: string
  line?: number
  suggestion: string
}

interface CodeSuggestionsProps {
  code: string
}

export function CodeSuggestions({ code }: CodeSuggestionsProps) {
  const generateSuggestions = (): Suggestion[] => {
    const suggestions: Suggestion[] = []
    const lines = code.split("\n")

    // Check for console.log statements
    if (code.includes("console.log")) {
      suggestions.push({
        type: "warning",
        message: "Found console.log statements",
        suggestion: "Consider using a proper logging library for production code",
      })
    }

    // Check for var usage
    if (code.includes("var ")) {
      suggestions.push({
        type: "warning",
        message: "Using 'var' keyword detected",
        suggestion: "Use 'const' or 'let' instead for better scoping and to avoid hoisting issues",
      })
    }

    // Check for missing error handling
    if (code.includes("async") && !code.includes("try") && !code.includes("catch")) {
      suggestions.push({
        type: "error",
        message: "Async function without error handling",
        suggestion: "Add try-catch blocks to handle potential errors in async operations",
      })
    }

    // Check for missing JSDoc comments
    const functionCount = (code.match(/function\s+\w+|const\s+\w+\s*=\s*\(|const\s+\w+\s*=\s*async/g) || []).length
    const commentCount = (code.match(/\/\//g) || []).length
    if (functionCount > 0 && commentCount === 0) {
      suggestions.push({
        type: "info",
        message: "No comments found",
        suggestion: "Add JSDoc comments to document your functions and their parameters",
      })
    }

    // Check for magic numbers
    if (code.match(/[^a-zA-Z0-9_]\d{2,}[^a-zA-Z0-9_]/)) {
      suggestions.push({
        type: "warning",
        message: "Magic numbers detected",
        suggestion: "Extract magic numbers into named constants for better code readability",
      })
    }

    // Check for code length
    if (lines.length > 50) {
      suggestions.push({
        type: "info",
        message: "Large code snippet",
        suggestion: "Consider breaking this into smaller, more focused functions",
      })
    }

    // Check for unused variables
    if (code.includes("let ") || code.includes("const ")) {
      suggestions.push({
        type: "info",
        message: "Code quality tip",
        suggestion: "Ensure all declared variables are being used to avoid dead code",
      })
    }

    // Check for SQL injection risks
    if (code.includes("SELECT") && code.includes("+")) {
      suggestions.push({
        type: "error",
        message: "Potential SQL injection vulnerability",
        suggestion: "Use parameterized queries or prepared statements instead of string concatenation",
      })
    }

    // Check for best practices
    if (code.includes("==")) {
      suggestions.push({
        type: "warning",
        message: "Using loose equality operator",
        suggestion: "Use strict equality (===) instead of loose equality (==) to avoid type coercion issues",
      })
    }

    // Positive feedback
    if (suggestions.length === 0) {
      suggestions.push({
        type: "success",
        message: "Code looks good!",
        suggestion: "No major issues detected. Your code follows best practices.",
      })
    }

    return suggestions
  }

  const suggestions = generateSuggestions()

  const getIcon = (type: string) => {
    switch (type) {
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-yellow-500" />
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-green-500" />
      default:
        return <Lightbulb className="w-4 h-4 text-blue-500" />
    }
  }

  const getBgColor = (type: string) => {
    switch (type) {
      case "error":
        return "bg-red-500/10 border-red-500/30"
      case "warning":
        return "bg-yellow-500/10 border-yellow-500/30"
      case "success":
        return "bg-green-500/10 border-green-500/30"
      default:
        return "bg-blue-500/10 border-blue-500/30"
    }
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-foreground">Code Suggestions</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {suggestions.map((suggestion, idx) => (
          <div key={idx} className={`p-3 rounded-lg border ${getBgColor(suggestion.type)}`}>
            <div className="flex gap-2 items-start">
              <div className="mt-0.5">{getIcon(suggestion.type)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground">{suggestion.message}</p>
                <p className="text-xs text-muted-foreground mt-1">{suggestion.suggestion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
