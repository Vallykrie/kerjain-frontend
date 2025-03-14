import { BootcampCard, BootcampType } from "./bootcamp-card";
import { cn } from "@/lib/utils";

interface BootcampGridProps {
  bootcamps: BootcampType[];
  className?: string;
}

export function BootcampGrid({ bootcamps, className }: BootcampGridProps) {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6", className)}>
      {bootcamps.map((bootcamp) => (
        <BootcampCard key={bootcamp.id} bootcamp={bootcamp} />
      ))}
    </div>
  );
}