import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, LayoutPanelLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChatPanel } from "@/components/create/ChatPanel";
import { MentorInfoEditor } from "@/components/create/MentorInfoEditor";
import { MentorInfoPreview } from "@/components/create/MentorInfoPreview";
import {
  emptyMentorInfo,
  mentorInfoIntro,
  mentorInfoSuggestions,
  type MentorInfoData,
} from "@/lib/mock/mentorCreate";

export const Route = createFileRoute("/mentor/create/info")({
  head: () => ({
    meta: [
      { title: "导师信息 — 研究生导师双选系统" },
      { name: "description", content: "导师信息编辑器：个人信息、项目、研究方向与对学生的要求。" },
      { property: "og:title", content: "导师信息 — 研究生导师双选系统" },
      { property: "og:description", content: "导师信息编辑器：个人信息、项目、研究方向与对学生的要求。" },
    ],
  }),
  component: MentorInfoPage,
});

function MentorInfoPage() {
  const [data, setData] = useState<MentorInfoData>(emptyMentorInfo);

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
                intro={mentorInfoIntro}
                suggestions={mentorInfoSuggestions}
                placeholder="向 AI 导师助手提问…（如：帮我润色研究方向描述）"
              />
            </TabsContent>

            <TabsContent value="editor" className="m-0 flex-1 overflow-y-auto px-4 pt-4">
              <MentorInfoEditor data={data} onChange={setData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="lg:col-span-7">
        <div className="h-[calc(100vh-9rem)] min-h-[600px] overflow-y-auto rounded-2xl border bg-muted/30 p-6">
          <MentorInfoPreview data={data} />
        </div>
      </div>
    </div>
  );
}
