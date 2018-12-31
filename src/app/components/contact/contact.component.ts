import { ToastrModule, ToastrManager } from "ng6-toastr-notifications";
import { Component, OnInit } from "@angular/core";
import { NgForm, NgModel } from "@angular/forms";
import { ProgramService } from "../../services/program.service";
import { Program } from "../../models/program.model";
import { EmailService } from "../../services/Emails/email.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
  programs: Program[];
  constructor(
    private programServ: ProgramService,
    private emailServ: EmailService,
    private message: ToastrManager,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms() {
    this.programServ.getPrograms().subscribe(programs => {
      this.programs = programs;
    });
  }

  sendContactEmail(e: NgForm) {
    if (e.valid) {
      let emailBody = e.value;
      this.emailServ.sendContactEmail(emailBody).subscribe(
        email => {
          if (email) {
            this.message.successToastr("Email has been sent", "Success!");

            e.reset();
            this.router.navigate(["/programs"]);
          }
        },
        err => console.log(err)
      );
    }
  }
}
