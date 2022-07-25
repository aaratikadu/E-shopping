import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { SessionService } from '../storage/session.service';

interface OrderListRequest {
  pageNumber: number;
  numberOfRecordPerPage: number;
  userID?: number;
}

export interface OrderDetailsType {
  cartID: number;
  fullName: string;
  insertionDate: string;
  isActive: boolean;
  isArchive: boolean;
  productCompany: string;
  productDetails: string;
  productID: number;
  productImageUrl: string;
  productName: string;
  productPrice: string;
  productType: string;
  publicID: string;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private api: ApiService,
  ) { }

  getAll(payload: OrderListRequest) {
    payload.userID = -1;
    return this.api.post('/api/Card/GetOrderProduct', payload);
  }
}
