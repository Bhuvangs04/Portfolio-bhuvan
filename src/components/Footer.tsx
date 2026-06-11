import { Github, Linkedin, Mail, Heart } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/Bhuvangs04", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/bhuvangsangappanavar", label: "LinkedIn" },
  { icon: Mail, href: "mailto:bhuvangs2004@gmail.com", label: "Email" },
];

const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { name: "Home", href: "#home" },
      { name: "Projects", href: "#projects" },
      { name: "AI Experience", href: "#ai-experience" },
      { name: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { name: "Backend Engineering", href: "#backend-expertise" },
      { name: "AI & RAG Systems", href: "#ai-experience" },
      { name: "Full-Stack Development", href: "#projects" },
      { name: "Cloud Architecture", href: "#tech-stack" },
    ],
  },
];

export const Footer = () => {
  return (
    <footer className="relative overflow-hidden bg-muted/30 border-t border-border">
      <div className="absolute inset-0 grid-pattern opacity-10" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold gradient-text mb-4">Bhuvan.</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Backend Engineer & AI Developer — building scalable applications,
              real-time systems, and AI-powered products with clean architecture.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 glass rounded-full flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="font-semibold mb-4">{section.title}</h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Bhuvan G Sangappanavar. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            Built with <Heart className="w-4 h-4 text-primary fill-primary" /> using React, TypeScript & Cloud-first Engineering
          </p>
        </div>
      </div>
    </footer>
  );
};
