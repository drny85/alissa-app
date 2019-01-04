import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { ContactComponent } from "./components/contact/contact.component";
import { ProgramsComponent } from "./components/programs/programs.component";
import { ProgramDetailComponent } from "./components/programs/program/program-detail/program-detail.component";
import { AddProgramComponent } from "./components/programs/program/add-program/add-program.component";
import { AdminPageComponent } from "./components/admin/admin-page/admin-page.component";
import { ProgramEditComponent } from "./components/programs/program/program-edit/program-edit.component";
import { CartComponent } from "./components/cart/cart.component";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { PaymentComponent } from "./components/payment/payment.component";
import { SuccessComponent } from "./components/success/success.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "contact", component: ContactComponent },
  { path: "programs", component: ProgramsComponent },
  { path: "program/detail/:id", component: ProgramDetailComponent },
  { path: "program/add-program", component: AddProgramComponent },
  { path: "program/edit/:id", component: ProgramEditComponent },
  { path: "admin", component: AdminPageComponent },
  { path: "cart", component: CartComponent },
  { path: "checkout", component: CheckoutComponent },
  { path: "payment/:id", component: PaymentComponent },
  { path: "success/:id", component: SuccessComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
