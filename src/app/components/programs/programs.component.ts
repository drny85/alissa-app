import { Component, OnInit } from "@angular/core";
import { Program } from "../../models/program.model";
import { ProgramService } from "../../services/program.service";

@Component({
  selector: "app-programs",
  templateUrl: "./programs.component.html",
  styleUrls: ["./programs.component.css"]
})
export class ProgramsComponent implements OnInit {
  programs: Program[];

  constructor(private programServ: ProgramService) {}

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms() {
    this.programServ.getPrograms().subscribe(programs => {
      console.log(programs);
      this.programs = programs;
    });
  }
}
