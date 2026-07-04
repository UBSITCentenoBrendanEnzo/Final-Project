/**
 * Name: Brendan Centeno
 * Date: July 4, 2026
 * Assignment Title: E-Commerce Platform - Pokémon Item Mart
 */

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../../models/item.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {
  @Input() product!: Item;
  @Output() add = new EventEmitter<Item>();
}
