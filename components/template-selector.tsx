"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface TemplateSelectorProps {
  onSelect: (template: string) => void
}

export function TemplateSelector({ onSelect }: TemplateSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)

  const templates = [
    {
      id: "react-hook",
      label: "React Hook",
      code: `import { useState, useEffect } from 'react';

export function useCustomHook(initialValue) {
  const [value, setValue] = useState(initialValue);
  
  useEffect(() => {
    // Side effect logic here
    console.log('Value changed:', value);
  }, [value]);
  
  return [value, setValue];
}`,
    },
    {
      id: "async-function",
      label: "Async Function",
      code: `async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}`,
    },
    {
      id: "class-component",
      label: "Class Component",
      code: `class DataProcessor {
  constructor(data) {
    this.data = data;
    this.processed = false;
  }
  
  process() {
    this.data = this.data.map(item => ({
      ...item,
      processed: true
    }));
    this.processed = true;
    return this.data;
  }
  
  getStats() {
    return {
      count: this.data.length,
      processed: this.processed
    };
  }
}`,
    },
    {
      id: "api-endpoint",
      label: "API Endpoint",
      code: `export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate input
    if (!body.email || !body.name) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Process data
    const result = await saveUser(body);
    
    return Response.json(result, { status: 201 });
  } catch (error) {
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}`,
    },
    {
      id: "typescript-interface",
      label: "TypeScript Interface",
      code: `interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  isActive: boolean;
}

interface UserService {
  getUser(id: string): Promise<User>;
  createUser(data: Omit<User, 'id' | 'createdAt'>): Promise<User>;
  updateUser(id: string, data: Partial<User>): Promise<User>;
  deleteUser(id: string): Promise<void>;
}`,
    },
    {
      id: "python-function",
      label: "Python Function",
      code: `def calculate_statistics(data: list[float]) -> dict:
    """
    Calculate basic statistics for a list of numbers.
    
    Args:
        data: List of numerical values
        
    Returns:
        Dictionary containing mean, median, and std dev
    """
    if not data:
        raise ValueError("Data list cannot be empty")
    
    mean = sum(data) / len(data)
    sorted_data = sorted(data)
    median = sorted_data[len(data) // 2]
    
    return {
        'mean': mean,
        'median': median,
        'count': len(data)
    }`,
    },
    {
      id: "react-component",
      label: "React Component",
      code: `import React, { useState } from 'react';

export function Counter({ initialValue = 0 }) {
  const [count, setCount] = useState(initialValue);
  
  const increment = () => setCount(c => c + 1);
  const decrement = () => setCount(c => c - 1);
  const reset = () => setCount(initialValue);
  
  return (
    <div className="counter">
      <h2>Count: {count}</h2>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}`,
    },
    {
      id: "sql-query",
      label: "SQL Query",
      code: `SELECT 
  u.id,
  u.name,
  u.email,
  COUNT(o.id) as order_count,
  SUM(o.total) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
GROUP BY u.id, u.name, u.email
HAVING COUNT(o.id) > 0
ORDER BY total_spent DESC
LIMIT 10;`,
    },
  ]

  return (
    <div className="relative z-50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-card border border-border rounded-lg flex items-center gap-2 hover:bg-muted transition-colors w-full md:w-auto"
      >
        <span className="text-sm font-medium">Load Template</span>
        <ChevronDown size={16} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-10">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => {
                onSelect(template.code)
                setIsOpen(false)
              }}
              className="w-full text-left px-4 py-3 hover:bg-muted transition-colors border-b border-border last:border-b-0"
            >
              <div className="font-medium text-sm">{template.label}</div>
              <div className="text-xs text-muted-foreground mt-1">{template.code.split("\n").length} lines</div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
