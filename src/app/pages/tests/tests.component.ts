import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: "app-tests",
  templateUrl: "./tests.component.html",
  styleUrls: ["./tests.component.scss"],
})
export class TestsComponent implements OnInit {
  tests: any[] = [];
  filteredTests: any[] = [];
  searchVal = "";

  constructor(private db: AngularFirestore) {
    this.db
      .collection(`tests`)
      .snapshotChanges()
      .subscribe((res) => {
        this.tests = [];
        res.forEach((r) => {
          this.tests.push({
            id: r.payload.doc.id,
            ...(r.payload.doc.data() as any),
          });
        });
        this.search();
      });
  }

  ngOnInit() {}

  search() {
    this.filteredTests = this.tests.filter((qa) => {
      let isIn = true;
      for (let val of this.searchVal.replace(/,/g, " ").split(" ")) {
        if (
          !qa.question.toLowerCase().includes(val.toLowerCase()) &&
          !qa.answer.toLowerCase().includes(val.toLowerCase())
        ) {
          isIn = false;
          break;
        }
      }
      return isIn;
    });
  }
}
