import { Component, OnInit } from "@angular/core";
import { Program } from "../../../../models/program.model";
import { ProgramService } from "../../../../services/program.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-program-detail",
  templateUrl: "./program-detail.component.html",
  styleUrls: ["./program-detail.component.css"]
})
export class ProgramDetailComponent implements OnInit {
  program: Program;
  id: string;

  constructor(
    private programServ: ProgramService,
    private activedRoute: ActivatedRoute
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
}
