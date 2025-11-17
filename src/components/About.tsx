import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Code, Palette, Rocket, Users } from "lucide-react";

const stats = [
  { label: "Years Experience", value: 0.6, suffix: "+" },
  { label: "Projects Completed", value: 10, suffix: "+" },
  { label: "Happy Clients", value: 2, suffix: "+" },
  { label: "AI/Cloud Systems Built", value: 2, suffix: "+" },
];

const highlights = [
  {
    icon: Code,
    title: "AI-Driven Solutions",
    description: "Building intelligent systems with ML, automation, and smart workflows.",
  },
  {
    icon: Palette,
    title: "Cloud Architecture",
    description: "Designing scalable, secure cloud systems using modern DevOps practices.",
  },
  {
    icon: Rocket,
    title: "High-Performance Apps",
    description: "Optimizing backend, frontend, and infrastructure for speed and reliability.",
  },
  {
    icon: Users,
    title: "End-to-End Engineering",
    description: "From UI to backend to deployment — complete full-stack ownership.",
  },
];


const Counter = ({ end, suffix }: { end: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [end, isInView]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate about building intelligent, cloud-powered digital systems.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative glass rounded-2xl overflow-hidden aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-gradient-to-br from-primary to-secondary opacity-50" />
              </div>
              {/* Replace with actual image */}
              <div className="absolute inset-0 flex items-center justify-center text-6xl font-bold text-foreground/20">
                Your Photo
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 glass rounded-xl p-6 max-w-xs">
              <p className="text-sm font-medium">💡 Currently learning</p>
              <p className="text-xs text-muted-foreground mt-1">
                AI Engineering & Cloud Architecture
              </p>
            </div>
          </motion.div>

          {/* About Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold">AI, Cloud & Full-Stack Engineer</h3>
            <p className="text-muted-foreground leading-relaxed">
              With over 1 years of experience in full-stack development, cloud systems, and AI integration, I build scalable, high-performance applications that solve real problems. I focus on clean architecture, automation, and systems that can grow without breaking.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I’m always exploring advancements in AI, distributed systems, and modern cloud infrastructure. Outside of coding, I enjoy experimenting with new tech stacks, optimizing workflows, and contributing to the developer community.

            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="text-center glass rounded-xl p-4"
                >
                  <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                    <Counter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
              whileHover={{ y: -8 }}
              className="glass rounded-xl p-6 hover-lift"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
