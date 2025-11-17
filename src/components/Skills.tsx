import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Palette,
  Database,
  Smartphone,
  Cloud,
  GitBranch,
} from "lucide-react";

const skillCategories = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "Node.js / Express", level: 90 },
      { name: "TypeScript", level: 90 },
      { name: "Microservices", level: 85 },
    ],
  },
  {
    icon: Database,
    title: "Backend & Databases",
    skills: [
      { name: "PostgreSQL", level: 90 },
      { name: "MongoDB", level: 85 },
      { name: "Redis", level: 80 },
      { name: "REST / GraphQL APIs", level: 90 },
    ],
  },
  {
    icon: Palette,
    title: "AI & Machine Learning",
    skills: [
      { name: "Python", level: 85 },
      { name: "LSTM / Transformers", level: 80 },
      { name: "Model Training", level: 80 },
      { name: "AI Integration", level: 85 },
    ],
  },
  {
    icon: Smartphone,
    title: "Mobile & Cross-Platform",
    skills: [
      { name: "React Native", level: 85 },
      { name: "Expo", level: 80 },
      { name: "API Integration", level: 90 },
      { name: "Optimized UI", level: 80 },
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    skills: [
      { name: "AWS / GCP", level: 85 },
      { name: "Docker", level: 90 },
      { name: "CI/CD Pipelines", level: 85 },
      { name: "Scalable Deployments", level: 90 },
    ],
  },
  {
    icon: GitBranch,
    title: "Tools & Engineering",
    skills: [
      { name: "Git / GitHub", level: 95 },
      { name: "VS Code", level: 95 },
      { name: "System Design", level: 85 },
      { name: "Agile Development", level: 85 },
    ],
  },
];


const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : {}}
          transition={{ duration: 1, delay, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full"
        />
      </div>
    </div>
  );
};

export const Skills = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
            My <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A solid engineering stack for building AI-powered, cloud-ready applications.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
              className="glass rounded-2xl p-6 hover-lift"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <category.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={categoryIndex * 0.1 + skillIndex * 0.1}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Tech Stack Icons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-muted-foreground mb-6">
            Core technologies I use to build scalable, intelligent systems
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              "React",
              "Next.js",
              "Node.js",
              "TypeScript",
              "MongoDB",
              "PostgreSQL",
              "AWS",
              "Docker",
              "Redis",
              "Python",
              "Java",
              "Render",
              "Vercel"
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.9 + index * 0.05 }}
                whileHover={{ scale: 1.1, y: -4 }}
                className="glass px-6 py-3 rounded-full text-sm font-medium"
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
