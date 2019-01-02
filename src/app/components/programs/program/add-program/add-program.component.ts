import { Component, OnInit } from "@angular/core";
import { Program } from "../../../../models/program.model";
import {
  NgForm,
  NgModel,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { ProgramService } from "../../../../services/program.service";
import { Router } from "@angular/router";
import { ToastrManager } from "ng6-toastr-notifications";

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
  imagePreview: string;
  imageSelected: File = null;

  addProgramForm: FormGroup;

  constructor(
    private programServ: ProgramService,
    private router: Router,
    private message: ToastrManager
  ) {}

  ngOnInit() {
    this.addProgramForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(5)
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10)
      ]),
      fullDescription: new FormControl(null, [
        Validators.required,
        Validators.minLength(20)
      ]),
      price: new FormControl(null, [Validators.required, Validators.min(0)]),
      image: new FormControl(null, Validators.required)
    });
  }

  addProgram() {
    const formData = new FormData();
    formData.append("name", this.addProgramForm.value.name);
    formData.append("description", this.addProgramForm.value.description);
    formData.append(
      "fullDescription",
      this.addProgramForm.value.fullDescription
    );
    formData.append("price", this.addProgramForm.value.price);
    if (this.imageSelected) {
      formData.append("image", this.imageSelected, this.imageSelected.name);
    }

    console.log(this.addProgramForm.valid);
    if (this.addProgramForm.valid) {
      this.programServ.addProgram(formData).subscribe(
        p => {
          if (p) {
            this.message.infoToastr("New Program has been added", "Way To Go!");
            this.router.navigate(["/programs"]);
          }
        },
        err => {
          //handling respond errors
          err.error.forEach(e => {
            this.errors[e.param] = e.msg;
          });
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

  getImage(event: any) {
    let file = <File>event.target.files[0];
    // this.addProgramForm.patchValue({ image: file });
    // this.addProgramForm.get("image").updateValueAndValidity();
    this.imageSelected = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
