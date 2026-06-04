import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Rocket, BookOpen, Code2, Cpu, Globe, Sparkles } from "lucide-react";

const currentItems = [
  {
    icon: Rocket,
    label: "Building",
    value: "Production-grade portfolio with React & TypeScript",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: BookOpen,
    label: "Learning",
    value: "System Design & Distributed Systems",
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
  {
    icon: Code2,
    label: "Practicing",
    value: "DSA — 150+ LeetCode problems solved",
    color: "text-amber-400",
    bgColor: "bg-amber-400/10",
  },
  {
    icon: Cpu,
    label: "Exploring",
    value: "Advanced RAG patterns & AI agents",
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
  },
  {
    icon: Globe,
    label: "Open to",
    value: "Backend / Full-Stack / AI roles & collaboration",
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    icon: Sparkles,
    label: "Excited about",
    value: "Building tools that solve real problems",
    color: "text-pink-400",
    bgColor: "bg-pink-400/10",
  },
];

export const CurrentlyDoing = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="currently" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-15" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400" />
            </span>
            <span className="text-xs font-medium text-muted-foreground">
              Live Status · Updated June 2026
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            What I'm <span className="gradient-text">Up To</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A live snapshot of what I'm currently building, learning, and exploring
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {currentItems.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass rounded-2xl p-5 group"
            >
              <div className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-xl ${item.bgColor} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                </div>
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${item.color} mb-1`}>
                    {item.label}
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
};
