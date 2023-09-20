import type { FunctionalComponent } from "preact";

import type { Product } from "../../stores";

import { ProductCard } from "./ProductCard";

interface Props {
  products: Array<Product>;
}

export const ProductList: FunctionalComponent<Props> = ({ products }) => (
  <section className="mx-auto grid w-full max-w-8xl grid-cols-1 gap-7 p-8 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:px-0">
    {products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ))}
  </section>
);
