import type { FunctionalComponent } from "preact";

interface NumberInputProps {
  value: number;
  className?: string;
  onValueChange: (newValue: number) => void;
}

export const NumberInput: FunctionalComponent<NumberInputProps> = ({
  value,
  className,
  onValueChange,
}) => {
  const increment = () => {
    if (value < 50) {
      const newValue = value + 1;
      onValueChange(newValue);
    }
  };

  const decrement = () => {
    if (value > 1) {
      const newValue = value - 1;
      onValueChange(newValue);
    }
  };

  return (
    <div className={["product-quantity-input h-12", className].join(" ")}>
      <div className="relative mt-1 flex h-12 w-full flex-row overflow-hidden rounded-full bg-gray-100">
        <button
          data-action="decrement"
          className="h-full w-20 cursor-pointer rounded-l text-gray-600 outline-none"
          onClick={decrement}
        >
          <span className="m-4 text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          className="cursor-default flex w-full justify-center border-none bg-transparent text-center text-base font-medium leading-normal text-gray-800 outline-none focus:text-black focus:outline-none"
          name="product-quantity-input"
          value={value}
          min="1"
          disabled
        />
        <button
          data-action="increment"
          className="h-full w-20 cursor-pointer rounded-r text-gray-600"
          onClick={increment}
        >
          <span className="m-4 text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
};
