"use client";

import {
  ArrowRight,
  Code2,
  Zap,
  FileText,
  Share2,
  Moon,
  Sun,
  Github,
  Linkedin,
  Mail,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";

export default function LandingPage() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "dark" : ""}`}>
      <div className="bg-background text-foreground relative overflow-hidden">
        {/* Background Gradient Blobs */}
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/20 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2 animate-pulse" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-accent/20 blur-3xl rounded-full translate-x-1/3 translate-y-1/3 animate-pulse" />

        {/* Navbar */}
        <nav className="border-b border-border bg-card/40 backdrop-blur-sm sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-md shadow-primary/30">
                <Sparkles className="text-white w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold">DocuMind AI</h1>
                <p className="text-xs text-muted-foreground">
                  by Muhammad Salman Khan
                </p>
              </div>
            </motion.div>

            <div className="flex items-center gap-4">
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="p-2 rounded-lg hover:bg-card transition-colors"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <Link
                href="/application"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:scale-105 transition-transform shadow-md"
              >
                Launch App
              </Link>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 py-24 text-center relative z-10">
          <motion.div
            className="space-y-6"
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.2 } },
            }}
          >
            <motion.div
              variants={fadeIn}
              className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full"
            >
              <span className="text-sm font-medium text-primary">
                Your AI Code Companion
              </span>
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-6xl font-bold leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent"
            >
              AI That Reads, Understands & Documents Your Code
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              DocuMindAI turns your code into professional documentation,
              detailed analysis, and improvement suggestions — in seconds.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex justify-center gap-4 pt-6"
            >
              <Link
                href="/application"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:scale-105 transition-transform flex items-center gap-2"
              >
                Get Started <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#features"
                className="px-8 py-3 border border-border rounded-lg font-medium hover:bg-card/60 transition-colors"
              >
                Explore Features
              </a>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">
            Powerful Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Code2,
                title: "Multi-Language Support",
                desc: "Supports JS, Python, TypeScript, Java, SQL, and more.",
              },
              {
                icon: Zap,
                title: "AI-Powered Documentation",
                desc: "Generate detailed and readable docs instantly.",
              },
              {
                icon: FileText,
                title: "Export in Any Format",
                desc: "Download as Markdown, JSON, PDF, or DOCX.",
              },
              {
                icon: Share2,
                title: "Smart Suggestions",
                desc: "Improve readability, performance, and structure.",
              },
              {
                icon: Moon,
                title: "Light / Dark Mode",
                desc: "Beautiful themes for any environment.",
              },
              {
                icon: Sparkles,
                title: "Code Metrics",
                desc: "Real-time analysis of functions, comments, and complexity.",
              },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={i}
                  variants={fadeIn}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                  className="p-6 border border-border rounded-xl bg-card/40 hover:bg-card/60 transition-all hover:scale-105 hover:shadow-md"
                >
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                  <p className="text-muted-foreground text-sm">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="max-w-7xl mx-auto px-4 py-20 text-center">
          <motion.div
            className="bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 rounded-2xl p-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Build Smarter with AI?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Save hours of writing and reviewing. Let DocuMind do the
              documentation while you focus on development.
            </p>
            <Link
              href="/application"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:scale-105 transition-transform inline-flex items-center gap-2"
            >
              Launch DocuMind <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </section>

        {/* Footer */}
        <footer className="border-t border-border bg-card/50 py-12">
          <div className="max-w-7xl mx-auto px-4 text-center space-y-4">
            <p className="font-medium">
              © {new Date().getFullYear()} DocuMindAI — Built by{" "}
              <span className="text-primary font-semibold">
                Muhammad Salman Khan
              </span>
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="mailto:your.email@example.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/muhammadsalmankhan"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/muhammad-salman-khan"
                target="_blank"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">
              Crafted with ❤️ and Next.js + Tailwind + shadcn/ui
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}
