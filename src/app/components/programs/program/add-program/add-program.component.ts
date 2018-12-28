import { Component, OnInit } from "@angular/core";
import { Program } from "../../../../models/program.model";
import { NgForm, NgModel } from "@angular/forms";
import { ProgramService } from "../../../../services/program.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-program",
  templateUrl: "./add-program.component.html",
  styleUrls: ["./add-program.component.css"]
})
export class AddProgramComponent implements OnInit {
  program: Program = {
    _id: "",
    name: "",
    description: "",
    price: null,
    image: "",
    fullDescription: ""
  };

  constructor(private programServ: ProgramService, private router: Router) {}

  ngOnInit() {}

  addProgram(e: NgForm) {
    console.log(e.value);
    if (e.valid) {
      this.programServ.addProgram(this.program).subscribe(
        p => {
          if (p) {
            this.router.navigate(["/programs"]);
          }
        },
        err => {
          console.log(err);
        }
      );
    }
  }

  fixPrice(e: NgModel) {
    if (e.value) {
      let value = e.value.toFixed(2);
      this.program.price = value;
    }
  }
}
