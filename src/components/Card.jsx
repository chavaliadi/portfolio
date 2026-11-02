import React from "react";

const Card = ({ children, className = "", as: Component = "div", ...props }) => {
  return (
    <Component
      className={`bg-surface-raised border border-surface-border rounded-2xl transition-all duration-300 hover:border-accent-primary/40 hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Card;
