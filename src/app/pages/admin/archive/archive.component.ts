import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ProductDataType, ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.scss']
})
export class ArchiveComponent implements OnInit {

  products: ProductDataType[] = [];
  allRecordsCount = 0;
  pageSize = 12;
  pageEvent: any;

  constructor(
    private product: ProductService
  ) { }



  ngOnInit(): void {
    this.getArchive(1);
  }
  onPageChange(event: PageEvent) {
    this.getArchive(event.pageIndex + 1);
  }

  getArchive(pageNumber: number) {
    this.product.getArchive({
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
      this.getArchive(1);
    });
  }

}
