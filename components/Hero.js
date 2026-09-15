"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-24 px-6 overflow-hidden">
      {/* Dynamic Background Glow Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-[var(--accent-glow)] rounded-full blur-[120px] pointer-events-none opacity-60" />

      <div className="max-w-4xl mx-auto text-center space-y-7 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[var(--card-border)] bg-[var(--card-bg)] text-xs font-mono text-[var(--accent-text)] backdrop-blur-md shadow-sm"
        >
          <Sparkles size={13} /> Available for Software Engineer & Developer roles
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--text-main)]"
        >
          Hi, I&apos;m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-text)] via-cyan-400 to-blue-500">
            Ritik Singh
          </span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-xl sm:text-2xl text-[var(--text-main)] font-medium tracking-wide"
        >
          Software Engineer & Full-Stack Developer
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-[var(--text-muted)] max-w-2xl mx-auto leading-relaxed"
        >
          A Developer, building high-performance scalable web systems and solving 
          complex algorithmic challenges. Specialized in MERN, Next.js, C++, and Python.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 pt-4"
        >
          <a
            href="#projects"
            style={{ backgroundColor: "var(--accent)" }}
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold text-sm transition-all hover:scale-105 shadow-[0_0_30px_var(--accent-glow)]"
          >
            View Projects <ArrowRight size={16} />
          </a>

          <a
            href="/new_resume_2.0.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Ritik_Singh_Resume.pdf"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-[var(--accent)] text-[var(--text-main)] font-semibold text-sm transition-all hover:scale-105 backdrop-blur-md"
          >
            <Download size={16} /> Download CV
          </a>
        </motion.div>
      </div>
    </section>
  );
}