import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { ApiService } from "./api.service";

@Injectable()
export class CanActivateService {
  auth = null;

  constructor(private router: Router, private apiService: ApiService) {
    this.apiService.auth.subscribe((res: any) => {
      this.auth = res;
    });
  }

  async canActivate(snapshot: ActivatedRouteSnapshot) {
    if (this.auth) {
      return true;
    } else {
      this.router.navigate(["admin/login"]);
      return false;
    }
  }
}
