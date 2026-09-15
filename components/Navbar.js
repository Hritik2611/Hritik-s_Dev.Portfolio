"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, Palette } from "lucide-react";

export default function Navbar() {
  const [theme, setTheme] = useState("emerald");

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio_theme") || "emerald";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const themes = ["emerald", "violet", "light"];
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio_theme", nextTheme);
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/30 dark:bg-black/40 border-b border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Name */}
        <Link
          href="/"
          className="font-extrabold text-lg tracking-wider text-[var(--text-main)] hover:opacity-80 transition-opacity"
        >
          HRITIK<span className="text-[var(--accent-text)]">.</span>SINGH
        </Link>

        {/* Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[var(--text-muted)]">
          <Link href="#skills" className="hover:text-[var(--text-main)] transition-colors">
            Skills
          </Link>
          <Link href="#projects" className="hover:text-[var(--text-main)] transition-colors">
            Projects
          </Link>
          <Link href="#contact" className="hover:text-[var(--text-main)] transition-colors">
            Contact
          </Link>
          <Link
            href="/admin"
            className="text-xs px-2.5 py-1 rounded-md border border-[var(--card-border)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            Admin
          </Link>
        </nav>

        {/* Social Profile Links & Theme Button */}
        <div className="flex items-center gap-4 text-[var(--text-muted)]">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-1.5 rounded-lg border border-[var(--card-border)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer"
            title="Switch Theme"
          >
            <Palette size={15} className="text-[var(--accent-text)]" />
            <span className="capitalize hidden sm:inline">{theme}</span>
          </button>

          {/* GitHub */}
          <a
            href="https://github.com/Hritik2611"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub Profile"
            className="hover:text-[var(--text-main)] transition-colors"
          >
            <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/hritiksingh2611/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn Profile"
            className="hover:text-[var(--text-main)] transition-colors"
          >
            <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.25c-.95 0-1.72.78-1.72 1.73s.77 1.73 1.72 1.73c.96 0 1.73-.78 1.73-1.73s-.77-1.73-1.73-1.73z" />
            </svg>
          </a>

          {/* Direct Gmail */}
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=ritiksingh16838@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Direct Email"
            className="hover:text-[var(--accent-text)] transition-colors"
          >
            <Mail size={18} />
          </a>
        </div>
      </div>
    </header>
  );
}