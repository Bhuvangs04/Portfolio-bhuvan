import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";
import {
  Search,
  ArrowRight,
  FolderKanban,
  Brain,
  Terminal,
  Mail,
  Download,
  Github,
  Linkedin,
  Home,
  BarChart3,
  Code2,
  Shield,
  Layers,
  Clock,
  Command,
} from "lucide-react";

interface CommandItem {
  id: string;
  icon: React.ElementType;
  label: string;
  description: string;
  category: string;
  action: () => void;
}

export const CommandPalette = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  }, []);

  const commands: CommandItem[] = [
    // Navigation
    { id: "home", icon: Home, label: "Go to Home", description: "Hero section", category: "Navigation", action: () => scrollTo("home") },
    { id: "dashboard", icon: BarChart3, label: "Go to Dashboard", description: "Stats & metrics", category: "Navigation", action: () => scrollTo("dashboard") },
    { id: "projects", icon: FolderKanban, label: "Go to Projects", description: "Featured work", category: "Navigation", action: () => scrollTo("projects") },
    { id: "skills", icon: Code2, label: "Go to Skills", description: "Skill evidence", category: "Navigation", action: () => scrollTo("skills") },
    { id: "ai", icon: Brain, label: "Go to AI Experience", description: "RAG, ML, Internship", category: "Navigation", action: () => scrollTo("ai-experience") },
    { id: "backend", icon: Shield, label: "Go to Backend Expertise", description: "Roadmap", category: "Navigation", action: () => scrollTo("backend-expertise") },
    { id: "techstack", icon: Layers, label: "Go to Tech Stack", description: "Technology wall", category: "Navigation", action: () => scrollTo("tech-stack") },
    { id: "github", icon: Github, label: "Go to GitHub Stats", description: "Coding activity", category: "Navigation", action: () => scrollTo("github-stats") },
    { id: "timeline", icon: Clock, label: "Go to Timeline", description: "Growth journey", category: "Navigation", action: () => scrollTo("timeline") },
    { id: "terminal", icon: Terminal, label: "Go to Terminal", description: "Interactive CLI", category: "Navigation", action: () => scrollTo("terminal") },
    { id: "contact", icon: Mail, label: "Go to Contact", description: "Get in touch", category: "Navigation", action: () => scrollTo("contact") },
    // Actions
    {
      id: "resume",
      icon: Download,
      label: "Download Resume",
      description: "Open resume PDF",
      category: "Actions",
      action: () => {
        window.open("https://drive.google.com/file/d/1SmqkKdmNAAkQUXGId_NirGP4sxHMRI6z/view?usp=sharing", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "github-profile",
      icon: Github,
      label: "Open GitHub Profile",
      description: "github.com/Bhuvangs04",
      category: "Actions",
      action: () => {
        window.open("https://github.com/Bhuvangs04", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "linkedin",
      icon: Linkedin,
      label: "Open LinkedIn",
      description: "Connect on LinkedIn",
      category: "Actions",
      action: () => {
        window.open("https://www.linkedin.com/in/bhuvangsangappanavar", "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "email",
      icon: Mail,
      label: "Send Email",
      description: "bhuvangs2004@gmail.com",
      category: "Actions",
      action: () => {
        window.location.href = "mailto:bhuvangs2004@gmail.com";
        setIsOpen(false);
      },
    },
  ];

  const filtered = query
    ? commands.filter(
        (cmd) =>
          cmd.label.toLowerCase().includes(query.toLowerCase()) ||
          cmd.description.toLowerCase().includes(query.toLowerCase()) ||
          cmd.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, cmd) => {
    if (!acc[cmd.category]) acc[cmd.category] = [];
    acc[cmd.category].push(cmd);
    return acc;
  }, {});

  // Keyboard shortcut to open
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setQuery("");
        setSelectedIndex(0);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Arrow keys & enter
  useEffect(() => {
    if (!isOpen) return;

    const handleNav = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
      }
    };
    window.addEventListener("keydown", handleNav);
    return () => window.removeEventListener("keydown", handleNav);
  }, [isOpen, selectedIndex, filtered]);

  // Reset selection when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Scroll active item into view
  useEffect(() => {
    if (!listRef.current) return;
    const active = listRef.current.querySelector("[data-active='true']");
    if (active) {
      active.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  let flatIndex = -1;

  return (
    <>
      {/* Trigger hint in navbar area */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        onClick={() => {
          setIsOpen(true);
          setQuery("");
          setSelectedIndex(0);
        }}
        className="fixed top-5 right-20 md:right-24 z-50 hidden md:flex items-center gap-2 glass px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground transition-colors"
      >
        <Command className="w-3 h-3" />
        <span>K</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-background/70 backdrop-blur-sm z-[80]"
            />

            {/* Palette Wrapper for Centering */}
            <div className="fixed inset-0 z-[90] flex justify-center p-4 pointer-events-none pt-[15vh]">
              {/* Palette */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.15 }}
                className="w-[560px] max-w-[calc(100vw-2rem)] glass-strong rounded-2xl overflow-hidden shadow-2xl pointer-events-auto h-fit"
              >
                {/* Search Input */}
                <div className="flex items-center gap-3 px-5 py-4 border-b border-border">
                  <Search className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search commands, sections, actions..."
                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
                    autoComplete="off"
                    spellCheck={false}
                  />
                  <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono text-muted-foreground bg-muted rounded">
                    ESC
                  </kbd>
                </div>

                {/* Results */}
                <div ref={listRef} className="max-h-[400px] overflow-y-auto py-2">
                  {Object.entries(grouped).length === 0 ? (
                    <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                      No results found
                    </div>
                  ) : (
                    Object.entries(grouped).map(([category, items]) => (
                      <div key={category}>
                        <p className="px-5 py-2 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
                          {category}
                        </p>
                        {items.map((cmd) => {
                          flatIndex++;
                          const isActive = flatIndex === selectedIndex;
                          const currentIndex = flatIndex;
                          return (
                            <button
                              key={cmd.id}
                              data-active={isActive}
                              onClick={() => cmd.action()}
                              onMouseEnter={() => setSelectedIndex(currentIndex)}
                              className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                                isActive
                                  ? "bg-primary/10 text-foreground"
                                  : "text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              <cmd.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-primary" : ""}`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{cmd.label}</p>
                                <p className="text-xs text-muted-foreground/70 truncate">
                                  {cmd.description}
                                </p>
                              </div>
                              {isActive && (
                                <ArrowRight className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="px-5 py-2.5 border-t border-border flex items-center gap-4 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↑↓</kbd> navigate
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">↵</kbd> select
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-muted font-mono">esc</kbd> close
                  </span>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
