import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const Badge = ({ children, className, variant = "default" }) => {
  const variants = {
    default: "bg-white/10 text-white border-white/20",
    accent: "bg-trexx-red text-white border-trexx-red",
    outline: "bg-transparent text-white border-white/40",
    sale: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
  };

  return (
    <span
      className={twMerge(
        "px-2 py-1 text-[10px] font-bold uppercase tracking-wider border rounded-sm backdrop-blur-sm",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
};

export default Badge;
