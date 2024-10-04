import { Component, OnInit, Inject } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatTableDataSource } from "@angular/material/table";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { DeleteProjectDialogComponent } from "../admin-projects/admin-projects.component";

@Component({
  selector: "app-admin-tests",
  templateUrl: "./admin-tests.component.html",
  styleUrls: ["./admin-tests.component.scss"],
})
export class AdminTestsComponent implements OnInit {
  displayedColumns: string[] = ["question", "answer", "action"];
  dataSource: any = new MatTableDataSource([]);
  test = {
    question: "",
    answer: "",
  };

  constructor(private db: AngularFirestore, private dialog: MatDialog) {
    this.db
      .collection(`tests`)
      .snapshotChanges()
      .subscribe((res) => {
        const tests: any[] = [];
        res.forEach((r) => {
          tests.push({
            id: r.payload.doc.id,
            ...(r.payload as any).doc.data(),
          });
        });
        this.dataSource = new MatTableDataSource(tests);
      });
  }

  ngOnInit() {}

  add() {
    if (!this.test.question || !this.test.answer) {
      return;
    }
    this.db.collection(`tests`).add({
      ...this.test,
    });
    this.test = { question: "", answer: "" };
  }

  edit(qa: any) {
    const dialogRef = this.dialog.open(EditTestDialogComponent, {
      width: "600px",
      data: qa,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.db.collection(`tests`).doc(qa.id).update(result);
      }
    });
  }

  delete(qa: any) {
    const dialogRef = this.dialog.open(DeleteProjectDialogComponent, {
      width: "400px",
      data: {
        title: "",
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.db.collection(`tests`).doc(qa.id).delete();
      }
    });
  }
}

@Component({
  selector: "app-edit-test-dialog",
  templateUrl: "edit-test-dialog.html",
})
export class EditTestDialogComponent {
  title = "Edit Test";
  test: any = {};

  constructor(
    public dialogRef: MatDialogRef<EditTestDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) {
      this.test = this.data;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
