import { Component, OnInit, Inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.scss"],
})
export class ProjectsComponent implements OnInit {
  skills = [
    { icon: "assets/imgs/ic-angular.svg", title: "Angular", skill: "angular" },
    { icon: "assets/imgs/ic-react.svg", title: "React.js", skill: "react" },
    { icon: "assets/imgs/ic-vue.png", title: "Vue.js", skill: "vue" },
    { icon: "assets/imgs/ic-d3.svg", title: "D3.js", skill: "d3" },
    { icon: "assets/imgs/ic-node.svg", title: "Node.js", skill: "node" },
    {
      icon: "assets/imgs/ic-ionic.png",
      title: "Ionic Framework",
      skill: "ionic",
    },
    {
      icon: "assets/imgs/ic-wordpress.svg",
      title: "WordPress",
      skill: "wordpress",
    },
    {
      icon: "assets/imgs/ic-bootstrap.svg",
      title: "Bootstrap",
      skill: "bootstrap",
    },
    {
      icon: "assets/imgs/ic-codeigniter.svg",
      title: "Codeigniter",
      skill: "codeigniter",
    },
    { icon: "assets/imgs/ic-css.svg", title: "CSS", skill: "css" },
    { icon: "assets/imgs/ic-django.jpg", title: "Django", skill: "django" },
    {
      icon: "assets/imgs/ic-firebase.svg",
      title: "Firebase",
      skill: "firebase",
    },
    { icon: "assets/imgs/ic-html.svg", title: "HTML", skill: "html" },
    { icon: "assets/imgs/ic-java.svg", title: "Java", skill: "java" },
    {
      icon: "assets/imgs/ic-javascript.svg",
      title: "Javascript",
      skill: "javascript",
    },
    { icon: "assets/imgs/ic-jquery.svg", title: "JQuery", skill: "jquery" },
    { icon: "assets/imgs/ic-laravel.svg", title: "Laravel", skill: "laravel" },
    { icon: "assets/imgs/ic-php.svg", title: "PHP", skill: "php" },
    { icon: "assets/imgs/ic-python.svg", title: "Python", skill: "python" },
    {
      icon: "assets/imgs/ic-rails.svg",
      title: "Ruby on Rails",
      skill: "ruby on rails",
    },
    { icon: "assets/imgs/ic-sass.svg", title: "SASS/SCSS/LESS", skill: "scss" },
    { icon: "assets/imgs/ic-swift.svg", title: "Swift", skill: "swift" },
    { icon: "assets/imgs/ic-redux.png", title: "Redux", skill: "redux" },
    {
      icon: "assets/imgs/ic-typescript.svg",
      title: "Typescript",
      skill: "typescript",
    },
  ];
  skill = "";
  projects: any[] = [];
  filteredProjects: any[] = [];
  allSkills: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private db: AngularFirestore,
    private dialog: MatDialog
  ) {
    this.skill = this.route.snapshot.queryParamMap.get("skill") || "";
    this.db
      .collection("skills")
      .snapshotChanges()
      .subscribe((res) => {
        this.allSkills = [];
        res.forEach((r) => {
          this.allSkills.push({
            id: r.payload.doc.id,
            ...(r.payload.doc.data() as any),
          });
        });
      });
    const sub = this.db
      .collection("projects")
      .valueChanges()
      .subscribe((res) => {
        sub.unsubscribe();
        this.projects = res.filter((p: any) => !p.disabled);
        this.filteredProjects = this.projects
          .filter((p: any) => {
            if (this.skill === "") {
              return true;
            }
            let isExist = false;
            const skill = this.allSkills.find((s: any) => s.key === this.skill);
            if (p.skills.includes(skill.id)) {
              isExist = true;
            }
            return isExist;
          })
          .sort((a, b): any => {
            if (a.title > b.title) {
              return 1;
            } else if (a.title < b.title) {
              return -1;
            }
          });
        this.filteredProjects.forEach((p: any) => {
          if (!p.images) {
            p.images = [p.image];
          }
        });
      });
  }

  ngOnInit() {}

  filter(skill: any) {
    if (skill) {
      this.router.navigate(["/projects"], { queryParams: { skill } });
      this.skill = skill;
    } else {
      this.router.navigate(["/projects"]);
      this.skill = "";
    }
    this.filteredProjects = this.projects
      .filter((p: any) => {
        if (this.skill === "") {
          return true;
        }
        let isExist = false;
        const newSkill: any = this.allSkills.find(
          (s: any) => s.key === this.skill
        );
        if (p.skills.includes(newSkill.id)) {
          isExist = true;
        }
        return isExist;
      })
      .sort((a, b): any => {
        if (a.title > b.title) {
          return 1;
        } else if (a.title < b.title) {
          return -1;
        }
      });
  }

  preview(project: any) {
    const dialogRef = this.dialog.open(PreviewDialogComponent, {
      width: "100%",
      maxWidth: "100%",
      height: "100%",
      data: {
        ...project,
        allSkills: this.allSkills,
      },
      panelClass: "preview-dialog",
    });
  }
}

@Component({
  selector: "app-preview-dialog",
  templateUrl: "preview-dialog.html",
  styleUrls: ["./projects.component.scss"],
})
export class PreviewDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<PreviewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  getSkill(id: string) {
    return this.data.allSkills.find((s: any) => s.id === id);
  }
}
