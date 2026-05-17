import { Link, useRouterState } from "@tanstack/react-router";
import {
  Home,
  PlusSquare,
  Globe2,
  Mail,
  MessageSquareHeart,
  HelpCircle,
  GraduationCap,
  UserRound,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { setStoredRole, useRole } from "@/lib/useRole";

const items = [
  { title: "Home", url: "/", icon: Home, match: ["/", "/student", "/mentor"] },
  { title: "Create", url: "/create", icon: PlusSquare, prefix: "create" },
  { title: "Public", url: "/public", icon: Globe2, prefix: "public" },
  { title: "Cover", url: "/cover", icon: Mail },
  { title: "Feedback", url: "/feedback", icon: MessageSquareHeart },
  { title: "Help", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const role = useRole();
  const homeHref = role === "mentor" ? "/mentor" : "/student";
  const createHref =
    role === "mentor" ? "/mentor/create/info" : "/student/create/resume";
  const publicHref = role === "student" ? "/student/public" : "/public";

  const isActive = (item: (typeof items)[number] & { prefix?: string }) => {
    if (item.match) return item.match.includes(path);
    if (item.prefix === "create") return path.includes("/create");
    if (item.prefix === "public") return path === "/public" || path.startsWith("/student/public");
    if (item.prefix) return path.startsWith(item.prefix);
    return path === item.url;
  };

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="border-b px-3 py-4">
        <Link to={homeHref} className="flex items-center gap-2 px-1">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <GraduationCap className="h-4 w-4" />
          </div>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-semibold tracking-tight">双选系统</span>
            <span className="text-[10px] text-muted-foreground">Mentor · Student</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="px-2 py-2">
            <div className="mb-2 grid grid-cols-2 gap-1 rounded-lg bg-muted p-1 group-data-[collapsible=icon]:hidden">
              <Link
                to="/student"
                onClick={() => setStoredRole("student")}
                className={cn(
                  "rounded-md px-2 py-1 text-center text-xs font-medium transition-colors",
                  role === "student" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
                )}
              >
                学生端
              </Link>
              <Link
                to="/mentor"
                onClick={() => setStoredRole("mentor")}
                className={cn(
                  "rounded-md px-2 py-1 text-center text-xs font-medium transition-colors",
                  role === "mentor" ? "bg-card text-foreground shadow-sm" : "text-muted-foreground",
                )}
              >
                导师端
              </Link>
            </div>
            <SidebarMenu>
              {items.map((item) => {
                const href =
                  item.title === "Home"
                    ? homeHref
                    : item.title === "Create"
                      ? createHref
                      : item.title === "Public"
                        ? publicHref
                        : item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item)} tooltip={item.title}>
                      <Link to={href} className="flex items-center gap-2">
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t p-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-accent-foreground">
            <UserRound className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
            <p className="truncate text-xs font-medium">{role === "mentor" ? "李教授" : "Phanindra"}</p>
            <p className="truncate text-[10px] text-muted-foreground">
              {role === "mentor" ? "计算机学院" : "2026 届硕士"}
            </p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
