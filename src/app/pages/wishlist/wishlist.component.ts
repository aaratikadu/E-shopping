import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CartService } from 'src/app/services/cart/cart.service';
import { ProductDataType, ProductService } from 'src/app/services/product/product.service';
import { SessionService } from 'src/app/services/storage/session.service';
import { WishlistProductType, WishlistService } from 'src/app/services/wishlist/wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

  products: WishlistProductType[] = [];
  allRecordsCount = 0;
  pageSize = 12;
  pageEvent: any;

  constructor(
    private wishlist: WishlistService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getWishlistProducts(1);
  }

  onAddToCart(productId: number, wishlistID: number) {
    this.wishlist.moveToCart({
      productID: productId,
      wishListID: wishlistID

    }).subscribe(res => {
      this.getWishlistProducts(1);
      this.alert.api()(res);
    });
  }
  onRemoveWishlist(wishlistId: number) {
    this.wishlist.remove({
      wishListID: wishlistId
    }).subscribe(() => {
      this.getWishlistProducts(1);
    });
  }

  onPageChange(event: PageEvent) {
    this.getWishlistProducts(event.pageIndex + 1);
  }

  getWishlistProducts(pageNumber: number) {
    this.wishlist.getAll({
      numberOfRecordPerPage: this.pageSize,
      pageNumber: pageNumber,
    }).subscribe((res: any) => {
      this.products = res?.data as WishlistProductType[];
    });
  }

}
