import { Component, OnInit, Input } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { Cart } from "../../models/cart.model";
import { Router } from "@angular/router";
import { Program } from "../../models/program.model";
import { Location } from "@angular/common";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  id: string;
  cart: Cart;
  @Input("cart") shoppingCart: Cart;

  constructor(
    private cartServ: CartService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.getCartById();
  }

  getCartById() {
    this.cartServ.getCartById().subscribe(
      cart => {
        this.cart = cart;
        console.log(this.cart);
      },
      err => {
        console.log(err);
      }
    );
  }

  addToCart(program: Program) {
    console.log(program);
    this.cartServ.addToCart(program).subscribe(cart => {
      this.cart = cart;
    });
  }

  deleteFromCart(program: Program) {
    this.cartServ.deleteFromCart(program).subscribe(cart => {
      this.cart = cart;
      console.log("Hi from comp:", cart);
    });
  }

  goToProgram(id: string) {
    this.router.navigate(["/program/detail/" + id]);
  }

  goBack() {
    this.location.back();
  }
}
