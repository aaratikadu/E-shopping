import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CartDetailsType, CartService } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  products: CartDetailsType[] = [];
  allRecordsCount = 0;
  pageSize = 12;
  pageEvent: any;

  constructor(
    private cart: CartService,
    private alert: AlertService,
  ) { }

  ngOnInit(): void {
    this.getAllCartProducts(1);
  }

  onPageChange(event: PageEvent) {
    this.getAllCartProducts(event.pageIndex + 1);
  }

  getAllCartProducts(pageNumber: number) {
    this.cart.getAll({
      pageNumber: pageNumber,
      numberOfRecordPerPage: this.pageSize
    }).subscribe((res: any) => {
      this.products = res?.data as CartDetailsType[];
    }, this.alert.error());
  }

  onRemove(cartId: number) {
    this.cart.remove({
      cartID: cartId
    }).subscribe((res: any) => {
      this.getAllCartProducts(1);
      this.alert.single('Product removed from cart.', 'success');
    }, this.alert.error());
  }

  onOrderPlace(productId: number, cartId: number) {
    this.cart.orderProduct({
      productID: productId,
      cartID: cartId
    }).subscribe((res: any) => {
      this.getAllCartProducts(1);
      this.alert.single('Product order placed.', 'success');
    }, this.alert.error())
  }

}
