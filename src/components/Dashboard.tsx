import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { GraduationCap, FolderKanban, Briefcase, Layers, Code2 } from "lucide-react";

const stats = [
  { icon: GraduationCap, label: "CGPA", value: 8.06, decimals: 2, suffix: "", color: "text-primary" },
  { icon: FolderKanban, label: "Projects Built", value: 4, decimals: 0, suffix: "+", color: "text-secondary" },
  { icon: Briefcase, label: "Internships", value: 1, decimals: 0, suffix: "", color: "text-primary" },
  { icon: Layers, label: "Tech Stack", value: 20, decimals: 0, suffix: "+", color: "text-secondary" },
  { icon: Code2, label: "DSA Problems", value: 150, decimals: 0, suffix: "+", color: "text-primary" },
];

const AnimatedCounter = ({
  end,
  decimals,
  suffix,
  isInView,
}: {
  end: number;
  decimals: number;
  suffix: string;
  isInView: boolean;
}) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(decimals > 0 ? parseFloat(start.toFixed(decimals)) : Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, decimals, isInView]);

  return (
    <span>
      {decimals > 0 ? count.toFixed(decimals) : count}
      {suffix}
    </span>
  );
};

export const Dashboard = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="dashboard" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 dot-pattern opacity-20" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Live <span className="gradient-text">Dashboard</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Real numbers. Real work. No fluff.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass rounded-2xl p-6 text-center group cursor-default"
            >
              <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <div className={`text-3xl md:text-4xl font-bold mb-2 ${stat.color}`}>
                <AnimatedCounter
                  end={stat.value}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                  isInView={isInView}
                />
              </div>
              <div className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
};
