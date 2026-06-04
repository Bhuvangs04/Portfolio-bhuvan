import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Gamepad2, Keyboard, Brain, Bug, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { CodeTyper, TechMemoryMatch, BugSquasher, TechQuiz } from "@/components/TechGames";
import { CustomCursor } from "@/components/CustomCursor";

const games = [
  {
    id: "typer",
    icon: Keyboard,
    name: "Code Typer",
    description: "Race to type real code snippets",
    color: "text-primary",
    bgColor: "bg-primary/10",
    gradient: "from-primary/20 to-primary/5",
  },
  {
    id: "memory",
    icon: Brain,
    name: "Memory Match",
    description: "Match tech icon pairs",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
    gradient: "from-secondary/20 to-secondary/5",
  },
  {
    id: "bugs",
    icon: Bug,
    name: "Bug Squasher",
    description: "Squash bugs before time runs out",
    color: "text-red-400",
    bgColor: "bg-red-400/10",
    gradient: "from-red-400/20 to-red-400/5",
  },
  {
    id: "quiz",
    icon: HelpCircle,
    name: "Tech Quiz",
    description: "Test your knowledge",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
    gradient: "from-amber-400/20 to-amber-400/5",
  },
];

const Playground = () => {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />

      {/* Background */}
      <div className="fixed inset-0 grid-pattern opacity-20 pointer-events-none" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-10"
        >
          <Link
            to="/"
            className="glass p-2.5 rounded-xl hover:bg-primary/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
              <Gamepad2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                Dev <span className="gradient-text">Playground</span>
              </h1>
              <p className="text-xs text-muted-foreground">
                Interactive tech games — because developers need fun too
              </p>
            </div>
          </div>
        </motion.div>

        {/* Game Selector */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-10"
        >
          {games.map((game, i) => {
            const isActive = activeGame === game.id;
            return (
              <motion.button
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                onClick={() => setActiveGame(game.id)}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.97 }}
                className={`relative p-4 rounded-2xl text-left transition-all overflow-hidden ${
                  isActive
                    ? "glass border-2 border-primary/30 shadow-lg shadow-primary/10"
                    : "glass hover:border-primary/10"
                }`}
              >
                {/* Gradient bg on active */}
                {isActive && (
                  <motion.div
                    layoutId="activeGameBg"
                    className={`absolute inset-0 bg-gradient-to-br ${game.gradient}`}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="relative z-10">
                  <div className={`w-10 h-10 rounded-xl ${game.bgColor} flex items-center justify-center mb-3`}>
                    <game.icon className={`w-5 h-5 ${game.color}`} />
                  </div>
                  <h3 className="font-bold text-sm mb-0.5">{game.name}</h3>
                  <p className="text-xs text-muted-foreground">{game.description}</p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Game Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {!activeGame && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass rounded-2xl p-12 text-center"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <Gamepad2 className="w-16 h-16 text-primary/30 mx-auto mb-6" />
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">Select a Game</h2>
              <p className="text-muted-foreground max-w-md mx-auto">
                Pick a game above to start playing. Each game tests different skills — from typing speed to tech knowledge.
              </p>

              {/* Fun Stats */}
              <div className="flex items-center justify-center gap-6 mt-8">
                {[
                  { emoji: "🎮", label: "4 Games" },
                  { emoji: "⚡", label: "All Interactive" },
                  { emoji: "🧠", label: "Test Your Skills" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl mb-1">{stat.emoji}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeGame === "typer" && (
            <motion.div
              key="typer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CodeTyper />
            </motion.div>
          )}
          {activeGame === "memory" && (
            <motion.div
              key="memory"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <TechMemoryMatch />
            </motion.div>
          )}
          {activeGame === "bugs" && (
            <motion.div
              key="bugs"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <BugSquasher />
            </motion.div>
          )}
          {activeGame === "quiz" && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <TechQuiz />
            </motion.div>
          )}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-sm text-muted-foreground"
        >
          <p>
            Built by{" "}
            <Link to="/" className="text-primary hover:underline">
              Bhuvan G Sangappanavar
            </Link>{" "}
            — because portfolios should be fun 🎮
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Playground;
