import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/mentor/create/")({
  loader: () => {
    throw redirect({ to: "/mentor/create/info" });
  },
});
