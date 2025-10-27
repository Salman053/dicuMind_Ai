"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import  { calculateMetrics, type CodeMetrics } from "@/lib/code-metrics";

interface CodeMetricsProps {
  code: string;
}

export default function CodeMetrics({ code }: CodeMetricsProps) {
  const metrics: CodeMetrics = calculateMetrics(code);

  const data = [
    { name: "Functions", value: metrics.functions },
    { name: "Classes", value: metrics.classes },
    { name: "Comments", value: metrics.comments },
    { name: "Complexity", value: metrics.complexity },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

  return (
    <Card className="w-full md:w-2/3 mx-auto mt-6 shadow-xl border border-border/40 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          Code Metrics 📊
          <span className="text-sm text-muted-foreground">Quick Quality Overview</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 📈 Chart */}
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* 🧠 Info Section */}
        <div className="space-y-2 text-sm">
          <p>📏 <strong>Total Lines:</strong> {metrics.totalLines}</p>
          <p>🧩 <strong>Functions:</strong> {metrics.functions}</p>
          <p>🏗️ <strong>Classes:</strong> {metrics.classes}</p>
          <p>💬 <strong>Comments:</strong> {metrics.comments}</p>
          <p>⚙️ <strong>Complexity:</strong> {metrics.complexity}/10</p>

          <div className="h-32 mt-3">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
