import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { CartService } from "src/app/services/cart.service";
import { Cart } from "../../models/cart.model";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit, OnDestroy {
  cart: Cart;
  cartSub: Subscription;

  constructor(private cartServ: CartService) {}

  ngOnInit() {
    this.getCart();
  }

  getCart() {
    this.cartSub = this.cartServ.getCurrentCart().subscribe(
      cart => {
        this.cart = cart;
        console.log("Cart Nav:", cart.totalItem);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngOnDestroy() {
    this.cartSub.unsubscribe();
  }
}
