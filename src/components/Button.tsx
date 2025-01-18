import React, { FC, ReactNode, ButtonHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

const Button: FC<{
  variant: "primary" | "secondary" | "text";
  iconAfter?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>> = ({ variant, iconAfter, className, children, ...rest }) => {
  const buttonClass = twMerge(
    "h-11 px-6 rounded-xl border border-red-orange-500 uppercase inline-flex items-center gap-2 transition duration-500 relative",
    variant === "primary" && "bg-red-orange-500 text-white",
    variant === "secondary" && "hover:bg-red-orange-500 hover:text-white",
    variant === "text" && "h-auto px-0 border-transparent after:transparent-all after:duration-500 after:content-[''] after:h-px after:w-0 after:absolute after:top-full after:bg-red-orange-500 hover:after:w-full",
    className // Ensure any external className passed via props is applied
  );

  return (
    <button
      className={buttonClass}
      {...rest}
    >
      <span>{children}</span>
      {iconAfter && <span>{iconAfter}</span>}
    </button>
  );
};

export default Button;
