import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignUpRequestType } from 'src/app/interfaces/auth.type';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  isAdminRole = false;
  constructor(
    private router: Router,
    private alert: AlertService,
    private auth: AuthService) { }

  ngOnInit(): void { }
  sign() {
    this.router.navigate(['/sign']);
  }
  onCheckChange(active: boolean) {
    this.isAdminRole = active;
  }

  formSubmit(form: NgForm) {

    const values = form?.form?.value as SignUpRequestType;
    if (!values?.configPassword || !values?.role || !values?.password || !values?.userName) {
      this.alert.show({
        title: "Alert",
        message: "Please fill all fields",
        icon: 'warning',
      });
      return;
    }
    if (values?.configPassword !== values?.password) {
      this.alert.show({
        title: "Alert",
        message: "Password not matched",
        icon: 'warning',
      });
      return;
    }
    values.masterPassword = values.masterPassword ? values.masterPassword : '';

    this.auth.singUp(values).subscribe((res: any) => {
      if (res?.isSuccess) {
        form.resetForm();
        this.alert.show({ title: "Success", message: 'User added successfully', icon: 'success' }, () => this.sign());
      } else {
        this.alert.show({ title: "Something went wrong", message: res?.message, icon: 'error' });
      }
    }, err => {
      this.alert.show({ title: "Error", message: "API fail", icon: 'error' });
    });
  }
}
