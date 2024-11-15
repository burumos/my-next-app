"use client";

import React from "react";
import { useFormStatus } from "react-dom";

type ButtonProps = React.HTMLAttributes<HTMLButtonElement>;

export const SubmitButton: React.FC<ButtonProps> = ({
  children,
  className,
  ...args
}) => {
  const { pending } = useFormStatus();
  return (
    <>
      <button
        {...{
          ...args,
          type: "submit",
          disabled: pending,
          "aria-disabled": pending,
          className: (pending ? "opacity-40 " : "") + (className || ""),
        }}
      >
        {children}
      </button>
    </>
  );
};
