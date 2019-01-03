import { Component, OnInit } from "@angular/core";
import { CartService } from "./services/cart.service";
import { Cart } from "./models/cart.model";
import { Subject } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  cartId: string;

  constructor(private cartServ: CartService) {}
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.createCart();
    this.cartServ.getCartById();
  }
  createCart() {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
      this.cartServ.createCart().subscribe(
        cart => {
          localStorage.setItem("cartId", cart._id);
        },
        err => console.log(err)
      );
    }
  }
}
