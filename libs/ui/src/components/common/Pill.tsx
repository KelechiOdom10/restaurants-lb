import type { FunctionalComponent } from "preact";
import type { JSX } from "preact/jsx-runtime";

interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  active?: boolean;
  className?: string;
}

export const Pill: FunctionalComponent<Props> = ({
  className,
  variant = "primary",
  active,
  ...props
}) => {
  const buttonClasses = [
    "inline-flex text-gray-800 text-xs font-medium items-center bg-white justify-center gap-1 border border-slate-200 rounded-full px-3 py-2 shadow-inner whitespace-nowrap",
    variant === "primary" && active ? "bg-yellow-300 border-none" : "",
    variant === "secondary" && active
      ? "bg-neutral-900 border-none text-white"
      : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button {...props} class={buttonClasses}>
      {props.children}
    </button>
  );
};
