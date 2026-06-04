import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectModal } from "./ProjectModal";
import { useAchievements } from "./Achievements";

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  features: string[];
  highlights: string[];
  architecture: {
    nodes: { name: string; description: string }[];
  };
}

const projects: Project[] = [
  {
    id: 1,
    title: "Freelancer Hub",
    description:
      "A full freelancer marketplace with secure payments, role-based access, and cloud storage — similar to Upwork/Fiverr.",
    longDescription:
      "A complete freelancer marketplace with role-based authentication, project posting, bidding, dispute handling, real-time chat, and an advanced admin dashboard. Integrated Razorpay for secure payments and AWS S3 for file uploads, project documents, and profile images. Built with clean architecture and scalable microservices.",
    tags: ["Next.js", "Node.js", "MongoDB", "Socket.io", "Razorpay", "AWS S3"],
    demoUrl: "https://freelancerhub-five.vercel.app/",
    githubUrl: "https://github.com/Bhuvangs04/Full-Stack-website",
    features: [
      "JWT Authentication & Role Based Access Control",
      "Razorpay payment integration with webhook validation",
      "AWS S3 for uploads (profile, project files, invoices)",
      "Real-time chat & notifications via Socket.io",
      "Advanced admin panel for dispute handling",
      "Microservices Architecture",
    ],
    highlights: [
      "JWT Authentication",
      "Role Based Access Control",
      "Razorpay Integration",
      "AWS S3 Storage",
      "MongoDB",
      "Microservices",
    ],
    architecture: {
      nodes: [
        { name: "React / Next.js", description: "Frontend with SSR & dynamic routing" },
        { name: "API Gateway", description: "Central routing & auth middleware" },
        { name: "Auth / Project / Payment Services", description: "Microservice architecture" },
        { name: "MongoDB + AWS S3", description: "Database & cloud file storage" },
      ],
    },
  },
  {
    id: 2,
    title: "Streamify",
    description:
      "A Netflix-style video streaming platform with subscription system, cloud-based media delivery, and secure auth.",
    longDescription:
      "A high-performance movie streaming platform with multiple user profiles, personalized recommendations, watchlists, and category filtering. Integrated AWS S3 for storing and delivering video assets efficiently. Includes admin panel for uploading films, managing metadata, and handling large media files.",
    tags: ["React", "Node.js", "MongoDB", "AWS S3", "Razorpay", "JWT"],
    demoUrl: "",
    githubUrl: "https://github.com/Bhuvangs04/Movie_Streaming_website",
    features: [
      "Video Streaming Platform with adaptive delivery",
      "Subscription System via Razorpay",
      "Secure Authentication with JWT",
      "AWS S3 for video storage & optimized streaming",
      "Watchlist, continue-watching, multi-profile support",
      "Admin content management dashboard",
    ],
    highlights: [
      "Video Streaming",
      "Subscription System",
      "Secure Authentication",
      "AWS S3",
      "Razorpay",
    ],
    architecture: {
      nodes: [
        { name: "React Frontend", description: "Responsive UI with video player" },
        { name: "Node.js Backend", description: "REST API with auth & streaming logic" },
        { name: "MongoDB", description: "User data, watchlists, metadata" },
        { name: "AWS S3", description: "Video storage & delivery" },
      ],
    },
  },
  {
    id: 3,
    title: "AI Backend Internship",
    description:
      "Production-grade RAG pipelines, semantic search, and real-time AI systems built during internship at Anivale.",
    longDescription:
      "Built production-grade AI and backend systems at Anivale. Developed RAG-based AI solutions with optimized context retrieval, improved model performance through fine-tuning & pruning, and built secure real-time chat architecture with encryption workflows. Implemented backend APIs and scalable service logic.",
    tags: ["FastAPI", "Python", "WebSockets", "MongoDB", "Docker", "RAG"],
    demoUrl: "",
    githubUrl: "",
    features: [
      "RAG Pipelines with optimized context retrieval",
      "Semantic Search with vector embeddings",
      "FastAPI backend services",
      "WebSocket real-time AI systems",
      "MongoDB query optimization",
      "Docker containerized workflows",
    ],
    highlights: [
      "RAG Pipelines",
      "Vector Embeddings",
      "Semantic Search",
      "FastAPI",
      "WebSockets",
      "MongoDB Optimization",
    ],
    architecture: {
      nodes: [
        { name: "Client / WebSocket", description: "Real-time AI interaction layer" },
        { name: "FastAPI Backend", description: "AI orchestration & REST APIs" },
        { name: "RAG Pipeline", description: "Vector embeddings & semantic search" },
        { name: "MongoDB", description: "Optimized document storage" },
      ],
    },
  },
  {
    id: 4,
    title: "Banking Management System",
    description:
      "A secure digital banking system with encrypted transactions, fund transfers, and admin monitoring.",
    longDescription:
      "A complete e-banking system built with Express and MySQL. Features encrypted accounts, secure transactions, fund transfers, and admin monitoring. Razorpay is integrated for deposit and utility payments. AWS S3 is used for KYC document storage.",
    tags: ["Java", "Spring Boot", "MySQL", "Razorpay", "AWS S3"],
    demoUrl: "",
    githubUrl: "https://github.com/Bhuvangs04/banking-system",
    features: [
      "Encrypted banking operations",
      "Razorpay for deposit/utility payments",
      "AWS S3 for KYC document storage",
      "Audit logs + fraud detection checks",
      "Admin dashboard for full monitoring",
    ],
    highlights: ["Java", "MySQL", "Encryption", "Razorpay", "AWS S3"],
    architecture: {
      nodes: [
        { name: "Java / Spring Boot", description: "Backend with security framework" },
        { name: "MySQL", description: "Relational data with transactions" },
        { name: "Razorpay + AWS S3", description: "Payments & document storage" },
      ],
    },
  },
];

