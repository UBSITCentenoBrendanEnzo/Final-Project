import { Injectable, signal, computed } from '@angular/core';
import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  // ✅ Replaced blocked asset URLs with bulletproof native vector graphics indicators
  items = signal<Item[]>([
    { id: 1, name: "Poké Ball", price: 200, type: "Ball", image: "🎒" },
    { id: 2, name: "Great Ball", price: 600, type: "Ball", image: "🔵" },
    { id: 3, name: "Ultra Ball", price: 1200, type: "Ball", image: "🟡" },
    { id: 4, name: "Potion", price: 300, type: "Medicine", image: "🧪" },
    { id: 5, name: "Super Potion", price: 700, type: "Medicine", image: "🍷" },
    { id: 6, name: "Hyper Potion", price: 1200, type: "Medicine", image: "🧉" },
    { id: 7, name: "Revive", price: 1500, type: "Medicine", image: "⭐" },
    { id: 8, name: "Antidote", price: 100, type: "Medicine", image: "💊" },
    { id: 9, name: "Paralyze Heal", price: 200, type: "Medicine", image: "⚡" },
    { id: 10, name: "Burn Heal", price: 250, type: "Medicine", image: "🔥" },
    { id: 11, name: "Ether", price: 800, type: "Recovery", image: "✨" },
    { id: 12, name: "Rare Candy", price: 3000, type: "Candy", image: "🍬" },
    { id: 13, name: "Escape Rope", price: 550, type: "Tool", image: "🪢" },
    { id: 14, name: "Exp Share", price: 1000, type: "Tool", image: "💎" },
    { id: 15, name: "Master Ball", price: 9999, type: "Ball", image: "🔮" }
  ]);

  cart = signal<Item[]>([]);

  addToCart(item: Item) {
    this.cart.update(old => [...old, item]);
  }

  clearCart() {
    this.cart.set([]);
  }

  total = computed(() => {
    return this.cart().reduce((sum, item) => sum + item.price, 0);
  });

  // Asynchronous infinite search system addition
  async fetchItemFromPokeAPI(queryName: string) {
    const cleanQuery = queryName.trim().toLowerCase().replace(/\s+/g, '-');
    if (!cleanQuery) return;

    const itemExists = this.items().some(i => i.name.toLowerCase() === cleanQuery.replace(/-/g, ' '));
    if (itemExists) return;

    try {
      const response = await fetch(`https://pokeapi.co{cleanQuery}`);
      if (!response.ok) return;
      
      const data = await response.json();
      
      // Smart Fallback Category Selector for dynamic items
      let visualEmoji = "📦";
      if (cleanQuery.includes('ball')) visualEmoji = "🔮";
      if (cleanQuery.includes('berry')) visualEmoji = "🍒";
      if (cleanQuery.includes('stone')) visualEmoji = "💎";

      const newItem: Item = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        name: data.names.find((n: any) => n.language.name === 'en')?.name || data.name.replace(/-/g, ' '),
        price: data.cost > 0 ? data.cost : 450,
        type: data.category?.name?.includes('ball') ? 'Ball' : 'Tool',
        image: visualEmoji // Pass native vector strings smoothly without network constraints
      };

      this.items.update(currentItems => [...currentItems, newItem]);
    } catch (error) {
      console.error('PokeAPI search failed:', error);
    }
  }
}
