/**
 * Name: Brendan Centeno
 * Date: July 4, 2026
 * Assignment Title: E-Commerce Platform - Pokémon Item Mart
 */

import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  private http = inject(HttpClient);

  items = signal<Item[]>([
    { id: 1, name: 'Poké Ball', price: 200, type: 'Ball', image: '🔴' },
    { id: 2, name: 'Great Ball', price: 600, type: 'Ball', image: '🔵' },
    { id: 3, name: 'Ultra Ball', price: 1200, type: 'Ball', image: '🟡' },

    { id: 4, name: 'Potion', price: 300, type: 'Medicine', image: '🧪' },
    { id: 5, name: 'Super Potion', price: 700, type: 'Medicine', image: '🧴' },
    { id: 6, name: 'Hyper Potion', price: 1200, type: 'Medicine', image: '💉' },
    { id: 7, name: 'Revive', price: 1500, type: 'Medicine', image: '✨' },
    { id: 8, name: 'Antidote', price: 100, type: 'Medicine', image: '💊' },
    { id: 9, name: 'Paralyze Heal', price: 200, type: 'Medicine', image: '⚡' },
    { id: 10, name: 'Burn Heal', price: 250, type: 'Medicine', image: '🔥' },

    { id: 11, name: 'Ether', price: 800, type: 'Recovery', image: '🔋' },
    { id: 12, name: 'Rare Candy', price: 3000, type: 'Candy', image: '🍬' },
    { id: 13, name: 'Escape Rope', price: 550, type: 'Tool', image: '🪢' },
    { id: 14, name: 'Exp Share', price: 1000, type: 'Tool', image: '📘' },
    { id: 15, name: 'Master Ball', price: 9999, type: 'Ball', image: '🟣' }
  ]);


  private fallbackDatabase: Record<string, Omit<Item, 'id'>> = {

    'heavy-ball': {
      name: 'Heavy Ball',
      price: 1000,
      type: 'Ball',
      image: '⚫'
    },

    'love-ball': {
      name: 'Love Ball',
      price: 1000,
      type: 'Ball',
      image: '💗'
    },

    'quick-ball': {
      name: 'Quick Ball',
      price: 1000,
      type: 'Ball',
      image: '⚡'
    },

    'luxury-ball': {
      name: 'Luxury Ball',
      price: 3000,
      type: 'Ball',
      image: '✨'
    },

    'dusk-ball': {
      name: 'Dusk Ball',
      price: 1000,
      type: 'Ball',
      image: '🌙'
    },


    'max-potion': {
      name: 'Max Potion',
      price: 2500,
      type: 'Medicine',
      image: '🧴'
    },

    'full-restore': {
      name: 'Full Restore',
      price: 3000,
      type: 'Medicine',
      image: '❤️'
    },

    'max-revive': {
      name: 'Max Revive',
      price: 4000,
      type: 'Medicine',
      image: '🌟'
    },

    'full-heal': {
      name: 'Full Heal',
      price: 600,
      type: 'Medicine',
      image: '💚'
    },


    'oran-berry': {
      name: 'Oran Berry',
      price: 100,
      type: 'Berry',
      image: '🫐'
    },

    'pecha-berry': {
      name: 'Pecha Berry',
      price: 100,
      type: 'Berry',
      image: '🍑'
    },

    'sitrus-berry': {
      name: 'Sitrus Berry',
      price: 400,
      type: 'Berry',
      image: '🍋'
    },


    'thunder-stone': {
      name: 'Thunder Stone',
      price: 3000,
      type: 'Hold Item',
      image: '⚡'
    },

    'fire-stone': {
      name: 'Fire Stone',
      price: 3000,
      type: 'Hold Item',
      image: '🔥'
    },

    'water-stone': {
      name: 'Water Stone',
      price: 3000,
      type: 'Hold Item',
      image: '💧'
    },


    'zinc': {
      name: 'Zinc',
      price: 9800,
      type: 'Tool',
      image: '🧬'
    },

    'protein': {
      name: 'Protein',
      price: 9800,
      type: 'Tool',
      image: '💪'
    },

    'iron': {
      name: 'Iron',
      price: 9800,
      type: 'Tool',
      image: '🛡️'
    },

    'carbos': {
      name: 'Carbos',
      price: 9800,
      type: 'Tool',
      image: '👟'
    }

  };


  cart = signal<Item[]>([]);


  loading = signal(false);

  searchFinished = signal(false);

  searchError = signal(false);


  addToCart(item: Item): void {
    this.cart.update(cart => [...cart, item]);
  }


  clearCart(): void {
    this.cart.set([]);
  }


  total = computed(() =>
    this.cart().reduce((sum, item) => sum + item.price, 0)
  );


  private getItemType(category?: string): string {

    if (!category) {
      return 'Item';
    }

    if (category.includes('ball')) {
      return 'Ball';
    }

    if (
      category.includes('medicine') ||
      category.includes('healing') ||
      category.includes('revival')
    ) {
      return 'Medicine';
    }

    if (category.includes('berry')) {
      return 'Berry';
    }

    if (category.includes('candy')) {
      return 'Candy';
    }

    if (category.includes('held')) {
      return 'Hold Item';
    }

    return 'Tool';
  }


  async fetchItemFromPokeAPI(queryName: string): Promise<void> {

    const cleanQuery = queryName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-');


    this.loading.set(true);
    this.searchFinished.set(false);
    this.searchError.set(false);


    const itemExists = this.items().some(item =>
      item.name.toLowerCase().replace(/\s+/g, '-') === cleanQuery
    );


    if (itemExists) {

      this.loading.set(false);
      this.searchFinished.set(true);

      return;

    }


    try {

      const data: any = await firstValueFrom(
        this.http.get(`https://pokeapi.co/api/v2/item/${cleanQuery}`)
      );


      let visualEmoji = '📦';


      if (cleanQuery.includes('master-ball')) {

        visualEmoji = '🟣';

      } else if (cleanQuery.includes('ball')) {

        visualEmoji = '⚪';

      } else if (cleanQuery.includes('berry')) {

        visualEmoji = '🫐';

      } else if (cleanQuery.includes('fire-stone')) {

        visualEmoji = '🔥';

      } else if (cleanQuery.includes('thunder-stone')) {

        visualEmoji = '⚡';

      } else if (cleanQuery.includes('water-stone')) {

        visualEmoji = '💧';

      } else if (cleanQuery.includes('potion')) {

        visualEmoji = '🧪';

      }


      const newItem: Item = {

        id: Date.now(),

        name:
          data.names.find((name: any) =>
            name.language.name === 'en'
          )?.name ??
          data.name.replace(/-/g, ' '),

        price: data.cost > 0 ? data.cost : 450,

        type: this.getItemType(data.category?.name),

        image: visualEmoji

      };


      this.items.update(items => [...items, newItem]);


      this.loading.set(false);

      this.searchFinished.set(true);


    } catch {


      if (this.fallbackDatabase[cleanQuery]) {


        const newItem: Item = {

          id: Date.now(),

          ...this.fallbackDatabase[cleanQuery]

        };


        this.items.update(items => [...items, newItem]);


        this.loading.set(false);

        this.searchFinished.set(true);


      } else {


        this.loading.set(false);

        this.searchFinished.set(true);

        this.searchError.set(true);

      }

    }

  }

}