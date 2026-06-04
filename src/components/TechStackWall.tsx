import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const technologies = [
  { name: "Java", icon: "☕", context: "Banking System, OOP, DSA", tier: "core" },
  { name: "Python", icon: "🐍", context: "FastAPI, AI/ML, Scripting", tier: "core" },
  { name: "Node.js", icon: "🟢", context: "Backend for Freelancer Hub, Streamify", tier: "core" },
  { name: "React", icon: "⚛️", context: "All frontend projects", tier: "core" },
  { name: "MongoDB", icon: "🍃", context: "NoSQL, Aggregation, Indexing", tier: "core" },
  { name: "FastAPI", icon: "⚡", context: "RAG Backend, AI Services", tier: "specialized" },
  { name: "Docker", icon: "🐳", context: "Containerized deployments", tier: "devops" },
  { name: "AWS", icon: "☁️", context: "S3 storage, Cloud infra", tier: "devops" },
  { name: "Git", icon: "🔀", context: "Version control, CI/CD", tier: "devops" },
  { name: "MySQL", icon: "🗄️", context: "Banking System, RDBMS", tier: "core" },
  { name: "WebSocket", icon: "🔌", context: "Real-time chat & AI streaming", tier: "specialized" },
  { name: "Next.js", icon: "▲", context: "Freelancer Hub SSR", tier: "core" },
  { name: "TypeScript", icon: "📘", context: "Type-safe React & Node.js", tier: "core" },
  { name: "Razorpay", icon: "💳", context: "Payment integration", tier: "specialized" },
  { name: "Socket.io", icon: "📡", context: "Real-time notifications", tier: "specialized" },
];

const floatClasses = ["float-slow", "float-medium", "float-fast"];

export const TechStackWall = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="tech-stack" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-15" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Tech <span className="gradient-text">Stack</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            The tools I use to turn ideas into production systems
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 max-w-5xl mx-auto">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.04 }}
              whileHover={{ scale: 1.12, y: -6 }}
              className={`glass rounded-2xl px-5 py-4 cursor-default group relative ${
                isInView ? floatClasses[index % floatClasses.length] : ""
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{tech.icon}</span>
                <span className="font-semibold text-sm">{tech.name}</span>
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-4 py-2 glass-strong rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap z-20">
                <p className="text-xs text-muted-foreground">{tech.context}</p>
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 glass-strong -mt-1" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
};
