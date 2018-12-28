import { Program } from "./program.model";
export interface Cart {
  _id?: string;
  item: Program;
  items?: Program[];
  price: number;
  totalPrice: number;
}
