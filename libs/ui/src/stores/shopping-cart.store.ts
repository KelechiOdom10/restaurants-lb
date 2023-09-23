import { persistentAtom } from "@nanostores/persistent";
import { computed } from "nanostores";

export type Product = {
  id: number;
  title: string;
  category: string;
  description: string;
  image: string;
  price: number;
};

export type CartItem = Product &
  Omit<Product, "description"> & {
    quantity: number;
  };

// Create a writableAtom for the shoppingCart
export const shoppingCart = persistentAtom<Array<CartItem>>("cart", [], {
  encode: JSON.stringify,
  decode: JSON.parse,
});

// Get the current cart state
export const cart = computed(shoppingCart, (cart) => cart);

// Calculate the total quantity of items in the cart
export const totalQuantity = computed(shoppingCart, (cart) =>
  cart.reduce((acc, item) => acc + item.quantity, 0)
);

// Calculate the total amount of the cart
export const totalAmount = computed(shoppingCart, (cart) =>
  cart.reduce((acc, item) => acc + item.quantity * item.price, 0)
);

// Increase the quantity of a cart item
export const increaseQuantity = (id: number, quantity = 1) => {
  const cart = shoppingCart.get();
  const updatedCart = cart.map((item) => {
    if (item.id === id) {
      item.quantity += quantity;
    }
    return item;
  });
  shoppingCart.set(updatedCart);
};

// Remove an item from the cart by ID
export const removeItemFromCart = (id: number) => {
  const cart = shoppingCart.get();
  const updatedCart = cart.filter((item) => item.id !== id);
  shoppingCart.set(updatedCart);
};

// Add a product to the cart with a specified quantity
export const addToCart = (item: Product, quantity = 1) => {
  const cart = shoppingCart.get();
  const existingItem = cart.find((cartItem) => cartItem.id === item.id);
  if (existingItem) {
    increaseQuantity(item.id, quantity);
  } else {
    const newItem = { ...item, quantity };
    shoppingCart.set([...cart, newItem]);
  }
};

// Update the quantity of a cart item
export const updateCartItem = (id: number, quantity: number) => {
  const cart = shoppingCart.get();
  const updatedCart = cart.map((item) => {
    if (item.id === id) {
      item.quantity = quantity;
    }
    return item;
  });
  shoppingCart.set(updatedCart);
};

// Clear the entire cart
export const clearCart = () => {
  shoppingCart.set([]);
};
