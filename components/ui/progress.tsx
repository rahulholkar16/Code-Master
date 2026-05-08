import * as React from "react";

import { cn } from "@/lib/utils";

interface ProgressProps extends React.ComponentProps<"div"> {
  value?: number;
}

function Progress({ value = 0, className, children, ...props }: ProgressProps) {
  const boundedValue = Math.min(100, Math.max(0, value));

  return (
    <div
      data-slot="progress"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={boundedValue}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    >
      {children ?? (
        <div
          className="h-full rounded-full bg-primary transition-all"
          style={{ width: `${boundedValue}%` }}
        />
      )}
    </div>
  );
}

export { Progress };
