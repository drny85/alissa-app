import { Component, OnInit } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { Cart } from "../../models/cart.model";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  cart: Cart;

  constructor(private cartServ: CartService) {}

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.cartServ.getCartById().subscribe(
      cart => {
        this.cart = cart;
      },
      error => {
        console.log(error);
      }
    );
  }
}
