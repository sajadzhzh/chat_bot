"use client"

import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, MouseEventHandler } from "react";

export default function Button({
  text,
  style,
  pending = false,
  onClick,
  href,
  type = "button",
}: {
  text: string;
  style: string;
  pending?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  href?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}) {

  const router = useRouter()

  const handleClick = (e: any) => {
    if (href) {
      router.push(href);
    }
    onClick?.(e);
  };
  return (
    <button
      className={style}
      disabled={pending}
      onClick={handleClick}
      type={type}
    >
      {text}
    </button>
  );
}
