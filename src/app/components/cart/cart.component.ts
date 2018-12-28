import { Component, OnInit } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { Cart } from "../../models/cart.model";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  cart: Cart;
  constructor(private cartServ: CartService) {}

  ngOnInit() {
    this.getCartById();
  }

  getCartById() {
    this.cartServ.getCartById().subscribe(
      cart => {
        this.cart = cart;
        console.log("Cart:", this.cart);
      },
      err => {
        console.log(err);
      }
    );
  }
}
