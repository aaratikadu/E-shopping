import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { FeedbackService } from 'src/app/services/feedback/feedback.service';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.scss']
})
export class UserFeedbackComponent implements OnInit {

  constructor(
    private feedback: FeedbackService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
  }

  formSubmit(formRef: NgForm) {
    console.log("sss", formRef);

    if (!formRef.form.value?.feedback) {
      this.alert.show({
        title: 'Alert',
        message: 'Please fill all require fields',
        icon: 'warning'
      });
      return;
    }
    this.feedback.add({
      feedback: formRef.form.value?.feedback
    }).subscribe((res) => {
      this.alert.api()(res);
      formRef.resetForm();
    });
  }

}
