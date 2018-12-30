import { Program } from "./program.model";

export interface Cart {
  cart: {
    _id?: string;
    programs: Program;
    quantity: number;
    totalPrice: number;
    totalItem?: number;
  };
  totalItems?: number;
}
