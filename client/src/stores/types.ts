export interface Product {
  id: string;
  name: string;
  url: string;
  price: number;
  stock: number;
  quantity?: number;
}

export interface cartState {
  cart: Product[];
  totalItems: number;
  totalPrice: number;
}

export interface cartActions {
  addToCart: (Item: Product) => void;
  removeFromCart: (Item: Product) => void;
  decrementProductQuantity: (Item: Product) => void;
  clearCart: () => void;
}
