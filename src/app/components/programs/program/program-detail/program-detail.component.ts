import { Component, OnInit } from "@angular/core";
import { Program } from "../../../../models/program.model";
import { ProgramService } from "../../../../services/program.service";
import { ActivatedRoute, Router } from "@angular/router";
import { CartService } from "src/app/services/cart.service";
import { ToastrManager } from "ng6-toastr-notifications";

@Component({
  selector: "app-program-detail",
  templateUrl: "./program-detail.component.html",
  styleUrls: ["./program-detail.component.css"]
})
export class ProgramDetailComponent implements OnInit {
  program: Program;
  id: string;
  showContact = false;

  constructor(
    private programServ: ProgramService,
    private activedRoute: ActivatedRoute,
    private cartServ: CartService,
    private router: Router,
    private message: ToastrManager
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
