'use client';

import clsx from "clsx";
import { ArrowRight } from "lucide-react";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  icon = false,
  className,
  ...props
}) {
  const variants = {
    primary:
      "bg-primary hover:bg-primary-dark text-white shadow-md py-3 px-4  rounded-md",

    secondary:
      "bg-gradient-trending  py-3 px-4  rounded-md hover:bg-white text-heading border border-border shadow-sm",

    outline:
      "bg-primary text-xs px-2 py-1 rounded-full border capitalize transition-colors bg-gradient-rose text-white border-transparent",

    ghost:
      "bg-background rounded-full text-xs border  px-2 py-1 text-heading hover:bg-card",
  };

  

  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-3 font-semibold transition-all duration-300",
        "active:scale-95",
        variants[variant],
        
        className
      )}
      {...props}
    >
      {children}

      {icon && (
        <ArrowRight
          size={20}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      )}
    </button>
  );
}