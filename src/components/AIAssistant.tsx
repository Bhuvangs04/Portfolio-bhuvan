import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { useAchievements } from "@/components/Achievements";

interface Message {
  role: "user" | "bot";
  content: string;
}

// Keyword-based response matching
const knowledgeBase: { keywords: string[]; response: string }[] = [
  {
    keywords: ["project", "built", "work", "portfolio", "made"],
    response:
      "Bhuvan has built 4+ major projects:\n\n🔹 **Freelancer Hub** — A full marketplace with JWT, RBAC, Razorpay, AWS S3, and microservices\n🔹 **Streamify** — Netflix-style video streaming with subscriptions\n🔹 **AI Backend @ Anivale** — RAG pipelines, semantic search, FastAPI\n🔹 **Banking System** — Encrypted transactions with Java + MySQL\n\nWant to know more about any of these?",
  },
  {
    keywords: ["backend", "server", "api", "rest"],
    response:
      "Bhuvan specializes in backend engineering:\n\n• Node.js + Express for Freelancer Hub & Streamify\n• FastAPI (Python) for AI backend services\n• Java + Spring Boot for Banking System\n• REST APIs, Microservices, JWT Auth, RBAC\n• WebSocket real-time systems",
  },
  {
    keywords: ["ai", "rag", "machine learning", "ml", "artificial intelligence", "llm"],
    response:
      "Bhuvan has real AI engineering experience from his internship at Anivale:\n\n✓ RAG Pipelines with optimized context retrieval\n✓ Semantic Search with vector embeddings\n✓ FastAPI backend for AI model serving\n✓ WebSocket real-time AI interaction\n✓ MongoDB optimization for AI workloads",
  },
  {
    keywords: ["intern", "anivale", "experience", "work experience"],
    response:
      "Bhuvan interned as an **AI / Backend Developer** at **Anivale** in 2025.\n\nDuring the internship, he:\n• Built production-grade RAG pipelines\n• Implemented semantic search systems\n• Developed FastAPI backend services\n• Created real-time WebSocket chat architecture\n• Optimized MongoDB queries for AI workloads",
  },
  {
    keywords: ["mongodb", "database", "db", "mysql", "sql"],
    response:
      "Bhuvan works with both SQL and NoSQL databases:\n\n🍃 **MongoDB** — Used in Freelancer Hub, Streamify, and AI Internship\n🗄️ **MySQL** — Used in Banking Management System\n\nSkills include query optimization, indexing, aggregation pipelines, and schema design.",
  },
  {
    keywords: ["skill", "tech", "stack", "technology", "know"],
    response:
      "Bhuvan's tech stack includes:\n\n**Languages:** Java, Python, JavaScript, TypeScript\n**Backend:** Node.js, Express, FastAPI, Spring Boot\n**Frontend:** React, Next.js\n**Databases:** MongoDB, MySQL\n**Cloud:** AWS S3, Docker\n**AI:** RAG, Vector Embeddings, Semantic Search\n**Realtime:** WebSockets, Socket.io",
  },
  {
    keywords: ["freelancer", "hub", "marketplace", "upwork", "fiverr"],
    response:
      "**Freelancer Hub** is a full-featured marketplace platform:\n\n• JWT Authentication & Role-Based Access Control\n• Razorpay payment integration with webhooks\n• AWS S3 for file uploads & invoices\n• Real-time chat via Socket.io\n• Admin panel for disputes\n• Microservices architecture\n\n🔗 Live: freelancerhub-five.vercel.app",
  },
  {
    keywords: ["streamify", "stream", "movie", "video", "netflix"],
    response:
      "**Streamify** is a Netflix-style video streaming platform:\n\n• Video streaming with adaptive delivery\n• Subscription system via Razorpay\n• Multi-profile support & watchlists\n• AWS S3 for video storage\n• Admin content management\n• Secure JWT authentication",
  },
  {
    keywords: ["contact", "email", "reach", "hire", "phone"],
    response:
      "You can reach Bhuvan at:\n\n📧 Email: bhuvangs2004@gmail.com\n📱 Phone: +91 6362371070\n🔗 GitHub: github.com/Bhuvangs04\n💼 LinkedIn: linkedin.com/in/bhuvan-g-sangappanavar-403a022a2\n📍 Location: Bangalore, India",
  },
  {
    keywords: ["education", "cgpa", "college", "university", "study"],
    response:
      "Bhuvan is currently pursuing his education with a CGPA of 8.06. He's based in Bangalore, India, and has been building production-grade systems alongside his studies.",
  },
  {
    keywords: ["hello", "hi", "hey", "hola", "greetings"],
    response:
      "Hey there! 👋 I'm Bhuvan's AI portfolio assistant. I can tell you about his projects, skills, experience, and more. What would you like to know?",
  },
];

