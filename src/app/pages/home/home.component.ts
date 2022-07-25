import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/storage/session.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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
