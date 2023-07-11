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

export interface User {
  userId: string;
  firstName: string;
}
export type UserStoreState = {
  user: User | null | undefined;
  setUser: (payload: User) => void;
};

export type ScannerStoreState = {
  onScanned: (value: string) => void;
  setOnScanned: (payload: (value: string) => void) => void;
};
