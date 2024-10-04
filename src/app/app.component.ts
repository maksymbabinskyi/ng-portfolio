import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { ApiService } from "./services/api.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  auth = null;
  isAdmin = false;
  constructor(
    public router: Router,
    private fbAuth: AngularFireAuth,
    private apiService: ApiService
  ) {
    this.apiService.auth.subscribe((res: any) => {
      this.auth = res;
    });
    this.apiService.isAdmin.subscribe((res) => {
      this.isAdmin = res;
    });
  }

  logout() {
    this.fbAuth.signOut().then((res) => {
      this.apiService.auth.next(null);
      localStorage.removeItem("auth");
      if (this.isAdmin) {
        this.router.navigate(["admin/login"]);
      } else {
        this.router.navigate(["user/login"]);
      }
    });
  }
}
