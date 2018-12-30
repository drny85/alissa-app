import { Component, OnInit } from "@angular/core";
import { CartService } from "../../services/cart.service";
import { Cart } from "../../models/cart.model";
import { Program } from "../../models/program.model";
import { ActivatedRoute } from "@angular/router";
import { ProgramService } from "../../services/program.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"]
})
export class CartComponent implements OnInit {
  id: string;
  cart: Cart;
  programs: [];
  constructor(
    private cartServ: CartService,
    private activedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getCartById();
  }

  getCartById() {
    this.cartServ.getCartById().subscribe(
      cart => {
        this.cart = cart;
      },
      err => {
        console.log(err);
      }
    );
  }
}
