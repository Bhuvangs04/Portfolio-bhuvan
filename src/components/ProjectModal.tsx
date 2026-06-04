import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Check, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Project } from "./Projects";
import { useState } from "react";
import { useAchievements } from "./Achievements";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ArchNode = ({
  node,
  index,
  total,
}: {
  node: { name: string; description: string };
  index: number;
  total: number;
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.15 }}
        className="arch-node rounded-xl px-6 py-4 cursor-pointer w-full max-w-xs text-center"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center justify-center gap-2">
          <span className="font-mono text-sm font-semibold text-primary">
            {node.name}
          </span>
          {expanded ? (
            <ChevronUp className="w-3.5 h-3.5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
          )}
        </div>
        <AnimatePresence>
          {expanded && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="text-xs text-muted-foreground mt-2"
            >
              {node.description}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>

      {index < total - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: index * 0.15 + 0.1 }}
          className="arch-connector h-8 origin-top"
        />
      )}
    </div>
  );
};

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
  if (!project) return null;
  const { unlock } = useAchievements();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/85 backdrop-blur-md z-[80]"
          />

          {/* Modal Wrapper for Centering */}
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-6 pointer-events-none">
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-4xl glass-strong rounded-2xl overflow-hidden flex flex-col max-h-[85vh] pointer-events-auto shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-primary/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Content */}
              <div className="overflow-y-auto flex-1 p-6 md:p-8 space-y-8">
                {/* Header */}
                <div>
                  <div className="h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded mb-6" />
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    {project.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm px-4 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/10"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.longDescription}
                  </p>
                </div>

                {/* Architecture Diagram */}
                <div>
                  <h3 className="text-xl font-semibold mb-5 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary" />
                    System Architecture
                  </h3>
                  <div className="glass rounded-xl p-6 flex flex-col items-center">
                    {project.architecture.nodes.map((node, i) => (
                      <ArchNode
                        key={node.name}
                        node={node}
                        index={i}
                        total={project.architecture.nodes.length}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground text-center mt-3">
                    Click each node to see details
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    Key Features
                  </h3>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-start gap-3"
                      >
                        <div className="mt-0.5 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-muted-foreground text-sm">
                          {feature}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  {project.demoUrl && (
                    <Button
                      size="lg"
                      className="flex-1 bg-primary hover:bg-primary/90"
                      onClick={() => window.open(project.demoUrl, "_blank")}
                    >
                      <ExternalLink className="w-5 h-5 mr-2" />
                      View Live Demo
                    </Button>
                  )}
                  {project.githubUrl && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="flex-1 border-muted-foreground/20"
                      onClick={() => {
                        unlock("github_visit");
                        window.open(project.githubUrl, "_blank");
                      }}
                    >
                      <Github className="w-5 h-5 mr-2" />
                      View on GitHub
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
