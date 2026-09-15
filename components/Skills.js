"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Code2, Database, Layout, Terminal } from "lucide-react";

const TechSphere = dynamic(() => import("./TechSphere"), { ssr: false });

const categories = [
  {
    title: "Frontend",
    icon: Layout,
    items: ["React.js", "Next.js", "Tailwind CSS", "HTML5/CSS3", "Framer Motion"],
  },
  {
    title: "Backend",
    icon: Database,
    items: ["Node.js", "Express.js", "MongoDB (Mongoose)", "RESTful APIs"],
  },
  {
    title: "Core & Languages",
    icon: Code2,
    items: ["JavaScript (ES6+)", "C++", "Python", "Data Structures & Algorithms"],
  },
  {
    title: "Tools & Workflow",
    icon: Terminal,
    items: ["Git & GitHub", "VS Code", "Postman", "Vercel"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="py-24 px-6 relative border-t border-[var(--card-border)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xs uppercase tracking-widest text-[var(--accent-text)] font-bold">
            Tech Arsenal
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight">
            Skills & Technologies
          </h3>
          <p className="text-[var(--text-muted)] text-sm max-w-lg mx-auto">
            Hover and rotate the interactive 3D stack below or explore core technical areas.
          </p>
        </div>

        {/* 3D Tech Sphere Box */}
        <div
          style={{
            backgroundColor: "var(--card-bg)",
            borderColor: "var(--card-border)",
          }}
          className="rounded-2xl border p-4 mb-12 shadow-xl relative overflow-hidden backdrop-blur-md"
        >
          <div className="absolute top-4 left-4 text-xs font-mono text-[var(--text-muted)]">
            // interactive 3d orbit
          </div>
          <TechSphere />
        </div>

        {/* Categorized Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            return (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--card-border)",
                }}
                className="p-5 rounded-xl border shadow-sm hover:border-[var(--accent)] transition-all"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    style={{ backgroundColor: "var(--tag-bg)", color: "var(--accent-text)" }}
                    className="p-2 rounded-lg"
                  >
                    <Icon size={18} />
                  </div>
                  <h4 className="font-bold text-[var(--text-main)] text-sm">{cat.title}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        backgroundColor: "var(--tag-bg)",
                        borderColor: "var(--tag-border)",
                        color: "var(--tag-text)",
                      }}
                      className="px-2.5 py-1 text-xs font-medium rounded-md border"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}