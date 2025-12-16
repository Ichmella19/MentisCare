"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Loader2, Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import Header from "./header/header";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function MentalHealthChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Bonjour ! Je suis votre assistant de santé mentale. Je suis là pour vous écouter et discuter de bien-être émotionnel, gestion du stress, anxiété, ou toute autre préoccupation liée à la santé mentale. Comment puis-je vous aider aujourd'hui ?",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const validateMentalHealthTopic = (message: string): boolean => {
    const keywords = [
      "stress",
      "anxiété",
      "dépression",
      "santé mentale",
      "bien-être",
      "émotions",
      "tristesse",
      "peur",
      "inquiétude",
      "sommeil",
      "fatigue",
      "burnout",
      "thérapie",
      "méditation",
      "confiance",
      "solitude",
      "relation",
      "travail",
      "sentiment",
      "moral",
      "aide",
      "soutien",
    ];

    const msg = message.toLowerCase();
    return keywords.some((k) => msg.includes(k)) || message.length < 50;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (!validateMentalHealthTopic(input)) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: "assistant",
            content:
              "Je suis spécialisé uniquement dans la santé mentale et le bien-être émotionnel. Pouvez-vous me parler de ce que vous ressentez ?",
            timestamp: new Date(),
          },
        ]);
        setIsLoading(false);
        return;
      }

      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.concat(userMessage).map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 2).toString(),
          role: "assistant",
          content: data.message,
          timestamp: new Date(),
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 3).toString(),
          role: "assistant",
          content: "Une erreur est survenue. Veuillez réessayer.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="bg-white text-black dark:bg-black dark:text-white"
      style={{ fontFamily: "Montserrat, sans-serif" }}
    >
      <Header />

      <div className="flex items-center justify-center min-h-screen bg-gray-100 my-5">
        <Card className="w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl border bg-white">
          {/* Header */}
          <div className="p-6 border-b bg-[#2E86AB] rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-full">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  Assistant MentisCare
                </h2>
                <p className="text-white/80 text-sm">
                  Votre espace d’écoute et de soutien
                </p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea ref={scrollAreaRef} className="flex-1 px-6">
            <div className="space-y-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex gap-3",
                    message.role === "user"
                      ? "flex-row-reverse"
                      : "flex-row"
                  )}
                >
                  <Avatar className="w-10 h-10 bg-[#2E86AB]">
                    <AvatarFallback className="bg-transparent">
                      {message.role === "assistant" ? (
                        <Bot className="w-5 h-5 text-white" />
                      ) : (
                        <User className="w-5 h-5 text-white" />
                      )}
                    </AvatarFallback>
                  </Avatar>

                  <div className="max-w-[80%]">
                    <div
                      className={cn(
                        "rounded-2xl px-4 py-3 shadow",
                        message.role === "assistant"
                          ? "bg-white border"
                          : "bg-[#2E86AB] text-white"
                      )}
                    >
                      <p className="text-sm whitespace-pre-wrap">
                        {message.content}
                      </p>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {message.timestamp.toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 bg-[#2E86AB]">
                    <AvatarFallback className="bg-transparent">
                      <Bot className="w-5 h-5 text-white" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-white border rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-[#2E86AB]" />
                      <span className="text-sm text-gray-600">
                        En train d’écrire…
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="p-6 border-t bg-gray-50">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Exprimez ce que vous ressentez..."
                className="flex-1 rounded-full px-6 py-6 border-2"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="rounded-full px-8 bg-[#2E86AB] hover:bg-[#276F8F]"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </Button>
            </form>
            <p className="text-xs text-gray-500 mt-3 text-center">
              Vos conversations sont confidentielles et sécurisées
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
