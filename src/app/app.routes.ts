/**
 * Name: Brendan Centeno
 * Date: July 4, 2026
 * Assignment Title: E-Commerce Platform - Pokémon Item Mart
 */

import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProductsComponent } from './components/products/products.component';
import { CartComponent } from './components/cart/cart.component';

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "products", component: ProductsComponent },
  { path: "cart", component: CartComponent },
  { path: "**", redirectTo: "" }
];
