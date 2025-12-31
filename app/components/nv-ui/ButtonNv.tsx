import React from "react";
import "@fontsource/poppins";

interface ButtonProps {
  variant?: "primary" | "secondary" | "no-bg" | "dark";
  link?: string;
  className?: string;
  children?: React.ReactNode;
  buttonTextColor?: "dark" | "light";
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

export const ButtonNv: React.FC<ButtonProps> = ({
  variant = "primary",
  link,
  className = "",
  children,
  buttonTextColor = "dark",
  onClick,
  type = "button",
  disabled = false,
}) => {
  const base = `rounded-[10px] focus:outline-none  items-center justify-center cursor-pointer text-${buttonTextColor}`;
  const variantStyles =
    variant === "primary"
      ? "bg-primary px-4 lg:px-4 py-2 inline-flex hover:bg-dark border-y-2 md:border-2 border-transparent hover:text-primary hover:border-primary transition duration-300 ease-in-out font-extrabold"
      : variant === "secondary"
      ? "bg-gray-200 px-4 hover:bg-gray-300 inline-flex  font-bold"
      : variant === "no-bg"
      ? "bg-transparent  hover:text-gray-300 font-semibold"
      : variant === "dark"
      ? "bg-dark inline-flex font-bold"
      : "";

  const finalClass = `${base} ${variantStyles} ${
    disabled ? "opacity-50 pointer-events-none" : ""
  }`;

  if (link && !disabled) {
    return (
      <a
        href={link}
        onClick={onClick}
        className={`${finalClass} whitespace-nowrap ${className}`}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${finalClass} ${className}`}
    >
      {children}
    </button>
  );
};
