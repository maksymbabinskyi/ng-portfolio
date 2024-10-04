import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: "app-reviews",
  templateUrl: "./reviews.component.html",
  styleUrls: ["./reviews.component.scss"],
})
export class ReviewsComponent implements OnInit {
  stars = [1, 2, 3, 4, 5];
  star = 0;
  comment = "";
  user: any = null;
  reviews: any[] = [];

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  ngOnInit() {
    this.auth.authState.subscribe((res) => {
      this.user = res;
      this.db
        .collection("reviews")
        .valueChanges()
        .subscribe((reviews) => {
          this.reviews = reviews;
        });
    });
  }

  save() {
    this.db
      .collection("reviews")
      .add({
        userId: this.user.uid,
        email: this.user.email,
        star: this.star,
        comment: this.comment,
        time: new Date().getTime(),
      })
      .then((res) => {
        this.star = 0;
        this.comment = "";
      });
  }

  setStar(event: any) {
    this.star = event;
  }

  getDate(time: any) {
    return new Date(time).toLocaleString();
  }
}
