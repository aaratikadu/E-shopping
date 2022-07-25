import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';
import { SessionService } from '../storage/session.service';

interface WishlistCartType {
  productID: number;
  userID: number;
}

export interface WishlistProductType {
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
  wishListID: number;
}

interface WishlistListRequest {
  pageNumber: number;
  numberOfRecordPerPage: number;
  userID?: number;
}
interface wishList {
  wishListID: number;
}

interface WishlistMoveToCartType {
  productID: number;
  userID?: number;
  wishListID: number;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(
    private api: ApiService,
    private session: SessionService
  ) { }

  add(payload: WishlistCartType) {
    return this.api.post('/api/WishList/AddToWishList', payload);
  }
  getAll(payload: WishlistListRequest) {
    payload.userID = this.session.getUsers()?.userId;
    return this.api.post('/api/WishList/GetAllWishListDetails', payload);
  }
  remove(payload: wishList) {
    return this.api.delete('/api/WishList/RemoveWishListProduct', payload);
  }
  moveToCart(payload: WishlistMoveToCartType) {
    payload.userID = this.session.getUsers()?.userId;
    return this.api.post('/api/WishList/MoveToCard', payload);
  }

}
