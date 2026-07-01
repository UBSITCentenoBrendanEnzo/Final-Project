import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { Item } from '../../models/item.model';
import { ProductCardComponent } from '../product-card/product-card.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ProductCardComponent], 
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  searchQuery: string = '';

  constructor(public shop: ShopService) {}

  ngOnInit(): void {}

  async onSearch() {
    // ✅ Converts space characters to hyphens automatically (e.g., "heavy ball" -> "heavy-ball")
    const query = this.searchQuery.trim().toLowerCase().replace(/\s+/g, '-');
    if (query.length > 2) {
      await this.shop.fetchItemFromPokeAPI(query);
    }
  }

  addProduct(item: Item) {
    this.shop.addToCart(item);
  }

  get filteredItems(): Item[] {
    const query = this.searchQuery.trim().toLowerCase();
    if (!query) return this.shop.items();
    
    // ✅ Flexible filter handles names with spaces or hyphens normally
    return this.shop.items().filter(item => 
      item.name.toLowerCase().includes(query) || 
      item.name.toLowerCase().replace(/\s+/g, '-').includes(query) ||
      item.type.toLowerCase().includes(query)
    );
  }
}
