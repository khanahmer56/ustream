import { HydrateClient, trpc } from "@/trpc/server";
import React, { Suspense } from "react";
import PageClient from "./client";
import { ErrorBoundary } from "react-error-boundary";
import HomeView from "@/modules/home/ui/views/HomeView";

interface PageProps {
  searchParams: Promise<{ categoryId?: string }>;
}
const page = async ({ searchParams }: PageProps) => {
  void trpc.categories.getMany.prefetch();
  return (
    <HydrateClient>
      <HomeView categoryId={searchParams.categoryId} />
    </HydrateClient>
  );
};

export default page;
