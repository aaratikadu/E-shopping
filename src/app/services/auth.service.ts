import { Injectable } from '@angular/core';
import { SignInRequest, SignUpRequestType } from '../interfaces/auth.type';
import { ApiService } from './api.service';
import { SessionService } from './storage/session.service';
export interface UserUpdateDetailsType {
  isUpdate: boolean,
  userID: number,
  userName: string,
  fullName: string,
  emailID: string,
  mobileNumber: string
}

export interface UserAddressRequestType {
  isUpdate: boolean;
  userID: number;
  address1: string;
  address2: string;
  city: string;
  distict: string;
  state: string;
  country: string;
  pincode: string;

}
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private api: ApiService,
    private session: SessionService
  ) { }

  singUp(userDetails: SignUpRequestType) {
    return this.api.post('/api/Auth/SignUp', userDetails);
  }

  signIn(userCred: SignInRequest) {
    return this.api.post('/api/Auth/SignIn', userCred);
  }
  addUserDetails(payload: UserUpdateDetailsType) {
    payload.isUpdate = false;
    payload.userID = this.session.getUsers()?.userId || 0;
    payload.mobileNumber = payload.mobileNumber.toString();
    payload.userName = this.session.getUsers()?.userName || '';
    return this.api.post('/api/Auth/AddCustomerDetail', payload);
  }

  addUserAddress(payload: UserAddressRequestType) {
    payload.userID = this.session.getUsers()?.userId || 0;
    return this.api.post('/api/Auth/AddCustomerAdderess', payload);
  }


}
