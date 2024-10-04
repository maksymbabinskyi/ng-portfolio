import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserRoutingModule } from "./user-routing.module";
import { LoginComponent } from "./login/login.component";
import { UserComponent } from "./user.component";
import { MatDividerModule } from "@angular/material/divider";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { SignupComponent } from "./signup/signup.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { MatTableModule } from "@angular/material/table";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatChipsModule } from "@angular/material/chips";
import { MatCardModule } from "@angular/material/card";

@NgModule({
  declarations: [UserComponent, LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
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
  ],
})
export class UserModule {}
