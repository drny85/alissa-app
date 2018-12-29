import { Component, OnInit } from "@angular/core";
import { ProgramService } from "../../services/program.service";
import { Program } from "../../models/program.model";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  programs: Program[];

  constructor(private programServ: ProgramService) {}

  ngOnInit() {
    //this.getPrograms();
  }

  getPrograms() {
    this.programServ.getPrograms().subscribe(
      programs => {
        this.programs = programs;
      },
      err => {
        console.log(err);
      }
    );
  }
}
