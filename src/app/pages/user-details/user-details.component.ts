import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService, UserUpdateDetailsType } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  constructor(
    private alert: AlertService,
    private user: AuthService,

  ) { }

  ngOnInit(): void {
  }

  formSubmit(formRef: NgForm) {
    console.log("FORM VAL", formRef.form.value);

    if (formRef.form.status === 'INVALID') {
      this.alert.show({
        title: "Required fields",
        message: "Please fill all required fields",
        icon: 'warning'
      });
      return;
    }
    const values = formRef.form.value as UserUpdateDetailsType;


    this.user.addUserDetails(values).subscribe((res: any) => {
      if (res?.isSuccess) {
        formRef.resetForm();
      }
      this.alert.show({
        title: res?.isSuccess ? "Success" : "Error",
        message: res?.message,
        icon: res?.isSuccess ? 'success' : 'error'
      });
    })

  }


}
