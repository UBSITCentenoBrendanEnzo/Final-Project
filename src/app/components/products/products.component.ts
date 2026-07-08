/**
 * Name: Brendan Centeno
 * Date: July 4, 2026
 * Assignment Title: E-Commerce Platform - Pokémon Item Mart
 */

import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ShopService } from '../../services/shop.service';
import { Item } from '../../models/item.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductCardComponent
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  searchQuery = '';

  private debounceTimeout?: ReturnType<typeof setTimeout>;

  constructor(public shop: ShopService) {}

  ngOnInit(): void {}

  onSearchChange(): void {

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

    const query = this.searchQuery.trim().toLowerCase();

    if (query.length === 0 || query.length < 3) {

      this.shop.loading.set(false);
      this.shop.searchFinished.set(false);
      this.shop.searchError.set(false);

      return;
    }

    this.debounceTimeout = setTimeout(() => {
      this.shop.fetchItemFromPokeAPI(query);
    }, 350);

  }


  addProduct(item: Item): void {

    this.shop.addToCart(item);

  }


  get filteredItems(): Item[] {

    const query = this.searchQuery.trim().toLowerCase();

    if (!query || query.length < 3) {

      return this.shop.items()
        .filter(item => item.id <= 15);

    }

    return this.shop.items().filter(item =>
      item.name.toLowerCase().includes(query) ||
      item.name.toLowerCase()
        .replace(/\s+/g, '-')
        .includes(query) ||
      item.type.toLowerCase().includes(query)
    );

  }


  ngOnDestroy(): void {

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }

  }

}