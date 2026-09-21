import { motion } from "motion/react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ShimmerButton({
  children,
  href,
  className,
  onClick,
}: {
  children: ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="animate-shine absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/40 to-transparent" />
      </span>
      <span className="relative z-[1] inline-flex items-center gap-2">{children}</span>
    </>
  );

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -1 }}
      whileTap={{ scale: 0.98 }}
      className={cn("relative", className?.includes("w-full") && "w-full")}
    >
      {href ? (
        <Button variant="luminous" className={cn("relative overflow-hidden", className)} asChild>
          <a href={href} onClick={onClick}>
            {inner}
          </a>
        </Button>
      ) : (
        <Button
          variant="luminous"
          className={cn("relative overflow-hidden", className)}
          onClick={onClick}
        >
          {inner}
        </Button>
      )}
    </motion.div>
  );
}
