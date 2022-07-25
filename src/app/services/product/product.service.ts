import { Injectable } from '@angular/core';
import { ApiService } from '../api.service';

interface ProductListRequest {
  pageNumber: number;
  numberOfRecordPerPage: number;
}
interface ProductArchiveRequest {
  productID: number;
}

export interface ProductDataType {
  productID: number;
  insertionDate: string;
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
  rating: number;
}


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private api: ApiService
  ) { }

  add(payload: FormData) {
    return this.api.post('/api/Product/AddProduct', payload);
  }

  getAll(payload: ProductListRequest) {
    return this.api.post('/api/Product/GetAllProduct', payload);
  }
  getArchive(payload: ProductListRequest) {
    return this.api.post('/api/Product/GetArchiveProduct', payload);
  }
  getTrash(payload: ProductListRequest) {
    return this.api.post('/api/Product/GetTrashProduct', payload);
  }
  moveToArchive(payload: ProductArchiveRequest) {
    return this.api.patch('/api/Product/ProductMoveToArchive', payload)
  }
  moveToTrash(payload: ProductArchiveRequest) {
    return this.api.patch('/api/Product/ProductMoveToTrash', payload)
  }
  productRestore(payload: ProductArchiveRequest) {
    return this.api.patch('/api/Product/ProductRestore', payload);
  }
  deletePermanently(payload: ProductArchiveRequest) {
    return this.api.delete('/api/Product/ProductDeletePermenently', payload);
  }
}
