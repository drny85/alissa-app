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
        console.log("Program C", cart);
        this.cart = cart;
      },
      err => {
        console.log(err);
      }
    );
  }

  // addToCart() {
  //   this.id = this.activedRoute.snapshot.params["id"];
  //   if (this.id) {
  //     this.progServ.getProgram(this.id).subscribe(program => {
  //       console.log(program);
  //       // cart.addToCart(program);
  //       // console.log(cart.getCart);
  //       this.cartServ.addToCart(program).subscribe(cart => {
  //         this.cart = cart;
  //         console.log(cart.items);
  //       });
  //     });
  //   }
  // }
}
