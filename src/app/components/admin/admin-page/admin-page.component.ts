import { Component, OnInit } from "@angular/core";
import { Program } from "../../../models/program.model";
import { ProgramService } from "../../../services/program.service";

@Component({
  selector: "app-admin-page",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.css"]
})
export class AdminPageComponent implements OnInit {
  programs: Program[];

  constructor(private programServ: ProgramService) {}

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms() {
    this.programServ.getPrograms().subscribe(programs => {
      this.programs = programs;
    });
  }
}
