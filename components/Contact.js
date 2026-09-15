"use client";

import { useState } from "react";
import { Send, Mail, MapPin, CheckCircle, AlertCircle } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, success: false, error: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: "" });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({ loading: false, success: true, error: "" });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({ loading: false, success: false, error: data.error || "Something went wrong." });
      }
    } catch {
      setStatus({ loading: false, success: false, error: "Failed to connect to server." });
    }
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-[var(--card-border)] relative">
      <div className="max-w-4xl mx-auto">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-xs uppercase tracking-widest text-[var(--accent-text)] font-bold">
            Get In Touch
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[var(--text-main)] tracking-tight">
            Let&apos;s Work Together
          </h3>
          <p className="text-[var(--text-muted)] text-sm max-w-md mx-auto">
            Open for software engineering roles, freelance opportunities, or technical queries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Quick info cards */}
          <div className="space-y-4">
            <div
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
              className="p-5 rounded-xl border shadow-sm"
            >
              <div
                style={{ backgroundColor: "var(--tag-bg)", color: "var(--accent-text)" }}
                className="p-2.5 rounded-lg w-fit mb-3"
              >
                <Mail size={18} />
              </div>
              <h4 className="text-sm font-bold text-[var(--text-main)]">Direct Email</h4>
              <a
                href="mailto:ritiksingh16838@gmail.com"
                className="text-xs text-[var(--accent-text)] hover:underline break-all"
              >
                ritiksingh16838@gmail.com
              </a>
            </div>

            <div
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
              className="p-5 rounded-xl border shadow-sm"
            >
              <div
                style={{ backgroundColor: "var(--tag-bg)", color: "var(--accent-text)" }}
                className="p-2.5 rounded-lg w-fit mb-3"
              >
                <MapPin size={18} />
              </div>
              <h4 className="text-sm font-bold text-[var(--text-main)]">Location</h4>
              <p className="text-xs text-[var(--text-muted)]">India (Open to Remote & Relocation)</p>
            </div>
          </div>

          {/* Form */}
          <div
            style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
            className="md:col-span-2 p-6 sm:p-8 rounded-2xl border shadow-sm"
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">Name</label>
                <input
                  type="text"
                  required
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg theme-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">Email</label>
                <input
                  type="email"
                  required
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg theme-input text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[var(--text-muted)] mb-1.5">Message</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Hi Ritik, I have an opportunity..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg theme-input text-sm resize-none"
                />
              </div>

              {status.success && (
                <div
                  style={{ backgroundColor: "var(--tag-bg)", borderColor: "var(--tag-border)", color: "var(--tag-text)" }}
                  className="flex items-center gap-2 text-xs p-3 rounded-lg border font-medium"
                >
                  <CheckCircle size={15} /> Message sent successfully! I will get back to you shortly.
                </div>
              )}

              {status.error && (
                <div className="flex items-center gap-2 text-rose-500 text-xs bg-rose-500/10 p-3 rounded-lg border border-rose-500/20 font-medium">
                  <AlertCircle size={15} /> {status.error}
                </div>
              )}

              <button
                type="submit"
                disabled={status.loading}
                style={{ backgroundColor: "var(--accent)" }}
                className="w-full py-3 px-6 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                {status.loading ? "Sending..." : "Send Message"} <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}