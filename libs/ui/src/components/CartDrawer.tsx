import { useStore } from "@nanostores/preact";
import {
  isAddingToCart,
  removeItemFromCart,
  shoppingCart,
  subscribeToShoppingCartChange,
  updateCartItem,
} from "../stores";
import { OrderItem } from "./OrderItem";
import { useEffect, useState } from "preact/hooks";
import { CartEmpty } from "./CartEmpty";

export const CartDrawer = () => {
  const addingToCart = useStore(isAddingToCart);
  const cart = useStore(shoppingCart);
  const [cartItems, setCartItems] = useState(cart);

  useEffect(() => {
    subscribeToShoppingCartChange((val) => {
      setCartItems([...val]);
    });
  }, [addingToCart]);

  const handleRemoveItem = (id: string) => {
    removeItemFromCart(id);
    subscribeToShoppingCartChange((val) => {
      setCartItems([...val]);
    });
  };

  const handleUpdateQuantity = (id: string, value: number) => {
    updateCartItem(id, value);
    subscribeToShoppingCartChange((val) => {
      setCartItems([...val]);
    });
  };

  const subTotal = cartItems
    .reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0)
    .toLocaleString();

  return (
    <div
      id="drawer-cart-checkout"
      class="fixed inset-y-0 left-auto right-0 z-40 float-right hidden h-screen w-full translate-x-full bg-white transition-transform xs:max-w-sm"
      tabIndex={-1}
      aria-labelledby="drawer-label"
      aria-hidden="true"
    >
      {/* <!-- Drawer Header --> */}
      <header class="sticky inset-0 flex items-center space-x-28 border-b p-4 shadow md:space-x-[120px]">
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center gap-2 rounded-full bg-gray-100 text-black"
          data-drawer-dismiss="drawer-cart-checkout"
        >
          <svg
            width="16"
            height="17"
            viewBox="0 0 16 17"
            class="h-4 w-4"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="x-close">
              <path
                id="Vector"
                d="M3.33333 13.6366L12.6667 4.30322M3.33333 4.30322L12.6667 13.6366L3.33333 4.30322Z"
                stroke="#433955"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </g>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <p
          id="drawer-label"
          class="mr-auto text-base font-medium text-gray-800"
        >
          My Order
        </p>
      </header>

      {cartItems.length > 0 ? (
        <>
          {/* <!-- Drawer Body --> */}
          <div
            id="cart-drawer-items-body"
            class="flex max-h-[80vh] w-full flex-col divide-y overflow-y-scroll pb-40"
          >
            {cartItems.map((item) => (
              <div class="px-5 pb-4 pt-6">
                <OrderItem
                  item={item}
                  handleRemoveItem={() => handleRemoveItem(item.id)}
                  handleUpdateQuantity={(quantity) =>
                    handleUpdateQuantity(item.id, quantity)
                  }
                />
              </div>
            ))}
          </div>

          {/* <!-- Drawer Footer --> */}
          <footer class="absolute inset-x-0 bottom-0 bg-white">
            <div class="border bg-yellow-50 px-8 py-4">
              <div class="flex justify-between">
                <div class="flex flex-col space-y-2">
                  <p class="text-sm text-gray-600">Subtotal</p>
                  <p class="text-sm text-gray-600">Delivery fee</p>
                  <p class="text-sm font-medium text-gray-800">Total</p>
                </div>
                <div class="flex flex-col space-y-2">
                  <p class="text-sm font-medium text-gray-800">₦{subTotal}</p>
                  <p class="text-sm font-medium text-gray-800">TBD</p>
                  <p class="text-sm font-medium text-gray-800">₦{subTotal}</p>
                </div>
              </div>
            </div>
            <div class="p-8">
              <button
                type="button"
                class="inline-flex text-white text-base font-medium items-center bg-neutral-900 justify-center gap-1 border border-slate-200 rounded-full py-3 px-6 disabled:opacity-50 disabled:cursor-not-allowed w-full"
                data-drawer-dismiss="drawer-cart-checkout"
              >
                Proceed to checkout
              </button>
            </div>
          </footer>
        </>
      ) : (
        <CartEmpty />
      )}
    </div>
  );
};
