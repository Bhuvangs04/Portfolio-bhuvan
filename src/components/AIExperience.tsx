import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Search, Cpu, Zap, MessageSquare, Database } from "lucide-react";

const aiCapabilities = [
  {
    icon: Brain,
    title: "RAG Pipelines",
    description:
      "Built production-grade Retrieval-Augmented Generation pipelines with optimized context retrieval and chunking strategies.",
    status: "Production",
  },
  {
    icon: Search,
    title: "Semantic Search",
    description:
      "Implemented semantic search with vector embeddings for intelligent document retrieval beyond keyword matching.",
    status: "Production",
  },
  {
    icon: Cpu,
    title: "Vector Embeddings",
    description:
      "Engineered embedding pipelines for transforming unstructured data into searchable vector representations.",
    status: "Production",
  },
  {
    icon: Zap,
    title: "FastAPI Backend",
    description:
      "Developed high-performance async API services with FastAPI for AI model serving and orchestration.",
    status: "Production",
  },
  {
    icon: MessageSquare,
    title: "Real-time AI (WebSockets)",
    description:
      "Built real-time AI interaction layers using WebSockets for streaming responses and live chat systems.",
    status: "Production",
  },
  {
    icon: Database,
    title: "MongoDB Optimization",
    description:
      "Optimized MongoDB queries and indexing strategies for AI workloads with large document collections.",
    status: "Production",
  },
];

export const AIExperience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="ai-experience" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-15" />

      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-[120px]" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            AI <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-6">
            Production AI systems built during my internship
          </p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-3 glass px-6 py-3 rounded-full"
          >
            <div className="w-2.5 h-2.5 rounded-full bg-secondary animate-pulse" />
            <span className="text-sm font-medium">
              AI / Backend Developer Intern @{" "}
              <span className="text-secondary font-semibold">Anivale</span>
            </span>
          </motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {aiCapabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="glass rounded-2xl p-6 group relative overflow-hidden"
            >
              {/* Subtle gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                    <cap.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-full bg-secondary/10 text-secondary border border-secondary/20">
                    ✓ {cap.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold mb-2 group-hover:text-secondary transition-colors">
                  {cap.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {cap.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
};
