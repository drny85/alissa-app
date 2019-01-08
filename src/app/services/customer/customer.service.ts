import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Customer } from "../../models/customer";
import { environment } from "../../../environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  BASE_URL = environment.apiURL + "customer";
  constructor(private http: HttpClient) {}

  addCustomer(customer: Customer) {
    return this.http.post<Customer>("customer/new", customer);
  }

  getCustomers() {
    return this.http.get<Customer[]>("customer/customers");
  }

  getCustomerById(id: string) {
    return this.http.get<Customer>(`customer/get/${id}`);
  }
}
