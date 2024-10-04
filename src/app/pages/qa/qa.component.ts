import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: "app-qa",
  templateUrl: "./qa.component.html",
  styleUrls: ["./qa.component.scss"],
})
export class QaComponent implements OnInit {
  qas: any[] = [];
  users: any[] = [];
  filteredQas: any[] = [];
  searchVal = "";

  constructor(private db: AngularFirestore) {
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
      .subscribe((res) => {
        this.qas = [];
        res.forEach((r) => {
          this.qas.push({
            id: r.payload.doc.id,
            ...(r.payload as any).doc.data(),
          });
        });
        this.search();
      });
  }

  ngOnInit() {}

  search() {
    this.filteredQas = this.qas.filter((qa: any) => {
      let isIn = true;
      for (let val of this.searchVal.replace(/,/g, " ").split(" ")) {
        if (
          !qa.question.toLowerCase().includes(val.toLowerCase()) &&
          !qa.answer.toLowerCase().includes(val.toLowerCase()) &&
          !qa.user.toLowerCase().includes(val.toLowerCase())
        ) {
          isIn = false;
          break;
        }
      }
      return isIn;
    });
  }
}
