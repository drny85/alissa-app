import { Component, OnInit, OnDestroy } from "@angular/core";
import { Cart } from "../../models/cart.model";
import { CartService } from "../../services/cart.service";
import { Subscription } from "rxjs";
import { Customer } from "../../models/customer";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart: Cart;
  subs: Subscription;
  showBtns = true;
  customer: Customer = {
    name: "",
    last_name: "",
    email: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    zipcode: null
  };

  constructor(private cartServ: CartService) {}

  ngOnInit() {
    this.getCartById();
    this.getCart();
  }

  getCart() {
    this.subs = this.cartServ.getCurrentCart().subscribe(cart => {
      this.cart = cart;
      console.log("Checkout:", this.cart);
    });
  }
  getCartById() {
    this.cartServ.getCartById().subscribe(cart => {
      this.cart = cart;
      console.log("cart", cart);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
