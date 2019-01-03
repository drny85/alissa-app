import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { ContactComponent } from "./components/contact/contact.component";
import { NavbarComponent } from "./components/navbar/navbar.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ProgramsComponent } from "./components/programs/programs.component";
import { ProgramDetailComponent } from "./components/programs/program/program-detail/program-detail.component";
import { AddProgramComponent } from "./components/programs/program/add-program/add-program.component";
import { AdminPageComponent } from "./components/admin/admin-page/admin-page.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ProgramService } from "./services/program.service";
import { ProgramEditComponent } from "./components/programs/program/program-edit/program-edit.component";
import { CartComponent } from "./components/cart/cart.component";
import { CustomFormsModule } from "ng2-validation";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { ToastrModule } from "ng6-toastr-notifications";
import { CheckoutComponent } from "./components/checkout/checkout.component";
import { PaymentComponent } from './components/payment/payment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    NavbarComponent,
    FooterComponent,
    ProgramsComponent,
    ProgramDetailComponent,
    AddProgramComponent,
    AdminPageComponent,
    ProgramEditComponent,
    CartComponent,
    CheckoutComponent,
    PaymentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CustomFormsModule,
    BrowserAnimationsModule, // required animations module
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [ProgramService],
  bootstrap: [AppComponent]
})
export class AppModule {}
