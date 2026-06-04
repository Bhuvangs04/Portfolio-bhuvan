import { useState, useEffect, useCallback, createContext, useContext, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, X, Star } from "lucide-react";

// ── Achievement Definitions ──
interface Achievement {
  id: string;
  icon: string;
  title: string;
  description: string;
  secret?: boolean;
}

const allAchievements: Achievement[] = [
  { id: "first_visit", icon: "👋", title: "Welcome!", description: "Visited the portfolio for the first time" },
  { id: "scroll_50", icon: "📜", title: "Halfway There", description: "Scrolled past 50% of the page" },
  { id: "scroll_100", icon: "🏁", title: "Full Journey", description: "Scrolled to the very bottom" },
  { id: "terminal_cmd", icon: "💻", title: "Hacker Mode", description: "Ran a command in the Dev Terminal" },
  { id: "chat_bot", icon: "🤖", title: "AI Curious", description: "Chatted with the AI Assistant" },
  { id: "cmd_palette", icon: "⌨️", title: "Power User", description: "Opened the Command Palette (Ctrl+K)" },
  { id: "playground", icon: "🎮", title: "Game On", description: "Visited the Playground page" },
  { id: "project_click", icon: "🔍", title: "Deep Diver", description: "Opened a project modal for details" },
  { id: "resume_dl", icon: "📄", title: "Hired?", description: "Downloaded or viewed the resume" },
  { id: "github_visit", icon: "🐙", title: "Open Source Fan", description: "Clicked through to GitHub" },
  { id: "time_3min", icon: "⏰", title: "Engaged Visitor", description: "Spent 3+ minutes exploring" },
  { id: "all_sections", icon: "🗺️", title: "Explorer", description: "Visited every section on the page" },
  { id: "konami", icon: "🕹️", title: "Retro Gamer", description: "Entered the Konami code", secret: true },
  { id: "night_owl", icon: "🦉", title: "Night Owl", description: "Visited after midnight", secret: true },
  { id: "early_bird", icon: "🐦", title: "Early Bird", description: "Visited before 7 AM", secret: true },
];

// ── Context for global achievement tracking ──
interface AchievementContextType {
  unlocked: string[];
  unlock: (id: string) => void;
  total: number;
}

const AchievementContext = createContext<AchievementContextType>({
  unlocked: [],
  unlock: () => {},
  total: allAchievements.length,
});

export const useAchievements = () => useContext(AchievementContext);

