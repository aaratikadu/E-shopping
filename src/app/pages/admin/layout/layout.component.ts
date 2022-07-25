import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/storage/session.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  routes = [
    {
      path: '/admin',
      label: 'Home',
      icon: 'home'
    },
    {
      path: 'product',
      label: 'Add Product',
      icon: 'styler'
    },
    {
      path: 'customer-list',
      label: 'Customers',
      icon: 'group'
    },
    {
      path: 'order-list',
      label: 'Orders',
      icon: 'shopping_bag'
    },
    {
      path: 'archive',
      label: 'Archive',
      icon: 'archive'
    },
    {
      path: 'trash',
      label: 'Trash',
      icon: 'delete'
    },
    {
      path: 'feedback',
      label: 'Feedbacks',
      icon: 'chat'
    }



  ]
  constructor(
    private session: SessionService,
    private route: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.session.clear();
    this.route.navigate(['/sign']);
  }

}
