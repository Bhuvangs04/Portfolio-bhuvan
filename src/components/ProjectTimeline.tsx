import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";

interface TimelineEntry {
  year: string;
  title: string;
  type: "project" | "internship" | "upcoming";
  description: string;
  details: string;
  tags: string[];
}

const timelineData: TimelineEntry[] = [
  {
    year: "2024",
    title: "Streamify — Movie Streaming Platform",
    type: "project",
    description: "Built a Netflix-style streaming platform with subscriptions and cloud media.",
    details:
      "Designed and developed a full video streaming platform with multiple profiles, subscription management via Razorpay, and AWS S3-powered video delivery. Implemented watchlists, continue-watching, and admin content management.",
    tags: ["React", "Node.js", "MongoDB", "AWS S3", "Razorpay"],
  },
  {
    year: "2024",
    title: "Banking Management System",
    type: "project",
    description: "Secure digital banking system with encrypted transactions and admin monitoring.",
    details:
      "Built an e-banking system with Java/Spring Boot and MySQL. Features encrypted accounts, fund transfers, Razorpay for deposits, AWS S3 for KYC documents, and comprehensive audit logging.",
    tags: ["Java", "Spring Boot", "MySQL", "Razorpay"],
  },
  {
    year: "2025",
    title: "Freelancer Hub — Marketplace Platform",
    type: "project",
    description: "Full freelancer marketplace with payments, RBAC, and cloud storage.",
    details:
      "Complete freelancer marketplace with role-based authentication, project bidding, dispute handling, real-time chat via Socket.io, Razorpay payments, and AWS S3 uploads. Built with clean microservice architecture.",
    tags: ["Next.js", "Node.js", "MongoDB", "Socket.io", "Razorpay", "AWS S3"],
  },
  {
    year: "2025",
    title: "AI / Backend Internship @ Anivale",
    type: "internship",
    description: "Production-grade RAG pipelines, semantic search, and real-time AI systems.",
    details:
      "Built RAG-based AI solutions with optimized context retrieval, implemented semantic search with vector embeddings, developed FastAPI backend services, built real-time WebSocket chat architecture, and optimized MongoDB queries for AI workloads.",
    tags: ["FastAPI", "Python", "RAG", "WebSockets", "MongoDB", "Docker"],
  },
  {
    year: "2026",
    title: "What's Next?",
    type: "upcoming",
    description: "New projects, open source contributions, and deeper into distributed systems.",
    details:
      "Exploring advanced backend patterns, contributing to open source, and building more production-grade systems. Stay tuned.",
    tags: ["Open Source", "Distributed Systems", "Cloud Native"],
  },
];

const typeColors = {
  project: {
    dot: "bg-primary",
    shadow: "shadow-[0_0_12px_rgba(59,130,246,0.5)]",
    badge: "bg-primary/10 text-primary border-primary/20",
  },
  internship: {
    dot: "bg-secondary",
    shadow: "shadow-[0_0_12px_rgba(6,182,212,0.5)]",
    badge: "bg-secondary/10 text-secondary border-secondary/20",
  },
  upcoming: {
    dot: "bg-muted-foreground",
    shadow: "shadow-[0_0_12px_rgba(148,163,184,0.3)]",
    badge: "bg-muted text-muted-foreground border-muted-foreground/20",
  },
};

export const ProjectTimeline = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <section id="timeline" className="py-24 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Growth <span className="gradient-text">Timeline</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From first projects to production AI — a journey in code
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 origin-top"
            style={{
              background: "linear-gradient(180deg, #3B82F6, #06B6D4, #3B82F6)",
            }}
          />

          {timelineData.map((entry, index) => {
            const isLeft = index % 2 === 0;
            const isExpanded = expandedIndex === index;
            const colors = typeColors[entry.type];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-start mb-12 ${
                  isLeft ? "md:flex-row" : "md:flex-row-reverse"
                } flex-row`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10">
                  <div className={`w-4 h-4 rounded-full ${colors.dot} ${colors.shadow}`} />
                </div>

                {/* Year Label */}
                <div
                  className={`hidden md:flex w-1/2 ${
                    isLeft ? "justify-end pr-10" : "justify-start pl-10"
                  } items-start pt-1`}
                >
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span className="font-mono text-sm font-semibold">{entry.year}</span>
                  </div>
                </div>

                {/* Card */}
                <div
                  className={`ml-14 md:ml-0 md:w-1/2 ${
                    isLeft ? "md:pr-10" : "md:pl-10"
                  }`}
                >
                  <motion.div
                    whileHover={{ y: -3 }}
                    className="glass rounded-2xl p-5 cursor-pointer"
                    onClick={() =>
                      setExpandedIndex(isExpanded ? null : index)
                    }
                  >
                    {/* Mobile year */}
                    <div className="flex items-center gap-2 mb-2 md:hidden">
                      <Calendar className="w-3.5 h-3.5 text-muted-foreground" />
                      <span className="font-mono text-xs text-muted-foreground">
                        {entry.year}
                      </span>
                    </div>

                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-lg font-bold leading-tight">
                        {entry.title}
                      </h3>
                      {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-1" />
                      )}
                    </div>

                    <span
                      className={`inline-block text-xs px-2.5 py-1 rounded-full border mb-3 ${colors.badge}`}
                    >
                      {entry.type === "internship"
                        ? "Internship"
                        : entry.type === "upcoming"
                        ? "Coming Soon"
                        : "Project"}
                    </span>

                    <p className="text-sm text-muted-foreground">
                      {entry.description}
                    </p>

                    {/* Expanded Details */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t border-border"
                      >
                        <p className="text-sm text-muted-foreground mb-3">
                          {entry.details}
                        </p>
                        <div className="flex flex-wrap gap-1.5">
                          {entry.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary/80"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
};
