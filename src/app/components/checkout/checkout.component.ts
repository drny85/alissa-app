import { Component, OnInit, OnDestroy } from "@angular/core";
import { Cart } from "../../models/cart.model";
import { CartService } from "../../services/cart.service";
import { Subscription } from "rxjs";
import { Customer } from "../../models/customer";
import { CustomerService } from "../../services/customer/customer.service";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-checkout",
  templateUrl: "./checkout.component.html",
  styleUrls: ["./checkout.component.css"]
})
export class CheckoutComponent implements OnInit, OnDestroy {
  cart: Cart;
  subs: Subscription;
  showBtns = true;
  customer: Customer = {
    name: "",
    last_name: "",
    email: "",
    address: "",
    apt: "",
    city: "",
    state: "",
    zipcode: null
  };

  errors = {};

  constructor(
    private cartServ: CartService,
    private customerServ: CustomerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCartById();
    this.getCart();
  }

  getCart() {
    this.subs = this.cartServ.getCurrentCart().subscribe(cart => {
      this.cart = cart;
      console.log("Checkout:", this.cart);
    });
  }
  getCartById() {
    this.cartServ.getCartById().subscribe(cart => {
      this.cart = cart;
      console.log("cart", cart);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  addCustomer(e: NgForm) {
    console.log(e.valid);
    this.customerServ.addCustomer(this.customer).subscribe(
      customer => {
        if (customer) {
          this.customer = customer;
          this.router.navigate(["/payment/" + customer._id]);
        }
      },
      err => {
        if (err) {
          this.errors = {};
          if (err.error.length === 1) {
            err.error.forEach(e => {
              this.errors[e.param] = e.msg;
            });
          } else {
            this.errors["error"] = err.error.message;
          }
          console.log(this.errors);
        }
      }
    );
  }
}
