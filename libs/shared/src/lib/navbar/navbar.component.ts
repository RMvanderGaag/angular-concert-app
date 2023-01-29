import { Component, TemplateRef } from '@angular/core';
import { NgbDatepickerModule, NgbOffcanvas, OffcanvasDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'angular-concert-project-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  showLogin: boolean = true;
  showAccountUI: boolean = false;

  constructor(private offcanvas: NgbOffcanvas) { }

  openOffcanvas(content: TemplateRef<any>) {
    this.offcanvas.open(content, { position: "end" });
  }

  changeOC(showLogin: boolean) {
    this.showLogin = showLogin;
    let loginBtn = document.getElementById("loginBtn");
    let registerBtn = document.getElementById("registerBtn");

    if (showLogin) {
      loginBtn?.classList.add("active");
      registerBtn?.classList.remove("active");
    } else {
      loginBtn?.classList.remove("active");
      registerBtn?.classList.add("active");
    }
  }

  showAccount() {
    this.showAccountUI = true;
  }
}
