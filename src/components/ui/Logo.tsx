import React from "react";
import Logomemory from "../../pages/Logomemory.png";

interface LogoProps {
  variant?: "full" | "compact" | "icon";
  className?: string;
  theme?: "light" | "dark";
}

export const Logo: React.FC<LogoProps> = ({
  variant = "full",
  className = "",
}) => {
  // ...existing code...

  let imgSize = "h-24";
  if (variant === "icon") imgSize = "h-16";
  if (variant === "compact") imgSize = "h-20";
  return (
    <img
      src={Logomemory}
      alt="Logo"
      className={`object-contain ${imgSize} ${className}`}
      style={{
        maxWidth: variant === "compact" ? 180 : variant === "icon" ? 100 : 240,
      }}
    />
  );
};
