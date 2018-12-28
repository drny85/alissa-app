import { Program } from "./program.model";
export class CartItem {
  _id?: string;
  item: Program;

  constructor(init?: Partial<CartItem>) {
    Object.assign(this, init);
  }
}
