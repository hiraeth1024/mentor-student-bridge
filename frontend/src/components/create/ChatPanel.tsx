import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { suggestionChips } from "@/lib/mock/resume";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "ai" | "user";
  text: string;
}

interface Props {
  intro?: string;
  suggestions?: readonly string[];
  placeholder?: string;
}

export function ChatPanel({
  intro = "你好👋，我是你的 AI 简历助手。告诉我你想申请的方向，我来帮你梳理学术与项目经历。",
  suggestions = suggestionChips,
  placeholder = "向 AI 助手提问…",
}: Props) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "m0", role: "ai", text: intro },
  ]);
  const [input, setInput] = useState("");
  const [pending, setPending] = useState(false);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || pending) return;
    setMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), role: "user", text: trimmed },
    ]);
    setInput("");
    setPending(true);
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "ai",
          text: "（Demo）这是 AI 助手的示例回复，正式版本将根据你的内容生成具体建议。",
        },
      ]);
      setPending(false);
    }, 600);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex-1 space-y-4 overflow-y-auto px-1 py-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn("flex gap-2", m.role === "user" ? "justify-end" : "justify-start")}
          >
            {m.role === "ai" && (
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm">
                🐘
              </div>
            )}
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed",
                m.role === "user"
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground",
              )}
            >
              {m.text}
            </div>
          </div>
        ))}
        {pending && (
          <div className="flex gap-2">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm">
              🐘
            </div>
            <div className="rounded-2xl bg-muted px-3.5 py-2 text-sm text-muted-foreground">
              正在思考…
            </div>
          </div>
        )}
      </div>

      <div className="border-t pt-3">
        <div className="mb-2 flex flex-wrap gap-1.5">
          {suggestions.map((c) => (
            <button
              key={c}
              onClick={() => setInput(c)}
              className="rounded-full border bg-card px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex items-end gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            className="min-h-[60px] resize-none"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send(input);
              }
            }}
          />
          <Button
            size="icon"
            onClick={() => send(input)}
            disabled={!input.trim() || pending}
            aria-label="发送"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
