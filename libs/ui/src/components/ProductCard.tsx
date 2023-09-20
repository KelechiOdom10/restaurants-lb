import type { FunctionComponent } from "preact";
import { useState } from "preact/hooks";

import ProductModal from "./ProductModal";

type ProductCardProps = {
  product: {
    id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    image: string;
  };
};

export const ProductCard: FunctionComponent<ProductCardProps> = ({
  product,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  return (
    <article
      className="mx-auto flex w-full max-w-xs flex-col overflow-hidden rounded-xl border border-slate-200 bg-white hover:cursor-pointer"
      onClick={openModal}
    >
      <img
        className="max-h-36 object-cover"
        src={product.image}
        alt={product.name}
      />
      <div className="flex items-start justify-between p-4">
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-normal text-gray-800">{product.name}</p>
          <p className="text-xs font-normal text-slate-500">
            {product.category}
          </p>
        </div>
        <p className="text-base font-medium leading-normal text-gray-800">
          ₦{product.price.toLocaleString()}
        </p>
      </div>

      <ProductModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        product={product}
      />
    </article>
  );
};
