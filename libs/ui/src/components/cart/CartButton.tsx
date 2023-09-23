import { useStore } from "@nanostores/preact";
import type { FunctionalComponent } from "preact";
import { useState } from "preact/hooks";

import { totalQuantity } from "../../stores";

import { CartDrawer } from "./CartDrawer";

export const CartButton: FunctionalComponent = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const totalItems = useStore(totalQuantity);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  return (
    <button
      type="button"
      class="relative flex items-center justify-center"
      onClick={openDrawer}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M2.5 1C1.94772 1 1.5 1.44772 1.5 2C1.5 2.55228 1.94772 3 2.5 3C3.22842 3 3.86479 3.52928 3.99581 4.274L4.68169 8.17269L4.6823 8.17614L5.12175 10.6321C5.3966 12.1681 5.61607 13.3948 5.89356 14.3692C6.17972 15.3741 6.5506 16.2009 7.18052 16.8996C7.61316 17.3796 8.11937 17.7904 8.68037 18.1183C9.49306 18.5932 10.389 18.8024 11.4541 18.9025C12.4918 19 13.778 19 15.3983 19H15.8909C16.6115 19 17.2056 19 17.695 18.9644C18.2049 18.9273 18.6689 18.8482 19.1192 18.6563C19.7758 18.3764 20.3509 17.9363 20.7865 17.3748C21.0872 16.9871 21.275 16.5597 21.4289 16.0822C21.5758 15.6266 21.7098 15.065 21.8707 14.3902L21.891 14.3051C22.1357 13.2795 22.3357 12.4415 22.4325 11.7573C22.5321 11.0532 22.543 10.391 22.3163 9.75271C21.9976 8.85541 21.3703 8.09999 20.5496 7.60785C19.9714 7.26118 19.3175 7.12553 18.5922 7.062C17.884 6.99998 16.9965 6.99999 15.9014 7H6.5061L5.96556 3.92747C5.66894 2.24144 4.21434 1 2.5 1ZM15.8547 9C17.0076 9 17.8071 9.0009 18.4177 9.05437C19.0212 9.10723 19.3229 9.20432 19.5211 9.32315C19.9536 9.58247 20.2721 9.97292 20.4316 10.4221C20.5012 10.6179 20.533 10.9061 20.4522 11.4771C20.3701 12.0572 20.1931 12.8036 19.9341 13.8892C19.7621 14.6103 19.6456 15.0958 19.5254 15.4686C19.4096 15.8278 19.3105 16.0145 19.2062 16.1489C18.9831 16.4365 18.6839 16.6677 18.3349 16.8165C18.1668 16.8881 17.946 16.9409 17.5499 16.9697C17.1416 16.9994 16.6204 17 15.8547 17H15.4487C13.7668 17 12.5745 16.999 11.6413 16.9113C10.7248 16.8251 10.1517 16.6617 9.68952 16.3915C9.30434 16.1664 8.95926 15.8858 8.66601 15.5605C8.31783 15.1743 8.05826 14.6683 7.81709 13.8214C7.57039 12.9551 7.36748 11.8278 7.08111 10.2274L6.86148 9H15.8547Z"
          fill="black"
        />
        <path
          d="M10.5 20.75C10.5 21.4404 9.94036 22 9.25 22C8.55964 22 8 21.4404 8 20.75C8 20.0596 8.55964 19.5 9.25 19.5C9.94036 19.5 10.5 20.0596 10.5 20.75Z"
          fill="black"
        />
        <path
          d="M18.25 22C18.9404 22 19.5 21.4404 19.5 20.75C19.5 20.0596 18.9404 19.5 18.25 19.5C17.5596 19.5 17 20.0596 17 20.75C17 21.4404 17.5596 22 18.25 22Z"
          fill="black"
        />
      </svg>
      <span class="sr-only">Cart Icon with total</span>
      <div class="absolute -right-2 -top-2 inline-flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-red-500 text-xs font-bold text-white">
        {totalItems}
      </div>

      <CartDrawer
        isOpen={isDrawerOpen}
        closeDrawer={() => setIsDrawerOpen(false)}
      />
    </button>
  );
};
