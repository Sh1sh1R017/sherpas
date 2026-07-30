"use client";

import { useState } from "react";
import { useGeo } from "@/context/GeoContext";

interface Message {
  sender: "ai" | "user";
  text: string;
}

export function LiveAIChat() {
  const { geo } = useGeo();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "ai",
      text: `Hi! I'm the Sherpas AI Assistant. Looking to build custom software, AI automations, or a Shopify store for your business in ${geo.countryName}? How can I help you today?`,
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);
    setInput("");

    // Simulate intelligent agency responses
    setTimeout(() => {
      let response = `Thanks for asking! We specialize in custom AI software, automated workflows, and high-converting landing pages. Would you like to schedule a quick 15-min strategy call with our engineering lead?`;

      const lower = userText.toLowerCase();
      if (lower.includes("price") || lower.includes("cost") || lower.includes("how much")) {
        response = `Our custom AI & web projects typically range from ${geo.symbol}${Math.round(2500 * geo.rate).toLocaleString()} for focused automations up to ${geo.symbol}${Math.round(15000 * geo.rate).toLocaleString()} for enterprise SaaS platforms. You can also test our ROI estimator above!`;
      } else if (lower.includes("timeline") || lower.includes("long") || lower.includes("time")) {
        response = `Most custom software and AI landing pages are delivered in 14 to 21 days with live subdomain previews provided throughout development.`;
      } else if (lower.includes("book") || lower.includes("meeting") || lower.includes("call")) {
        response = `Awesome! You can book a free 30-minute strategy call directly at the bottom of this page, or click 'Book Free Strategy Session' above.`;
      }

      setMessages((prev) => [...prev, { sender: "ai", text: response }]);
    }, 600);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="px-4 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm shadow-xl flex items-center gap-2 transition-transform hover:scale-105"
        >
          <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
          <span>Chat with Sherpas AI</span>
        </button>
      ) : (
        <div className="w-80 sm:w-96 bg-card border border-border rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[460px]">
          {/* Header */}
          <div className="p-4 bg-muted/60 border-b border-border flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <div>
                <p className="font-bold text-xs text-foreground">Sherpas AI Assistant</p>
                <p className="text-[10px] text-muted-foreground">Trained on Agency Services &amp; Tech Stack</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-muted-foreground hover:text-foreground text-sm p-1"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                    m.sender === "user"
                      ? "bg-emerald-600 text-white rounded-br-none"
                      : "bg-muted border border-border text-foreground rounded-bl-none"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Call Action */}
          <div className="px-4 py-2 bg-emerald-500/10 border-t border-border flex justify-between items-center text-[11px]">
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">Ready to discuss details?</span>
            <a href="#contact" className="underline font-bold text-emerald-600 dark:text-emerald-400">
              Book Call →
            </a>
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 border-t border-border flex gap-2 bg-background">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about AI, pricing, or stack..."
              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <button
              type="submit"
              className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
            >
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
