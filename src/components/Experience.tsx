import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, GraduationCap } from "lucide-react";

const experiences = [
  {
    type: "work",
    title: "Software Developer Intern (AI + Backend)",
    company: "Anivale",
    period: "Aug 2025 — Nov 2025",
    description:
      "Worked on production-grade AI and backend systems. Built intelligent pipelines, optimized models, designed secure messaging flows, and contributed to multiple core services.",
    achievements: [
      "Developed RAG-based AI solutions with optimized context retrieval",
      "Improved model performance and latency through fine-tuning & pruning",
      "Built secure real-time chat architecture with encryption workflows",
      "Implemented backend APIs and scalable service logic",
    ],
  },
  {
    type: "work",
    title: "Full Stack Developer Intern",
    company: "College 2rd-Year Internship",
    period: "Dec 2024 — Feb 2025",
    description:
      "Built a complete full-stack web application during the internship period, handling frontend, backend, database design, authentication, and deployment.",
    achievements: [
      "Designed and deployed a full-stack project from scratch",
      "Implemented API authentication, CRUD logic, and DB schemas",
      "Optimized frontend performance with React",
      "Integrated cloud services for storage and hosting",
    ],
  },
  {
    type: "education",
    title: "Bachelor of Technology in Computer Science",
    company: "RV University",
    period: "2023-2027",
    description:
      "Focused on full-stack development, AI fundamentals, software engineering, and system design.",
    achievements: [
      "Built multiple major projects (AI, cloud, full-stack)",
      "Led project teams and mentoring juniors",
      "Active contributor in coding events and hackathons",
    ],
  },
];


export const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-24 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Education and professional experience that shaped my career
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          {/* Timeline Line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border" />

          {/* Timeline Items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-background" />
                </div>

                {/* Content Card */}
                <div className={`w-full md:w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:pr-12 pl-20 md:pl-0" : "md:pl-12 pl-20 md:pr-0"
                }`}>
                  <div className="glass rounded-2xl p-6 hover-lift">
                    {/* Icon and Period */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-lg ${
                        exp.type === "work" ? "bg-primary/10" : "bg-secondary/10"
                      } flex items-center justify-center`}>
                        {exp.type === "work" ? (
                          <Briefcase className={`w-5 h-5 ${
                            exp.type === "work" ? "text-primary" : "text-secondary"
                          }`} />
                        ) : (
                          <GraduationCap className="w-5 h-5 text-secondary" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>

                    {/* Title and Company */}
                    <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                    <p className="text-primary font-medium mb-3">{exp.company}</p>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-4">
                      {exp.description}
                    </p>

                    {/* Achievements */}
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, i) => (
                        <li
                          key={i}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-primary mt-1">▪</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
