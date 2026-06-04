import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAchievements } from "./Achievements";

const KONAMI_CODE = [
  "ArrowUp", "ArrowUp",
  "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight",
  "ArrowLeft", "ArrowRight",
  "b", "a",
];

const achievements = [
  "🏆 Secret Explorer — You found the hidden easter egg!",
  "⚡ Full Stack Hero — Can build anything from DB to UI",
  "🧠 AI Whisperer — RAG pipelines? Vector embeddings? Easy.",
  "🔐 Auth Master — JWT, RBAC, encryption — locked down tight",
  "🚀 Ship It! — 4+ production projects and counting",
  "💳 Payment Pro — Razorpay integration specialist",
  "☁️ Cloud Native — AWS S3, Docker, CI/CD ready",
  "🔌 Realtime Wizard — WebSockets + Socket.io expertise",
];

// Matrix-style rain characters
const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01234567890=+-*/{}[]();:,.";

export const EasterEgg = () => {
  const [keySequence, setKeySequence] = useState<string[]>([]);
  const { unlock } = useAchievements();
  const [isActivated, setIsActivated] = useState(false);
  const [showAchievements, setShowAchievements] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (isActivated) return;

      setKeySequence((prev) => {
        const next = [...prev, e.key].slice(-KONAMI_CODE.length);

        if (
          next.length === KONAMI_CODE.length &&
          next.every((key, i) => key === KONAMI_CODE[i])
        ) {
          unlock("konami");
          setIsActivated(true);
          setTimeout(() => setShowAchievements(true), 2000);
        }

        return next;
      });
    },
    [isActivated]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Matrix rain effect
  useEffect(() => {
    if (!isActivated) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = new Array(columns).fill(0).map(() => Math.random() * -50);

    const draw = () => {
      ctx.fillStyle = "rgba(15, 23, 42, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#3B82F6";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = matrixChars[Math.floor(Math.random() * matrixChars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Brighter for leading characters
        if (Math.random() > 0.5) {
          ctx.fillStyle = "#06B6D4";
        } else {
          ctx.fillStyle = `rgba(59, 130, 246, ${0.3 + Math.random() * 0.7})`;
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    // Auto-close after 8 seconds
    const timeout = setTimeout(() => {
      setIsActivated(false);
      setShowAchievements(false);
      setKeySequence([]);
      cancelAnimationFrame(rafRef.current);
    }, 8000);

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(timeout);
    };
  }, [isActivated]);

  // Progress indicator (subtle)
  const progress = keySequence.length;
  const showHint = progress >= 4 && progress < KONAMI_CODE.length;

  return (
    <>
      {/* Subtle progress hint */}
      <AnimatePresence>
        {showHint && !isActivated && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-20 left-6 z-50 glass px-4 py-2 rounded-lg"
          >
            <p className="text-xs text-muted-foreground terminal-font">
              🎮 {progress}/{KONAMI_CODE.length} — keep going...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Matrix Rain + Achievements Overlay */}
      <AnimatePresence>
        {isActivated && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100]"
          >
            <canvas ref={canvasRef} className="absolute inset-0" />

            {/* Achievement Cards */}
            <AnimatePresence>
              {showAchievements && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 flex items-center justify-center p-4"
                >
                  <div className="glass-strong rounded-2xl p-8 max-w-lg w-full mx-auto shadow-2xl">
                    <motion.h3
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-2xl font-bold text-center mb-2 gradient-text"
                    >
                      🎮 Konami Code Activated!
                    </motion.h3>
                    <p className="text-center text-sm text-muted-foreground mb-6">
                      You unlocked Bhuvan's secret achievements
                    </p>
                    <div className="space-y-2">
                      {achievements.map((achievement, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.12 }}
                          className="glass rounded-xl px-4 py-2.5 text-sm"
                        >
                          {achievement}
                        </motion.div>
                      ))}
                    </div>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5 }}
                      className="text-center text-xs text-muted-foreground mt-4"
                    >
                      Auto-closing in a few seconds...
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
