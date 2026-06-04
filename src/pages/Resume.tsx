import { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAchievements } from "@/components/Achievements";
import {
  ArrowLeft,
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  GraduationCap,
  Briefcase,
  Code2,
  Award,
  ExternalLink,
} from "lucide-react";
import { CustomCursor } from "@/components/CustomCursor";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const ResumePage = () => {
  const { unlock } = useAchievements();
  useEffect(() => {
    unlock("resume_dl");
  }, [unlock]);

  return (
    <div className="min-h-screen bg-background relative">
      <CustomCursor />
      <div className="fixed inset-0 grid-pattern opacity-15 pointer-events-none" />

      <div className="container mx-auto px-4 py-8 relative z-10 max-w-4xl">
        {/* Top Bar */}
        <motion.div
          {...fadeUp}
          className="flex items-center justify-between mb-10"
        >
          <Link
            to="/"
            className="glass p-2.5 rounded-xl hover:bg-primary/10 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <a
            href="https://drive.google.com/file/d/1YUODRsahCjnh1qbuNsDLLJEh2GULg2ne/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </a>
        </motion.div>

        {/* Resume Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-strong rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Header */}
          <div className="relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20" />
            <div className="absolute inset-0 dot-pattern opacity-20" />
            <div className="relative px-8 md:px-12 py-10">
              <motion.div {...fadeUp} transition={{ delay: 0.2 }}>
                <h1 className="text-4xl md:text-5xl font-black mb-2">
                  Bhuvan G <span className="gradient-text">Sangappanavar</span>
                </h1>
                <p className="text-xl text-muted-foreground font-medium mb-6">
                  Backend Engineer · Full Stack Developer · AI Developer
                </p>

                <div className="flex flex-wrap gap-4 text-sm">
                  {[
                    { icon: Mail, text: "bhuvangs2004@gmail.com", href: "mailto:bhuvangs2004@gmail.com" },
                    { icon: Phone, text: "+91 6362371070", href: "tel:+916362371070" },
                    { icon: MapPin, text: "Bangalore, India", href: "#" },
                    { icon: Github, text: "Bhuvangs04", href: "https://github.com/Bhuvangs04" },
                    { icon: Linkedin, text: "LinkedIn", href: "https://www.linkedin.com/in/bhuvan-g-sangappanavar-403a022a2/" },
                  ].map((item) => (
                    <a
                      key={item.text}
                      href={item.href}
                      target={item.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                    >
                      <item.icon className="w-3.5 h-3.5" />
                      {item.text}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          <div className="px-8 md:px-12 py-8 space-y-10">
            {/* Summary */}
            <motion.section {...fadeUp} transition={{ delay: 0.3 }}>
              <p className="text-muted-foreground leading-relaxed">
                Backend-focused engineer with production experience building scalable applications,
                real-time systems, and AI-powered products. Proficient in Node.js, FastAPI, React,
                MongoDB, and AWS. Built 4+ full-stack projects with payment integration, authentication,
                cloud storage, and microservices architecture. AI/Backend intern with hands-on RAG pipeline
                and semantic search experience.
              </p>
            </motion.section>

            {/* Experience */}
            <motion.section {...fadeUp} transition={{ delay: 0.35 }}>
              <div className="flex items-center gap-2 mb-6">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-bold">Experience</h2>
              </div>

              <div className="glass rounded-2xl p-6">
                <div className="flex items-start justify-between flex-wrap gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold">AI / Backend Developer Intern</h3>
                    <p className="text-primary font-medium">Anivale</p>
                  </div>
                  <span className="text-sm text-muted-foreground font-mono">2025</span>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Built production-grade RAG pipelines with optimized context retrieval and chunking strategies",
                    "Implemented semantic search with vector embeddings for intelligent document retrieval",
                    "Developed high-performance async API services with FastAPI for AI model serving",
                    "Built real-time AI interaction layers using WebSockets for streaming responses",
                    "Optimized MongoDB queries and indexing for AI workloads with large document collections",
                    "Implemented Docker-containerized workflows for reproducible AI deployments",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-1.5 w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.section>

            {/* Projects */}
            <motion.section {...fadeUp} transition={{ delay: 0.4 }}>
              <div className="flex items-center gap-2 mb-6">
                <Code2 className="w-5 h-5 text-secondary" />
                <h2 className="text-xl font-bold">Featured Projects</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    name: "Freelancer Hub",
                    tech: "Next.js · Node.js · MongoDB · Socket.io · Razorpay · AWS S3",
                    points: [
                      "Full marketplace with JWT auth, RBAC, real-time chat, and dispute handling",
                      "Razorpay payment integration with webhook validation",
                      "AWS S3 for file uploads, microservices architecture",
                    ],
                    links: { demo: "https://freelancerhub-five.vercel.app/", github: "https://github.com/Bhuvangs04/Full-Stack-website" },
                  },
                  {
                    name: "Streamify",
                    tech: "React · Node.js · MongoDB · AWS S3 · Razorpay · JWT",
                    points: [
                      "Netflix-style video streaming with subscription system",
                      "AWS S3 for video storage and optimized delivery",
                      "Multi-profile support, watchlists, and admin CMS",
                    ],
                    links: { github: "https://github.com/Bhuvangs04/Movie_Streaming_website" },
                  },
                  {
                    name: "Banking Management System",
                    tech: "Java · Spring Boot · MySQL · Razorpay · AWS S3",
                    points: [
                      "Secure e-banking with encrypted accounts and fund transfers",
                      "Razorpay for deposits, AWS S3 for KYC documents",
                      "Audit logs and fraud detection capabilities",
                    ],
                    links: { github: "https://github.com/Bhuvangs04/banking-system" },
                  },
                ].map((project) => (
                  <div key={project.name} className="glass rounded-2xl p-5">
                    <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                      <div>
                        <h3 className="font-bold">{project.name}</h3>
                        <p className="text-xs text-primary/70 font-mono">{project.tech}</p>
                      </div>
                      <div className="flex gap-2">
                        {project.links.demo && (
                          <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <ExternalLink className="w-3 h-3" /> Demo
                          </a>
                        )}
                        {project.links.github && (
                          <a
                            href={project.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Github className="w-3 h-3" /> Code
                          </a>
                        )}
                      </div>
                    </div>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      {project.points.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-secondary mt-1.5 w-1 h-1 rounded-full bg-secondary flex-shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Skills */}
            <motion.section {...fadeUp} transition={{ delay: 0.45 }}>
              <div className="flex items-center gap-2 mb-6">
                <Award className="w-5 h-5 text-amber-400" />
                <h2 className="text-xl font-bold">Technical Skills</h2>
              </div>

              <div className="glass rounded-2xl p-6 space-y-4">
                {[
                  { category: "Languages", items: "Java, Python, JavaScript, TypeScript" },
                  { category: "Backend", items: "Node.js, Express, FastAPI, Spring Boot" },
                  { category: "Frontend", items: "React, Next.js, Tailwind CSS" },
                  { category: "Databases", items: "MongoDB, MySQL" },
                  { category: "Cloud & DevOps", items: "AWS S3, Docker, CI/CD, Vercel" },
                  { category: "AI / ML", items: "RAG Pipelines, Vector Embeddings, Semantic Search" },
                  { category: "Real-time", items: "WebSockets, Socket.io" },
                  { category: "Payments", items: "Razorpay Integration" },
                  { category: "Tools", items: "Git, GitHub, VS Code, Postman, Figma" },
                ].map((skill) => (
                  <div key={skill.category} className="flex items-start gap-3">
                    <span className="text-xs font-semibold text-primary w-28 flex-shrink-0 pt-0.5">
                      {skill.category}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {skill.items}
                    </span>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Education */}
            <motion.section {...fadeUp} transition={{ delay: 0.5 }}>
              <div className="flex items-center gap-2 mb-6">
                <GraduationCap className="w-5 h-5 text-emerald-400" />
                <h2 className="text-xl font-bold">Education</h2>
              </div>

              <div className="glass rounded-2xl p-6">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <h3 className="font-bold">Bachelor of Engineering</h3>
                    <p className="text-sm text-muted-foreground">Computer Science & Engineering</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-primary font-bold">CGPA: 8.06</span>
                    <p className="text-xs text-muted-foreground">Bangalore, India</p>
                  </div>
                </div>
              </div>
            </motion.section>
          </div>

          {/* Footer */}
          <div className="px-8 md:px-12 py-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Built with React, TypeScript & ❤️ ·{" "}
              <Link to="/" className="text-primary hover:underline">
                View full portfolio
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResumePage;
