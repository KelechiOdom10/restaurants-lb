import { useState } from "preact/hooks";
import type { JSX } from "preact/jsx-runtime";

interface NumberInputProps {
  defaultValue?: number;
  className?: string;
  inputProps?: JSX.HTMLAttributes<HTMLInputElement>;
  onClickAdd?: (value: number) => void;
  onClickSubtract?: (value: number) => void;
}

export const NumberInput = ({
  defaultValue = 1,
  className,
  inputProps,
  onClickAdd,
  onClickSubtract,
}: NumberInputProps) => {
  const [value, setValue] = useState(defaultValue);

  const increment = () => {
    if (value < 50) {
      const newValue = value + 1;
      setValue(newValue);
      onClickAdd?.(newValue);
    }
  };
  const decrement = () => {
    if (value > 0) {
      const newValue = value - 1;
      setValue(newValue);
      onClickSubtract?.(newValue);
    }
  };

  return (
    <div class={`product-quantity-input h-12 ${className}`}>
      <div class="relative mt-1 flex h-12 w-full flex-row overflow-hidden rounded-full bg-gray-100">
        <button
          data-action="decrement"
          class="h-full w-20 cursor-pointer rounded-l text-gray-600 outline-none"
          onClick={decrement}
        >
          <span class="m-4 text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          class="cursor-default flex w-full justify-center border-none bg-transparent text-center text-base font-medium leading-normal text-gray-800 outline-none focus:text-black focus:outline-none"
          name="product-quantity-input"
          value={value}
          min="1"
          disabled
          {...inputProps}
        />
        <button
          data-action="increment"
          class="h-full w-20 cursor-pointer rounded-r text-gray-600"
          onClick={increment}
        >
          <span class="m-4 text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
};
