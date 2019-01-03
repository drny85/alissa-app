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
  @Input("btn") showBtns: boolean;
  @Input("cart") shoppingCart: Cart;

  constructor(
    private cartServ: CartService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.getCartById();
    this.getCart();
  }

  getCart() {
    this.currentCart = this.cartServ.getCurrentCart().subscribe(
      cart => {
        this.cart = cart;
        console.log("Cart Nav:", cart);
      },
      error => {
        console.log(error);
      }
    );
  }

  addToCart(program: Program) {
    this.cartServ.addToCart(program);
  }

  deleteFromCart(program: Program) {
    // this.cartServ.deleteFromCart(program).subscribe(cart => {
    //   this.cart = cart;
    //   console.log("Delete;", this.cart);
    // });
    this.cartServ.deleteFromCart(program);
  }

  getCartById() {
    this.cartServ.getCartById().subscribe(cart => {
      this.cart = cart;
    });
  }

  goToProgram(id: string) {
    this.router.navigate(["/program/detail/" + id]);
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    //this.currentCart.unsubscribe();
  }
}