export const AchievementProvider = ({ children }: { children: React.ReactNode }) => {
  const [unlocked, setUnlocked] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem("portfolio_achievements");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [newlyUnlocked, setNewlyUnlocked] = useState<Achievement | null>(null);

  // Sync ref with state to keep callbacks stable
  const unlockedRef = useRef<string[]>(unlocked);
  useEffect(() => {
    unlockedRef.current = unlocked;
  }, [unlocked]);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("portfolio_achievements", JSON.stringify(unlocked));
  }, [unlocked]);

  const unlock = useCallback(
    (id: string) => {
      if (unlockedRef.current.includes(id)) return;
      setUnlocked((prev) => {
        if (prev.includes(id)) return prev;
        return [...prev, id];
      });
      const achievement = allAchievements.find((a) => a.id === id);
      if (achievement) {
        setNewlyUnlocked(achievement);
        setTimeout(() => setNewlyUnlocked(null), 4000);
      }
    },
    []
  );

  // Auto-unlock: first visit
  useEffect(() => {
    unlock("first_visit");
  }, [unlock]);

  // Auto-unlock: time-based
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 0 && hour < 5) unlock("night_owl");
    if (hour >= 4 && hour < 7) unlock("early_bird");

    const timer = setTimeout(() => unlock("time_3min"), 180_000);
    return () => clearTimeout(timer);
  }, [unlock]);

  // Auto-unlock: scroll tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      if (scrollPercent > 0.5) unlock("scroll_50");
      if (scrollPercent > 0.95) unlock("scroll_100");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [unlock]);

  // Auto-unlock: section tracking
  useEffect(() => {
    const sectionIds = [
      "home", "dashboard", "projects", "skills",
      "ai-experience", "backend-expertise", "tech-stack",
      "github-stats", "timeline", "terminal", "contact",
    ];
    const visited = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visited.add(entry.target.id);
            if (visited.size >= sectionIds.length) {
              unlock("all_sections");
            }
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [unlock]);

  // Listen for Ctrl+K (command palette)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        unlock("cmd_palette");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [unlock]);

  // Listen for playground navigation
  useEffect(() => {
    if (window.location.pathname === "/playground") {
      unlock("playground");
    }
  }, [unlock]);

  // Global listener for github.com links
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (anchor && anchor.href && anchor.href.includes("github.com")) {
        unlock("github_visit");
      }
    };
    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, [unlock]);

  return (
    <AchievementContext.Provider
      value={{ unlocked, unlock, total: allAchievements.length }}
    >
      {children}

      {/* Toast notification for new achievements */}
      <AnimatePresence>
        {newlyUnlocked && (
          <motion.div
            initial={{ opacity: 0, y: 60, x: 0 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 60 }}
            className="fixed bottom-24 left-6 z-[70] glass-strong rounded-2xl px-5 py-4 shadow-2xl flex items-center gap-3 max-w-xs"
          >
            <span className="text-2xl">{newlyUnlocked.icon}</span>
            <div>
              <p className="text-xs text-secondary font-semibold uppercase tracking-wider">
                Achievement Unlocked!
              </p>
              <p className="text-sm font-bold">{newlyUnlocked.title}</p>
              <p className="text-xs text-muted-foreground">
                {newlyUnlocked.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AchievementContext.Provider>
  );
};

// ── Trophy Case Modal ──
export const TrophyCase = () => {
  const { unlocked, total } = useAchievements();
  const [isOpen, setIsOpen] = useState(false);

  const percentage = Math.round((unlocked.length / total) * 100);

  return (
    <>
      {/* Floating Trophy Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 3 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full glass-strong flex items-center justify-center hover:bg-primary/10 transition-colors group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <Trophy className="w-5 h-5 text-amber-400" />
        {/* Badge count */}
        <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-[10px] font-bold text-white flex items-center justify-center">
          {unlocked.length}
        </span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[80]"
            />
            {/* Modal Wrapper for Centering */}
            <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-6 pointer-events-none">
              {/* Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="w-full max-w-lg glass-strong rounded-2xl overflow-hidden flex flex-col max-h-[85vh] pointer-events-auto shadow-2xl"
              >
                {/* Header */}
                <div className="px-6 py-5 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Trophy Case</h3>
                      <p className="text-xs text-muted-foreground">
                        {unlocked.length}/{total} achievements · {percentage}% complete
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full glass flex items-center justify-center hover:bg-primary/10 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Bar */}
                <div className="px-6 py-3 border-b border-border">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${percentage}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                    />
                  </div>
                </div>

                {/* Achievements List */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {allAchievements.map((achievement) => {
                    const isUnlocked = unlocked.includes(achievement.id);
                    return (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                          isUnlocked
                            ? "glass"
                            : "opacity-40 grayscale"
                        }`}
                      >
                        <span className="text-xl w-8 text-center">
                          {isUnlocked ? achievement.icon : (achievement.secret ? "❓" : "🔒")}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-semibold ${isUnlocked ? "" : "text-muted-foreground"}`}>
                            {isUnlocked || !achievement.secret ? achievement.title : "???"}
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {isUnlocked || !achievement.secret
                              ? achievement.description
                              : "Secret achievement — keep exploring!"}
                          </p>
                        </div>
                        {isUnlocked && (
                          <Star className="w-4 h-4 text-amber-400 fill-amber-400 flex-shrink-0" />
                        )}
                      </motion.div>
                    );
                  })}
                </div>

                {/* Footer tip */}
                <div className="px-6 py-3 border-t border-border">
                  <p className="text-[10px] text-muted-foreground text-center">
                    💡 Explore the portfolio to unlock more achievements. Some are hidden!
                  </p>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
