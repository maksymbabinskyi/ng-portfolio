import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { ApiService } from "../../../services/api.service";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"],
})
export class SignupComponent implements OnInit {
  user = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
  };

  constructor(
    private auth: AngularFireAuth,
    private router: Router,
    private apiService: ApiService,
    private snackBar: MatSnackBar,
    private fb: AngularFirestore
  ) {}

  ngOnInit() {}

  signup() {
    if (
      !this.user.email ||
      !this.user.name ||
      !this.user.password ||
      this.user.password !== this.user.confirmPassword
    ) {
      return;
    }
    this.auth
      .createUserWithEmailAndPassword(this.user.email, this.user.password)
      .then(async (res) => {
        await this.fb
          .doc(`users/${res.user?.uid}`)
          .set({
            email: this.user.email,
            name: this.user.name,
            createdAt: Date.now(),
          });
        const user = await this.auth.currentUser;
        this.apiService.auth.next(user);
        localStorage.setItem("auth", JSON.stringify(user));
        this.router.navigate(["/games"]);
      })
      .catch((err) => {
        this.snackBar.open(err.message, "OK", { duration: 5000 });
      });
  }
}
