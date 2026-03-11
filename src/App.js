import { useState, useEffect } from "react";

const jobs = [
  {
    hash: "a3f8c21",
    company: "Stripe",
    role: "Senior Software Engineer",
    branch: "main",
    start: "2023-03",
    end: "present",
    type: "full-time",
    stack: ["TypeScript", "Go", "React", "PostgreSQL", "Kafka"],
    bullets: [
      "Led redesign of payment retry logic, reducing failed transaction rate by 34%",
      "Architected real-time fraud detection pipeline processing 2M+ events/day using Kafka",
      "Mentored 4 junior engineers, running weekly code review sessions and 1:1s",
      "Shipped Stripe Tax v2 serving 40k+ merchants across 30 countries",
      "Reduced p99 API latency from 420ms to 85ms via query optimization and caching layer",
    ],
  },
  {
    hash: "d91b4e7",
    company: "Notion",
    role: "Software Engineer II",
    branch: "feature/collab",
    start: "2021-06",
    end: "2023-02",
    type: "full-time",
    stack: ["TypeScript", "React", "Node.js", "CockroachDB", "gRPC"],
    bullets: [
      "Built real-time collaborative editing engine used by 20M+ users daily",
      "Refactored block rendering pipeline, cutting initial load time by 60%",
      "Designed and shipped Notion AI integration as founding engineer on the feature",
      "Migrated core data layer from DynamoDB to CockroachDB with zero downtime",
      "Contributed to open-source CRDT library adopted by 3 other startups",
    ],
  },
  {
    hash: "7c23a8f",
    company: "Palantir",
    role: "Forward Deployed Engineer",
    branch: "deploy/gov-ops",
    start: "2019-08",
    end: "2021-05",
    type: "full-time",
    stack: ["Java", "Python", "Spark", "Foundry", "TypeScript"],
    bullets: [
      "Embedded with US DoD teams to deploy Gotham for logistics optimization",
      "Built data pipelines ingesting 500GB+ daily from satellite imagery feeds",
      "Reduced supply chain analysis time from 2 weeks to 4 hours for a NATO client",
      "Led workshop trainings for 200+ government analysts on Foundry platform",
      "Developed custom graph algorithm for network anomaly detection (classified)",
    ],
  },
  {
    hash: "2e56d3c",
    company: "Scale AI",
    role: "ML Infrastructure Engineer",
    branch: "ml/infra",
    start: "2018-06",
    end: "2019-07",
    type: "full-time",
    stack: ["Python", "Kubernetes", "PyTorch", "Redis", "FastAPI"],
    bullets: [
      "Built annotation pipeline infrastructure that scaled from 1k to 1M tasks/day",
      "Designed active learning system that cut labeling cost by 40% for vision tasks",
      "Shipped internal ML evaluation dashboard used by research and product teams",
      "Automated QA workflows saving 800+ human-hours per month",
    ],
  },
  {
    hash: "f10e9a2",
    company: "Twitch",
    role: "Software Engineering Intern",
    branch: "intern/summer18",
    start: "2017-06",
    end: "2017-08",
    type: "internship",
    stack: ["React", "Go", "DynamoDB", "GraphQL"],
    bullets: [
      "Shipped Clip Discovery feature seen by 15M+ users within first week",
      "Built GraphQL schema for clips recommendation service from scratch",
      "Fixed 12 high-priority bugs in the live video player pipeline",
    ],
  },
  {
    hash: "b84c1d5",
    company: "MIT",
    role: "B.S. Computer Science",
    branch: "edu/undergrad",
    start: "2014-09",
    end: "2018-05",
    type: "education",
    stack: ["C", "Python", "Haskell", "MATLAB", "x86 ASM"],
    bullets: [
      "GPA: 4.7 / 5.0 — Dean's List all 8 semesters",
      "Thesis: 'Distributed Consensus in Adversarial Network Conditions'",
      "TA for 6.006 Algorithms — taught recitations to 60 students",
      "President of MIT Competitive Programming Club (ICPC regionals 2017)",
    ],
  },
];

const stackColors = {
  TypeScript: "#3178C6",
  Go: "#00ADD8",
  React: "#61DAFB",
  PostgreSQL: "#336791",
  Kafka: "#231F20",
  "Node.js": "#339933",
  CockroachDB: "#6933FF",
  gRPC: "#244C5A",
  Java: "#ED8B00",
  Python: "#3776AB",
  Spark: "#E25A1C",
  Foundry: "#1A1A2E",
  Kubernetes: "#326CE5",
  PyTorch: "#EE4C2C",
  Redis: "#DC382D",
  FastAPI: "#009688",
  DynamoDB: "#4053D6",
  GraphQL: "#E10098",
  C: "#555555",
  Haskell: "#5D4F85",
  MATLAB: "#0076A8",
  "x86 ASM": "#666666",
};

