"use client";

import { trpc } from "@/trpc/client";
import React from "react";

export const dynamic = "force-dynamic";

const PageClient = () => {
  const [data] = trpc.categories.getMany.useSuspenseQuery();
  return <div>{JSON.stringify(data, null, 2)}</div>;
};

export default PageClient;
