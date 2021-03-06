import { Injectable } from "@angular/core";
import { Cart } from "../models/cart.model";
import { HttpClient } from "@angular/common/http";
import { Program } from "../models/program.model";
import { map } from "rxjs/operators";
import { Subject } from "rxjs";
import { environment } from "../../environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class CartService {
  baseURL = environment.apiURL + "cart";
  cartId: string;

  cart = new Subject<Cart>();

  constructor(private http: HttpClient) {}

  createCart() {
    return this.http.post<any>("create", {});
  }
  private get getCardId() {
    let cartId = localStorage.getItem("cartId");
    if (cartId) return cartId;
  }

  getCartById() {
    let cartId = localStorage.getItem("cartId");
    this.cartId = cartId;
    if (cartId) {
      return this.http.get<Cart>("cart/" + cartId);
    }
  }

  populateCart() {
    this.getCartById().subscribe(cart => {
      this.cart.next(cart);
    });
  }

  getCurrentCart() {
    return this.cart.asObservable();
  }

  addToCart(program: Program) {
    this.http.post<Cart>("add/" + this.getCardId, program).subscribe(cart => {
      this.cart.next(cart);
    });
  }

  deleteFromCart(program: Program) {
    this.http
      .put<Cart>("cart/update/" + this.getCardId, program)
      .subscribe(cart => {
        this.cart.next(cart);
      });
  }
}
