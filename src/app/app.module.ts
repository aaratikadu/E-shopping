import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductComponent } from './pages/product/product.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { MyOrderComponent } from './pages/my-order/my-order.component';
import { CartComponent } from './pages/cart/cart.component';
import { ArchiveComponent } from './pages/admin/archive/archive.component';
import { TrashComponent } from './pages/admin/trash/trash.component';
import { CustomerListComponent } from './pages/admin/customer-list/customer-list.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';
import { CustomerSettingComponent } from './pages/customer-setting/customer-setting.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertService } from './services/alert/alert.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialExampleModule } from 'src/material.module';
import { SessionService } from './services/storage/session.service';
import { AuthComponent } from './pages/auth/auth.component';
import { ProductService } from './services/product/product.service';
import { CustomerService } from './services/customer/customer.service';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { OrderService } from './services/order/order.service';
import { WishlistService } from './services/wishlist/wishlist.service';
import { FeedbackComponent } from './pages/admin/feedback/feedback.component';
import { CartService } from './services/cart/cart.service';
import { OrderListComponent } from './pages/admin/order-list/order-list.component';
import { FeedbackService } from './services/feedback/feedback.service';
import { AddressComponent } from './pages/address/address.component';
import { UserFeedbackComponent } from './pages/user-feedback/user-feedback.component';
@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    HomeComponent,
    DashboardComponent,
    ProductComponent,
    AdminDashboardComponent,
    AdminProductComponent,
    MyOrderComponent,
    CartComponent,
    ArchiveComponent,
    TrashComponent,
    CustomerListComponent,
    WishlistComponent,
    CustomerSettingComponent,
    UserDetailsComponent,
    AuthComponent,
    LayoutComponent,
    OrderListComponent,
    FeedbackComponent,
    AddressComponent,
    UserFeedbackComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialExampleModule,
    ReactiveFormsModule,

  ],
  providers: [
    AuthService,
    ApiService,
    AlertService,
    SessionService,
    ProductService,
    CustomerService,
    OrderService,
    WishlistService,
    FeedbackService,
    CartService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
