import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
  standalone: false
})
export class LoginStatusComponent {
  isAuthenticated: boolean = false;
  profileJson: string | undefined;
  userEmail: string | undefined;
  userName: string | undefined;
  storage: Storage = sessionStorage;

  constructor(private auth: AuthService, @Inject(DOCUMENT) private doc: Document) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((authenticated: boolean) => {
      this.isAuthenticated = authenticated;
      console.log('User is authenticated: ', this.isAuthenticated);
    });

    this.auth.user$.subscribe((user) => {
      this.userName = user?.name;
      this.userEmail = user?.email;
      this.storage.setItem('userEmail', JSON.stringify(this.userEmail));
      console.log('User ID: ', this.userEmail);
    });
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({ logoutParams: { returnTo: this.doc.location.origin } });
  }
}