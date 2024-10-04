import { Component, OnInit, Inject } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { DeleteProjectDialogComponent } from "../admin-projects/admin-projects.component";
import { ApiService } from "src/app/services/api.service";
import { MatTableDataSource } from "@angular/material/table";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: "app-admin-qas",
  templateUrl: "./admin-qas.component.html",
  styleUrls: ["./admin-qas.component.scss"],
})
export class AdminQasComponent implements OnInit {
  displayedColumns: string[] = ["user", "question", "answer", "action"];
  dataSource: any = new MatTableDataSource([]);
  qa = {
    question: "",
    answer: "",
  };
  auth: any;
  users: any[] = [];

  constructor(
    private db: AngularFirestore,
    private dialog: MatDialog,
    private apiService: ApiService
  ) {
    this.apiService.auth.subscribe((res: any) => {
      this.auth = res;
    });
    this.db
      .collection("users")
      .get()
      .subscribe((res) => {
        this.users = res.docs.map((doc) => ({
          id: doc.id,
          ...(doc.data() as any),
        }));
      });
    this.db
      .collection(`qas-kms`)
      .snapshotChanges()
      .subscribe(async (res) => {
        const qas: any[] = [];
        res.forEach((r) => {
          qas.push({ id: r.payload.doc.id, ...(r.payload.doc.data() as any) });
        });
        this.dataSource = new MatTableDataSource(qas);
      });
  }

  ngOnInit() {}

  add() {
    if (!this.qa.question || !this.qa.answer) {
      return;
    }
    this.db.collection(`qas-kms`).add({
      ...this.qa,
      user: this.auth?.uid,
    });
    this.qa = { question: "", answer: "" };
  }

  edit(qa: any) {
    const dialogRef = this.dialog.open(EditQaDialogComponent, {
      width: "600px",
      data: qa,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.db.collection(`qas-kms`).doc(qa.id).update(result);
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
        this.db.collection(`qas-kms`).doc(qa.id).delete();
      }
    });
  }
}

@Component({
  selector: "app-edit-qa-dialog",
  templateUrl: "edit-qa-dialog.html",
})
export class EditQaDialogComponent {
  title = "Edit QA";
  qa: any = {};

  constructor(
    public dialogRef: MatDialogRef<EditQaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data) {
      this.qa = this.data;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
