import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { SignInRequest } from 'src/app/interfaces/auth.type';
import { UserDetailsType } from 'src/app/interfaces/user.type';
import { AlertService } from 'src/app/services/alert/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { SessionService } from 'src/app/services/storage/session.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  constructor(
    private router: Router,
    private alert: AlertService,
    private auth: AuthService,
    private session: SessionService
  ) { }

  ngOnInit(): void {
  }

  formSubmit(formRef: NgForm) {
    const userCred = formRef.form.value as SignInRequest;
    if (!userCred.password || !userCred.role || !userCred.userName) {
      this.alert.show({
        title: "Alert",
        message: "Please fill all fields",
        icon: 'warning',
      })
    }

    this.auth.signIn(userCred).subscribe((res: any) => {
      if (res?.isSuccess) {
        formRef.resetForm();
        this.session.setUser(res?.data as UserDetailsType);
        if (res.data?.role === 'admin')
          this.router.navigate(['/admin']);
        else
          this.router.navigate(['/'])

      } else {
        this.alert.show({ title: "Something went wrong", message: res?.message, icon: 'error' });
      }
    }, err => {
      console.error(err);
      this.alert.show({ title: "Error", message: "API fail", icon: 'error' });
    });

  }

  signup() {
    this.router.navigate(['/signup']);
  }
}
