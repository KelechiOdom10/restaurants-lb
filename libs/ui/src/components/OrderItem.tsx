import { useState } from "preact/hooks";
import type { CartItem } from "../stores";
import { NumberInput } from "./NumberInput";

interface OrderItemProps {
  item: CartItem;
  handleUpdateQuantity: (value: number) => void;
  handleRemoveItem: () => void;
}

export const OrderItem = ({
  item,
  handleRemoveItem,
  handleUpdateQuantity,
}: OrderItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleInputButtonClick = (newQuantity: number) => {
    setQuantity(newQuantity);
    handleUpdateQuantity(newQuantity);
  };

  return (
    <article class="flex w-full max-w-sm flex-col space-y-4 overflow-hidden bg-white">
      <div class="flex items-stretch space-x-4">
        <img
          class="h-16 w-24 rounded-xl object-cover"
          src={item.image}
          alt={item.name}
        />
        <div class="flex flex-col items-start space-y-4">
          <p class="text-sm text-gray-600">{item.name}</p>
          <p class="text-base font-medium text-gray-800">
            ₦{item.price.toLocaleString()}
          </p>
        </div>
      </div>

      <div class="flex items-center justify-between py-4">
        <button
          type="button"
          class="inline-flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-gray-100 text-black"
          onClick={handleRemoveItem}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="vuesax/linear/trash">
              <g id="trash">
                <path
                  id="Vector"
                  d="M14 3.98667C11.78 3.76667 9.54667 3.65334 7.32 3.65334C6 3.65334 4.68 3.72 3.36 3.85334L2 3.98667"
                  stroke="#565C69"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  id="Vector_2"
                  d="M5.66666 3.31334L5.81332 2.44001C5.91999 1.80668 5.99999 1.33334 7.12666 1.33334H8.87332C9.99999 1.33334 10.0867 1.83334 10.1867 2.44668L10.3333 3.31334"
                  stroke="#565C69"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  id="Vector_3"
                  d="M12.5667 6.09334L12.1333 12.8067C12.06 13.8533 12 14.6667 10.14 14.6667H5.86C4 14.6667 3.94 13.8533 3.86667 12.8067L3.43333 6.09334"
                  stroke="#565C69"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  id="Vector_4"
                  d="M6.88667 11H9.10667"
                  stroke="#565C69"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
                <path
                  id="Vector_5"
                  d="M6.33334 8.33334H9.66668"
                  stroke="#565C69"
                  stroke-width="1.2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </g>
            </g>
          </svg>
        </button>
        <NumberInput
          value={quantity}
          className="w-40"
          onValueChange={handleInputButtonClick}
        />
      </div>
    </article>
  );
};
