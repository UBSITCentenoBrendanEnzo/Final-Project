import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ShopService } from '../../services/shop.service';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})


export class NavbarComponent {


constructor(
  public shop: ShopService
){}


}