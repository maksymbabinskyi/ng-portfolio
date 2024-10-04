import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  ProjectsComponent,
  PreviewDialogComponent,
} from "./pages/projects/projects.component";
import { MatBadgeModule } from "@angular/material/badge";
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ProjectComponent } from "./components/project/project.component";
import { environment } from "../environments/environment";
import { CanActivateService } from "./services/can-activate.service";
import { ChatComponent } from "./components/chat/chat.component";
import { FormsModule } from "@angular/forms";
import { OverviewComponent } from "./pages/overview/overview.component";
import { ContactMeComponent } from "./pages/contact-me/contact-me.component";
import { HttpClientModule } from "@angular/common/http";
import { QaComponent } from "./pages/qa/qa.component";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { IvyCarouselModule } from "carousel-angular";
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from "@angular/fire/compat/firestore";
import { AngularFireStorageModule } from "@angular/fire/compat/storage";
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { TestsComponent } from "./pages/tests/tests.component";
import { PipesModule } from "./pipes/pipes.module";
import { HighlightModule, HIGHLIGHT_OPTIONS } from "ngx-highlightjs";

@NgModule({
  declarations: [
    AppComponent,
    ProjectsComponent,
    ProjectComponent,
    PreviewDialogComponent,
    ChatComponent,
    OverviewComponent,
    ContactMeComponent,
    QaComponent,
    TestsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatBadgeModule,
    MatTooltipModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    IvyCarouselModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireAuthModule,
    PipesModule,
    HighlightModule,
  ],
  providers: [
    CanActivateService,
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        fullLibraryLoader: () => import("highlight.js"),
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
