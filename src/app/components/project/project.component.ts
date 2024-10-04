import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-project",
  templateUrl: "./project.component.html",
  styleUrls: ["./project.component.scss"],
})
export class ProjectComponent implements OnInit {
  @Input() project: any = {};
  @Input() skills: any[] = [];
  @Output() preview = new EventEmitter();

  muted = true;

  constructor() {}

  ngOnInit() {}

  getSkill(id: string) {
    return this.skills.find((s) => s.id === id);
  }
}
