import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, LayoutPanelLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChatPanel } from "@/components/create/ChatPanel";
import { MentorPostEditor } from "@/components/create/MentorPostEditor";
import { MentorPostPreview } from "@/components/create/MentorPostPreview";
import {
  emptyMentorPost,
  mentorPostIntro,
  mentorPostSuggestions,
  type MentorPostData,
} from "@/lib/mock/mentorCreate";

export const Route = createFileRoute("/mentor/create/post")({
  head: () => ({
    meta: [
      { title: "发布招生信息 — 研究生导师双选系统" },
      { name: "description", content: "以 JD 风格发布研究生招生信息，含专业要求、能力要求与课题描述。" },
      { property: "og:title", content: "发布招生信息 — 研究生导师双选系统" },
      { property: "og:description", content: "以 JD 风格发布研究生招生信息，含专业要求、能力要求与课题描述。" },
    ],
  }),
  component: MentorPostPage,
});

function MentorPostPage() {
  const [data, setData] = useState<MentorPostData>(emptyMentorPost);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="flex h-[calc(100vh-9rem)] min-h-[600px] flex-col rounded-2xl border bg-card">
          <Tabs defaultValue="editor" className="flex h-full min-h-0 flex-col">
            <div className="border-b px-4 py-3">
              <TabsList className="grid w-fit grid-cols-2">
                <TabsTrigger value="chat" className="gap-1.5">
                  <MessageSquare className="h-3.5 w-3.5" /> Chat
                </TabsTrigger>
                <TabsTrigger value="editor" className="gap-1.5">
                  <LayoutPanelLeft className="h-3.5 w-3.5" /> Editor
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="chat" className="m-0 flex-1 overflow-hidden px-4 pb-4">
              <ChatPanel
                intro={mentorPostIntro}
                suggestions={mentorPostSuggestions}
                placeholder="向 AI 招生助手提问…（如：帮我写 NLP 方向的能力要求）"
              />
            </TabsContent>

            <TabsContent value="editor" className="m-0 flex-1 overflow-y-auto px-4 pt-4">
              <MentorPostEditor data={data} onChange={setData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="h-[calc(100vh-9rem)] min-h-[600px] overflow-y-auto rounded-2xl border bg-muted/30 p-6">
          <MentorPostPreview data={data} />
        </div>
      </div>
    </div>
  );
}
