import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MessageSquare, LayoutPanelLeft } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ChatPanel } from "@/components/create/ChatPanel";
import { EditorPanel } from "@/components/create/EditorPanel";
import { ResumePreview } from "@/components/create/ResumePreview";
import { emptyResume, type ResumeData } from "@/lib/mock/resume";

export const Route = createFileRoute("/student/create/resume")({
  head: () => ({
    meta: [
      { title: "创建简历 — 研究生导师双选系统" },
      {
        name: "description",
        content: "AI 简历助手 + 结构化编辑器，实时预览你的学术简历。",
      },
      { property: "og:title", content: "创建简历 — 研究生导师双选系统" },
      {
        property: "og:description",
        content: "AI 简历助手 + 结构化编辑器，实时预览你的学术简历。",
      },
    ],
  }),
  component: ResumePage,
});

function ResumePage() {
  const [data, setData] = useState<ResumeData>(emptyResume);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
      {/* 左侧 */}
      <div className="lg:col-span-5">
        <div className="flex h-[calc(100vh-9rem)] min-h-[600px] flex-col rounded-2xl border bg-card">
          <Tabs defaultValue="chat" className="flex h-full min-h-0 flex-col">
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

            <TabsContent
              value="chat"
              className="m-0 flex-1 overflow-hidden px-4 pb-4"
            >
              <ChatPanel />
            </TabsContent>

            <TabsContent
              value="editor"
              className="m-0 flex-1 overflow-y-auto px-4 pt-4"
            >
              <EditorPanel data={data} onChange={setData} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* 右侧 */}
      <div className="lg:col-span-7">
        <div className="h-[calc(100vh-9rem)] min-h-[600px] overflow-y-auto rounded-2xl border bg-muted/30 p-6">
          <ResumePreview data={data} />
        </div>
      </div>
    </div>
  );
}
