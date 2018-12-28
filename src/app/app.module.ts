import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

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
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ProgramService } from "./services/program.service";
import { ProgramEditComponent } from './components/programs/program/program-edit/program-edit.component';

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
    ProgramEditComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [ProgramService],
  bootstrap: [AppComponent]
})
export class AppModule {}