const typeLabel = {
  "full-time": { label: "full-time", color: "#00ff88" },
  internship: { label: "internship", color: "#ffaa00" },
  education: { label: "education", color: "#aa88ff" },
};

function Modal({ job, onClose, t }) {
  useEffect(() => {
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.75)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        backdropFilter: "blur(6px)",
        animation: "fadeIn 0.15s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: t.surface,
          border: `1px solid ${t.borderAlt}`,
          borderRadius: "12px",
          padding: "32px",
          maxWidth: "560px",
          width: "90%",
          boxShadow: "0 24px 80px rgba(0,0,0,0.8), 0 0 0 1px #21262d",
          animation: "slideUp 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
          position: "relative",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              fontSize: "11px",
              color: "#8b949e",
            marginBottom: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "#f78166" }}>commit</span>
            <span style={{ color: "#79c0ff" }}>{job.hash}</span>
            <span>·</span>
            <span>{job.start} → {job.end}</span>
          </div>
          <div style={{ fontSize: "22px", fontWeight: "700", color: t.textBright, fontFamily: "'Syne', sans-serif", letterSpacing: "-0.5px" }}>
            {job.role}
          </div>
          <div style={{ fontSize: "16px", color: t.hash, fontFamily: "'Syne', sans-serif", marginTop: "2px" }}>
            @ {job.company}
          </div>
        </div>

        {/* Bullets */}
        <ul style={{ margin: "0 0 24px", padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
          {job.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: "12px",
                alignItems: "flex-start",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "14px",
                color: t.text,
                lineHeight: "1.6",
              }}
            >
              <span style={{ color: "#00ff88", marginTop: "3px", flexShrink: 0, fontSize: "10px" }}>▸</span>
              {b}
            </li>
          ))}
        </ul>

        {/* Stack */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
          {job.stack.map((s) => (
            <span
              key={s}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px",
                padding: "3px 10px",
                borderRadius: "4px",
                background: `${stackColors[s] || "#333"}22`,
                border: `1px solid ${stackColors[s] || "#555"}55`,
                color: stackColors[s] || "#aaa",
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            background: "none",
            border: `1px solid ${t.borderAlt}`,
            borderRadius: "6px",
            color: t.textMuted,
            cursor: "pointer",
            padding: "4px 10px",
            fontFamily: "monospace",
            fontSize: "12px",
          }}
        >
          esc
        </button>
      </div>
    </div>
  );
}

const themes = {
  dark: {
    bg: "#010409",
    surface: "#0d1117",
    surfaceAlt: "#161b22",
    border: "#21262d",
    borderAlt: "#30363d",
    text: "#c9d1d9",
    textBright: "#e6edf3",
    textMuted: "#8b949e",
    textFaint: "#484f58",
    hash: "#79c0ff",
    rowHover: "#161b22",
  },
  light: {
    bg: "#ffffff",
    surface: "#ffffff",
    surfaceAlt: "#f6f8fa",
    border: "#d0d7de",
    borderAlt: "#d0d7de",
    text: "#24292f",
    textBright: "#1f2328",
    textMuted: "#656d76",
    textFaint: "#adb5bd",
    hash: "#0969da",
    rowHover: "#f6f8fa",
  },
};

