import { Dialog } from "@headlessui/react";
import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

import { Product, addToCart } from "../../stores";
import { Button } from "../common/Button";
import { NumberInput } from "../common/NumberInput";

type ProductModalProps = {
  product: Product;
  isOpen: boolean;
  closeModal: () => void;
};

const ProductModal: FunctionalComponent<ProductModalProps> = ({
  product,
  isOpen,
  closeModal,
}) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
    closeModal();
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  return (
    <Dialog
      as="div"
      open={isOpen}
      onClose={closeModal}
      className="fixed bottom-0 z-30 flex items-center justify-center overflow-y-auto md:inset-0"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      {/* Modal content */}
      <Dialog.Panel className="relative w-full max-w-2xl rounded-t-xl bg-white md:rounded-xl">
        {/* Modal header */}
        <header className="flex h-20 items-center justify-between rounded-t border-b p-4">
          <button
            type="button"
            className="ml-auto inline-flex h-12 w-12 items-center justify-center gap-2 rounded-full bg-gray-100 text-black"
            onClick={closeModal}
          >
            <svg
              width="16"
              height="17"
              viewBox="0 0 16 17"
              className="h-5 w-5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="x-close">
                <path
                  id="Vector"
                  d="M3.33333 13.6366L12.6667 4.30322M3.33333 4.30322L12.6667 13.6366L3.33333 4.30322Z"
                  stroke="#433955"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </header>

        {/* Modal body */}
        <div className="flex flex-col space-y-4">
          <img
            className="max-h-48 w-full object-cover xs:max-h-60 xs:min-h-[200px]"
            src={product.image}
            alt={product.title}
          />
          <div className="flex items-start justify-between p-4">
            <div className="flex flex-col space-y-2 text-base leading-normal text-gray-800">
              <Dialog.Title
                as="p"
                className="line-clamp-2 max-w-[200px] font-normal"
              >
                {product.title}
              </Dialog.Title>
              <p className="text-sm text-slate-500">{product.category}</p>
            </div>
            <p className="text-lg font-medium">
              ₦{product.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Modal footer */}
        <footer className="grid grid-cols-2 gap-4 px-4 pb-8 pt-6">
          <NumberInput value={quantity} onValueChange={handleQuantityChange} />
          <Button fullWidth onClick={handleAddToCart}>
            Add to cart
          </Button>
        </footer>
      </Dialog.Panel>
    </Dialog>
  );
};

export default ProductModal;
