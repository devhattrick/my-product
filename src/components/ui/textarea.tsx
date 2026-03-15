import { forwardRef } from "react";
import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

const Textarea = forwardRef<
  HTMLTextAreaElement,
  TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "flex min-h-28 w-full rounded-[1.5rem] border border-slate-200 bg-white/90 px-4 py-3 text-sm leading-6 text-slate-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] transition placeholder:text-slate-400 focus-visible:border-slate-400",
        className,
      )}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea };
