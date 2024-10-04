import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"],
})
export class ChatComponent implements OnInit {
  isOpened = false;
  message = "";
  emailSubmitted = false;
  email = "";
  userId = "";
  messages: any[] = [];
  chatId = "";
  loading = false;

  constructor(private auth: AngularFireAuth, private db: AngularFirestore) {}

  ngOnInit() {
    const authSub = this.auth.authState.subscribe((res) => {
      authSub.unsubscribe();
      if (res) {
        this.userId = res.uid;
        const sub = this.db
          .collection("users")
          .doc(this.userId)
          .valueChanges()
          .subscribe((user: any) => {
            sub.unsubscribe();
            if (user) {
              this.emailSubmitted = true;
              this.chatId = user.chatId;
              this.db
                .collection("chats")
                .doc(user.chatId)
                .collection("messages")
                .valueChanges()
                .subscribe((messages) => {
                  this.messages = messages.sort(
                    (a, b) => a["time"] - b["time"]
                  );
                });
            }
          });
      }
    });
  }

  sendMessage() {
    if (!this.chatId || this.message === "") {
      return;
    }
    this.db.collection("chats").doc(this.chatId).collection("messages").add({
      message: this.message,
      time: new Date().getTime(),
      sender: "customer",
    });
    const sub = this.db
      .collection("users")
      .doc(this.userId)
      .valueChanges()
      .subscribe((res: any) => {
        sub.unsubscribe();
        this.db
          .collection("users")
          .doc(this.userId)
          .set({ ...res, new: true });
      });
    this.message = "";
  }

  submit() {
    this.loading = true;
    this.auth
      .signInWithEmailAndPassword(this.email, "123456789")
      .then((res) => {
        this.userId = res.user?.uid as string;
        const sub = this.db
          .collection("users")
          .doc(this.userId)
          .valueChanges()
          .subscribe((user: any) => {
            sub.unsubscribe();
            if (!user) {
              this.db
                .collection("chats")
                .add({
                  userId: this.userId,
                })
                .then((chat) => {
                  this.chatId = chat.id;
                  this.db
                    .collection("users")
                    .doc(this.userId)
                    .set({
                      chatId: chat.id,
                      email: this.email,
                    })
                    .then(() => {
                      this.emailSubmitted = true;
                      this.loading = false;
                      this.db
                        .collection("chats")
                        .doc(this.chatId)
                        .collection("messages")
                        .valueChanges()
                        .subscribe((messages) => {
                          this.messages = messages.sort(
                            (a, b) => a["time"] - b["time"]
                          );
                        });
                    });
                });
            } else {
              this.emailSubmitted = true;
              this.loading = false;
              this.chatId = user.chatId;
              this.db
                .collection("chats")
                .doc(user.chatId)
                .collection("messages")
                .valueChanges()
                .subscribe((messages) => {
                  this.messages = messages.sort(
                    (a, b) => a["time"] - b["time"]
                  );
                });
            }
          });
      })
      .catch((err) => {
        if (err.code === "auth/user-not-found") {
          this.auth
            .createUserWithEmailAndPassword(this.email, "123456789")
            .then((res) => {
              this.userId = res.user?.uid as string;
              this.emailSubmitted = true;
              this.loading = false;
            });
        }
      });
  }

  getTime(time: number) {
    const diff = (new Date().getTime() - time) / 1000;
    if (diff < 60) {
      return diff.toFixed() + " secs ago";
    } else if (diff >= 60 && diff / 60 < 60) {
      return (diff / 60).toFixed() + " mins ago";
    } else if (diff / 60 >= 60 && diff / 3600 < 24) {
      return (diff / 3600).toFixed() + " hours ago";
    } else if (diff / 3600 >= 24 && diff / (3600 * 24) < 30) {
      return (diff / (3600 * 24)).toFixed() + " days ago";
    } else {
      return (diff / (3600 * 24 * 30)).toFixed() + " months ago";
    }
  }

  validateEmail(email: string) {
    // tslint:disable-next-line:max-line-length
    const re: any =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  openChat() {
    this.isOpened = !this.isOpened;
  }
}
