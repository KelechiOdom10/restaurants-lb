import type { FunctionalComponent } from "preact";
import { useEffect, useState } from "preact/hooks";

import { Pill } from "../common/Pill";

interface CategoryFilterProps {
  categories: string[];
}

export const CategoriesFilter: FunctionalComponent<CategoryFilterProps> = ({
  categories,
}) => {
  const [activeCategory, setActiveCategory] = useState(`all-categories`);

  useEffect(() => {
    const handleSetActiveCategory = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const categoryParam = decodeURIComponent(
        searchParams.get("category") || "all-categories"
      )
        .replace(/-/g, " ")
        .toLowerCase();
      setActiveCategory(categoryParam);
    };

    // Add a popstate event listener to handle back/forward button clicks
    window.addEventListener("popstate", handleSetActiveCategory);

    // Call the initial popstate handler to set the active category on page load
    handleSetActiveCategory();
  }, []);

  // Function to handle category selection
  const handleCategoryClick = (category: string) => {
    if (typeof window !== "undefined") {
      const searchParams = new URLSearchParams(window.location.search);
      const lowerCaseCategory = category.toLowerCase();
      const encodedCategory = encodeURIComponent(
        lowerCaseCategory.replace(/ /g, "-")
      );
      searchParams.set("category", encodedCategory);
      // Update the URL with the selected category
      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
      window.history.pushState({}, "", newUrl);
      window.dispatchEvent(new Event("popstate"));
      setActiveCategory(lowerCaseCategory);
    }
  };

  return (
    <section class="sticky inset-0 top-[121px] z-10 w-full bg-white px-8 py-4 shadow md:static md:pt-16 md:shadow-none">
      <div class="mx-auto flex max-w-8xl flex-nowrap items-center justify-start space-x-4 overflow-x-auto md:justify-center">
        {categories.map((category) => {
          const active = activeCategory === category.toLowerCase();
          return (
            <Pill
              key={category}
              active={active}
              onClick={() => handleCategoryClick(category)}
              aria-label={`Category ${category}`}
            >
              {category}
            </Pill>
          );
        })}
      </div>
    </section>
  );
};
