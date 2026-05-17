import { createFileRoute } from "@tanstack/react-router";
import { CreateLayout } from "@/components/create/CreateLayout";

export const Route = createFileRoute("/mentor/create")({
  component: CreateLayout,
});
