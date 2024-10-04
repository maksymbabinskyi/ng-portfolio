import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Router } from "@angular/router";
import { ApiService } from "./api.service";

@Injectable()
export class CanActivateAdminService {
  admin = false;

  constructor(private router: Router, private apiService: ApiService) {
    this.apiService.isAdmin.subscribe((res: boolean) => {
      this.admin = res;
    });
  }

  async canActivate(snapshot: ActivatedRouteSnapshot) {
    if (this.admin) {
      return true;
    } else {
      this.router.navigate(["admin/login"]);
      return false;
    }
  }
}
