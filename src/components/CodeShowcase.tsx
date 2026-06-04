import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Copy, Check } from "lucide-react";

interface CodeSnippet {
  id: string;
  title: string;
  project: string;
  language: string;
  description: string;
  code: string;
}

const snippets: CodeSnippet[] = [
  {
    id: "jwt-auth",
    title: "JWT Authentication Middleware",
    project: "Freelancer Hub",
    language: "javascript",
    description: "Express middleware for verifying JWT tokens with role-based access control",
    code: `const authMiddleware = (roles = []) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization
        ?.split(" ")[1];
      
      if (!token) {
        return res.status(401).json({ 
          error: "Access denied" 
        });
      }

      const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET
      );
      
      if (roles.length && 
          !roles.includes(decoded.role)) {
        return res.status(403).json({ 
          error: "Insufficient permissions" 
        });
      }

      req.user = decoded;
      next();
    } catch (err) {
      res.status(401).json({ 
        error: "Invalid token" 
      });
    }
  };
};`,
  },
  {
    id: "rag-pipeline",
    title: "RAG Context Retrieval",
    project: "AI Internship",
    language: "python",
    description: "Retrieval-Augmented Generation pipeline with semantic similarity search",
    code: `async def retrieve_context(
    query: str,
    collection: Collection,
    top_k: int = 5
) -> list[Document]:
    """Retrieve relevant documents using
    semantic similarity search."""
    
    # Generate query embedding
    query_embedding = await embed_model\
      .encode(query)
    
    # Vector similarity search
    results = collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        include=["documents", "metadatas",
                 "distances"]
    )
    
    # Filter by relevance threshold
    relevant = [
        Document(
            content=doc,
            metadata=meta,
            score=1 - dist
        )
        for doc, meta, dist in zip(
            results["documents"][0],
            results["metadatas"][0],
            results["distances"][0]
        )
        if dist < 0.8  # similarity threshold
    ]
    
    return relevant`,
  },
  {
    id: "razorpay",
    title: "Razorpay Webhook Handler",
    project: "Streamify",
    language: "javascript",
    description: "Secure payment verification with webhook signature validation",
    code: `app.post("/webhook/razorpay", 
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const signature = req.headers[
      "x-razorpay-signature"
    ];
    
    const isValid = Razorpay.validateWebhook(
      req.body,
      signature,
      process.env.RAZORPAY_WEBHOOK_SECRET
    );
    
    if (!isValid) {
      return res.status(400).json({ 
        error: "Invalid signature" 
      });
    }
    
    const { event, payload } = JSON.parse(
      req.body
    );
    
    switch (event) {
      case "payment.captured":
        await activateSubscription(
          payload.payment.entity
        );
        break;
      case "payment.failed":
        await handleFailedPayment(
          payload.payment.entity
        );
        break;
    }
    
    res.json({ status: "ok" });
});`,
  },
  {
    id: "websocket",
    title: "WebSocket Real-time Chat",
    project: "Freelancer Hub",
    language: "javascript",
    description: "Socket.io event handler for real-time messaging with rooms",
    code: `io.on("connection", (socket) => {
  const userId = socket.handshake.auth.userId;
  
  // Join user's personal room
  socket.join(\`user:\${userId}\`);
  
  socket.on("join_chat", async (chatId) => {
    socket.join(\`chat:\${chatId}\`);
    
    // Mark messages as read
    await Message.updateMany(
      { chatId, readBy: { $ne: userId } },
      { $addToSet: { readBy: userId } }
    );
    
    socket.to(\`chat:\${chatId}\`)
      .emit("messages_read", { 
        chatId, userId 
      });
  });
  
  socket.on("send_message", async (data) => {
    const message = await Message.create({
      chatId: data.chatId,
      sender: userId,
      content: data.content,
      timestamp: new Date()
    });
    
    io.to(\`chat:\${data.chatId}\`)
      .emit("new_message", message);
  });
});`,
  },
];

// Simple syntax highlighter
const highlightCode = (code: string, language: string) => {
  let html = code
    // Escape HTML
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Comments
  html = html.replace(
    /(\/\/.*$|#.*$|"""[\s\S]*?""")/gm,
    '<span class="text-emerald-400/60">$1</span>'
  );

  // Strings
  html = html.replace(
    /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g,
    '<span class="text-amber-300">$1</span>'
  );

  // Keywords
  const jsKeywords = /\b(const|let|var|function|return|if|else|try|catch|async|await|switch|case|break|new|import|from|export|default|class|extends|throw)\b/g;
  const pyKeywords = /\b(def|async|await|return|if|else|for|in|import|from|class|try|except|with|as|not|and|or|True|False|None|raise|yield)\b/g;

  const keywords = language === "python" ? pyKeywords : jsKeywords;
  html = html.replace(keywords, '<span class="text-purple-400">$1</span>');

  // Numbers
  html = html.replace(/\b(\d+\.?\d*)\b/g, '<span class="text-orange-300">$1</span>');

  // Function calls
  html = html.replace(
    /\b([a-zA-Z_]\w*)\s*\(/g,
    '<span class="text-blue-300">$1</span>('
  );

  return html;
};

export const CodeShowcase = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeSnippet, setActiveSnippet] = useState(0);
  const [copied, setCopied] = useState(false);

  const current = snippets[activeSnippet];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(current.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="code-showcase" className="py-24 relative overflow-hidden bg-muted/30">
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Code <span className="gradient-text">Showcase</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Real code from real projects — not toy examples
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Snippet Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-6"
          >
            {snippets.map((snippet, i) => (
              <button
                key={snippet.id}
                onClick={() => {
                  setActiveSnippet(i);
                  setCopied(false);
                }}
                className={`text-xs px-4 py-2 rounded-xl transition-all font-medium ${
                  activeSnippet === i
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {snippet.title}
              </button>
            ))}
          </motion.div>

          {/* Code Window */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="terminal-bg rounded-2xl overflow-hidden shadow-2xl"
          >
            {/* Title Bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="terminal-font text-xs text-muted-foreground">
                  {current.title}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 text-primary font-mono">
                  {current.language}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-secondary/10 text-secondary">
                  {current.project}
                </span>
                <button
                  onClick={handleCopy}
                  className="text-muted-foreground hover:text-foreground transition-colors p-1"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Description */}
            <div className="px-4 py-2 border-b border-primary/5">
              <p className="text-xs text-muted-foreground/70 italic">
                // {current.description}
              </p>
            </div>

            {/* Code */}
            <div className="p-4 md:p-6 overflow-x-auto">
              <pre className="terminal-font text-sm leading-relaxed">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlightCode(current.code, current.language),
                  }}
                />
              </pre>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="section-divider mt-20" />
    </section>
  );
};
