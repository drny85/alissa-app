import { Program } from "./../models/program.model";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment.prod";

@Injectable({
  providedIn: "root"
})
export class ProgramService {
  baseURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  addProgram(program: any) {
    return this.http.post("program/add-program", program);
  }

  getPrograms() {
    return this.http.get<Program[]>("/program/programs");
  }

  getProgram(id: string) {
    if (id) return this.http.get<Program>("program/program/" + id);
  }

  updateProgram(program: any) {
    return this.http.put<any>("program/program/update", program);
  }

  deleteProgram(program: Program) {
    return this.http.delete(`program/${program._id}`);
  }
}
