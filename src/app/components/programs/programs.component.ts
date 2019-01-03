import { Subscription } from "rxjs";
import { ToastrManager } from "ng6-toastr-notifications";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Program } from "../../models/program.model";
import { ProgramService } from "../../services/program.service";
import { CartService } from "../../services/cart.service";
import { Router } from "@angular/router";
import { Cart } from "../../models/cart.model";

@Component({
  selector: "app-programs",
  templateUrl: "./programs.component.html",
  styleUrls: ["./programs.component.css"]
})
export class ProgramsComponent implements OnInit, OnDestroy {
  programs: Program[];
  cart: Cart;
  currentCartSub: Subscription;
  constructor(
    private programServ: ProgramService,
    private cartServ: CartService,
    private message: ToastrManager,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPrograms();
    this.getCart();
  }

  getCart() {
    this.currentCartSub = this.cartServ
      .getCurrentCart()
      .subscribe(cart => (this.cart = cart));
    // this.cartServ.getCartById().subscribe(cart => {
    //   this.cart = cart;
    // });
  }

  getPrograms() {
    this.programServ.getPrograms().subscribe(programs => {
      console.log(programs);
      this.programs = programs;
    });
  }

  addToCart(program: Program) {
    // this.cartServ.addToCart(program).subscribe(
    //   cart => {
    //     if (cart) {
    //       console.log(cart);
    //       this.message.successToastr("Program Added to Cart", "Great!");
    //       this.router.navigate(["/cart"]);
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    this.cartServ.addToCart(program);
    this.message.successToastr("Program has been added", "Great!");
    this.router.navigate(["/cart"]);
  }

  deleteFromCart(program: Program) {
    // this.cartServ.deleteFromCart(program).subscribe(cart => {
    //   console.log("Hi from comp:", cart);
    //   this.cart = cart;
    // });
    this.cartServ.deleteFromCart(program);
  }

  ngOnDestroy() {
    this.currentCartSub.unsubscribe();
  }
}
