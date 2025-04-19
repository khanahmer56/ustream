import React, { useEffect } from "react";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./carousel";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";
import { Skeleton } from "./skeleton";
interface Props {
  value?: string | null;
  isLoding?: boolean;
  onSelect?: (value: string | null) => void;
  data: {
    value: string;
    label: string;
  }[];
}
const FilterCarorusel = ({ value, isLoding, onSelect, data }: Props) => {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);
  useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);
  return (
    <div className="relative w-full">
      <div
        className={cn(
          "absolute left-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none",
          current === 1 && "hidden"
        )}
      />
      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full px-12"
        setApi={setApi}
      >
        <CarouselContent className="-ml-3">
          {!isLoding && (
            <CarouselItem
              className="pl-3 basis-auto"
              onClick={() => onSelect?.(null)}
            >
              <Badge
                variant={value === null ? "default" : "secondary"}
                className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
              >
                All
              </Badge>
            </CarouselItem>
          )}
          {isLoding &&
            Array.from({ length: 14 }).map((_, index) => (
              <CarouselItem key={index} className="pl-3 basis-auto">
                <Skeleton className="rounded-lg px-3 py-3 h-full text-sm w-[100px] font-semibold" />
              </CarouselItem>
            ))}
          {!isLoding &&
            data.map((item) => (
              <CarouselItem
                key={item.value}
                className="pl-3 basis-auto"
                onClick={() => onSelect?.(item.value)}
              >
                <Badge
                  variant={value === item.value ? "default" : "secondary"}
                  className="rounded-lg px-3 py-1 cursor-pointer whitespace-nowrap text-sm"
                >
                  {item.label}
                </Badge>
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2" />
        <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2" />
      </Carousel>
      <div
        className={cn(
          "absolute right-12 top-0 bottom-0 w-12 z-10 bg-gradient-to-r from-transparent to-white pointer-events-none",
          current === count && "hidden"
        )}
      />
    </div>
  );
};

export default FilterCarorusel;
