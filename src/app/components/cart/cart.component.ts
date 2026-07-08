/**
 * Name: Brendan Centeno
 * Date: July 4, 2026
 * Assignment Title: E-Commerce Platform - Pokémon Item Mart
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

  purchaseSuccess = false;

  constructor(public shop: ShopService) {}

  clear(): void {

    if (confirm('Are you sure you want to clear your shopping bag?')) {

      this.shop.clearCart();

    }

  }

  purchase(): void {

    if (this.shop.cart().length === 0) {

      return;

    }

    this.purchaseSuccess = true;

    this.shop.clearCart();

    setTimeout(() => {

      this.purchaseSuccess = false;

    }, 3000);

  }

}