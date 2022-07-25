import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

interface CustomerListRequest {
  pageNumber: number;
  numberOfRecordPerPage: number;
}

export interface CustomerDataType {
  id: number;
  userID: number;
  userName: string;
  fullName: string;
  insertionDate: string;
  emailID: string;
  mobileNumber: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private api: ApiService
  ) { }

  getAll(payload: CustomerListRequest) {
    return this.api.post('/api/Auth/CustomerList', payload);
  }
}
