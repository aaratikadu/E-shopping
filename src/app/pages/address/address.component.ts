import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../services/alert/alert.service';
import { AuthService, UserAddressRequestType } from '../../services/auth.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit {

  constructor(
    private alert: AlertService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }
  formSubmit(formRef: NgForm) {
    if (formRef.form.status === 'INVALID') {
      this.alert.show({
        title: "Required fields",
        message: "Please fill all required fields",
        icon: 'warning'
      });
      return;
    }
    const values = formRef.form.value as UserAddressRequestType;
    this.auth.addUserAddress(values).subscribe((res) => {
      formRef.resetForm();
      this.alert.api()(res);
    }, this.alert.error());

  }

}
