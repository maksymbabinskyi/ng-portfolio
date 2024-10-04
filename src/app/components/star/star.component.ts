import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-star",
  templateUrl: "./star.component.html",
  styleUrls: ["./star.component.scss"],
})
export class StarComponent implements OnInit {
  @Input() star = 0;
  @Input() clickable = false;
  @Output() set = new EventEmitter();

  stars = [1, 2, 3, 4, 5];

  constructor() {}

  ngOnInit() {}

  setStar(star: any) {
    if (!this.clickable) {
      return;
    }
    this.set.emit(star);
  }
}
