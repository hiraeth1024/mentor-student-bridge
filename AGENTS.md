# mentor-student-bridge 规范

## 项目概览

`mentor-student-bridge` 是一个研究生导师双选系统前端工程。当前主要覆盖四类体验：

- 学生端工作台：志愿填报、进度状态、待办和通知。
- 导师端工作台：招生发布、申请审核、面试安排和录取处理。
- 公开导师库：导师列表、搜索、网格/列表视图和导师详情。
- 创建编辑器：学生简历创建、学生志愿说明、导师主页信息、导师招生信息，采用编辑/预览和 AI Chat 辅助布局。

除非用户明确要求，本仓库中的任务默认只修改前端代码，不引入后端、数据库或真实 API。

## 技术栈与运行环境

- 包管理器：Bun，锁文件为 `frontend/bun.lock`。
- 开发服务器与构建：Vite 7。
- 应用框架：React 19、TanStack Start、TanStack Router、TanStack React Query。
- 样式系统：Tailwind CSS v4，入口为 `frontend/src/styles.css`。
- UI 基础：shadcn/Radix 组件位于 `frontend/src/components/ui`。
- 图标：优先使用 `lucide-react`。
- 部署相关：Cloudflare Vite plugin 与 `frontend/wrangler.jsonc`。
- Node 要求：Vite 7 需要 Node `20.19+` 或 `22.12+`。当前机器可用 Node `v22.17.1`，如果默认 `node` 是 16.x，运行前把 `~/.nvm/versions/node/v22.17.1/bin` 放到 `PATH` 前面。

常用命令在 `frontend/` 下运行：

```bash
bun install --frozen-lockfile
PATH=/Users/hybuzhy/.nvm/versions/node/v22.17.1/bin:$PATH bun run dev
PATH=/Users/hybuzhy/.nvm/versions/node/v22.17.1/bin:$PATH bun run build
PATH=/Users/hybuzhy/.nvm/versions/node/v22.17.1/bin:$PATH bun run lint
```

## 目录与代码约定

- `frontend/src/routes` 使用 TanStack Router 文件路由。新增页面优先新增或调整这里的 route 文件。
- `frontend/src/routeTree.gen.ts` 是生成文件，不要手工编辑。
- `frontend/src/components/home` 放工作台通用组件，例如侧栏、状态面板、待办、通知和快捷入口。
- `frontend/src/components/create` 放创建器与编辑/预览组件，保持左右分栏、Chat/Editor tab 的既有交互模式。
- `frontend/src/components/public` 放导师公开列表与详情入口组件。
- `frontend/src/components/ui` 是 shadcn/Radix 基础组件。优先复用，不做无关重写。
- `frontend/src/lib/mock` 存放当前 mock 数据和业务类型。接入真实 API 前，保持这些类型边界清晰，避免把 mock 字段散落到页面组件里。
- `frontend/src/lib/utils.ts` 提供 `cn`，组合 className 时优先使用它。
- `frontend/src/lib/useRole.ts` 根据 URL 前缀和 `localStorage` 推断 `student` / `mentor` 角色，涉及导航和角色切换时要保持这个约定。

## 前端实现规则

- 保持中文业务文案，除非现有 UI 模式使用英文短标签，例如 `Chat`、`Editor`。
- 新增路由使用 TanStack Router 的 `createFileRoute`，并按现有路径结构区分 `/student`、`/mentor`、`/student/public` 等业务区域。
- 页面 head/meta 可以在 route 内声明；新增正式页面时避免继续使用默认 Lovable 文案。
- 表单、输入、tab、按钮、选择器、弹窗等优先复用 `components/ui` 中的现有组件。
- 图标按钮和功能入口优先使用 `lucide-react`，避免手写 SVG，除非项目已有同类实现。
- 不要修改 `node_modules`、构建产物、`.vinxi`、`.output` 或 `dist`。
- 不要运行 `bun run format`，除非用户明确要求格式化整个前端工程；该命令会批量重写文件。

## 设计规则

- 这是面向学生和导师的工作型系统，界面应保持安静、清晰、信息密度合理，避免营销落地页、夸张 hero 或装饰性背景。
- 工作台页面优先使用可扫描的信息块：状态、待办、通知、快捷操作、进度概览。
- 创建器页面保持既有左右布局：左侧 Chat/Editor，右侧实时预览。不要把编辑器改成单列营销式页面。
- 卡片用于单个信息项、面板和工具区域；不要制造多层嵌套卡片。
- 响应式布局应照顾桌面和移动端，避免固定宽度导致中文文本溢出。
- 视觉风格应延续 `styles.css` 中的主题变量和现有 Tailwind class 组合。

## 数据与状态规则

- 当前项目没有真实后端调用，业务数据来自 `src/lib/mock`。
- 学生阶段、导师阶段、状态 badge 等枚举定义在 mock 类型中；新增状态前先扩展类型和标签映射。
- 编辑器页面当前使用本地 React state 和 `empty*` mock 初始值；不要假设数据已持久化。
- ChatPanel 当前是本地模拟回复，不要把它描述成真实 AI 接口，除非接入真实服务。
- 头像文件位于 `src/assets/avatars`，文件扩展名为 `.png`，但实际内容是 512x512 JPEG 数据；引用时按现有路径使用，不要因为 MIME 细节批量改名。

## 验证要求

完成前端相关改动后，至少运行：

```bash
PATH=/Users/hybuzhy/.nvm/versions/node/v22.17.1/bin:$PATH bun run lint
PATH=/Users/hybuzhy/.nvm/versions/node/v22.17.1/bin:$PATH bun run build
```

涉及界面、路由或样式时，还要启动本地服务并检查关键路由：

- `http://localhost:8080/student`
- `http://localhost:8080/mentor`
- `http://localhost:8080/student/public`
- `http://localhost:8080/student/create/resume`
- `http://localhost:8080/mentor/create/info`

如果验证失败，报告实际错误和已确认的环境条件，不要声称任务完成。


<claude-mem-context>
# Memory Context

# [mentor-student-bridge] recent context, 2026-05-17 5:02pm GMT+8

No previous sessions found.
</claude-mem-context>