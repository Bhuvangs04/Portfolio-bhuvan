import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Characters to type ──
const codeSnippets = [
  {
    label: "Express Route",
    language: "javascript",
    code: `app.get("/api/users", async (req, res) => {\n  const users = await User.find();\n  res.json({ success: true, data: users });\n});`,
  },
  {
    label: "FastAPI Endpoint",
    language: "python",
    code: `@app.post("/search")\nasync def search(query: Query):\n    results = await db.find(query.text)\n    return {"results": results}`,
  },
  {
    label: "React Hook",
    language: "typescript",
    code: `const [data, setData] = useState([]);\nuseEffect(() => {\n  fetch("/api/data")\n    .then(res => res.json())\n    .then(setData);\n}, []);`,
  },
  {
    label: "MongoDB Query",
    language: "javascript",
    code: `const result = await collection.aggregate([\n  { $match: { status: "active" } },\n  { $group: { _id: "$type", count: { $sum: 1 } } },\n  { $sort: { count: -1 } }\n]);`,
  },
  {
    label: "Docker Config",
    language: "yaml",
    code: `FROM node:18-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "server.js"]`,
  },
];

export const CodeTyper = () => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "done">("idle");
  const [snippetIndex, setSnippetIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [errors, setErrors] = useState(0);
  const [wpm, setWpm] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval>>();

  const snippet = codeSnippets[snippetIndex];
  const target = snippet.code;

  const accuracy = typed.length > 0
    ? Math.max(0, Math.round(((typed.length - errors) / typed.length) * 100))
    : 100;

  const startGame = useCallback(() => {
    setSnippetIndex(Math.floor(Math.random() * codeSnippets.length));
    setTyped("");
    setErrors(0);
    setWpm(0);
    setElapsed(0);
    setGameState("playing");
    setStartTime(Date.now());
    setTimeout(() => inputRef.current?.focus(), 100);
  }, []);

  // Timer
  useEffect(() => {
    if (gameState !== "playing") {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      const e = (Date.now() - startTime) / 1000;
      setElapsed(e);
      // WPM = (chars / 5) / minutes
      if (e > 0) {
        setWpm(Math.round((typed.length / 5) / (e / 60)));
      }
    }, 200);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [gameState, startTime, typed.length]);

  const handleInput = (value: string) => {
    if (gameState !== "playing") return;
    setTyped(value);

    // Count errors
    let errCount = 0;
    for (let i = 0; i < value.length; i++) {
      if (value[i] !== target[i]) errCount++;
    }
    setErrors(errCount);

    // Check completion
    if (value.length >= target.length) {
      setGameState("done");
      const finalElapsed = (Date.now() - startTime) / 1000;
      setElapsed(finalElapsed);
      setWpm(Math.round((target.length / 5) / (finalElapsed / 60)));
    }
  };

  // Render the target with typed overlay
  const renderCode = () => {
    return target.split("").map((char, i) => {
      let className = "text-muted-foreground/30"; // untyped
      if (i < typed.length) {
        className = typed[i] === char ? "text-emerald-400" : "text-red-400 bg-red-400/10";
      } else if (i === typed.length) {
        className = "text-foreground border-l-2 border-primary animate-pulse";
      }
      return (
        <span key={i} className={className}>
          {char === "\n" ? "↵\n" : char}
        </span>
      );
    });
  };

  return (
    <div className="glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="terminal-font text-xs text-muted-foreground">
            ⌨️ Code Typer — {snippet.label}
          </span>
        </div>
        {gameState !== "idle" && (
          <div className="flex items-center gap-4 text-xs">
            <span className="text-muted-foreground">
              ⏱ {elapsed.toFixed(1)}s
            </span>
            <span className="text-primary font-bold">{wpm} WPM</span>
            <span className={accuracy >= 90 ? "text-emerald-400" : "text-amber-400"}>
              {accuracy}% accuracy
            </span>
          </div>
        )}
      </div>

      {/* Game Area */}
      <div className="p-6 min-h-[280px] relative">
        {gameState === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-full gap-4 py-8"
          >
            <p className="text-5xl">⌨️</p>
            <h3 className="text-xl font-bold">Code Typer Race</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Type real code snippets as fast as you can. Test your speed and accuracy with actual backend and frontend code.
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Start Racing
            </button>
          </motion.div>
        )}

        {gameState === "playing" && (
          <div className="relative">
            {/* Code display */}
            <pre className="terminal-font text-sm leading-relaxed whitespace-pre-wrap mb-4 select-none">
              {renderCode()}
            </pre>

            {/* Hidden textarea for input */}
            <textarea
              ref={inputRef}
              value={typed}
              onChange={(e) => handleInput(e.target.value)}
              className="absolute inset-0 opacity-0 cursor-default resize-none"
              autoFocus
              spellCheck={false}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
            />

            {/* Progress bar */}
            <div className="h-1.5 bg-muted rounded-full overflow-hidden mt-4">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
                animate={{ width: `${(typed.length / target.length) * 100}%` }}
              />
            </div>
          </div>
        )}

        {gameState === "done" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-6"
          >
            <p className="text-4xl">{wpm >= 60 ? "🔥" : wpm >= 40 ? "⚡" : "👍"}</p>
            <h3 className="text-2xl font-bold gradient-text">
              {wpm >= 60 ? "Blazing Fast!" : wpm >= 40 ? "Nice Speed!" : "Good Try!"}
            </h3>
            <div className="grid grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{wpm}</p>
                <p className="text-xs text-muted-foreground">WPM</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{accuracy}%</p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{elapsed.toFixed(1)}s</p>
                <p className="text-xs text-muted-foreground">Time</p>
              </div>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-primary text-white font-medium hover:bg-primary/90 transition-colors mt-2"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ── TECH MEMORY MATCH ──
const techPairs = [
  { id: "react", emoji: "⚛️", name: "React" },
  { id: "node", emoji: "🟢", name: "Node.js" },
  { id: "python", emoji: "🐍", name: "Python" },
  { id: "docker", emoji: "🐳", name: "Docker" },
  { id: "mongo", emoji: "🍃", name: "MongoDB" },
  { id: "aws", emoji: "☁️", name: "AWS" },
  { id: "java", emoji: "☕", name: "Java" },
  { id: "git", emoji: "🔀", name: "Git" },
];

interface MemoryCard {
  uid: string;
  id: string;
  emoji: string;
  name: string;
  flipped: boolean;
  matched: boolean;
}

export const TechMemoryMatch = () => {
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "playing" | "done">("idle");
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const lockRef = useRef(false);

  const initGame = useCallback(() => {
    const doubled = [...techPairs, ...techPairs].map((p, i) => ({
      ...p,
      uid: `${p.id}-${i}`,
      flipped: false,
      matched: false,
    }));
    // Shuffle
    for (let i = doubled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
    }
    setCards(doubled);
    setFlippedIds([]);
    setMoves(0);
    setMatches(0);
    setElapsed(0);
    setGameState("playing");
    setStartTime(Date.now());
    lockRef.current = false;
  }, []);

  // Timer
  useEffect(() => {
    if (gameState !== "playing") return;
    const timer = setInterval(() => {
      setElapsed((Date.now() - startTime) / 1000);
    }, 200);
    return () => clearInterval(timer);
  }, [gameState, startTime]);

  const handleFlip = useCallback(
    (uid: string) => {
      if (lockRef.current) return;
      if (gameState !== "playing") return;

      const card = cards.find((c) => c.uid === uid);
      if (!card || card.flipped || card.matched) return;

      const newFlipped = [...flippedIds, uid];
      setFlippedIds(newFlipped);

      // Update card
      setCards((prev) =>
        prev.map((c) => (c.uid === uid ? { ...c, flipped: true } : c))
      );

      if (newFlipped.length === 2) {
        lockRef.current = true;
        setMoves((m) => m + 1);

        const [first, second] = newFlipped.map((id) =>
          cards.find((c) => c.uid === id)
        );

        if (first && second && first.id === second.id) {
          // Match!
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.uid === first.uid || c.uid === second.uid
                  ? { ...c, matched: true }
                  : c
              )
            );
            setMatches((m) => {
              const next = m + 1;
              if (next === techPairs.length) {
                setGameState("done");
                setElapsed((Date.now() - startTime) / 1000);
              }
              return next;
            });
            setFlippedIds([]);
            lockRef.current = false;
          }, 500);
        } else {
          // No match
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                newFlipped.includes(c.uid) ? { ...c, flipped: false } : c
              )
            );
            setFlippedIds([]);
            lockRef.current = false;
          }, 800);
        }
      }
    },
    [cards, flippedIds, gameState, startTime]
  );

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <span className="terminal-font text-xs text-muted-foreground">
          🧠 Tech Memory Match
        </span>
        {gameState !== "idle" && (
          <div className="flex items-center gap-4 text-xs">
            <span className="text-muted-foreground">⏱ {elapsed.toFixed(1)}s</span>
            <span className="text-primary font-bold">{moves} moves</span>
            <span className="text-secondary">{matches}/{techPairs.length} matched</span>
          </div>
        )}
      </div>

      <div className="p-6 min-h-[280px]">
        {gameState === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-8"
          >
            <p className="text-5xl">🧠</p>
            <h3 className="text-xl font-bold">Tech Memory Match</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Flip cards and match technology pairs. Find all 8 pairs in the fewest moves possible.
            </p>
            <button
              onClick={initGame}
              className="px-6 py-2.5 rounded-xl bg-secondary text-white font-medium hover:bg-secondary/90 transition-colors"
            >
              Start Game
            </button>
          </motion.div>
        )}

        {gameState === "playing" && (
          <div className="grid grid-cols-4 gap-3 max-w-sm mx-auto">
            {cards.map((card) => (
              <motion.button
                key={card.uid}
                onClick={() => handleFlip(card.uid)}
                whileTap={{ scale: 0.95 }}
                className={`aspect-square rounded-xl flex items-center justify-center text-2xl transition-all duration-300 ${
                  card.matched
                    ? "bg-primary/20 border border-primary/30 scale-95 opacity-60"
                    : card.flipped
                    ? "bg-secondary/20 border border-secondary/30"
                    : "glass hover:bg-primary/5 cursor-pointer"
                }`}
              >
                <AnimatePresence mode="wait">
                  {card.flipped || card.matched ? (
                    <motion.span
                      key="front"
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: 90 }}
                      transition={{ duration: 0.15 }}
                    >
                      {card.emoji}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="back"
                      initial={{ rotateY: 90 }}
                      animate={{ rotateY: 0 }}
                      exit={{ rotateY: 90 }}
                      transition={{ duration: 0.15 }}
                      className="text-muted-foreground/30 text-lg"
                    >
                      ?
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>
            ))}
          </div>
        )}

        {gameState === "done" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-6"
          >
            <p className="text-4xl">
              {moves <= 12 ? "🏆" : moves <= 16 ? "⭐" : "👍"}
            </p>
            <h3 className="text-2xl font-bold gradient-text">
              {moves <= 12 ? "Perfect Memory!" : moves <= 16 ? "Great Job!" : "Well Done!"}
            </h3>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{moves}</p>
                <p className="text-xs text-muted-foreground">Moves</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">{elapsed.toFixed(1)}s</p>
                <p className="text-xs text-muted-foreground">Time</p>
              </div>
            </div>
            <button
              onClick={initGame}
              className="px-6 py-2.5 rounded-xl bg-secondary text-white font-medium hover:bg-secondary/90 transition-colors mt-2"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ── BUG SQUASHER ──
interface Bug {
  id: number;
  x: number;
  y: number;
  type: string;
  speed: number;
}

const bugEmojis = ["🐛", "🪲", "🐞", "🦗", "🕷️"];

export const BugSquasher = () => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "done">("idle");
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [level, setLevel] = useState(1);
  const nextId = useRef(0);
  const areaRef = useRef<HTMLDivElement>(null);

  const startGame = useCallback(() => {
    setBugs([]);
    setScore(0);
    setTimeLeft(30);
    setLevel(1);
    nextId.current = 0;
    setGameState("playing");
  }, []);

  // Spawn bugs
  useEffect(() => {
    if (gameState !== "playing") return;
    const interval = setInterval(() => {
      setBugs((prev) => {
        if (prev.length >= 8 + level * 2) return prev; // cap
        const newBug: Bug = {
          id: nextId.current++,
          x: 10 + Math.random() * 80,
          y: 10 + Math.random() * 80,
          type: bugEmojis[Math.floor(Math.random() * bugEmojis.length)],
          speed: 1 + Math.random() * level * 0.5,
        };
        return [...prev, newBug];
      });
    }, Math.max(400, 1200 - level * 100));

    return () => clearInterval(interval);
  }, [gameState, level]);

  // Timer
  useEffect(() => {
    if (gameState !== "playing") return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          setGameState("done");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [gameState]);

  // Level up
  useEffect(() => {
    if (score > 0 && score % 10 === 0) {
      setLevel((l) => l + 1);
    }
  }, [score]);

  // Bug movement
  useEffect(() => {
    if (gameState !== "playing") return;
    const mover = setInterval(() => {
      setBugs((prev) =>
        prev.map((bug) => ({
          ...bug,
          x: Math.max(5, Math.min(95, bug.x + (Math.random() - 0.5) * bug.speed * 6)),
          y: Math.max(5, Math.min(95, bug.y + (Math.random() - 0.5) * bug.speed * 6)),
        }))
      );
    }, 300);
    return () => clearInterval(mover);
  }, [gameState]);

  const squashBug = (id: number) => {
    setBugs((prev) => prev.filter((b) => b.id !== id));
    setScore((s) => s + 1);
  };

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <span className="terminal-font text-xs text-muted-foreground">
          🐛 Bug Squasher
        </span>
        {gameState !== "idle" && (
          <div className="flex items-center gap-4 text-xs">
            <span className={`font-bold ${timeLeft <= 10 ? "text-red-400" : "text-muted-foreground"}`}>
              ⏱ {timeLeft}s
            </span>
            <span className="text-primary font-bold">Score: {score}</span>
            <span className="text-secondary">Level {level}</span>
          </div>
        )}
      </div>

      <div className="p-6 min-h-[280px]">
        {gameState === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-8"
          >
            <p className="text-5xl">🐛</p>
            <h3 className="text-xl font-bold">Bug Squasher</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Click the bugs before they escape! They get faster and more numerous as you level up. You have 30 seconds.
            </p>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-500/90 transition-colors"
            >
              Start Squashing
            </button>
          </motion.div>
        )}

        {gameState === "playing" && (
          <div
            ref={areaRef}
            className="relative w-full h-[250px] rounded-xl bg-muted/20 overflow-hidden cursor-crosshair"
          >
            <AnimatePresence>
              {bugs.map((bug) => (
                <motion.button
                  key={bug.id}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ type: "spring", duration: 0.3 }}
                  onClick={() => squashBug(bug.id)}
                  className="absolute text-2xl hover:scale-125 active:scale-75 transition-transform select-none"
                  style={{
                    left: `${bug.x}%`,
                    top: `${bug.y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {bug.type}
                </motion.button>
              ))}
            </AnimatePresence>

            {/* Score popup effect */}
            {bugs.length === 0 && score > 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-sm text-muted-foreground animate-pulse">
                  Nice! Waiting for more bugs...
                </p>
              </div>
            )}
          </div>
        )}

        {gameState === "done" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-6"
          >
            <p className="text-4xl">
              {score >= 30 ? "🏆" : score >= 20 ? "🔥" : score >= 10 ? "⚡" : "👍"}
            </p>
            <h3 className="text-2xl font-bold gradient-text">
              {score >= 30
                ? "Bug Exterminator!"
                : score >= 20
                ? "Senior Debugger!"
                : score >= 10
                ? "Junior Debugger!"
                : "Keep Practicing!"}
            </h3>
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{score}</p>
                <p className="text-xs text-muted-foreground">Bugs Squashed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">Level {level}</p>
                <p className="text-xs text-muted-foreground">Reached</p>
              </div>
            </div>
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-500/90 transition-colors mt-2"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

// ── TECH QUIZ ──
interface QuizQuestion {
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const quizQuestions: QuizQuestion[] = [
  {
    question: "Which database does Freelancer Hub use for storing project data?",
    options: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
    correct: 2,
    explanation: "Freelancer Hub uses MongoDB for flexible document-based storage of projects, users, and transactions.",
  },
  {
    question: "What payment gateway is integrated into both Streamify and Freelancer Hub?",
    options: ["Stripe", "PayPal", "Razorpay", "Square"],
    correct: 2,
    explanation: "Razorpay is used for secure payment processing in both projects, with webhook validation.",
  },
  {
    question: "Which framework was used for the AI backend at Anivale?",
    options: ["Express.js", "Django", "FastAPI", "Flask"],
    correct: 2,
    explanation: "FastAPI was chosen for its async support and high performance for AI model serving.",
  },
  {
    question: "What does RAG stand for in AI systems?",
    options: [
      "Random Access Generation",
      "Retrieval-Augmented Generation",
      "Recursive Algorithm Generation",
      "Real-time Adaptive Graphics",
    ],
    correct: 1,
    explanation: "RAG (Retrieval-Augmented Generation) combines document retrieval with LLM generation for accurate responses.",
  },
  {
    question: "Which cloud storage service is used for file uploads in Bhuvan's projects?",
    options: ["Google Cloud Storage", "Azure Blob", "AWS S3", "Cloudflare R2"],
    correct: 2,
    explanation: "AWS S3 is used across Freelancer Hub, Streamify, and Banking System for file storage.",
  },
  {
    question: "What real-time technology powers chat in Freelancer Hub?",
    options: ["Long Polling", "Server-Sent Events", "Socket.io", "gRPC Streaming"],
    correct: 2,
    explanation: "Socket.io provides WebSocket-based real-time chat and notifications in Freelancer Hub.",
  },
  {
    question: "Which language was the Banking System built with?",
    options: ["Python", "JavaScript", "Java", "Go"],
    correct: 2,
    explanation: "The Banking System uses Java with Spring Boot for enterprise-grade security and transactions.",
  },
  {
    question: "What authentication mechanism does Freelancer Hub use?",
    options: ["OAuth 2.0", "Session Cookies", "JWT + RBAC", "API Keys"],
    correct: 2,
    explanation: "JWT tokens with Role-Based Access Control (RBAC) secure the Freelancer Hub API.",
  },
];

export const TechQuiz = () => {
  const [gameState, setGameState] = useState<"idle" | "playing" | "done">("idle");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);

  const startQuiz = useCallback(() => {
    // Shuffle and pick 5
    const shuffled = [...quizQuestions].sort(() => Math.random() - 0.5).slice(0, 5);
    setQuestions(shuffled);
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setShowExplanation(false);
    setGameState("playing");
  }, []);

  const handleAnswer = (index: number) => {
    if (selected !== null) return;
    setSelected(index);
    if (index === questions[currentQ].correct) {
      setScore((s) => s + 1);
    }
    setShowExplanation(true);

    setTimeout(() => {
      if (currentQ + 1 >= questions.length) {
        setGameState("done");
      } else {
        setCurrentQ((q) => q + 1);
        setSelected(null);
        setShowExplanation(false);
      }
    }, 2200);
  };

  const q = questions[currentQ];

  return (
    <div className="glass rounded-2xl overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-border">
        <span className="terminal-font text-xs text-muted-foreground">
          🎯 Tech Quiz Challenge
        </span>
        {gameState === "playing" && (
          <div className="flex items-center gap-4 text-xs">
            <span className="text-muted-foreground">
              Q{currentQ + 1}/{questions.length}
            </span>
            <span className="text-primary font-bold">Score: {score}</span>
          </div>
        )}
      </div>

      <div className="p-6 min-h-[280px]">
        {gameState === "idle" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-8"
          >
            <p className="text-5xl">🎯</p>
            <h3 className="text-xl font-bold">Tech Quiz Challenge</h3>
            <p className="text-sm text-muted-foreground text-center max-w-md">
              Test your knowledge about Bhuvan's projects, tech stack, and engineering decisions. 5 random questions per round.
            </p>
            <button
              onClick={startQuiz}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-500/90 transition-colors"
            >
              Start Quiz
            </button>
          </motion.div>
        )}

        {gameState === "playing" && q && (
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Progress */}
            <div className="flex gap-1.5 mb-2">
              {questions.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    i < currentQ
                      ? "bg-primary"
                      : i === currentQ
                      ? "bg-primary/50"
                      : "bg-muted"
                  }`}
                />
              ))}
            </div>

            <h3 className="text-lg font-semibold leading-relaxed">
              {q.question}
            </h3>

            <div className="grid gap-2.5">
              {q.options.map((opt, i) => {
                let optClass = "glass hover:bg-primary/5 cursor-pointer";
                if (selected !== null) {
                  if (i === q.correct) {
                    optClass = "bg-emerald-500/20 border-emerald-500/30 border";
                  } else if (i === selected && i !== q.correct) {
                    optClass = "bg-red-500/20 border-red-500/30 border";
                  } else {
                    optClass = "glass opacity-50";
                  }
                }
                return (
                  <button
                    key={i}
                    onClick={() => handleAnswer(i)}
                    disabled={selected !== null}
                    className={`text-left px-4 py-3 rounded-xl text-sm transition-all ${optClass}`}
                  >
                    <span className="text-muted-foreground mr-3 font-mono text-xs">
                      {String.fromCharCode(65 + i)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-xl p-3 mt-3"
              >
                <p className="text-xs text-muted-foreground">
                  💡 {q.explanation}
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {gameState === "done" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center gap-4 py-6"
          >
            <p className="text-4xl">
              {score === questions.length ? "🏆" : score >= 3 ? "⭐" : "📚"}
            </p>
            <h3 className="text-2xl font-bold gradient-text">
              {score === questions.length
                ? "Perfect Score!"
                : score >= 3
                ? "Great Knowledge!"
                : "Study More!"}
            </h3>
            <p className="text-3xl font-bold text-primary">
              {score}/{questions.length}
            </p>
            <p className="text-sm text-muted-foreground">correct answers</p>
            <button
              onClick={startQuiz}
              className="px-6 py-2.5 rounded-xl bg-amber-500 text-white font-medium hover:bg-amber-500/90 transition-colors mt-2"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};
