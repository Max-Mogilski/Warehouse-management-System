import { create } from 'zustand';

import { Product, cartActions, cartState } from './types';

const INITIAL_STATE: cartState = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

export const useCartStore = create<cartState & cartActions>((set, get) => ({
  cart: INITIAL_STATE.cart,
  totalItems: INITIAL_STATE.totalItems,
  totalPrice: INITIAL_STATE.totalPrice,
  addToCart: (product: Product) => {
    const cart = get().cart;
    const cartItem = cart.find((item) => item.id === product.id);

    if (cartItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? {
              ...item,
              quantity: (item.quantity as number) + 1,
            }
          : item
      );
      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price,
      }));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];

      set((state) => ({
        cart: updatedCart,
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price,
      }));
    }
  },
  decrementProductQuantity: (product: Product) => {
    const cart = get().cart;
    const cartItem = cart.find((item) => item.id === product.id);

    if (!cartItem) return;

    if (product.quantity === 1) {
      set((state) => ({
        totalItems:
          state.totalItems -
          state.cart.find((item) => item.id === product.id)?.quantity!,
        cart: state.cart.filter((item) => item.id !== product.id),
        totalPrice: state.totalPrice - product.price,
      }));
      return;
    }

    const updatedCart = cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: (item.quantity as number) - 1 }
        : item
    );
    set((state) => ({
      cart: updatedCart,
      totalItems: state.totalItems - 1,
      totalPrice: state.totalPrice - product.price,
    }));
  },
  removeFromCart: (product: Product) => {
    set((state) => ({
      totalItems:
        state.totalItems -
        state.cart.find((item) => item.id === product.id)?.quantity!,
      cart: state.cart.filter((item) => item.id !== product.id),
      totalPrice: state.totalPrice - product.price * product.quantity!,
    }));
  },
}));
