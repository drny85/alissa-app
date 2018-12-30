import { Program } from "./program.model";

export interface Cart {
  _id?: string;
  programs: Program;
  quantity: number;
  totalPrice: number;
  totalItem?: number;
}
