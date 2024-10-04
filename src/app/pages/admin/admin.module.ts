import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminRoutingModule } from "./admin-routing.module";
import { LoginComponent } from "./login/login.component";
import {
  AdminProjectsComponent,
  AddProjectDialogComponent,
  DeleteProjectDialogComponent,
} from "./admin-projects/admin-projects.component";
import { AdminComponent } from "./admin.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { AdminSkillsComponent } from "./admin-skills/admin-skills.component";
import {
  AdminQasComponent,
  EditQaDialogComponent,
} from "./admin-qas/admin-qas.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatChipsModule } from "@angular/material/chips";
import { MatTableModule } from "@angular/material/table";
import { MatCardModule } from "@angular/material/card";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import {
  AdminTestsComponent,
  EditTestDialogComponent,
} from "./admin-tests/admin-tests.component";
import { CanActivateAdminService } from "src/app/services/can-activate-admin.service";
import { PipesModule } from "src/app/pipes/pipes.module";

@NgModule({
  declarations: [
    AdminComponent,
    LoginComponent,
    AdminProjectsComponent,
    AddProjectDialogComponent,
    DeleteProjectDialogComponent,
    AdminSkillsComponent,
    AdminQasComponent,
    EditQaDialogComponent,
    AdminTestsComponent,
    EditTestDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatChipsModule,
    MatTableModule,
    MatIconModule,
    MatDividerModule,
    MatCardModule,
    MatSnackBarModule,
    PipesModule,
  ],
  entryComponents: [
    AddProjectDialogComponent,
    DeleteProjectDialogComponent,
    AdminSkillsComponent,
    EditQaDialogComponent,
    EditTestDialogComponent,
  ],
  providers: [CanActivateAdminService],
})
export class AdminModule {}
