import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectModal } from "./ProjectModal";

export interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  demoUrl: string;
  githubUrl: string;
  features: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "Freelancer Marketplace Platform",
    description: "A full freelancer marketplace with secure payments and cloud storage.",
    longDescription:
      "A complete freelancer marketplace similar to Upwork/Fiverr. The platform includes role-based authentication, project posting, bidding, dispute handling, real-time chat, and an advanced admin dashboard. Integrated Razorpay for secure payments and AWS S3 for file uploads, project documents, and profile images. Built with clean architecture and scalable backend services.",
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800",
    tags: ["Next.js", "Node.js", "MongoDB", "Socket.io", "Razorpay", "AWS S3"],
    demoUrl: "https://freelancerhub-five.vercel.app/",
    githubUrl: "https://github.com/Bhuvangs04/Full-Stack-website",
    features: [
      "Razorpay payment integration (secure checkout + webhook validation)",
      "AWS S3 for uploads (profile, project files, invoices)",
      "Freelancer & client workflows",
      "Real-time chat & notifications",
      "Advanced admin panel for dispute handling",
    ],
  },
  {
    id: 2,
    title: "Movie Streaming Website",
    description: "A Netflix-style streaming site with cloud-based media delivery.",
    longDescription:
      "A high-performance movie streaming platform with multiple user profiles, personalized recommendations, watchlists, and category filtering. Integrated AWS S3 for storing and delivering video assets efficiently. Includes admin panel for uploading films, managing metadata, and handling large media files.",
    image: "https://images.unsplash.com/photo-1600267175160-3c3d1c3e2c42?w=800",
    tags: ["React", "Node.js", "AWS S3", "TMDB API", "JWT"],
    demoUrl: "",
    githubUrl: "https://github.com/Bhuvangs04/Movie_Streaming_website",
    features: [
      "AWS S3 for video storage & optimized streaming",
      "Watchlist, continue-watching, multi-profile support",
      "Admin content management",
      "Responsive UI",
      "Secure authentication",
    ],
  },
  {
    id: 3,
    title: "Banking Management System",
    description: "A secure digital banking system with encrypted transactions.",
    longDescription:
      "A complete e-banking system built with Express and MySQL. Features  encrypted accounts, secure transactions, fund transfers, and admin monitoring. Razorpay is integrated for certain payment flows such as deposits and recurring utility payments. AWS S3 is used for secure document storage (KYC documents, statements, logs).",
    image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800",
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
  },
  {
    id: 4,
    title: "Lost & Found Mobile App",
    description: "A real-time lost & found app with cloud storage and smart alerts.",
    longDescription:
      "A mobile-first lost & found platform for students. Users can post items with images, track locations, chat with owners, and receive auto-match alerts. Uses AWS S3 to store images and Razorpay for optional premium visibility boosts. Includes real-time messaging, push notifications, and college email OTP login.",
    image: "https://images.unsplash.com/photo-1523475496153-3d6cc00f29db?w=800",
    tags: ["React Native", "Node.js", "MongoDB", "AWS S3", "Razorpay"],
    demoUrl: "https://example.com",
    githubUrl: "https://github.com/Bhuvangs04/Lost-found-App-backend",
    features: [
      "College email OTP login",
      "AWS S3 image uploads",
      "Real-time chat + notifications",
      "Auto-match suggestions for items",
      "Optional Razorpay premium boosts for listing visibility",
    ],
  },
];


export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
              A selection of my recent work and personal projects
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="glass rounded-2xl overflow-hidden hover-lift cursor-pointer group"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.demoUrl, "_blank");
                      }}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Demo
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        window.open(project.githubUrl, "_blank");
                      }}
                    >
                      <Github className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
};
