import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { Cart } from "../../models/cart.model";
import { Router } from "@angular/router";
import { Program } from "../../models/program.model";
import { Location } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit, OnDestroy {
  id: string;
  cart: Cart;
  currentCart: Subscription;
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
    this.cartServ.addToCart(program).subscribe(cart => {
      this.cart = cart;
    });
  }

  deleteFromCart(program: Program) {
    this.cartServ.deleteFromCart(program).subscribe(cart => {
      this.cart = cart;
    });
  }

  goToProgram(id: string) {
    this.router.navigate(["/program/detail/" + id]);
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {}
}