const defaultResponse =
  "I can help you learn about Bhuvan's projects, skills, AI experience, or contact info. Try asking about a specific topic!";

const findResponse = (input: string): string => {
  const lower = input.toLowerCase();
  for (const entry of knowledgeBase) {
    if (entry.keywords.some((kw) => lower.includes(kw))) {
      return entry.response;
    }
  }
  return defaultResponse;
};

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      content:
        "Hi! 👋 I'm Bhuvan's portfolio assistant. Ask me about his projects, skills, AI experience, or anything else!",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, []);

  useEffect(scrollToBottom, [messages, scrollToBottom]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setIsTyping(true);

    // Simulate typing delay
    await new Promise((r) => setTimeout(r, 600 + Math.random() * 800));

    const response = findResponse(userMsg);
    setMessages((prev) => [...prev, { role: "bot", content: response }]);
    setIsTyping(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  // Achievement tracking
  const { unlock } = useAchievements();
  useEffect(() => {
    if (messages.length > 1) unlock("chat_bot");
  }, [messages.length, unlock]);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 2 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] glass-strong rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            style={{ height: "500px" }}
          >
            {/* Header */}
            <div className="px-5 py-4 border-b border-border flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-secondary flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">Portfolio Assistant</h4>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                  Online — Ask me anything
                </p>
              </div>
            </div>

            {/* Messages */}
            <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {msg.role === "bot" && (
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mb-0.5">
                        <Bot className="w-3.5 h-3.5 text-primary" />
                      </div>
                    )}
                    <div
                      className={
                        msg.role === "user" ? "chat-bubble-user" : "chat-bubble-bot"
                      }
                    >
                      <p className="text-sm px-4 py-2.5 whitespace-pre-line leading-relaxed">
                        {msg.content}
                      </p>
                    </div>
                    {msg.role === "user" && (
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mb-0.5">
                        <User className="w-3.5 h-3.5 text-primary" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <div className="chat-bubble-bot px-4 py-3">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-primary/40"
                          animate={{ scale: [1, 1.3, 1] }}
                          transition={{
                            duration: 0.6,
                            repeat: Infinity,
                            delay: i * 0.15,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 pb-2 flex gap-2 overflow-x-auto">
              {["Projects", "Skills", "AI Experience", "Contact"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    if (!isTyping) {
                      setInput(suggestion);
                      setTimeout(() => {
                        setMessages((prev) => [
                          ...prev,
                          { role: "user", content: suggestion },
                        ]);
                        setIsTyping(true);
                        setTimeout(() => {
                          setMessages((prev) => [
                            ...prev,
                            { role: "bot", content: findResponse(suggestion) },
                          ]);
                          setIsTyping(false);
                        }, 600 + Math.random() * 800);
                        setInput("");
                      }, 0);
                    }
                  }}
                  className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors whitespace-nowrap flex-shrink-0"
                >
                  {suggestion}
                </button>
              ))}
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="px-4 py-3 border-t border-border flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isTyping}
                placeholder="Ask about Bhuvan..."
                className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/50"
                autoComplete="off"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="w-8 h-8 rounded-full bg-primary flex items-center justify-center hover:bg-primary/90 disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              >
                <Send className="w-4 h-4 text-white" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
