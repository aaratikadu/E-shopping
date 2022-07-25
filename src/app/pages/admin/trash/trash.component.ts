import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductDataType, ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  products: ProductDataType[] = [];
  allRecordsCount = 0;
  pageSize = 12;
  pageEvent: any;
  constructor(
    private product: ProductService
  ) { }

  ngOnInit(): void {
    this.getTrash(1);
  }
  onPageChange(event: PageEvent) {
    this.getTrash(event.pageIndex + 1);
  }

  getTrash(pageNumber: number) {
    this.product.getTrash({
      pageNumber: pageNumber,
      numberOfRecordPerPage: this.pageSize,
    }).subscribe((res: any) => {
      this.products = res?.data as ProductDataType[];
      this.allRecordsCount = res?.totalRecords;
    });
  }

  onProductRestore(productId: number) {
    this.product.productRestore({
      productID: productId
    }).subscribe(() => {
      this.getTrash(1);
    });
  }

  onDeleteIt(productId: number) {
    this.product.deletePermanently({
      productID: productId
    }).subscribe(() => {
      this.getTrash(1);
    });
  }

}
