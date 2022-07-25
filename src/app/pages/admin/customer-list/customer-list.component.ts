import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CustomerDataType, CustomerService } from 'src/app/services/customer/customer.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit {
  usersList: CustomerDataType[] = [];
  displayedColumns: string[] = ['userID', 'userName', 'fullName', 'emailID', 'mobileNumber'];
  allRecordsCount = 0;
  pageSize = 10;
  pageEvent: any;

  constructor(
    private customer: CustomerService
  ) { }

  ngOnInit(): void {
    this.getCustomerList(1);
  }

  getCustomerList(pageNumber: number) {
    this.customer.getAll({
      pageNumber,
      numberOfRecordPerPage: this.pageSize
    }).subscribe((res: any) => {
      this.usersList = res?.data as CustomerDataType[];
      this.allRecordsCount = res?.totalRecords;
    });
  }

  onPageChange(event: PageEvent) {
    this.getCustomerList(event.pageIndex + 1);
  }

}
