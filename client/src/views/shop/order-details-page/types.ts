export type ValueForm = {
  displayName: string;
};

export default interface OrderDetials {
  fullName: ValueForm;
}

export interface Order {
  address: string;
  city: string;
  email: string;
  fullName: string;
  postcode: string;
  products: productObj[];
}

interface productObj {
  id: string;
  quantity: number;
}
