import { ToastrManager } from "ng6-toastr-notifications";
import { Component, OnInit } from "@angular/core";
import { Program } from "../../models/program.model";
import { ProgramService } from "../../services/program.service";
import { CartService } from "../../services/cart.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-programs",
  templateUrl: "./programs.component.html",
  styleUrls: ["./programs.component.css"]
})
export class ProgramsComponent implements OnInit {
  programs: Program[];

  constructor(
    private programServ: ProgramService,
    private cartServ: CartService,
    private message: ToastrManager,
    private router: Router
  ) {}

  ngOnInit() {
    this.getPrograms();
  }

  getPrograms() {
    this.programServ.getPrograms().subscribe(programs => {
      console.log(programs);
      this.programs = programs;
    });
  }

  addToCart(program: Program) {
    this.cartServ.addToCart(program).subscribe(
      cart => {
        if (cart) {
          console.log(cart);
          this.message.successToastr("Program Added to Cart", "Great!");
          this.router.navigate(["/cart"]);
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
