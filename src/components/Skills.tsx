import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface SkillEvidence {
  name: string;
  icon: string;
  projects: string[];
  color: string;
}

const skills: SkillEvidence[] = [
  {
    name: "Node.js / Express",
    icon: "🟢",
    projects: ["Freelancer Hub", "Streamify"],
    color: "from-green-500/20 to-green-500/5",
  },
  {
    name: "MongoDB",
    icon: "🍃",
    projects: ["Freelancer Hub", "Streamify", "AI Internship"],
    color: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    name: "FastAPI / Python",
    icon: "🐍",
    projects: ["RAG Backend", "AI Internship"],
    color: "from-yellow-500/20 to-yellow-500/5",
  },
  {
    name: "AWS (S3 / Cloud)",
    icon: "☁️",
    projects: ["Freelancer Hub", "Streamify", "Banking System"],
    color: "from-orange-500/20 to-orange-500/5",
  },
  {
    name: "React / Next.js",
    icon: "⚛️",
    projects: ["Freelancer Hub", "Streamify", "Portfolio"],
    color: "from-cyan-500/20 to-cyan-500/5",
  },
  {
    name: "Java / Spring Boot",
    icon: "☕",
    projects: ["Banking System"],
    color: "from-red-500/20 to-red-500/5",
  },
  {
    name: "Docker",
    icon: "🐳",
    projects: ["AI Internship", "Backend Services"],
    color: "from-blue-500/20 to-blue-500/5",
  },
  {
    name: "WebSockets",
    icon: "🔌",
    projects: ["Freelancer Hub", "AI Real-time Systems"],
    color: "from-purple-500/20 to-purple-500/5",
  },
  {
    name: "Razorpay / Payments",
    icon: "💳",
    projects: ["Freelancer Hub", "Streamify", "Banking System"],
    color: "from-indigo-500/20 to-indigo-500/5",
  },
  {
    name: "MySQL",
    icon: "🗄️",
    projects: ["Banking System"],
    color: "from-sky-500/20 to-sky-500/5",
  },
  {
    name: "RAG / Vector Embeddings",
    icon: "🧠",
    projects: ["AI Internship"],
    color: "from-pink-500/20 to-pink-500/5",
  },
  {
    name: "Git / GitHub",
    icon: "🔀",
    projects: ["All Projects"],
    color: "from-gray-500/20 to-gray-500/5",
  },
];

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Skill <span className="gradient-text">Evidence</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every skill backed by real projects — not progress bars
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass rounded-2xl p-5 cursor-default group"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">{skill.icon}</span>
                <h3 className="font-semibold text-sm group-hover:text-primary transition-colors">
                  {skill.name}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {skill.projects.map((proj) => (
                  <span
                    key={proj}
                    className="evidence-badge text-xs px-2.5 py-1 rounded-full"
                  >
                    {proj}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
};
