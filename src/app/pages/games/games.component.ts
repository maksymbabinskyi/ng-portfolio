import { Component, OnInit } from "@angular/core";
declare const confetti: any;

@Component({
  selector: "app-games",
  templateUrl: "./games.component.html",
  styleUrls: ["./games.component.scss"],
})
export class GamesComponent implements OnInit {
  cards: any[] = [];
  flags: any[] = [];
  selectedCards: any[] = [];
  timeout: any = null;
  clickableTimeout: any = null;
  clickable = false;
  num = 8;
  levelFinished = false;
  level = 1;
  allItems: any[] = [];
  timer: any = null;
  time = 0;
  isStarted = false;
  message = "";
  confettiTime = 5;

  constructor() {
    for (let i = 1; i < 24; i++) {
      this.allItems.push(i);
    }
    this.getCards();
  }

  ngOnInit() {}

  start() {
    this.clickable = true;
    this.isStarted = true;
    this.timer = setInterval(() => {
      this.time += 1;
      if (this.time > 110) {
        clearInterval(this.timer);
      }
    }, 400 + this.level * 100);
  }

  getCards() {
    const items = this.getRandom(this.allItems, this.num / 2);
    this.flags = [];
    this.cards = [];
    items.forEach(async (item) => {
      this.cards.push(item);
      this.cards.push(item);
      if (this.cards.length === this.num) {
        this.cards = this.shuffle(this.cards);
        this.cards.forEach(() => {
          this.flags.push(0);
        });
      }
    });
  }

  showCard(index: any) {
    if (
      this.flags[index] === -1 ||
      this.selectedCards.length > 1 ||
      !this.clickable ||
      this.selectedCards.indexOf(index) > -1
    ) {
      return;
    }
    this.flags[index] = 1;
    this.selectedCards.push(index);
    if (this.selectedCards.length === 2) {
      this.clickable = false;
    }
    if (
      typeof this.selectedCards[1] !== "undefined" &&
      this.cards[this.selectedCards[0]] === this.cards[this.selectedCards[1]]
    ) {
      if (this.timeout) {
        clearTimeout(this.timeout);
      }
      if (this.clickableTimeout) {
        clearTimeout(this.clickableTimeout);
      }
      setTimeout(() => {
        this.flags[this.selectedCards[0]] = -1;
        this.flags[this.selectedCards[1]] = -1;
        this.selectedCards = [];
        this.checkFlags();
        setTimeout(() => {
          this.clickable = true;
        }, 500);
      }, 1000);
    } else {
      this.timeout = setTimeout(() => {
        if (this.flags[index] === 1) {
          this.flags[index] = 0;
        }
        this.selectedCards.splice(this.selectedCards.indexOf(index), 1);
        if (this.selectedCards.length === 0) {
          this.clickableTimeout = setTimeout(() => {
            this.clickable = true;
          }, 500);
        }
      }, 2000);
    }
  }

  checkFlags() {
    if (this.flags.indexOf(0) < 0 && this.flags.indexOf(1) < 0) {
      clearInterval(this.timer);
      setTimeout(() => {
        this.levelFinished = true;
        this.clickable = false;
        for (let i = 0; i < this.flags.length; i++) {
          this.flags[i] = 1;
        }
        if (this.time < 50) {
          this.message = "Your memory is splendid!";
        } else if (this.time >= 50 && this.time < 80) {
          this.message = "Your memory is good!";
        } else if (this.time >= 80 && this.time < 100) {
          this.message = "Your memory is not bad! Anyway, improve it!";
        } else {
          this.message = "You should improve your memory! Work hard!";
        }
        this.showConfetti();
      }, 1000);
    }
  }

  showConfetti() {
    if (this.time < 50) {
      const end = Date.now() + this.confettiTime * 1000;
      const interval: any = setInterval(() => {
        if (Date.now() > end) {
          return clearInterval(interval);
        }
        confetti({
          startVelocity: 30,
          spread: 360,
          ticks: 60,
          shapes: ["square"],
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2,
          },
        });
      }, 200);
    } else if (this.time >= 50 && this.time < 80) {
      const end = Date.now() + this.confettiTime * 1000;
      (function frame() {
        confetti({
          particleCount: 2,
          angle: 60,
          spread: 55,
          origin: {
            x: 0,
          },
          colors: ["#bb0000", "#00cc00"],
        });
        confetti({
          particleCount: 2,
          angle: 120,
          spread: 55,
          origin: {
            x: 1,
          },
          colors: ["#bb0000", "#00cc00"],
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } else if (this.time >= 80 && this.time < 100) {
      const end = Date.now() + this.confettiTime * 1000;
      (function frame() {
        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: 300,
          origin: {
            x: Math.random(),
            y: Math.random() - 0.2,
          },
          colors: ["#aaaaaa", "#bbbbbb", "#cccccc", "#dddddd", "#eeeeee"],
          shapes: ["circle"],
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      })();
    } else {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          y: 0.6,
        },
      });
    }
  }

  getRandom(arr: any, n: any) {
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);
    if (n > len) {
      throw new RangeError("getRandom: more elements taken than available");
    }
    while (n--) {
      const x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  changeLevel(val: any) {
    this.level += val;
    this.isStarted = false;
    this.levelFinished = false;
    this.clickable = false;
    this.time = 0;
    if (val > 0) {
      this.num += 4;
    } else {
      this.num -= 4;
    }
    this.getCards();
  }

  shuffle(arr: any) {
    let currentIndex = arr.length;
    let temporaryValue;
    let randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = arr[currentIndex];
      arr[currentIndex] = arr[randomIndex];
      arr[randomIndex] = temporaryValue;
    }
    return arr;
  }
}
