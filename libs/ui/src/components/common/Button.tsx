import type { FunctionComponent } from "preact";
import type { JSX } from "preact/jsx-runtime";

interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  fullWidth?: boolean;
  className?: string;
}

export const Button: FunctionComponent<Props> = ({
  fullWidth,
  className,
  ...props
}) => (
  <button
    {...props}
    className={[
      "inline-flex text-white text-base font-medium items-center bg-neutral-900 justify-center gap-1 border border-slate-200 rounded-full py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed w-fit",
      fullWidth ? "w-full" : "",
      className,
    ]
      .filter(Boolean)
      .join(" ")}
  >
    {props.children}
  </button>
);
