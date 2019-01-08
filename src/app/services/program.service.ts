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
    return this.http.post(this.baseURL + "/add-program", program);
  }

  getPrograms() {
    return this.http.get<Program[]>(this.baseURL + "/programs");
  }

  getProgram(id: string) {
    if (id) return this.http.get<Program>(this.baseURL + "/program/" + id);
  }

  updateProgram(program: any) {
    return this.http.put<any>(this.baseURL + "/program/update", program);
  }

  deleteProgram(program: Program) {
    return this.http.delete(this.baseURL + `/program/${program._id}`);
  }
}
