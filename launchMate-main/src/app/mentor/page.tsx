"use client";

import { useState, useRef, useEffect, useActionState } from "react";
import { getAIMentorResponse } from "./actions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, Bot, User, CornerDownLeft, Sparkles, LoaderCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { currentUser } from "@/lib/data";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const initialState: { messages: Message[]; error: string | null } = {
  messages: [
    {
      role: "assistant",
      content: "Hello! I'm your personal AI Mentor. How can I help you with your career, projects, or startup ideas today?",
    },
  ],
  error: null,
};

export default function MentorPage() {
  const [state, formAction, isPending] = useActionState(getAIMentorResponse, initialState);
  const [input, setInput] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const messages = state.messages;

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  const handleFormSubmit = (formData: FormData) => {
    formData.append('history', JSON.stringify(messages));
    formAction(formData);
    setInput("");
  };
  
  const quickPrompts = [
    "Suggest a project using React and AI",
    "How do I build a strong resume?",
    "Critique my startup idea: a social network for pets",
    "What's a good career path for a UX designer?",
  ]

  return (
    <div className="flex flex-col h-[calc(100vh-10rem)]">
        <div className="text-center mb-6">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">AI Mentor</h1>
            <p className="text-muted-foreground mt-1">Your personal guide for career, projects, and startups.</p>
        </div>
        
        <div className="flex-1 overflow-hidden">
            <ScrollArea className="h-full" ref={scrollAreaRef}>
            <div className="max-w-3xl mx-auto px-4 space-y-6 pb-4">
                {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`flex items-start gap-4 ${
                    msg.role === "user" ? "justify-end" : ""
                    }`}
                >
                    {msg.role === "assistant" && (
                    <Avatar className="h-9 w-9 border-2 border-primary">
                        <AvatarFallback>
                        <Bot className="text-primary" />
                        </AvatarFallback>
                    </Avatar>
                    )}
                    <Card
                    className={`max-w-xl ${
                        msg.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card"
                    }`}
                    >
                    <CardContent className="p-3 text-sm">{msg.content}</CardContent>
                    </Card>
                    {msg.role === "user" && (
                    <Avatar className="h-9 w-9">
                        <AvatarImage src={currentUser.avatarUrl} alt={currentUser.name} />
                        <AvatarFallback>
                        <User />
                        </AvatarFallback>
                    </Avatar>
                    )}
                </div>
                ))}
                {isPending && (
                    <div className="flex items-start gap-4">
                         <Avatar className="h-9 w-9 border-2 border-primary">
                            <AvatarFallback>
                                <Bot className="text-primary" />
                            </AvatarFallback>
                        </Avatar>
                        <Card className="max-w-xl bg-card">
                            <CardContent className="p-3">
                                <LoaderCircle className="animate-spin h-5 w-5 text-muted-foreground" />
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
            </ScrollArea>
        </div>

        <div className="max-w-3xl mx-auto w-full px-4 pt-4">
             <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-2">
                {quickPrompts.map(prompt => (
                    <Button key={prompt} variant="outline" size="sm" className="text-xs h-auto py-1.5" onClick={() => setInput(prompt)}>
                       <Sparkles className="w-3 h-3 mr-2 shrink-0"/> {prompt}
                    </Button>
                ))}
            </div>
            <form
                ref={formRef}
                action={handleFormSubmit}
                className="relative"
            >
                <Textarea
                    name="query"
                    placeholder="Ask for project ideas, resume tips, or career guidance..."
                    className="pr-20 min-h-[48px] resize-none"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            formRef.current?.requestSubmit();
                        }
                    }}
                    disabled={isPending}
                />
                <Button type="submit" size="icon" className="absolute top-1/2 -translate-y-1/2 right-3" disabled={isPending || !input}>
                    <Send className="h-4 w-4" />
                </Button>
            </form>
             <p className="text-xs text-muted-foreground text-center p-2">
                Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"><span className="text-xs">Enter</span></kbd> to send, <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"><span className="text-xs">Shift + Enter</span></kbd> for a new line.
            </p>
        </div>
    </div>
  );
}
