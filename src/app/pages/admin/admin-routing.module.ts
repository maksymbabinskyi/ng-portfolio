import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { AdminProjectsComponent } from "./admin-projects/admin-projects.component";
import { CanActivateService } from "src/app/services/can-activate.service";
import { AdminComponent } from "./admin.component";
import { AdminSkillsComponent } from "./admin-skills/admin-skills.component";
import { AdminQasComponent } from "./admin-qas/admin-qas.component";
import { AdminTestsComponent } from "./admin-tests/admin-tests.component";
import { CanActivateAdminService } from "src/app/services/can-activate-admin.service";

const routes: Routes = [
  {
    path: "",
    canActivate: [CanActivateService],
    component: AdminComponent,
    children: [
      { path: "", redirectTo: "projects", pathMatch: "full" },
      {
        path: "projects",
        component: AdminProjectsComponent,
        canActivate: [CanActivateAdminService],
      },
      {
        path: "skills",
        component: AdminSkillsComponent,
        canActivate: [CanActivateAdminService],
      },
      { path: "qas", component: AdminQasComponent },
      { path: "tests", component: AdminTestsComponent },
    ],
  },
  {
    path: "login",
    component: LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
