import { Component, OnInit } from "@angular/core";
import { Program } from "../../../../models/program.model";
import { ProgramService } from "../../../../services/program.service";
import { ActivatedRoute, Router } from "@angular/router";
import {
  NgModel,
  NgForm,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: "app-program-edit",
  templateUrl: "./program-edit.component.html",
  styleUrls: ["./program-edit.component.css"]
})
export class ProgramEditComponent implements OnInit {
  id: string;

  imageSelected: File = null;
  imagePreview: string;
  addProgramForm: FormGroup = null;

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
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.getProgram();
  }

  getProgram() {
    this.id = this.activedRoute.snapshot.params["id"];
    this.programServ.getProgram(this.id).subscribe(program => {
      this.imagePreview = program.image;

      this.program = program;
      console.log(this.program);
      this.addProgramForm = new FormGroup({
        name: new FormControl(program.name, [
          Validators.required,
          Validators.minLength(5)
        ]),
        description: new FormControl(program.description, [
          Validators.required,
          Validators.minLength(10)
        ]),
        fullDescription: new FormControl(program.fullDescription, [
          Validators.required,
          Validators.minLength(20)
        ]),
        price: new FormControl(program.price, [
          Validators.required,
          Validators.min(0)
        ]),
        image: new FormControl("")
      });
    });
  }

  updateProgram() {
    const formData = new FormData();
    formData.append("_id", this.program._id);
    formData.append("name", this.addProgramForm.value.name);
    formData.append("description", this.addProgramForm.value.description);
    formData.append(
      "fullDescription",
      this.addProgramForm.value.fullDescription
    );
    formData.append("price", this.addProgramForm.value.price);
    // if (this.imageSelected) {
    formData.append(
      "image",
      this.imageSelected ? this.imageSelected : this.imagePreview
    );
    // }
    if (this.addProgramForm.valid) {
      this.programServ.updateProgram(formData).subscribe(
        p => {
          console.log("Updated", p);
          if (p) {
            console.log("Updated", p);
            this.router.navigate(["/programs"]);
          }
        },
        err => {
          console.log("Ewwww");
          console.log(err.error);
        }
      );
    }
  }

  fixPrice(e: NgModel) {
    let value = e.value.toFixed(2);
    this.program.price = value;
  }

  deleteProgram() {
    if (!confirm("Do you really want to delete this Program?")) return;

    this.programServ.deleteProgram(this.program).subscribe(
      program => {
        if (program) {
          this.router.navigate(["/programs"]);
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  getImage(event: any) {
    let file = <File>event.target.files[0];
    // this.addProgramForm.patchValue({ image: file });
    // this.addProgramForm.get("image").updateValueAndValidity();
    this.imageSelected = file;
    console.log(this.imageSelected);

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
