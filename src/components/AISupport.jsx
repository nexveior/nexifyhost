import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, X, Send, Loader2 } from "lucide-react";

export default function AISupport() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hey! 👋 I'm NexifyHost AI Support. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || loading) return;

    const userMessage = message.trim();

    setMessages((prev) => [
      ...prev,
      { role: "user", content: userMessage },
      { role: "assistant", content: "" },
    ]);

    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
        }),
      });

      if (!response.ok) {
        let errorMessage = "Request failed";

        try {
          const data = await response.json();
          errorMessage = data.error || errorMessage;
        } catch {
          // Ignore JSON parsing error
        }

        throw new Error(errorMessage);
      }

      if (!response.body) {
        throw new Error("No response stream received");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let fullResponse = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        fullResponse += chunk;

        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            role: "assistant",
            content: fullResponse,
          };

          return updated;
        });
      }

      // Handle any remaining decoder data
      const remaining = decoder.decode();

      if (remaining) {
        fullResponse += remaining;

        setMessages((prev) => {
          const updated = [...prev];

          updated[updated.length - 1] = {
            role: "assistant",
            content: fullResponse,
          };

          return updated;
        });
      }

      if (!fullResponse.trim()) {
        throw new Error("AI returned an empty response");
      }
    } catch (error) {
      console.error("AI CHAT ERROR:", error);

      setMessages((prev) => {
        const updated = [...prev];

        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "Sorry, I'm having trouble connecting right now. Please contact our Discord support.",
        };

        return updated;
      });
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          aria-label="Open AI Support"
          style={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
            width: "58px",
            height: "58px",
            borderRadius: "50%",
            border: "1px solid var(--border-glow)",
            background: "var(--bg-card)",
            color: "var(--primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 9999,
            boxShadow: "0 10px 30px rgba(0,0,0,.35)",
          }}
        >
          <Bot size={24} />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: "fixed",
            right: "20px",
            bottom: "20px",
            width: "min(380px, calc(100vw - 30px))",
            height: "min(560px, calc(100vh - 40px))",
            background: "var(--bg-card)",
            border: "1px solid var(--border-glow)",
            borderRadius: "20px",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            zIndex: 9999,
            boxShadow: "0 20px 60px rgba(0,0,0,.5)",
          }}
        >
          {/* Header */}
          <div
            style={{
              padding: "1rem",
              borderBottom: "1px solid var(--border-glass)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <Bot size={22} color="var(--primary)" />

              <div>
                <div style={{ color: "#fff", fontWeight: 700 }}>
                  NexifyHost AI
                </div>

                <div
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.75rem",
                  }}
                >
                  AI Support Assistant
                </div>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              style={{
                background: "transparent",
                border: "none",
                color: "var(--text-muted)",
                cursor: "pointer",
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  alignSelf:
                    msg.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "85%",
                  padding: "0.75rem 0.9rem",
                  borderRadius: "14px",
                  background:
                    msg.role === "user"
                      ? "var(--primary)"
                      : "rgba(255,255,255,.06)",
                  color: "#fff",
                  fontSize: "0.88rem",
                  lineHeight: 1.5,
                  whiteSpace: "normal",
                }}
              >
                {msg.content ? (
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      a: ({ href, children }) => (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: "var(--primary)",
                            textDecoration: "underline",
                            fontWeight: 600,
                          }}
                        >
                          {children}
                        </a>
                      ),

                      strong: ({ children }) => (
                        <strong
                          style={{
                            color: "#fff",
                            fontWeight: 800,
                          }}
                        >
                          {children}
                        </strong>
                      ),

                      em: ({ children }) => <em>{children}</em>,

                      ul: ({ children }) => (
                        <ul
                          style={{
                            margin: "0.5rem 0",
                            paddingLeft: "1.25rem",
                          }}
                        >
                          {children}
                        </ul>
                      ),

                      ol: ({ children }) => (
                        <ol
                          style={{
                            margin: "0.5rem 0",
                            paddingLeft: "1.25rem",
                          }}
                        >
                          {children}
                        </ol>
                      ),

                      li: ({ children }) => (
                        <li style={{ marginBottom: "0.25rem" }}>
                          {children}
                        </li>
                      ),

                      p: ({ children }) => (
                        <p
                          style={{
                            margin: "0 0 0.5rem",
                          }}
                        >
                          {children}
                        </p>
                      ),

                      code: ({ children }) => (
                        <code
                          style={{
                            background: "rgba(255,255,255,.08)",
                            padding: "2px 6px",
                            borderRadius: "5px",
                            fontSize: "0.85em",
                          }}
                        >
                          {children}
                        </code>
                      ),
                    }}
                  >
                    {msg.content}
                  </ReactMarkdown>
                ) : (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      color: "var(--text-muted)",
                    }}
                  >
                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "currentColor",
                        animation: "aiDot 1.2s infinite ease-in-out",
                      }}
                    />

                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "currentColor",
                        animation: "aiDot 1.2s 0.15s infinite ease-in-out",
                      }}
                    />

                    <span
                      style={{
                        width: "5px",
                        height: "5px",
                        borderRadius: "50%",
                        background: "currentColor",
                        animation: "aiDot 1.2s 0.3s infinite ease-in-out",
                      }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            style={{
              padding: "0.75rem",
              borderTop: "1px solid var(--border-glass)",
              display: "flex",
              gap: "0.5rem",
            }}
          >
            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask NexifyHost AI..."
              disabled={loading}
              style={{
                flex: 1,
                minWidth: 0,
                padding: "0.75rem",
                borderRadius: "12px",
                border: "1px solid var(--border-glass)",
                background: "rgba(255,255,255,.04)",
                color: "#fff",
                outline: "none",
              }}
            />

            <button
              onClick={sendMessage}
              disabled={loading || !message.trim()}
              style={{
                width: "44px",
                border: "none",
                borderRadius: "12px",
                background: "var(--primary)",
                color: "#000",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                flexShrink: 0,
              }}
            >
              {loading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Send size={18} />
              )}
            </button>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes aiDot {
            0%, 80%, 100% {
              opacity: 0.25;
              transform: scale(0.8);
            }
            40% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </>
  );
}