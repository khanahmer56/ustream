"use client";
import FilterCarorusel from "@/components/ui/filter-carousel";
import { trpc } from "@/trpc/client";
import { useRouter } from "next/navigation";
import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const CategorySection = ({ categoryId }: { categoryId?: string }) => {
  return (
    <Suspense
      fallback={<FilterCarorusel isLoding data={[]} onSelect={() => {}} />}
    >
      <ErrorBoundary fallback={<div>Something went wrong</div>}>
        <CategorySectionSuspence categoryId={categoryId} />
      </ErrorBoundary>
    </Suspense>
  );
};

const CategorySectionSuspence = ({ categoryId }: { categoryId?: string }) => {
  const [categories] = trpc.categories.getMany.useSuspenseQuery();
  const router = useRouter();
  const data = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));
  const onSelect = (value: string | null) => {
    const url = new URL(window.location.href);
    if (value) {
      url.searchParams.set("categoryId", value);
    } else {
      url.searchParams.delete("categoryId");
    }
    router.push(url.toString());
  };
  return (
    <div>
      <FilterCarorusel value={categoryId} data={data} onSelect={onSelect} />
    </div>
  );
};
export default CategorySection;
