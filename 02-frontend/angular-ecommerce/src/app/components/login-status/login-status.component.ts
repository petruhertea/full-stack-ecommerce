import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-status',
  standalone: false,
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css'
})

export class LoginStatusComponent {
  constructor(
    public auth: AuthService
  ) {}

  logout() {
    this.auth.logout({ logoutParams: { returnTo: window.location.origin } });
  }
}
