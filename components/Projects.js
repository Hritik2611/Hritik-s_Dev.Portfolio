"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, FolderGit2 } from "lucide-react";

// Fallback data if MongoDB has no projects yet
const fallbackProjects = [
  {
    _id: "1",
    title: "Full-Stack Web Platform",
    description:
      "A scalable modern web application built with Next.js, Node.js, and MongoDB. Features secure session authentication, RESTful APIs, and responsive layout.",
    tags: ["Next.js", "React", "MongoDB", "Node.js", "Tailwind CSS"],
    githubUrl: "https://github.com/Hritik2611",
    liveUrl: "#",
  },
  {
    _id: "2",
    title: "Algorithms & Problem Solving Suite",
    description:
      "An optimized repository of data structures and algorithmic implementations in C++ and Python, covering graph theory, dynamic programming, and systems logic.",
    tags: ["C++", "Python", "Data Structures", "Algorithms", "Optimization"],
    githubUrl: "https://github.com/Hritik2611",
    liveUrl: "https://leetcode.com/u/hrithik02/",
  },
];

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/projects");
        const json = await res.json();
        if (json.success && json.data.length > 0) {
          setProjects(json.data);
        } else {
          setProjects(fallbackProjects);
        }
      } catch {
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <section id="projects" className="py-24 px-6 relative border-t border-[var(--card-border)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center space-y-3 mb-14">
          <h2 className="text-xs uppercase tracking-widest text-[var(--accent-text)] font-bold">
            Featured Works
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight">
            Selected Projects
          </h3>
          <p className="text-[var(--text-muted)] text-sm max-w-lg mx-auto">
            A showcase of systems, applications, and core programming projects I have built.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12 text-sm text-[var(--text-muted)]">
            Loading projects...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, idx) => (
              <motion.div
                key={project._id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                style={{
                  backgroundColor: "var(--card-bg)",
                  borderColor: "var(--card-border)",
                }}
                className="group relative rounded-2xl border p-8 hover:border-[var(--accent)] transition-all flex flex-col justify-between shadow-sm backdrop-blur-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-6">
                    <div
                      style={{
                        backgroundColor: "var(--tag-bg)",
                        color: "var(--accent-text)",
                        borderColor: "var(--tag-border)",
                      }}
                      className="p-3 rounded-xl border"
                    >
                      <FolderGit2 size={24} />
                    </div>

                    <div className="flex items-center gap-3 text-[var(--text-muted)]">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="GitHub Repository"
                          className="hover:text-[var(--text-main)] transition-colors"
                        >
                          <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            />
                          </svg>
                        </a>
                      )}
                      {project.liveUrl && project.liveUrl !== "#" && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Live Demo"
                          className="hover:text-[var(--accent-text)] transition-colors"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  <h4 className="text-xl font-bold text-[var(--text-main)] mb-2 group-hover:text-[var(--accent-text)] transition-colors">
                    {project.title}
                  </h4>

                  <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-6">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4 border-t border-[var(--card-border)]">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: "var(--tag-bg)",
                        borderColor: "var(--tag-border)",
                        color: "var(--tag-text)",
                      }}
                      className="px-2.5 py-0.5 text-xs rounded-full border font-mono font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}