export default function WorkHistory() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);
  const [filter, setFilter] = useState("all");
  const [mode, setMode] = useState("dark");

  const t = themes[mode];
  const filtered = filter === "all" ? jobs : jobs.filter((j) => j.type === filter);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Syne:wght@600;700;800&family=DM+Sans:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(20px) scale(0.97) } to { opacity: 1; transform: translateY(0) scale(1) } }
        @keyframes blink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
        .pill-btn { transition: all 0.15s; cursor: pointer; }
        .pill-btn:hover { opacity: 0.8; }
        .stack-tag { transition: transform 0.15s; cursor: default; }
        .stack-tag:hover { transform: translateY(-2px); }
        .theme-toggle { transition: all 0.2s; cursor: pointer; }
        .theme-toggle:hover { opacity: 0.7; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #30363d; border-radius: 2px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: t.bg, color: t.text, padding: "48px 24px", transition: "background 0.2s, color 0.2s" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>

          {/* Header */}
          <div style={{ marginBottom: "48px", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "#00ff88", animation: "blink 2s infinite", boxShadow: "0 0 8px #00ff88" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: t.textMuted }}>
                  git log --all --oneline
                </span>
              </div>
              <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px, 6vw, 54px)", fontWeight: "800", color: t.textBright, letterSpacing: "-2px", lineHeight: 1 }}>
                work history
              </h1>
              <p style={{ fontFamily: "'DM Sans', sans-serif", color: t.textMuted, marginTop: "10px", fontSize: "15px" }}>
                {jobs.length} commits · click any row to expand
              </p>
            </div>

            {/* Theme toggle */}
            <button
              className="theme-toggle"
              onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "12px",
                padding: "8px 16px",
                borderRadius: "8px",
                border: `1px solid ${t.border}`,
                background: t.surfaceAlt,
                color: t.textMuted,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                flexShrink: 0,
                marginTop: "4px",
              }}
            >
              {mode === "dark" ? "☀ light" : "● dark"}
            </button>
          </div>

          {/* Filters */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "28px" }}>
            {["all", "full-time", "internship", "education"].map((f) => (
              <button
                key={f}
                className="pill-btn"
                onClick={() => setFilter(f)}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "12px",
                  padding: "5px 14px",
                  borderRadius: "20px",
                  border: `1px solid ${filter === f ? "#00ff88" : t.border}`,
                  background: filter === f ? "#00ff8815" : "transparent",
                  color: filter === f ? "#00ff88" : t.textMuted,
                  cursor: "pointer",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Table */}
          <div style={{ border: `1px solid ${t.border}`, borderRadius: "10px", overflow: "hidden" }}>
            {/* Table header */}
            <div style={{
              display: "grid",
              gridTemplateColumns: "90px 1fr 220px 80px",
              padding: "10px 20px",
              background: t.surfaceAlt,
              borderBottom: `1px solid ${t.border}`,
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "11px",
              color: t.textMuted,
              userSelect: "none",
            }}>
              <span>hash</span>
              <span>commit</span>
              <span>tech stack</span>
              <span>period</span>
            </div>

            {/* Rows */}
            {filtered.map((job, i) => (
              <div
                key={job.hash}
                onClick={() => setSelected(job)}
                onMouseEnter={() => setHovered(job.hash)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "grid",
                  gridTemplateColumns: "90px 1fr 220px 80px",
                  padding: "14px 20px",
                  borderBottom: i < filtered.length - 1 ? `1px solid ${t.border}` : "none",
                  cursor: "pointer",
                  alignItems: "center",
                  gap: "8px",
                  background: hovered === job.hash ? t.rowHover : "transparent",
                  transition: "background 0.15s",
                }}
              >
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: t.hash, letterSpacing: "0.5px" }}>
                  {job.hash}
                </span>

                <div>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: "600", fontSize: "15px", color: hovered === job.hash ? t.textBright : t.text, marginBottom: "2px", transition: "color 0.15s" }}>
                    {job.role}
                  </div>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: t.textMuted }}>
                    @ {job.company} ·{" "}
                    <span style={{ color: typeLabel[job.type].color }}>
                      {typeLabel[job.type].label}
                    </span>
                  </div>
                </div>

                <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                  {job.stack.slice(0, 3).map((s) => (
                    <span
                      key={s}
                      className="stack-tag"
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "10px",
                        padding: "2px 7px",
                        borderRadius: "3px",
                        background: `${stackColors[s] || "#333"}18`,
                        border: `1px solid ${stackColors[s] || "#555"}40`,
                        color: stackColors[s] || t.textMuted,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                  {job.stack.length > 3 && (
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: t.textMuted, padding: "2px 4px" }}>
                      +{job.stack.length - 3}
                    </span>
                  )}
                </div>

                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: t.textMuted, whiteSpace: "nowrap" }}>
                  {job.start.slice(0, 4)}
                  {job.end !== "present" ? `–${job.end.slice(0, 4)}` : "–now"}
                </span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "32px", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", color: t.textFaint, textAlign: "center" }}>
            (END) — press <span style={{ color: t.textMuted }}>q</span> to quit
          </div>
        </div>
      </div>

      {selected && <Modal job={selected} onClose={() => setSelected(null)} t={t} />}
    </>
  );
}