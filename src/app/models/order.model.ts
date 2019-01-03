import { Program } from "./program.model";
import { Customer } from "./customer";
export interface Order {
  items: [Program];
  totalPrice: number;
  customer: Customer;
}
