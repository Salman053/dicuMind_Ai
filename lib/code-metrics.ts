import { toast } from "sonner";

export interface CodeMetrics {
    totalLines: number;
    functions: number;
    classes: number;
    comments: number;
    complexity: number; // average cyclomatic complexity
}

export function calculateMetrics(code: string): CodeMetrics {
    if (!code) {
        toast.error("Please provide the code")
        return {
            classes: 0,
            comments: 0,
            complexity: 0,
            functions: 0,
            totalLines: 0
        }
    }
    const lines = code.split("\n").length;
    const functions = (code.match(/function\s+|=>/g) || []).length;
    const classes = (code.match(/class\s+/g) || []).length;
    const comments = (code.match(/\/\//g) || []).length;
    const complexity = Math.min(10, functions * 2 + classes); // dummy logic

    return {
        totalLines: lines,
        functions,
        classes,
        comments,
        complexity,
    };
}
