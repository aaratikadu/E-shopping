import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ProductDataType, ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  products: ProductDataType[] = [];
  allRecordsCount = 0;
  pageSize = 12;
  pageEvent: any;


  constructor(
    private product: ProductService,
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

  onMoveToArchive(productId: number) {
    this.product.moveToArchive({
      productID: productId
    }).subscribe(() => {
      this.getProducts(1);
      this.alert.single('Product moved to archive.', 'success');
    }, this.alert.error());
  }
  onMoveToTrash(productId: number) {
    this.product.moveToTrash({
      productID: productId
    }).subscribe(() => {
      this.alert.single('Product moved to trash.', 'success');
      this.getProducts(1);
    }, this.alert.error());
  }

  rateAr(range: number) {
    return Array(range).fill(1);
  }

}
