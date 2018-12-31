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

  errors = {};

  form = new FormData();

  constructor(private programServ: ProgramService, private router: Router) {}

  ngOnInit() {}

  addProgram(e: NgForm) {
    const formData: FormData = new FormData();

    formData.append("name", this.program.name);
    formData.append("desciption", this.program.description);
    formData.append("fullDescription", this.program.fullDescription);
    formData.append("price", e.value.price);

    console.log(formData);
    // if (e.valid) {
    //   this.programServ.addProgram(this.program).subscribe(
    //     p => {
    //       if (p) {
    //         this.router.navigate(["/programs"]);
    //       }
    //     },
    //     err => {
    //       //handling respond errors
    //       err.error.forEach(e => {
    //         this.errors[e.param] = e.msg;
    //       });
    //     }
    //   );
    // }
  }

  fixPrice(e: NgModel) {
    if (e.value) {
      let value = e.value.toFixed(2);
      this.program.price = value;
    }
  }

  getImage(event: Event) {
    let file = (event.target as HTMLInputElement).files[0];
    let imagSize = file.size;
    let fileType = file.type;
    let name = file.name;
    let ext = fileType.split("/", 1);

    if (imagSize > 1024 * 1024 * 7) {
      (this.errors["error"] = "File is too large"), "Error Uploading";
      return;
    }

    if (ext[0] !== "image") {
      (this.errors["error"] = "Invalid File"), "Error Uploading";
      return;
    }

    console.log(file, name);
  }
}
