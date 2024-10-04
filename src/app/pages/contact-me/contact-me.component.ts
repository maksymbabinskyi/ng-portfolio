import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-contact-me',
  templateUrl: './contact-me.component.html',
  styleUrls: ['./contact-me.component.scss']
})
export class ContactMeComponent implements OnInit {
  firstName = '';
  lastName = '';
  email = '';
  message = '';
  showError = false;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
  }

  sendEmail() {
    this.showError = false;
    if (!this.email) {
      this.showError = true;
      return;
    }
    this.apiService.contactMe({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      message: this.message
    }).subscribe((res: any) => {
      if (res.accepted) {
        this.firstName = '';
        this.lastName = '';
        this.email = '';
        this.message = '';
      }
    });
  }
}
