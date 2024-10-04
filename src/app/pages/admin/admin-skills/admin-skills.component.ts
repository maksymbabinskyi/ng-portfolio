import { Component, OnInit } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: "app-admin-skills",
  templateUrl: "./admin-skills.component.html",
  styleUrls: ["./admin-skills.component.scss"],
})
export class AdminSkillsComponent implements OnInit {
  displayedColumns: string[] = ["title", "key", "action"];
  dataSource: any = new MatTableDataSource([]);
  skill = {
    title: "",
    key: "",
  };

  constructor(private db: AngularFirestore) {
    this.db
      .collection("skills")
      .snapshotChanges()
      .subscribe((res) => {
        const skills: any[] = [];
        res.forEach((r) => {
          skills.push({
            id: r.payload.doc.id,
            ...(r.payload.doc.data() as any),
          });
        });
        skills.sort((a, b): any => {
          if (a.title > b.title) {
            return 1;
          } else if (a.title < b.title) {
            return -1;
          }
        });
        this.dataSource = new MatTableDataSource(skills);
      });
  }

  ngOnInit() {}

  add() {
    this.db.collection("skills").add(this.skill);
    this.skill = { title: "", key: "" };
  }
}
