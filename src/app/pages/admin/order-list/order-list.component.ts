import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { OrderDetailsType, OrderService } from 'src/app/services/order/order.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  orderList: OrderDetailsType[] = [];
  displayedColumns: string[] = ['cartID', 'fullName', 'productName', 'productType', 'productPrice'];
  allRecordsCount = 0;
  pageSize = 10;
  pageEvent: any;
  constructor(
    private order: OrderService
  ) { }

  ngOnInit(): void {
    this.getOrderList(1);
  }
  getOrderList(pageNumber: number) {
    this.order.getAll({
      pageNumber,
      numberOfRecordPerPage: this.pageSize,
    }).subscribe((res: any) => {
      this.orderList = res?.data as OrderDetailsType[];
      this.allRecordsCount = res?.totalRecords;
    });
  }

  onPageChange(event: PageEvent) {
    this.getOrderList(event.pageIndex + 1);
  }

}
