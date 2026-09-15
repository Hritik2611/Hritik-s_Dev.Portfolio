"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus, Trash2, ArrowLeft, Lock, FolderGit2, Mail, ExternalLink, Palette, KeyRound, ShieldCheck } from "lucide-react";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [authError, setAuthError] = useState("");
  const [theme, setTheme] = useState("emerald");

  // Forgot Password / OTP States
  const [showOtpView, setShowOtpView] = useState(false);
  const [otpCode, setOtpCode] = useState("");
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpNotice, setOtpNotice] = useState("");

  const [projects, setProjects] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeTab, setActiveTab] = useState("projects");

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    githubUrl: "",
    liveUrl: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formMsg, setFormMsg] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio_theme") || "emerald";
    setTheme(savedTheme);
    document.documentElement.setAttribute("data-theme", savedTheme);

    const savedPass = sessionStorage.getItem("portfolio_admin_pass");
    if (savedPass) {
      setPassword(savedPass);
      verifyLogin(savedPass);
    }
  }, []);

  const toggleTheme = () => {
    const themes = ["emerald", "violet", "light"];
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("portfolio_theme", nextTheme);
  };

  const verifyLogin = async (passToVerify) => {
    setAuthError("");
    const targetPassword = passToVerify || password;

    try {
      const res = await fetch("/api/messages", {
        headers: { "x-admin-password": targetPassword },
      });
      if (res.ok) {
        setIsAuth(true);
        sessionStorage.setItem("portfolio_admin_pass", targetPassword);
        loadDashboardData(targetPassword);
      } else {
        setAuthError("Incorrect admin password. Check .env.local");
      }
    } catch {
      setAuthError("Server connection error.");
    }
  };

  const handleSendOtp = async () => {
    setOtpLoading(true);
    setAuthError("");
    setOtpNotice("");

    try {
      const res = await fetch("/api/admin/forgot-password", { method: "POST" });
      const data = await res.json();
      if (res.ok && data.success) {
        setShowOtpView(true);
        setOtpNotice(data.message);
      } else {
        setAuthError(data.message || "Failed to send OTP email.");
      }
    } catch {
      setAuthError("Network connection error.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    setAuthError("");

    try {
      const res = await fetch("/api/admin/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ otp: otpCode }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.adminKey) {
        setPassword(data.adminKey);
        sessionStorage.setItem("portfolio_admin_pass", data.adminKey);
        setIsAuth(true);
        loadDashboardData(data.adminKey);
      } else {
        setAuthError(data.message || "Invalid OTP entered.");
      }
    } catch {
      setAuthError("Network error while verifying OTP.");
    } finally {
      setOtpLoading(false);
    }
  };

  const loadDashboardData = async (adminPass) => {
    try {
      const resProj = await fetch("/api/projects");
      const projData = await resProj.json();
      if (projData.success) setProjects(projData.data);

      const resMsg = await fetch("/api/messages", {
        headers: { "x-admin-password": adminPass },
      });
      const msgData = await resMsg.json();
      if (msgData.success) setMessages(msgData.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateProject = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormMsg("");

    const currentPass = password || sessionStorage.getItem("portfolio_admin_pass") || "";

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-password": currentPass,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setFormMsg("Project added successfully!");
        setFormData({ title: "", description: "", tags: "", githubUrl: "", liveUrl: "" });
        loadDashboardData(currentPass);
      } else {
        setFormMsg(data.error || data.message || "Failed to add project.");
      }
    } catch {
      setFormMsg("Network error.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteProject = async (id) => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const currentPass = password || sessionStorage.getItem("portfolio_admin_pass") || "";

    try {
      const res = await fetch(`/api/projects?id=${id}`, {
        method: "DELETE",
        headers: { "x-admin-password": currentPass },
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setProjects((prev) => prev.filter((p) => p._id !== id));
      } else {
        alert(data.message || data.error || "Failed to delete project");
      }
    } catch {
      alert("Network error while deleting project");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("portfolio_admin_pass");
    setIsAuth(false);
    setPassword("");
    setShowOtpView(false);
    setOtpCode("");
  };

  // 1. Password or OTP Login View
  if (!isAuth) {
    return (
      <div className="min-h-screen bg-grid-pattern flex items-center justify-center p-6 bg-[var(--bg-main)] text-[var(--text-main)] transition-colors">
        <div
          style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
          className="w-full max-w-md p-8 rounded-2xl border shadow-2xl backdrop-blur-md"
        >
          <div className="flex justify-end mb-2">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded-lg border border-[var(--card-border)] hover:border-[var(--accent)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer"
            >
              <Palette size={14} className="text-[var(--accent-text)]" />
              <span className="capitalize">{theme}</span>
            </button>
          </div>

          <div
            style={{ backgroundColor: "var(--tag-bg)", borderColor: "var(--tag-border)" }}
            className="w-12 h-12 rounded-xl text-[var(--accent-text)] flex items-center justify-center mb-6 mx-auto border"
          >
            {showOtpView ? <ShieldCheck size={22} /> : <Lock size={22} />}
          </div>

          <h1 className="text-2xl font-bold text-center mb-2">
            {showOtpView ? "Security OTP Verification" : "Admin Portal"}
          </h1>
          <p className="text-xs text-[var(--text-muted)] text-center mb-6">
            {showOtpView
              ? "Enter the 6-digit code sent to your registered Gmail address."
              : "Enter your ADMIN_PASSWORD to access the dashboard."}
          </p>

          {!showOtpView ? (
            <form onSubmit={(e) => { e.preventDefault(); verifyLogin(); }} className="space-y-4">
              <input
                type="password"
                placeholder="Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl theme-input text-sm"
              />

              {authError && <p className="text-rose-500 text-xs text-center">{authError}</p>}

              <button
                type="submit"
                style={{ backgroundColor: "var(--accent)" }}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 shadow-md cursor-pointer"
              >
                Unlock Dashboard
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpLoading}
                  className="text-xs text-[var(--accent-text)] hover:underline inline-flex items-center gap-1 cursor-pointer disabled:opacity-50"
                >
                  <KeyRound size={13} /> {otpLoading ? "Sending Code..." : "Forgot password? Send OTP to Gmail"}
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              {otpNotice && (
                <p
                  style={{ backgroundColor: "var(--tag-bg)", borderColor: "var(--tag-border)", color: "var(--tag-text)" }}
                  className="text-xs p-2.5 rounded-lg border text-center font-medium"
                >
                  {otpNotice}
                </p>
              )}

              <input
                type="text"
                placeholder="Enter 6-digit OTP"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl theme-input text-sm tracking-widest text-center font-mono text-lg font-bold"
              />

              {authError && <p className="text-rose-500 text-xs text-center">{authError}</p>}

              <button
                type="submit"
                disabled={otpLoading}
                style={{ backgroundColor: "var(--accent)" }}
                className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all hover:opacity-90 shadow-md cursor-pointer disabled:opacity-50"
              >
                {otpLoading ? "Verifying..." : "Verify & Unlock"}
              </button>

              <div className="flex justify-between items-center pt-2 text-xs">
                <button
                  type="button"
                  onClick={() => { setShowOtpView(false); setAuthError(""); }}
                  className="text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer"
                >
                  Back to Password
                </button>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpLoading}
                  className="text-[var(--accent-text)] hover:underline cursor-pointer disabled:opacity-50"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link href="/" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] inline-flex items-center gap-1 transition-colors">
              <ArrowLeft size={14} /> Back to Portfolio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // 2. Authenticated Dashboard View
  return (
    <div className="min-h-screen bg-grid-pattern bg-[var(--bg-main)] text-[var(--text-main)] p-6 sm:p-10 transition-colors">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[var(--card-border)]">
          <div>
            <Link href="/" className="text-xs text-[var(--text-muted)] hover:text-[var(--text-main)] inline-flex items-center gap-1 mb-2 transition-colors">
              <ArrowLeft size={14} /> Back to Portfolio
            </Link>
            <h1 className="text-2xl font-bold">Admin Management</h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[var(--card-border)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all flex items-center gap-1.5 text-xs font-mono cursor-pointer"
              title="Switch Theme"
            >
              <Palette size={15} className="text-[var(--accent-text)]" />
              <span className="capitalize">{theme}</span>
            </button>

            <div className="flex p-1 rounded-lg border border-[var(--card-border)] bg-[var(--card-bg)]">
              <button
                onClick={() => setActiveTab("projects")}
                style={{
                  backgroundColor: activeTab === "projects" ? "var(--accent)" : "transparent",
                  color: activeTab === "projects" ? "#ffffff" : "var(--text-muted)",
                }}
                className="px-4 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer"
              >
                Projects ({projects.length})
              </button>
              <button
                onClick={() => setActiveTab("messages")}
                style={{
                  backgroundColor: activeTab === "messages" ? "var(--accent)" : "transparent",
                  color: activeTab === "messages" ? "#ffffff" : "var(--text-muted)",
                }}
                className="px-4 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer"
              >
                Messages ({messages.length})
              </button>
            </div>

            <button
              onClick={handleLogout}
              className="text-xs px-3 py-1.5 rounded-lg border border-rose-500/30 text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab 1: Projects Management */}
        {activeTab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div
              style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
              className="lg:col-span-1 p-6 rounded-2xl border shadow-sm backdrop-blur-md"
            >
              <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Plus size={18} className="text-[var(--accent-text)]" /> Add Live Project
              </h2>

              <form onSubmit={handleCreateProject} className="space-y-4">
                <div>
                  <label className="block text-xs text-[var(--text-muted)] mb-1.5 font-medium">Project Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. MERN Social Platform"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg theme-input"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[var(--text-muted)] mb-1.5 font-medium">Description *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Brief description of features, stack & architecture..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg theme-input resize-none"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[var(--text-muted)] mb-1.5 font-medium">Tech Stack (comma separated)</label>
                  <input
                    type="text"
                    placeholder="React, Next.js, Node.js, MongoDB"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg theme-input"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[var(--text-muted)] mb-1.5 font-medium">Live Working URL *</label>
                  <input
                    type="url"
                    required
                    placeholder="https://your-live-demo.vercel.app"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg theme-input"
                  />
                </div>

                <div>
                  <label className="block text-xs text-[var(--text-muted)] mb-1.5 font-medium">GitHub Repo URL</label>
                  <input
                    type="url"
                    placeholder="https://github.com/Hritik2611/repo-name"
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-lg theme-input"
                  />
                </div>

                {formMsg && (
                  <p
                    style={{ backgroundColor: "var(--tag-bg)", borderColor: "var(--tag-border)", color: "var(--tag-text)" }}
                    className="text-xs p-2.5 rounded-lg border font-medium"
                  >
                    {formMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formLoading}
                  style={{ backgroundColor: "var(--accent)" }}
                  className="w-full py-2.5 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-50 cursor-pointer shadow-sm"
                >
                  {formLoading ? "Saving to Database..." : "Publish Project"}
                </button>
              </form>
            </div>

            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-lg font-semibold flex items-center gap-2">
                <FolderGit2 size={18} className="text-[var(--accent-text)]" /> Current Published Projects ({projects.length})
              </h2>

              {projects.length === 0 ? (
                <div
                  style={{ borderColor: "var(--card-border)" }}
                  className="p-8 border border-dashed rounded-2xl text-center text-sm text-[var(--text-muted)]"
                >
                  No projects in database yet. Add your first project using the form on the left!
                </div>
              ) : (
                <div className="space-y-3">
                  {projects.map((proj) => (
                    <div
                      key={proj._id}
                      style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
                      className="p-5 rounded-xl border flex items-start justify-between gap-4 shadow-sm"
                    >
                      <div className="space-y-1.5 flex-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-[var(--text-main)]">{proj.title}</h3>
                          {proj.liveUrl && (
                            <a
                              href={proj.liveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-[var(--accent-text)] hover:underline inline-flex items-center gap-1 text-xs font-medium"
                            >
                              Live Demo <ExternalLink size={12} />
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-[var(--text-muted)] line-clamp-2">{proj.description}</p>
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {proj.tags?.map((t, idx) => (
                            <span
                              key={idx}
                              style={{ backgroundColor: "var(--tag-bg)", borderColor: "var(--tag-border)", color: "var(--tag-text)" }}
                              className="text-[10px] px-2 py-0.5 rounded border font-mono font-medium"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => handleDeleteProject(proj._id)}
                        className="p-2 text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer"
                        title="Delete project"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Messages Tab */}
        {activeTab === "messages" && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Mail size={18} className="text-[var(--accent-text)]" /> Messages from Contact Form ({messages.length})
            </h2>

            {messages.length === 0 ? (
              <div
                style={{ borderColor: "var(--card-border)" }}
                className="p-8 border border-dashed rounded-2xl text-center text-sm text-[var(--text-muted)]"
              >
                No messages received yet.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {messages.map((msg) => (
                  <div
                    key={msg._id}
                    style={{ backgroundColor: "var(--card-bg)", borderColor: "var(--card-border)" }}
                    className="p-5 rounded-xl border space-y-2 shadow-sm"
                  >
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-sm text-[var(--text-main)]">{msg.name}</h3>
                      <span className="text-[11px] text-[var(--text-muted)] font-mono">
                        {new Date(msg.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <a
                      href={`mailto:${msg.email}`}
                      className="text-xs text-[var(--accent-text)] hover:underline block"
                    >
                      {msg.email}
                    </a>
                    <p className="text-xs text-[var(--text-main)] pt-2 border-t border-[var(--card-border)] whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}