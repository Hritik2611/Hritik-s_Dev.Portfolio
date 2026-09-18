"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 overflow-hidden">
      {/* 
        Smooth Radial Background Aura:
        - Mobile par koi hard-edged blob nahi banega
        - Dark me soft ambient glow dega aur Light me clean look
      */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] h-[280px] sm:w-[650px] sm:h-[450px] pointer-events-none -z-10 rounded-full"
        style={{
          background: "radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-7 relative z-10 w-full">
        {/* Availability Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-[11px] sm:text-xs font-mono text-[var(--accent-text)] backdrop-blur-md shadow-sm"
        >
          <Sparkles size={12} className="shrink-0" /> 
          <span>Available for Software Engineer & Developer roles</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-3xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--text-main)]"
        >
          Hi, I&apos;m{" "}
          <span className="text-[var(--accent-text)] inline-block font-black">
            Ritik Singh
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-lg sm:text-2xl text-[var(--text-main)] font-semibold tracking-wide"
        >
          Software Engineer & Full-Stack Developer
        </motion.h2>

        {/* Bio Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-sm sm:text-base md:text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed px-2"
        >
          A Developer building high-performance scalable web systems and solving 
          complex algorithmic challenges. Specialized in MERN, Next.js, C++, and Python.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-row items-center justify-center gap-3 sm:gap-4 pt-4"
        >
          <a
            href="#projects"
            style={{ backgroundColor: "var(--accent)" }}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl text-white font-semibold text-xs sm:text-sm transition-all hover:scale-105 shadow-md active:scale-95"
          >
            View Projects <ArrowRight size={15} />
          </a>

          <a
            href="/new_resume_2.0.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Ritik_Singh_Resume.pdf"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-7 sm:py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent)] text-[var(--text-main)] font-semibold text-xs sm:text-sm transition-all hover:scale-105 active:scale-95 backdrop-blur-md"
          >
            <Download size={15} /> Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}