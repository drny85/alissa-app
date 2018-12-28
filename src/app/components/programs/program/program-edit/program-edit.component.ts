import { Component, OnInit } from "@angular/core";
import { Program } from "../../../../models/program.model";
import { ProgramService } from "../../../../services/program.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgModel, NgForm } from "@angular/forms";

@Component({
  selector: "app-program-edit",
  templateUrl: "./program-edit.component.html",
  styleUrls: ["./program-edit.component.css"]
})
export class ProgramEditComponent implements OnInit {
  id: string;

  program: Program = {
    _id: "",
    name: "",
    description: "",
    price: null,
    image: "",
    fullDescription: ""
  };

  constructor(
    private programServ: ProgramService,
    private activedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.getProgram();
  }

  getProgram() {
    this.id = this.activedRoute.snapshot.params["id"];
    this.programServ.getProgram(this.id).subscribe(program => {
      this.program = program;
      console.log("Program:", this.program);
    });
  }

  updateProgram(e: NgForm) {
    console.log(e.value);
    if (e.valid) {
      this.programServ.updateProgram(this.program).subscribe(
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
    let value = e.value.toFixed(2);
    this.program.price = value;
  }

  deleteProgram() {}
}
