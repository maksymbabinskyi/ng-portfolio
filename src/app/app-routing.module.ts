import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProjectsComponent } from "./pages/projects/projects.component";
import { OverviewComponent } from "./pages/overview/overview.component";
import { ContactMeComponent } from "./pages/contact-me/contact-me.component";
import { QaComponent } from "./pages/qa/qa.component";
import { CanActivateService } from "./services/can-activate.service";
import { TestsComponent } from "./pages/tests/tests.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "projects",
    pathMatch: "full",
  },
  {
    path: "projects",
    component: ProjectsComponent,
  },
  {
    path: "qas",
    component: QaComponent,
    canActivate: [CanActivateService],
  },
  {
    path: "tests",
    component: TestsComponent,
    canActivate: [CanActivateService],
  },
  {
    path: "games",
    loadChildren: () =>
      import("./pages/games/games.module").then((m) => m.GamesModule),
  },
  {
    path: "overview",
    component: OverviewComponent,
  },
  {
    path: "contact-me",
    component: ContactMeComponent,
  },
  {
    path: "admin",
    loadChildren: () =>
      import("./pages/admin/admin.module").then((m) => m.AdminModule),
  },
  {
    path: "user",
    loadChildren: () =>
      import("./pages/user/user.module").then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
