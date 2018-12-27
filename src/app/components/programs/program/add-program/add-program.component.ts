import { Component, OnInit } from "@angular/core";
import { Program } from "../../../../models/program.model";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-add-program",
  templateUrl: "./add-program.component.html",
  styleUrls: ["./add-program.component.css"]
})
export class AddProgramComponent implements OnInit {
  program: Program = {
    name: "",
    description: "",
    price: "",
    image: ""
  };

  constructor() {}

  ngOnInit() {}

  addProgram(e: NgForm) {
    console.log(e.value);
  }
}
