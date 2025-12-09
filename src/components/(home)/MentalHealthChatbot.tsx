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

  // Auto-scroll vers le bas quand de nouveaux messages arrivent
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [messages]);

  const validateMentalHealthTopic = (message: string): boolean => {
    const mentalHealthKeywords = [
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
      "psychologie",
      "méditation",
      "relaxation",
      "confiance",
      "estime",
      "solitude",
      "relation",
      "travail",
      "vie",
      "sentiment",
      "moral",
      "aide",
      "soutien",
      "parler",
      "écoute",
    ];

    const messageLower = message.toLowerCase();
    return (
      mentalHealthKeywords.some((keyword) => messageLower.includes(keyword)) ||
      message.length < 50 // Permet les salutations courtes
    );
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
      // Vérifier si le message concerne la santé mentale
      if (!validateMentalHealthTopic(input)) {
        const offTopicResponse: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content:
            "Je suis désolé, mais je suis spécialisé uniquement dans les discussions sur la santé mentale et le bien-être émotionnel. Pouvez-vous me parler de ce que vous ressentez ou de préoccupations liées à votre bien-être mental ?",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, offTopicResponse]);
        setIsLoading(false);
        return;
      }

      // Appel à l'API (remplacez par votre propre endpoint)
      const response = await fetch("/api/chatbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: messages
            .concat(userMessage)
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la communication avec le serveur");
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Erreur:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content:
          "Je suis désolé, une erreur s'est produite. Pouvez-vous réessayer ?",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    
    <div className= "bg-white text-black dark:bg-black dark:text-white"style={{ fontFamily: 'Montserrat, sans-serif' }}>
      <Header />
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 my-5">
        <Card className="w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            {/* Header */}
            <div className="p-6 border-b bg-[#2E86AB] rounded-t-lg">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                <h2 className="text-2xl font-bold text-white">
                    Assistant MentisCare
                </h2>
                <p className="text-blue-100 text-sm">
                    Votre espace d'écoute et de soutien
                </p>
                </div>
            </div>
            </div>

            {/* Messages Area */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 px-6 h-1/2">
            <div className="space-y-6">
                {messages.map((message) => (
                <div
                    key={message.id}
                    className={cn(
                    "flex gap-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-300",
                    message.role === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                >
                    <Avatar
                    className={cn(
                        "w-10 h-10",
                        message.role === "assistant"
                        ? "bg-gradient-to-br from-blue-500 to-indigo-600"
                        : "bg-gradient-to-br from-purple-500 to-pink-600"
                    )}
                    >
                    <AvatarFallback className="bg-transparent">
                        {message.role === "assistant" ? (
                        <Bot className="w-5 h-5 text-white" />
                        ) : (
                        <User className="w-5 h-5 text-white" />
                        )}
                    </AvatarFallback>
                    </Avatar>

                    <div
                    className={cn(
                        "flex-1 max-w-[80%]",
                        message.role === "user" ? "items-end" : "items-start"
                    )}
                    >
                    <div
                        className={cn(
                        "rounded-2xl px-4 py-3 shadow-md",
                        message.role === "assistant"
                            ? "bg-white border border-gray-200"
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                        )}
                    >
                        <p
                        className={cn(
                            "text-sm leading-relaxed whitespace-pre-wrap",
                            message.role === "assistant"
                            ? "text-gray-800"
                            : "text-white"
                        )}
                        >
                        {message.content}
                        </p>
                    </div>
                    <p
                        className={cn(
                        "text-xs text-gray-500 mt-1 px-2",
                        message.role === "user" ? "text-right" : "text-left"
                        )}
                    >
                        {message.timestamp.toLocaleTimeString("fr-FR", {
                        hour: "2-digit",
                        minute: "2-digit",
                        })}
                    </p>
                    </div>
                </div>
                ))}

                {isLoading && (
                <div className="flex gap-3 animate-in fade-in-0">
                    <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600">
                    <AvatarFallback className="bg-transparent">
                        <Bot className="w-5 h-5 text-white" />
                    </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                    <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 shadow-md inline-block">
                        <div className="flex items-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                        <span className="text-sm text-gray-600">
                            En train d'écrire...
                        </span>
                        </div>
                    </div>
                    </div>
                </div>
                )}
            </div>
            </ScrollArea>

            {/* Input Area */}
            <div className="p-6 border-t bg-gray-50/50 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="flex gap-3">
                <Input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Partagez ce que vous ressentez..."
                className="flex-1 rounded-full px-6 py-6 text-base border-2 border-gray-200 focus:border-blue-500 transition-all"
                disabled={isLoading}
                />
                <Button
                type="submit"
                size="lg"
                disabled={!input.trim() || isLoading}
                className="rounded-full px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg transition-all"
                >
                {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                    <Send className="w-5 h-5" />
                )}
                </Button>
            </form>
            <p className="text-xs text-gray-500 mt-3 text-center">
                💙 Vos conversations sont confidentielles et sécurisées
            </p>
            </div>
        </Card>
        </div>
    
    </div> 
  );
}