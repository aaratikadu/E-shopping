import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AlertService } from 'src/app/services/alert/alert.service';
import { FeedbackDetailsType, FeedbackService } from 'src/app/services/feedback/feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss']
})
export class FeedbackComponent implements OnInit {

  feedbackList: FeedbackDetailsType[] = [];
  displayedColumns: string[] = ['feedbackID', 'userName', 'feedBack', 'delete'];
  allRecordsCount = 0;
  pageSize = 10;
  pageEvent: any;
  constructor(
    private feedback: FeedbackService,
    private alert: AlertService
  ) { }




  ngOnInit(): void {
    this.getFeedbackList(1);
  }

  getFeedbackList(pageNumber: number) {
    this.feedback.getAll({
      pageNumber,
      numberOfRecordPerPage: this.pageSize
    }).subscribe((res: any) => {
      this.feedbackList = res?.data as FeedbackDetailsType[];
      this.allRecordsCount = res?.totalRecords;
    });
  }

  onPageChange(event: PageEvent) {
    this.getFeedbackList(event.pageIndex + 1);
  }

  onDelete(feedbackID: number) {
    this.feedback.delete(feedbackID).subscribe(res => {
      this.alert.api()(res);
      this.getFeedbackList(1);
    }, this.alert.error());
  }

}
