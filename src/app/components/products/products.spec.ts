/**
 * Name: Brendan Centeno
 * Date: July 4, 2026
 * Assignment Title: E-Commerce Platform - Pokémon Item Mart
 */

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { ProductsComponent } from './products.component';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsComponent, HttpClientTestingModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter items based on search query', () => {
    component.searchQuery = 'ball';
    const filtered = component.filteredItems;
    expect(filtered.every(item => item.name.toLowerCase().includes('ball'))).toBe(true);
  });

  it('should call shop service when adding product', () => {
 
    (window as any).spyOn(component.shop, 'addToCart');
    const mockItem = { id: 1, name: 'Poké Ball', price: 200, type: 'Ball', image: '📦' };
    
    component.addProduct(mockItem);
    
    expect(component.shop.addToCart).toHaveBeenCalledWith(mockItem);
  });
});