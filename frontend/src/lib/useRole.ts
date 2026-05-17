import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

export type Role = "student" | "mentor";

const KEY = "app.role";

function readStored(): Role | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  return v === "mentor" || v === "student" ? v : null;
}

export function setStoredRole(role: Role) {
  if (typeof window !== "undefined") window.localStorage.setItem(KEY, role);
}

/** Resolve current role from URL prefix, falling back to localStorage. */
export function useRole(): Role {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [stored, setStored] = useState<Role | null>(() => readStored());

  useEffect(() => {
    if (path.startsWith("/mentor")) {
      setStoredRole("mentor");
      setStored("mentor");
    } else if (path.startsWith("/student")) {
      setStoredRole("student");
      setStored("student");
    }
  }, [path]);

  if (path.startsWith("/mentor")) return "mentor";
  if (path.startsWith("/student")) return "student";
  return stored ?? "student";
}
