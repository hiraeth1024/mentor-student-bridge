import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { NotificationItem } from "@/lib/mock/types";

function List({ items }: { items: NotificationItem[] }) {
  if (items.length === 0) {
    return <p className="px-4 py-6 text-center text-sm text-muted-foreground">暂无新通知</p>;
  }
  return (
    <ul className="divide-y">
      {items.map((n) => (
        <li key={n.id} className="flex items-start gap-3 px-4 py-3">
          <span
            className={cn(
              "mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full",
              n.unread ? "bg-primary" : "bg-muted-foreground/40",
            )}
          />
          <div className="min-w-0 flex-1">
            <p className="text-sm text-foreground">{n.text}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function NotificationsPanel({
  system,
  chat,
}: {
  system: NotificationItem[];
  chat: NotificationItem[];
}) {
  return (
    <div className="rounded-2xl border bg-card">
      <Tabs defaultValue="system" className="w-full">
        <div className="flex items-center justify-between border-b px-4 py-3">
          <TabsList className="bg-transparent p-0">
            <TabsTrigger value="system" className="data-[state=active]:bg-accent">
              系统通知
            </TabsTrigger>
            <TabsTrigger value="chat" className="data-[state=active]:bg-accent">
              沟通消息
            </TabsTrigger>
          </TabsList>
          <Button size="sm" variant="ghost" className="text-primary hover:text-primary">
            查看全部
          </Button>
        </div>
        <TabsContent value="system" className="m-0">
          <List items={system} />
        </TabsContent>
        <TabsContent value="chat" className="m-0">
          <List items={chat} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
