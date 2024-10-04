import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  user: any = {};

  constructor(
    private auth: AngularFireAuth,
    private snackBar: MatSnackBar,
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {}

  login() {
    if (!this.user.email || !this.user.password) {
      return;
    }
    this.auth
      .signInWithEmailAndPassword(this.user.email, this.user.password)
      .then(async (res) => {
        const user = await this.auth.currentUser;
        this.apiService.auth.next(user);
        localStorage.setItem("auth", JSON.stringify(user));
        this.router.navigate(["admin/qas"]);
      })
      .catch((err) => {
        this.snackBar.open(err.message, "OK", { duration: 5000 });
      });
  }
}
