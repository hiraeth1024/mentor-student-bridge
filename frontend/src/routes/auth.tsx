import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Loader2, GraduationCap, Eye, EyeOff, Users, Sparkles, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import heroImg from "@/assets/auth-hero.jpg";
import previewImg from "@/assets/auth-preview.png";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

type Tab = "login" | "register";
type Role = "student" | "mentor";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { tab?: Tab } => ({
    tab: s.tab === "register" ? "register" : "login",
  }),
  head: () => ({
    meta: [
      { title: "登录 · 研究生导师双选系统" },
      { name: "description", content: "浙江工商大学信息与电子工程学院 研究生导师双选系统登录入口" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const { tab = "login" } = useSearch({ from: "/auth" });
  const navigate = useNavigate();
  const setTab = (v: string) =>
    navigate({ to: "/auth", search: { tab: v as Tab }, replace: true });

  return (
    <div className="min-h-screen bg-[--surface-muted-blue] md:flex">
      {/* Left hero */}
      <aside className="relative hidden md:block md:w-[45%] overflow-hidden bg-[rgb(40,133,239)]">
        <img
          src={heroImg}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-70"
        />

        {/* Floating product screenshot */}
        <img
          src={previewImg}
          alt="系统界面预览"
          className="pointer-events-none absolute -right-16 bottom-24 w-[78%] max-w-[640px] rotate-[-6deg] rounded-xl shadow-2xl ring-1 ring-white/15"
        />

        <div className="relative z-10 flex h-full flex-col justify-between p-10 text-white">
          <div>
            <div className="flex items-center gap-2 text-sm font-medium tracking-wide">
              <GraduationCap className="h-5 w-5" />
              <span>ZJSU · IEE</span>
            </div>
            <div className="mt-10">
              <h1 className="text-3xl font-semibold tracking-wide">研究生导师双选系统</h1>
              <p className="mt-3 text-sm text-white/80">浙江工商大学　信息与电子工程学院</p>
              <div className="mt-5 h-px w-12 bg-[--brand-accent-gold]" />
            </div>

            <ul className="mt-10 space-y-7 max-w-[300px]">
              <FeatureItem
                icon={<Users className="h-5 w-5" />}
                title="双向选择"
                desc="学生与导师双向志愿填报，全流程公开透明。"
              />
              <FeatureItem
                icon={<Sparkles className="h-5 w-5" />}
                title="智能匹配"
                desc="按研究方向、成果与名额智能推荐合适导师。"
              />
              <FeatureItem
                icon={<ShieldCheck className="h-5 w-5" />}
                title="全程留痕"
                desc="志愿、审核、沟通记录完整可追溯。"
              />
            </ul>
          </div>
          <p className="text-xs text-white/60">© {new Date().getFullYear()} 浙江工商大学信息与电子工程学院</p>
        </div>
      </aside>

      {/* Mobile banner */}
      <div className="relative h-40 w-full overflow-hidden md:hidden bg-[rgb(40,133,239)]">
        <img src={heroImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-70" />
        <div className="absolute inset-0 bg-[rgb(40,133,239)]/30" />
        <div className="relative z-10 flex h-full flex-col justify-end p-5 text-white">
          <h1 className="text-lg font-semibold">研究生导师双选系统</h1>
          <p className="text-xs text-white/80">浙江工商大学 信息与电子工程学院</p>
        </div>
      </div>

      {/* Right form */}
      <main className="flex flex-1 items-center justify-center px-5 py-10 md:px-10">
        <div className="w-full max-w-[460px]">
          <header className="mb-7">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-[--brand-academic] text-white shadow-sm">
              <GraduationCap className="h-6 w-6" />
            </div>
            <h2 className="text-2xl font-semibold tracking-tight text-foreground">
              {tab === "login" ? "欢迎登录导师双选系统" : "创建账号"}
            </h2>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {tab === "login"
                ? "请使用学号或工号登录，按角色进入对应工作台。"
                : "完善以下信息以注册账号，注册后可立即使用系统。"}
            </p>
          </header>

          <Tabs value={tab} onValueChange={setTab} className="w-full">
            <TabsList className="grid h-10 w-full grid-cols-2 bg-muted">
              <TabsTrigger value="login" className="h-8">登录</TabsTrigger>
              <TabsTrigger value="register" className="h-8">注册</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-6">
              <LoginForm />
            </TabsContent>
            <TabsContent value="register" className="mt-6">
              <RegisterForm onDone={() => setTab("login")} />
            </TabsContent>
          </Tabs>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            登录即代表同意 <a className="text-[--brand-academic] hover:underline" href="#">服务条款</a> 与{" "}
            <a className="text-[--brand-academic] hover:underline" href="#">隐私政策</a>
          </p>
        </div>
      </main>
    </div>
  );
}

/* ----------------------------- Feature Item ----------------------------- */

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <li className="flex gap-3">
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-white/10 text-white ring-1 ring-white/15 backdrop-blur-sm">
        {icon}
      </span>
      <div>
        <p className="text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-white/70">{desc}</p>
      </div>
    </li>
  );
}

/* ------------------------------ Role Select ------------------------------ */

function RoleSelect({ value, onChange }: { value: Role; onChange: (r: Role) => void }) {
  const options: { v: Role; label: string }[] = [
    { v: "student", label: "学生" },
    { v: "mentor", label: "导师" },
  ];
  return (
    <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-1">
      {options.map((o) => (
        <button
          key={o.v}
          type="button"
          onClick={() => onChange(o.v)}
          className={cn(
            "h-8 rounded-md text-sm font-medium transition-colors cursor-pointer",
            value === o.v
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/* ------------------------------- Field ----------------------------------- */

function Field({
  label,
  error,
  children,
  hint,
}: {
  label: string;
  error?: string;
  hint?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label className="text-sm text-foreground">{label}</Label>
        {hint}
      </div>
      {children}
      {error ? <p className="text-xs text-destructive">{error}</p> : null}
    </div>
  );
}

/* ------------------------------- Login ----------------------------------- */

const loginSchema = z.object({
  account: z.string().trim().min(1, "请输入学号/工号"),
  password: z.string().min(6, "密码至少 6 位"),
});

function LoginForm() {
  const [account, setAccount] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("student");
  const [remember, setRemember] = useState(true);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState<{ account?: string; password?: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = loginSchema.safeParse({ account, password });
    if (!res.success) {
      const fe: typeof errors = {};
      res.error.issues.forEach((i) => {
        fe[i.path[0] as keyof typeof errors] = i.message;
      });
      setErrors(fe);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("登录成功");
    navigate({ to: role === "student" ? "/student" : "/mentor" });
  };

  return (
    <form className="space-y-4" onSubmit={submit} noValidate>
      <Field label="账号 (学号 / 工号)" error={errors.account}>
        <Input
          className="h-10"
          placeholder="请输入学号或工号"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
          aria-invalid={!!errors.account}
        />
      </Field>

      <Field
        label="密码"
        error={errors.password}
        hint={
          <a className="text-xs text-[--brand-academic] hover:underline" href="#">
            忘记密码？
          </a>
        }
      >
        <div className="relative">
          <Input
            className="h-10 pr-10"
            type={show ? "text" : "password"}
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!errors.password}
          />
          <button
            type="button"
            onClick={() => setShow((s) => !s)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
            aria-label={show ? "隐藏密码" : "显示密码"}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </Field>

      <Field label="角色">
        <RoleSelect value={role} onChange={setRole} />
      </Field>

      <label className="flex cursor-pointer items-center gap-2 text-sm text-muted-foreground">
        <Checkbox
          checked={remember}
          onCheckedChange={(v) => setRemember(v === true)}
        />
        记住登录
      </label>

      <Button
        type="submit"
        disabled={loading}
        className="h-10 w-full bg-[--brand-academic] text-white hover:bg-[--brand-academic]/90"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "登 录"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        还没有账号？{" "}
        <Link
          to="/auth"
          search={{ tab: "register" }}
          className="text-[--brand-academic] hover:underline"
        >
          立即注册
        </Link>
      </p>
    </form>
  );
}

/* ------------------------------ Register --------------------------------- */

const registerSchema = z
  .object({
    name: z.string().trim().min(1, "请输入姓名").max(40),
    account: z.string().trim().min(1, "请输入学号/工号"),
    email: z.string().trim().email("邮箱格式不正确"),
    phone: z.string().regex(/^\d{11}$/, "请输入 11 位手机号"),
    password: z.string().min(6, "密码至少 6 位"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "两次输入的密码不一致",
  });

function RegisterForm({ onDone }: { onDone: () => void }) {
  const [form, setForm] = useState({
    name: "",
    account: "",
    email: "",
    phone: "",
    password: "",
    confirm: "",
  });
  const [role, setRole] = useState<Role>("student");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const upd =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = registerSchema.safeParse(form);
    if (!res.success) {
      const fe: Record<string, string> = {};
      res.error.issues.forEach((i) => {
        const k = i.path[0] as string;
        if (!fe[k]) fe[k] = i.message;
      });
      setErrors(fe);
      return;
    }
    setErrors({});
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    toast.success("注册成功，请登录");
    onDone();
  };

  return (
    <form className="space-y-4" onSubmit={submit} noValidate>
      <div className="grid grid-cols-2 gap-3">
        <Field label="姓名" error={errors.name}>
          <Input className="h-10" value={form.name} onChange={upd("name")} placeholder="真实姓名" aria-invalid={!!errors.name} />
        </Field>
        <Field label="学号 / 工号" error={errors.account}>
          <Input className="h-10" value={form.account} onChange={upd("account")} placeholder="学校 ID" aria-invalid={!!errors.account} />
        </Field>
      </div>

      <Field label="邮箱" error={errors.email}>
        <Input className="h-10" type="email" value={form.email} onChange={upd("email")} placeholder="name@zjsu.edu.cn" aria-invalid={!!errors.email} />
      </Field>

      <Field label="手机号" error={errors.phone}>
        <Input className="h-10" inputMode="numeric" maxLength={11} value={form.phone} onChange={upd("phone")} placeholder="11 位手机号" aria-invalid={!!errors.phone} />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="密码" error={errors.password}>
          <Input className="h-10" type="password" value={form.password} onChange={upd("password")} placeholder="至少 6 位" aria-invalid={!!errors.password} />
        </Field>
        <Field label="确认密码" error={errors.confirm}>
          <Input className="h-10" type="password" value={form.confirm} onChange={upd("confirm")} placeholder="再次输入" aria-invalid={!!errors.confirm} />
        </Field>
      </div>

      <Field label="角色">
        <RoleSelect value={role} onChange={setRole} />
      </Field>

      <Button
        type="submit"
        disabled={loading}
        className="h-10 w-full bg-[--brand-academic] text-white hover:bg-[--brand-academic]/90"
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "注 册"}
      </Button>

      <p className="text-center text-xs text-muted-foreground">
        已有账号？{" "}
        <Link to="/auth" search={{ tab: "login" }} className="text-[--brand-academic] hover:underline">
          返回登录
        </Link>
      </p>
    </form>
  );
}
