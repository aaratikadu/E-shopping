import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ProductService } from 'src/app/services/product/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './admin-product.component.html',
  styleUrls: ['./admin-product.component.scss']
})
export class AdminProductComponent implements OnInit {

  file: any = null;
  formData = new FormData();
  fileName: string | ArrayBuffer | null = "https://banksiafdn.com/wp-content/uploads/2019/10/placeholde-image.jpg"

  constructor(
    private alert: AlertService,
    private product: ProductService
  ) { }

  ngOnInit(): void {
  }

  formSubmit(formRef: NgForm) {

    if (formRef.form.status === 'INVALID' || !this.file) {
      this.alert.show({
        title: "Required fields",
        message: "Please fill all required fields",
        icon: 'warning'
      });
      return;
    }
    const values = formRef.form.value;

    this.formData.append('ProductName', values?.productName);
    this.formData.append('ProductType', values?.productType);
    this.formData.append('ProductPrice', values?.productPrice);
    this.formData.append('ProductDetails', values?.description);
    this.formData.append('ProductCompany', values?.company);
    this.formData.append('Quantity', values?.quantity);

    this.product.add(this.formData).subscribe((res: any) => {
      if (res?.isSuccess) {
        this.fileName = "https://banksiafdn.com/wp-content/uploads/2019/10/placeholde-image.jpg";
        this.file = null;
        formRef.resetForm();
        this.formData.delete('ProductName');
        this.formData.delete('ProductType');
        this.formData.delete('ProductPrice');
        this.formData.delete('ProductDetails');
        this.formData.delete('ProductCompany');
        this.formData.delete('Quantity');
        this.formData.delete('File');
      }
      this.alert.show({
        title: res?.isSuccess ? "Success" : "Error",
        message: res?.message,
        icon: res?.isSuccess ? 'success' : 'error'
      });
    })

  }

  addProduct() {

  }
  onFileChange(event: any) {
    this.file = event.target.files[0];
    this.fileName = this.file?.name;
    this.formData.append('File', this.file, this.fileName as string);
    const reader = new FileReader();
    reader.onload = e => this.fileName = reader.result;
    reader.readAsDataURL(this.file);
  }

}
