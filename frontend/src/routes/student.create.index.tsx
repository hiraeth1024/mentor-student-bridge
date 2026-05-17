import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/student/create/")({
  loader: () => {
    throw redirect({ to: "/student/create/resume" });
  },
});
