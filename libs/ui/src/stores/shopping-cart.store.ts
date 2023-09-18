import { persistentAtom } from "@nanostores/persistent";
import { atom, computed } from "nanostores";

export interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export const shoppingCart = persistentAtom<Array<CartItem>>("cart", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

export const isAddingToCart = atom(false);

export const cart = shoppingCart.get();
export const totalQuantity = computed(shoppingCart, (cart) =>
  cart.reduce((acc, item) => acc + item.quantity, 0)
);

const increaseQuantity = (id: string, quantity = 1) => {
  const localCart = shoppingCart.get();
  const index = localCart.findIndex((i) => i.id === id);
  if (index !== -1) {
    localCart[index].quantity += quantity;
  }
  shoppingCart.set(localCart);
};

export const removeItemFromCart = (id: string) => {
  const localCart = shoppingCart.get();
  const index = localCart.findIndex((i) => i.id === id);
  if (index !== -1) {
    localCart.splice(index, 1);
  }
  shoppingCart.set(localCart);
};

export const addToCart = (item: CartItem, quantity = 1) => {
  const localCart = shoppingCart.get();
  const index = localCart.findIndex((i) => i.id === item.id);
  if (index !== -1) {
    increaseQuantity(item.id, quantity);
    return;
  }

  localCart.push({ ...item, quantity });
  shoppingCart.set(localCart);
};

export const updateCartItem = (id: string, quantity: number) => {
  if (Number(quantity) === 0) {
    removeItemFromCart(id);
    return;
  }

  const localCart = shoppingCart.get();
  const index = localCart.findIndex((i) => i.id === id);
  if (index !== -1) {
    localCart[index].quantity = quantity;
  }
  shoppingCart.set(localCart);
};

export const clearCart = () => {
  shoppingCart.set([]);
};

export const subscribeToShoppingCartChange = (
  fn?: (val: readonly CartItem[]) => void
) => {
  shoppingCart.subscribe((val) => {
    fn?.(val);
    // update cart icon total
    const cartIconTotal = document.querySelector(
      "#cart-icon-total"
    ) as HTMLElement;
    const totalItems = val.reduce((acc, item) => acc + item.quantity, 0);
    cartIconTotal.innerHTML = totalItems.toString();
  });
};
