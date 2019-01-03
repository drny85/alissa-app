import { Component, OnInit } from "@angular/core";
import { OrderService } from "../../services/order.service";
import { CustomerService } from "src/app/services/customer/customer.service";
import { ActivatedRoute } from "@angular/router";
import { Customer } from "../../models/customer";
import { CartService } from "../../services/cart.service";
import { Cart } from "../../models/cart.model";

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"]
})
export class PaymentComponent implements OnInit {
  private id: string;
  customer: Customer;
  cart: Cart;

  constructor(
    private orderServ: OrderService,
    private customerServ: CustomerService,
    private activedRoute: ActivatedRoute,
    private cartServ: CartService
  ) {}

  ngOnInit() {
    this.getCustomer();
    this.getCart();
  }

  alert() {
    alert("Click");
  }

  getCustomer() {
    this.id = this.activedRoute.snapshot.params["id"];
    this.customerServ.getCustomerById(this.id).subscribe(customer => {
      this.customer = customer;
      console.log("Customer", this.customer);
    });
  }

  getCart() {
    this.cartServ.getCartById().subscribe(cart => {
      this.cart = cart;
      console.log("Cart Payment", this.cart);
    });
  }
}
