import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Item } from '../../models/item.model';


@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css'
})
export class ProductCardComponent {


  @Input() product!: Item;


  @Output() add = new EventEmitter<Item>();


  addItem(){

    this.add.emit(this.product);

  }

}