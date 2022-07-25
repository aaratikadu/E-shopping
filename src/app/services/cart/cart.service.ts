import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { SessionService } from '../storage/session.service';

interface ProductCartType {
  productID: number;
  userID: number;
}

interface CartListType {
  numberOfRecordPerPage: number;
  pageNumber: number;
  userID?: number;
}

interface CartRemoveType {
  cartID: number;
}

interface CartMakeOrderType {
  cartID: number;
  productID: number;
}
interface RatingRequestType {
  userID?: number;
  productID: number;
  rating: number;

}

export interface CartDetailsType {
  cartID: number;
  fullName: null
  insertionDate: string;
  isActive: boolean;
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

export interface OrderListType {
  cartID: number;
  productID: number;
  insertionDate: string;
  fullName: string;
  productName: string;
  productType: string;
  productPrice: string;
  productDetails: string;
  productCompany: string;
  quantity: number;
  productImageUrl: string;
  publicID: string;
  isArchive: boolean;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private api: ApiService,
    private session: SessionService
  ) { }

  add(payload: ProductCartType) {
    return this.api.post('/api/Card/AddToCard', payload);
  }
  getAll(payload: CartListType) {
    payload.userID = this.session.getUsers()?.userId;
    return this.api.post('/api/Card/GetAllCardDetails', payload);
  }
  remove(payload: CartRemoveType) {
    return this.api.delete('/api/Card/RemoveCartProduct', payload);
  }
  orderProduct(payload: CartMakeOrderType) {
    return this.api.post('/api/Card/OrderProduct', payload);
  }

  getAllOrders(payload: CartListType) {
    payload.userID = this.session.getUsers()?.userId;
    return this.api.post('/api/Card/GetOrderProduct', payload);
  }
  cancelOrder(payload: CartMakeOrderType) {
    return this.api.patch('/api/Card/CancleOrder', payload);
  }
  addRating(payload: RatingRequestType) {
    payload.userID = this.session.getUsers()?.userId;
    return this.api.patch('/api/Card/AddRating', payload);
  }
}
