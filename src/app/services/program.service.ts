import { Program } from "./../models/program.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { basename } from "path";

@Injectable({
  providedIn: "root"
})
export class ProgramService {
  baseURL = "http://localhost:3000";

  program: Program;
  programs: Program[];

  constructor(private http: HttpClient) {}

  addProgram(program: Program) {
    return this.http.post(this.baseURL + "/add-program", program);
  }

  getPrograms() {
    return this.http.get<Program[]>(this.baseURL + "/programs");
  }
}
