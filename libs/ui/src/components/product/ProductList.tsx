import type { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

import type { Product } from "../../stores";

import { ProductCard } from "./ProductCard";

interface Props {
  products: Array<Product>;
}

export const ProductList: FunctionalComponent<Props> = ({ products }) => {
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    const handleUrlChange = () => {
      if (typeof window !== "undefined") {
        const searchParams = new URLSearchParams(window.location.search);
        const categoryParam = decodeURIComponent(
          searchParams.get("category") || "all-categories"
        )
          .replace(/-/g, " ")
          .toLowerCase();
        const searchParam = decodeURIComponent(
          searchParams.get("search") || ""
        ).toLowerCase();

        const filteredProducts = products.filter((product) => {
          const categoryMatch =
            categoryParam === "all categories" ||
            product.category.toLowerCase() === categoryParam;
          const searchMatch =
            searchParam === "" ||
            product.title.toLowerCase().includes(searchParam) ||
            product.description.toLowerCase().includes(searchParam) ||
            product.category.toLowerCase().includes(searchParam);

          return categoryMatch && searchMatch;
        });

        setFilteredProducts(filteredProducts);
      }
    };

    // Add the event listener to handle URL changes
    window.addEventListener("popstate", handleUrlChange);

    // Call the initial URL change handler
    handleUrlChange();
  }, [products]);

  return (
    <section className="mx-auto grid w-full max-w-8xl grid-cols-1 gap-7 p-8 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:px-0">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};
