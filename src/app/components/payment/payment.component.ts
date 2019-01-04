import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectorRef,
  OnDestroy,
  HostListener
} from "@angular/core";
import { OrderService } from "../../services/order.service";
import { CustomerService } from "src/app/services/customer/customer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Customer } from "../../models/customer";
import { CartService } from "../../services/cart.service";
import { Cart } from "../../models/cart.model";
import { NgForm } from "@angular/forms";
import { environment } from "../../../environments/environment";
import { PaymentService } from "../../services/payment/payment.service";

declare var stripe: any;
declare var elements: any;

@Component({
  selector: "app-payment",
  templateUrl: "./payment.component.html",
  styleUrls: ["./payment.component.css"]
})
export class PaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  private id: string;
  customer: Customer;
  cart: Cart;

  @ViewChild("cardInfo") cardInfo: ElementRef;

  card: any;

  error: string;
  handler: any;
  amount: number;

  constructor(
    private orderServ: OrderService,
    private customerServ: CustomerService,
    private activedRoute: ActivatedRoute,
    private cartServ: CartService,
    private paymentServ: PaymentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getCustomer();
    this.getCart();
    this.handler = StripeCheckout.configure({
      key: environment.stripeKey,
      image: "../../../assets/img/marketplace.png",
      locale: "auto",

      token: token => {
        //send the token to the server
        this.paymentServ
          .processPayment(token, this.amount, this.cart, this.customer)
          .subscribe(
            res => {
              console.log(res);
              // if (res.status === "succeeded") {
              //   this.router.navigate(["/success/" + this.cart.cart._id]);
              // } else {
              //   new Error("Something went wrong.");
              // }
            },
            err => {
              console.log(err);
            }
          );
      }
    });
  }

  handlePayment() {
    this.handler.open({
      name: "Alissa Fitness",
      description: "Thank you!",
      amount: this.amount * 100,
      email: this.customer.email,
      zipCode: true
    });
  }

  @HostListener("window:popstate")
  onPopstate() {
    this.handler.close();
  }

  ngAfterViewInit() {}

  getCustomer() {
    this.id = this.activedRoute.snapshot.params["id"];
    this.customerServ.getCustomerById(this.id).subscribe(customer => {
      this.customer = customer;
    });
  }

  getCart() {
    this.cartServ.getCartById().subscribe(cart => {
      this.cart = cart;
      this.amount = cart.cart.totalPrice;
    });
  }

  ngOnDestroy() {}
}
