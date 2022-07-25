import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { AddressComponent } from './pages/address/address.component';
import { AdminDashboardComponent } from './pages/admin/admin-dashboard/admin-dashboard.component';
import { AdminProductComponent } from './pages/admin/admin-product/admin-product.component';
import { ArchiveComponent } from './pages/admin/archive/archive.component';
import { CustomerListComponent } from './pages/admin/customer-list/customer-list.component';
import { FeedbackComponent } from './pages/admin/feedback/feedback.component';
import { LayoutComponent } from './pages/admin/layout/layout.component';
import { OrderListComponent } from './pages/admin/order-list/order-list.component';
import { TrashComponent } from './pages/admin/trash/trash.component';
import { CartComponent } from './pages/cart/cart.component';
import { CustomerSettingComponent } from './pages/customer-setting/customer-setting.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { MyOrderComponent } from './pages/my-order/my-order.component';
import { ProductComponent } from './pages/product/product.component';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserFeedbackComponent } from './pages/user-feedback/user-feedback.component';
import { WishlistComponent } from './pages/wishlist/wishlist.component';

const routes: Routes = [
  {
    path: 'signup',
    component: SignUpComponent,
  },
  {
    path: 'sign',
    component: SignInComponent,
  },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '', // child route path
        component: DashboardComponent, // child route component that the router renders
      },
      {
        path: 'my-order',
        component: MyOrderComponent, // another child route component that the router renders
      },
      {
        path: 'cart',
        component: CartComponent, // another child route component that the router renders
      }, {
        path: 'wishlist',
        component: WishlistComponent, // another child route component that the router renders
      }, {
        path: 'customer-setting',
        component: CustomerSettingComponent, // another child route component that the router renders
      }, {
        path: 'user-details',
        component: UserDetailsComponent, // another child route component that the router renders
      }, {
        path: 'address',
        component: AddressComponent, // another child route component that the router renders
      },
      {
        path: 'feedback',
        component: UserFeedbackComponent, // another child route component that the router renders
      },
    ],
  },
  {
    path: 'admin',
    component: LayoutComponent,
    canActivate: [AdminGuard],
    canActivateChild: [AdminGuard],
    children: [
      {
        path: '',
        component: AdminDashboardComponent,
      },
      {
        path: 'product',
        component: AdminProductComponent,
      },
      {
        path: 'customer-list',
        component: CustomerListComponent,
      },
      {
        path: 'order-list',
        component: OrderListComponent,
      },
      {
        path: 'archive',
        component: ArchiveComponent,
      },
      {
        path: 'trash',
        component: TrashComponent,
      },
      {
        path: 'feedback',
        component: FeedbackComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
