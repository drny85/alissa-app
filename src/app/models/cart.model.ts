import { Program } from "./program.model";

export interface Cart {
  _id?: string;
  items: Program[];
  quantity: number;
  totalPrice: number;
}
