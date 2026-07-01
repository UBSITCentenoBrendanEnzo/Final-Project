import { Component } from '@angular/core';
import { ShopService } from '../../services/shop.service';


@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})


export class CartComponent {


constructor(
  public shop: ShopService
){}



clear(){

  this.shop.clearCart();

}

purchase(){

  alert(
  "Purchase successful! Thank you Trainer!"
  );
  
  
  this.shop.clearCart();
  
  }

}