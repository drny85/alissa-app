import { Component, OnInit } from "@angular/core";
import { CartService } from "./services/cart.service";

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
  }
  createCart() {
    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
      this.cartServ.createCart().subscribe(
        cart => {
          localStorage.setItem("cartId", cart._id);
          console.log(cart);
        },
        err => console.log(err)
      );
    }
  }
}
