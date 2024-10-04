import { Component, OnInit, Inject } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { AngularFireStorage } from "@angular/fire/compat/storage";
import { MatTableDataSource } from "@angular/material/table";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: "app-admin-projects",
  templateUrl: "./admin-projects.component.html",
  styleUrls: ["./admin-projects.component.scss"],
})
export class AdminProjectsComponent implements OnInit {
  displayedColumns: string[] = [
    "order",
    "title",
    "description",
    "repo",
    "url",
    "videoUrl",
    "skills",
    "images",
    "status",
    "action",
  ];
  dataSource: any = new MatTableDataSource([]);
  skills: any[] = [];

  constructor(
    private db: AngularFirestore,
    private dialog: MatDialog,
    private storage: AngularFireStorage
  ) {
    this.db
      .collection("projects")
      .snapshotChanges()
      .subscribe((res) => {
        const projects: any[] = [];
        res.forEach((r) => {
          projects.push({
            id: r.payload.doc.id,
            ...(r.payload.doc.data() as any),
          });
        });
        projects.sort((a, b): any => {
          if (a.title > b.title) {
            return 1;
          } else if (a.title < b.title) {
            return -1;
          }
        });
        this.dataSource = new MatTableDataSource(projects);
      });
    this.db
      .collection("skills")
      .snapshotChanges()
      .subscribe((res) => {
        this.skills = [];
        res.forEach((r) => {
          this.skills.push({
            id: r.payload.doc.id,
            ...(r.payload.doc.data() as any),
          });
        });
        this.skills.sort((a, b): any => {
          if (a.title > b.title) {
            return 1;
          } else if (a.title < b.title) {
            return -1;
          }
        });
      });
  }

  ngOnInit() {}

  add() {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: "600px",
      data: {
        skillSet: this.skills,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.image) {
          this.storage
            .upload(`projects/${new Date().getTime()}.png`, result.image)
            .then((res) => {
              res.ref.getDownloadURL().then((url) => {
                if (result.images) {
                  result.images = [...result.images, url];
                } else {
                  result.images = [url];
                }
                delete result.image;
                this.db.collection("projects").add(result);
              });
            });
        } else {
          this.db.collection("projects").add(result);
        }
      }
    });
  }

  edit(project: any) {
    const dialogRef = this.dialog.open(AddProjectDialogComponent, {
      width: "600px",
      data: {
        ...project,
        skillSet: this.skills,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (result.image && result.isImageChanged) {
          this.storage
            .upload(`projects/${new Date().getTime()}.png`, result.image)
            .then((res) => {
              res.ref.getDownloadURL().then((url) => {
                result.image = url;
                this.db.collection("projects").doc(project.id).update(result);
              });
            });
        }
        if (result.otherImage && result.isOtherImageChanged) {
          this.storage
            .upload(`projects/${new Date().getTime()}.png`, result.otherImage)
            .then((res) => {
              res.ref.getDownloadURL().then((url) => {
                if (result.images) {
                  result.images = [...result.images, url];
                } else {
                  result.images = [url];
                }
                delete result.isOtherImageChanged;
                delete result.otherImage;
                this.db.collection("projects").doc(project.id).update(result);
              });
            });
        }
        if (result.videoUrl && result.isVideoChanged) {
          this.storage
            .upload(`projects/${new Date().getTime()}.mp4`, result.videoUrl)
            .then((res) => {
              res.ref.getDownloadURL().then((url) => {
                result.videoUrl = url;
                delete result.isVideoChanged;
                this.db.collection("projects").doc(project.id).update(result);
              });
            });
        }
        if (!result.isImageChanged && !result.isVideoChanged) {
          this.db.collection("projects").doc(project.id).update(result);
        }
      }
    });
  }

  delete(project: any) {
    const dialogRef = this.dialog.open(DeleteProjectDialogComponent, {
      width: "400px",
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.db.collection("projects").doc(project.id).delete();
      }
    });
  }
}

@Component({
  selector: "app-add-project-dialog",
  templateUrl: "add-project-dialog.html",
})
export class AddProjectDialogComponent {
  title = "Add a Project";
  project: any = {};

  constructor(
    public dialogRef: MatDialogRef<AddProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) {
      this.project = this.data;
      this.project.isImageChanged = false;
      this.project.isOtherImageChanged = false;
      this.title = "Edit a Project";
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  handleFileInput(target: any) {
    this.project.otherImage = target.files[0];
    if (target.files[0]) {
      this.project.isOtherImageChanged = true;
    }
  }

  handlePrimaryFileInput(target: any) {
    this.project.image = target.files[0];
    if (target.files[0]) {
      this.project.isImageChanged = true;
    }
  }

  handleVideoInput(target: any) {
    this.project.videoUrl = target.files[0];
    if (target.files[0]) {
      this.project.isVideoChanged = true;
    }
  }
}

@Component({
  selector: "app-delete-project-dialog",
  templateUrl: "delete-project-dialog.html",
})
export class DeleteProjectDialogComponent {
  title = "Delete";

  constructor(
    public dialogRef: MatDialogRef<DeleteProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data && this.data.title) {
      this.title = this.data.title;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
