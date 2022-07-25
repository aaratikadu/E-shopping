import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductDataType, ProductService } from 'src/app/services/product/product.service';
import { SessionService } from 'src/app/services/storage/session.service';
import { WishlistService } from 'src/app/services/wishlist/wishlist.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  products: ProductDataType[] = [];
  allRecordsCount = 0;
  pageSize = 12;
  pageEvent: any;

  constructor(
    private product: ProductService,
    private wishlist: WishlistService,
    private cart: CartService,
    private session: SessionService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getProducts(1);
  }
  onPageChange(event: PageEvent) {
    this.getProducts(event.pageIndex + 1);
  }

  getProducts(pageNumber: number) {
    this.product.getAll({
      pageNumber: pageNumber,
      numberOfRecordPerPage: this.pageSize,
    }).subscribe((res: any) => {
      this.products = res?.data as ProductDataType[];
      this.allRecordsCount = res?.totalRecords;
    }, this.alert.error());
  }
  onAddToCart(productId: number) {
    this.cart.add({
      productID: productId,
      userID: this.session.getUsers()?.userId || 0, //change it,
    }).subscribe(() => {
      // this.getProducts(1);
      this.alert.single('Product added to cart.', 'success');
    }, this.alert.error());
  }
  onWishlist(productId: number) {
    this.wishlist.add({
      productID: productId,
      userID: this.session.getUsers()?.userId || 0, //change it,
    }).subscribe(() => {
      // this.getProducts(1);
      this.alert.single('Product added to wishlist.', 'success');
    }, this.alert.error());
  }

  rateAr(range: number) {
    return Array(range).fill(1);
  }
}
