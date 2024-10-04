import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  auth: any = new BehaviorSubject(null);
  isAdmin = new BehaviorSubject(false);

  constructor(private afAuth: AngularFireAuth, private httpClient: HttpClient) {
    if (localStorage.getItem("auth")) {
      const user = JSON.parse(localStorage.getItem("auth") as string);
      this.auth.next(user);
      if (
        user?.email !== ""
      ) {
        this.isAdmin.next(true);
      }
    } else {
      this.afAuth.authState.subscribe(async (res: any) => {
        if (res) {
          const user = await this.afAuth.currentUser;
          localStorage.setItem("auth", JSON.stringify(user));
          this.auth.next(user);
          if (
            user?.email !== ""
          ) {
            this.isAdmin.next(true);
          }
        }
      });
    }
  }

  contactMe(data: any) {
    return this.httpClient.post(
      "/contact",
      data
    );
  }
}
