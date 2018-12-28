import { Program } from "./../models/program.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

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

  getProgram(id: string) {
    if (id) return this.http.get<Program>(this.baseURL + "/program/" + id);
  }

  updateProgram(program: Program) {
    return this.http.put<Program>(this.baseURL + "/program/update", program);
  }

  deleteProgram(program: Program) {
    return this.http.delete(this.baseURL + `/program/${program._id}`);
  }
}