export { projects };

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { unlock } = useAchievements();

  return (
    <>
      <section id="projects" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-10" />

        <div className="container mx-auto px-4 relative z-10" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Production systems built with real engineering decisions
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                whileHover={{ y: -6 }}
                className="glass rounded-2xl overflow-hidden cursor-pointer group relative"
                onClick={() => {
                  unlock("project_click");
                  setSelectedProject(project);
                }}
              >
                {/* Top accent gradient */}
                <div className="h-1 w-full bg-gradient-to-r from-primary to-secondary" />

                <div className="p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="ml-4 mt-1">
                      <Zap className="w-5 h-5 text-primary/50 group-hover:text-primary transition-colors" />
                    </div>
                  </div>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-xs px-3 py-1.5 rounded-full bg-primary/8 text-primary/80 border border-primary/10"
                      >
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* Architecture Preview */}
                  <div className="glass rounded-xl p-4 mb-6">
                    <p className="text-xs text-muted-foreground mb-3 uppercase tracking-wider font-medium">
                      Architecture
                    </p>
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      {project.architecture.nodes.map((node, i) => (
                        <div key={node.name} className="flex items-center gap-2">
                          <span className="text-xs font-mono text-primary/70 bg-primary/5 px-2 py-1 rounded">
                            {node.name}
                          </span>
                          {i < project.architecture.nodes.length - 1 && (
                            <span className="text-primary/30">→</span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3">
                    {project.demoUrl && (
                      <Button
                        size="sm"
                        className="flex-1 bg-primary/10 hover:bg-primary/20 text-primary border-0"
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(project.demoUrl, "_blank");
                        }}
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Try It
                      </Button>
                    )}
                    {project.githubUrl && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-muted-foreground/20"
                        onClick={(e) => {
                          e.stopPropagation();
                          unlock("github_visit");
                          window.open(project.githubUrl, "_blank");
                        }}
                      >
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                    )}
                    {!project.demoUrl && !project.githubUrl && (
                      <span className="text-xs text-muted-foreground italic">
                        Private / NDA project
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="section-divider mt-20" />
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};
