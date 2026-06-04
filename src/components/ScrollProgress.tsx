import { motion, useScroll, useSpring } from "framer-motion";
import { useState, useEffect } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "dashboard", label: "Dashboard" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "ai-experience", label: "AI" },
  { id: "backend-expertise", label: "Backend" },
  { id: "tech-stack", label: "Stack" },
  { id: "github-stats", label: "Stats" },
  { id: "timeline", label: "Timeline" },
  { id: "terminal", label: "Terminal" },
  { id: "contact", label: "Contact" },
];

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [activeSection, setActiveSection] = useState("home");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] z-[55] origin-left"
        style={{
          scaleX,
          background: "linear-gradient(90deg, #3B82F6, #06B6D4, #3B82F6)",
        }}
      />

      {/* Floating Section Indicator (right side) */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
        transition={{ duration: 0.3 }}
        className="fixed right-4 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-end gap-1.5"
      >
        {sections.map(({ id, label }) => {
          const isActive = activeSection === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              className="group flex items-center gap-2"
            >
              {/* Label (shows on hover or active) */}
              <span
                className={`text-[10px] font-medium transition-all duration-200 ${
                  isActive
                    ? "opacity-100 text-primary"
                    : "opacity-0 group-hover:opacity-100 text-muted-foreground"
                }`}
              >
                {label}
              </span>

              {/* Dot */}
              <div className="relative">
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive
                      ? "bg-primary scale-125 shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                      : "bg-muted-foreground/30 group-hover:bg-muted-foreground/60"
                  }`}
                />
                {isActive && (
                  <motion.div
                    layoutId="activeDot"
                    className="absolute inset-[-3px] rounded-full border border-primary/30"
                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                  />
                )}
              </div>
            </a>
          );
        })}
      </motion.div>
    </>
  );
};
