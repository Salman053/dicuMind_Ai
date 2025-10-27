"use client";

import {
  ArrowRight,
  Code2,
  Zap,
  FileText,
  Share2,
  Moon,
  Sun,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function LandingPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="bg-background text-foreground">
        {/* Navigation */}
        <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-3xl">D</span>
              </div>
              <div className="flex flex-col gap-0 ">
                <span className="text-xl font-bold">DocuMind</span>
                <span className="text-sm  font-light">
                  Developed by Muhammad Salman
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 hover:bg-card rounded-lg transition-colors"
              >
                {theme === "dark" ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              <Link
                href="/application"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Launch App
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <div className="space-y-6">
            <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
              <span className="text-sm font-medium text-primary">
                AI-Powered Documentation
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-balance">
              Generate Professional Documentation in Seconds
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              DocuMind uses AI to automatically generate comprehensive,
              well-formatted documentation from your code. Save hours of
              documentation work.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Link
                href="/app"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <button className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-card transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: "Multi-Language Support",
                description:
                  "Supports JavaScript, Python, TypeScript, Java, SQL, and more. Automatic language detection.",
              },
              {
                icon: Zap,
                title: "AI-Powered Generation",
                description:
                  "Advanced AI analyzes your code and generates accurate, detailed documentation instantly.",
              },
              {
                icon: FileText,
                title: "Multiple Styles",
                description:
                  "Choose between Detailed, Concise, or API Reference documentation styles.",
              },
              {
                icon: Share2,
                title: "Easy Export",
                description:
                  "Export as Markdown, JSON, or copy directly to clipboard. Share with your team.",
              },
              {
                icon: Zap,
                title: "Code Suggestions",
                description:
                  "Get intelligent suggestions to improve code quality and follow best practices.",
              },
              {
                icon: Moon,
                title: "Dark & Light Mode",
                description:
                  "Comfortable viewing in any lighting condition with full theme support.",
              },
            ].map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <div
                  key={idx}
                  className="p-6 border border-border rounded-lg hover:bg-card/50 transition-colors"
                >
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Paste Code",
                description: "Paste your code snippet into the editor",
              },
              {
                step: "2",
                title: "Select Style",
                description: "Choose your preferred documentation style",
              },
              {
                step: "3",
                title: "Generate",
                description: "Click generate and let AI do the work",
              },
              {
                step: "4",
                title: "Export",
                description: "Download or share your documentation",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 py-20">
          <div className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Save Hours on Documentation?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join developers worldwide who are using DocuMind to generate
              professional documentation instantly.
            </p>
            <Link
              href="/application"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors inline-flex items-center gap-2"
            >
              Start Generating Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50 mt-20">
          <div className="max-w-7xl mx-auto px-4 py-8 text-center text-muted-foreground">
            <p>DocuMind - AI-Powered Documentation Generator</p>
            <p className="text-sm mt-2">
              Generate better documentation, faster.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
