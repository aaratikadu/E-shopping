import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CartService, OrderListType } from 'src/app/services/cart/cart.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.scss']
})
export class MyOrderComponent implements OnInit {

  products: OrderListType[] = [];
  allRecordsCount = 0;
  pageSize = 12;
  pageEvent: any;
  ratingList = [1, 2, 3, 4, 5];
  rating: number = 0;
  constructor(
    private cart: CartService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.getAllCartProducts(1);
  }
  onRate(productId: number) {

  }
  onOrderCancel(productID: number, cartId: number) {
    this.cart.cancelOrder({
      productID: productID,
      cartID: cartId
    }).subscribe(res => {
      this.alert.api()(res);
      this.getAllCartProducts(1);
    }, this.alert.error());
  }

  onPageChange(event: PageEvent) {
    this.getAllCartProducts(event.pageIndex + 1);
  }
  getAllCartProducts(pageNumber: number) {
    this.cart.getAllOrders({
      pageNumber: pageNumber,
      numberOfRecordPerPage: this.pageSize
    }).subscribe((res: any) => {
      this.products = res?.data as OrderListType[];
    }, this.alert.error());
  }
  formSubmit(formRef: NgForm, productId: number) {
    if (!formRef.form.value.rate) {
      this.alert.single("Please select rating", 'warning');
      return;
    }
    this.cart.addRating({
      productID: productId,
      rating: formRef.form.value.rate
    }).subscribe(() => {
      this.alert.single('Thank your for rating.', 'success');
      this.getAllCartProducts(1);
    }, this.alert.error());
  }
}
