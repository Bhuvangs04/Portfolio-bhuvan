import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Database, Globe, Cloud, Radio } from "lucide-react";

const expertiseAreas = [
  {
    icon: Shield,
    category: "Authentication & Security",
    items: ["JWT Tokens", "RBAC", "Session Management", "Encryption"],
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
  },
  {
    icon: Database,
    category: "Databases",
    items: ["MongoDB", "MySQL", "Query Optimization", "Indexing"],
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
    borderColor: "border-emerald-400/20",
  },
  {
    icon: Globe,
    category: "APIs & Services",
    items: ["REST APIs", "FastAPI", "Express.js", "Microservices"],
    color: "text-cyan-400",
    bgColor: "bg-cyan-400/10",
    borderColor: "border-cyan-400/20",
  },
  {
    icon: Cloud,
    category: "Cloud & DevOps",
    items: ["AWS S3", "Docker", "CI/CD", "Deployment"],
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/20",
  },
  {
    icon: Radio,
    category: "Real-time Systems",
    items: ["WebSockets", "Socket.io", "Event-Driven", "Streaming"],
    color: "text-purple-400",
    bgColor: "bg-purple-400/10",
    borderColor: "border-purple-400/20",
  },
];

export const BackendExpertise = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="backend-expertise" className="py-24 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Backend <span className="gradient-text">Expertise</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A visual roadmap of backend engineering domains I've worked in
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {expertiseAreas.map((area, areaIndex) => (
            <motion.div
              key={area.category}
              initial={{ opacity: 0, x: areaIndex % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: areaIndex * 0.12 }}
              className="glass rounded-2xl p-6 group hover-lift"
            >
              <div className="flex items-center gap-4 mb-5">
                <div className={`w-12 h-12 rounded-xl ${area.bgColor} flex items-center justify-center`}>
                  <area.icon className={`w-6 h-6 ${area.color}`} />
                </div>
                <h3 className="text-xl font-bold">{area.category}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {area.items.map((item, itemIndex) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: areaIndex * 0.12 + itemIndex * 0.08,
                    }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${area.borderColor} ${area.bgColor}`}
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : {}}
                      transition={{
                        type: "spring",
                        delay: areaIndex * 0.12 + itemIndex * 0.08 + 0.2,
                      }}
                      className="roadmap-check text-base font-bold"
                    >
                      ✓
                    </motion.span>
                    <span className="text-sm font-medium">{item}</span>
                  </motion.div>
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
