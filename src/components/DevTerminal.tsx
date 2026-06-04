import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useAchievements } from "./Achievements";

interface TerminalLine {
  type: "input" | "output" | "system";
  content: string;
}

const commandResponses: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  about      — Who is Bhuvan?",
    "  projects   — List featured projects",
    "  skills     — Show tech stack",
    "  experience — Work experience",
    "  contact    — Contact information",
    "  resume     — Download resume",
    "  clear      — Clear terminal",
    "  help       — Show this help",
  ],
  about: [
    "┌─────────────────────────────────────┐",
    "│  Bhuvan G Sangappanavar             │",
    "│  Backend Engineer | Full Stack Dev  │",
    "│  AI Developer                       │",
    "├─────────────────────────────────────┤",
    "│  CGPA: 8.06                         │",
    "│  Location: Bangalore, India         │",
    "│  Focus: Scalable backend systems    │",
    "│         AI/RAG pipelines            │",
    "│         Cloud-native architecture   │",
    "└─────────────────────────────────────┘",
  ],
  projects: [
    "Featured Projects:",
    "",
    "  [1] Freelancer Hub",
    "      → Full marketplace with JWT, RBAC, Razorpay, AWS S3",
    "      → github.com/Bhuvangs04/Full-Stack-website",
    "",
    "  [2] Streamify",
    "      → Netflix-style streaming with subscriptions",
    "      → github.com/Bhuvangs04/Movie_Streaming_website",
    "",
    "  [3] AI Backend Internship @ Anivale",
    "      → RAG Pipelines, Semantic Search, FastAPI",
    "      → Private / NDA",
    "",
    "  [4] Banking Management System",
    "      → Encrypted transactions, Java + MySQL",
    "      → github.com/Bhuvangs04/banking-system",
  ],
  skills: [
    "Tech Stack:",
    "",
    "  Languages   │ Java, Python, JavaScript, TypeScript",
    "  Backend     │ Node.js, Express, FastAPI, Spring Boot",
    "  Frontend    │ React, Next.js",
    "  Databases   │ MongoDB, MySQL",
    "  Cloud       │ AWS S3, Docker",
    "  AI/ML       │ RAG, Vector Embeddings, Semantic Search",
    "  Realtime    │ WebSockets, Socket.io",
    "  Payments    │ Razorpay Integration",
    "  Tools       │ Git, VS Code, Postman",
  ],
  experience: [
    "Work Experience:",
    "",
    "  AI / Backend Developer Intern",
    "  @ Anivale (2025)",
    "",
    "  • Built RAG pipelines with optimized context retrieval",
    "  • Implemented semantic search with vector embeddings",
    "  • Developed FastAPI backend services",
    "  • Built real-time WebSocket architecture",
    "  • Optimized MongoDB for AI workloads",
  ],
  contact: [
    "Contact Information:",
    "",
    "  Email    → bhuvangs2004@gmail.com",
    "  Phone    → +91 6362371070",
    "  GitHub   → github.com/Bhuvangs04",
    "  LinkedIn → linkedin.com/in/bhuvan-g-sangappanavar",
    "  Location → Bangalore, India",
  ],
  resume: ["Opening resume... ↗"],
};

export const DevTerminal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const { unlock } = useAchievements();
  const [history, setHistory] = useState<TerminalLine[]>([
    { type: "system", content: "Welcome to bhuvan@portfolio ~ $" },
    {
      type: "system",
      content: 'Type "help" to see available commands.',
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, []);

  useEffect(scrollToBottom, [history, scrollToBottom]);

  const typeResponse = useCallback(
    async (lines: string[]) => {
      setIsTyping(true);
      for (const line of lines) {
        await new Promise((r) => setTimeout(r, 40));
        setHistory((prev) => [...prev, { type: "output", content: line }]);
      }
      setIsTyping(false);
    },
    []
  );

  const handleCommand = useCallback(
    async (cmd: string) => {
      const trimmed = cmd.trim().toLowerCase();
      unlock("terminal_cmd");

      setHistory((prev) => [
        ...prev,
        { type: "input", content: `$ ${cmd}` },
      ]);

      if (trimmed === "clear") {
        setHistory([
          { type: "system", content: "Terminal cleared." },
          { type: "system", content: 'Type "help" for commands.' },
        ]);
        return;
      }

      if (trimmed === "resume") {
        window.open(
          "https://drive.google.com/file/d/1YUODRsahCjnh1qbuNsDLLJEh2GULg2ne/view?usp=sharing",
          "_blank"
        );
        await typeResponse(commandResponses.resume);
        return;
      }

      const response = commandResponses[trimmed];
      if (response) {
        await typeResponse(response);
      } else {
        await typeResponse([
          `Command not found: ${trimmed}`,
          'Type "help" for available commands.',
        ]);
      }
    },
    [typeResponse]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    handleCommand(input);
    setInput("");
  };

  return (
    <section id="terminal" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-15" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Developer <span className="gradient-text">Terminal</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my portfolio the hacker way
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          {/* Terminal Window */}
          <div className="terminal-bg rounded-2xl overflow-hidden shadow-2xl">
            {/* Title Bar */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-primary/10">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
              </div>
              <span className="terminal-font text-xs text-muted-foreground ml-3">
                bhuvan@portfolio — bash
              </span>
            </div>

            {/* Terminal Body */}
            <div
              ref={terminalRef}
              onClick={() => inputRef.current?.focus()}
              className="p-4 md:p-6 h-[400px] overflow-y-auto cursor-text"
            >
              {history.map((line, i) => (
                <div
                  key={i}
                  className={`terminal-font text-sm mb-0.5 ${
                    line.type === "input"
                      ? "text-emerald-400"
                      : line.type === "system"
                      ? "text-primary/70"
                      : "text-muted-foreground"
                  }`}
                >
                  <pre className="whitespace-pre-wrap font-[inherit]">
                    {line.content}
                  </pre>
                </div>
              ))}

              {/* Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 mt-1">
                <span className="terminal-font text-sm text-emerald-400">$</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isTyping}
                  className="flex-1 bg-transparent terminal-font text-sm text-foreground outline-none caret-emerald-400"
                  placeholder={isTyping ? "" : "Type a command..."}
                  autoComplete="off"
                  spellCheck={false}
                />
                {!isTyping && (
                  <span className="terminal-cursor w-2 h-4 bg-emerald-400/80 inline-block" />
                )}
              </form>
            </div>
          </div>

          <p className="text-center text-xs text-muted-foreground mt-4">
            Try:{" "}
            {["about", "projects", "skills", "contact"].map((cmd, i) => (
              <span key={cmd}>
                <button
                  onClick={() => {
                    if (!isTyping) {
                      handleCommand(cmd);
                    }
                  }}
                  className="text-primary hover:underline cursor-pointer"
                >
                  {cmd}
                </button>
                {i < 3 && " · "}
              </span>
            ))}
          </p>
        </motion.div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
};
