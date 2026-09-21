import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionStyle,
} from "motion/react";
import { useCallback, type HTMLAttributes, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlassCardProps = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
} & Omit<
  HTMLAttributes<HTMLDivElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart" | "style"
>;

export function GlassCard({
  children,
  className,
  hover = true,
  onMouseMove,
  onMouseLeave,
  ...props
}: GlassCardProps) {
  const reduce = useReducedMotion();
  const enableTilt = hover && !reduce;
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [6, -6]), { stiffness: 300, damping: 20 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-6, 6]), { stiffness: 300, damping: 20 });

  const handleMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!enableTilt) return;
      const rect = event.currentTarget.getBoundingClientRect();
      mouseX.set((event.clientX - rect.left) / rect.width);
      mouseY.set((event.clientY - rect.top) / rect.height);
      event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
      event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
      onMouseMove?.(event);
    },
    [enableTilt, mouseX, mouseY, onMouseMove],
  );

  const handleLeave = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      mouseX.set(0.5);
      mouseY.set(0.5);
      onMouseLeave?.(event);
    },
    [mouseX, mouseY, onMouseLeave],
  );

  const tiltStyle: MotionStyle = {
    rotateX,
    rotateY,
    transformPerspective: 1100,
  };

  return (
    <motion.div
      style={enableTilt ? tiltStyle : {}}
      whileHover={enableTilt ? { y: -6 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={cn(
        "glass-panel card-spotlight group relative overflow-hidden rounded-2xl transform-gpu will-change-transform ring-1 ring-inset ring-white/90",
        hover && "hover:border-blue-300/60 hover:shadow-[0_20px_40px_rgba(37,99,235,0.08)]",
        className,
      )}
      {...props}
    >
      <div className="relative z-[2] flex h-full flex-col">{children}</div>
    </motion.div>
  );
}

export const GlassContainer = GlassCard;
