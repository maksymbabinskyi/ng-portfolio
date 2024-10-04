import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { GamesComponent } from "./games.component";
import { GamesRoutingModule } from "./games-routing.module";
import { MatIconModule } from "@angular/material/icon";
import { ReviewsComponent } from "src/app/components/reviews/reviews.component";
import { StarComponent } from "src/app/components/star/star.component";
import { FormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";

@NgModule({
  declarations: [GamesComponent, ReviewsComponent, StarComponent],
  imports: [
    CommonModule,
    GamesRoutingModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
  ],
})
export class GamesModule {}
