import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Customer } from "../../models/customer";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  BASE_URL = "http://localhost:3000/customer/";
  constructor(private http: HttpClient) {}

  addCustomer(customer: Customer) {
    return this.http.post<Customer>(this.BASE_URL + "new", customer);
  }

  getCustomers() {
    return this.http.get<Customer[]>(this.BASE_URL + "/customers");
  }

  getCustomerById(id: string) {
    return this.http.get<Customer>(this.BASE_URL + `get/${id}`);
  }
}
