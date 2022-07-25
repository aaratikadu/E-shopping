import { Injectable } from '@angular/core';
import { UserDetailsType } from 'src/app/interfaces/user.type';

export enum SESSION_KEY {
  USER = 'user_details'
}
@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private userDetails: UserDetailsType | null = null;
  constructor() {
    this.syncUser();
  }

  getUsers() {
    return this.userDetails;
  }
  setUser(user: UserDetailsType) {
    this.userDetails = user;
    sessionStorage.setItem(SESSION_KEY.USER, JSON.stringify(user));
  }

  syncUser() {
    const user = sessionStorage.getItem(SESSION_KEY.USER);
    this.userDetails = user ? JSON.parse(user) as UserDetailsType : null;
  }
  isUserAuthenticated(): boolean {
    this.syncUser();
    return this.userDetails ? true : false;
  }
  isAdmin(): boolean {
    this.syncUser();
    return this.userDetails?.role === 'admin' ? true : false;
  }

  clear() {
    sessionStorage.removeItem(SESSION_KEY.USER);
    this.userDetails = null;
  }
}
