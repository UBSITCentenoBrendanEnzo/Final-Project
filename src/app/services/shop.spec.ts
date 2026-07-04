import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ShopService } from './shop.service';
import { Item } from '../models/item.model';

describe('ShopService', () => {
  let service: ShopService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ShopService]
    });

    service = TestBed.inject(ShopService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add an item to the cart', () => {
    const mockItem: Item = { id: 99, name: 'Test Item', price: 100, type: 'Tool', image: '🧪' };
    service.addToCart(mockItem);
    expect(service.cart().length).toBe(1);
    expect(service.cart()[0].name).toBe('Test Item');
  });

  it('should calculate the total price correctly', () => {
    service.addToCart({ id: 1, name: 'A', price: 100, type: 'Tool', image: '' } as Item);
    service.addToCart({ id: 2, name: 'B', price: 200, type: 'Tool', image: '' } as Item);
    expect(service.total()).toBe(300);
  });

  it('should clear the cart', () => {
    service.addToCart({ id: 1, name: 'A', price: 100, type: 'Tool', image: '' } as Item);
    service.clearCart();
    expect(service.cart().length).toBe(0);
    expect(service.total()).toBe(0);
  });

  it('should fetch item from API and update items signal', async () => {
    const dummyItem = {
      name: 'potion',
      cost: 500,
      names: [{ name: 'Potion', language: { name: 'en' } }]
    };

    const fetchPromise = service.fetchItemFromPokeAPI('potion');
    
    const req = httpMock.expectOne('https://pokeapi.co/api/v2/item/potion');
    expect(req.request.method).toBe('GET');
    req.flush(dummyItem);
    
    await fetchPromise;
    
    const items = service.items();
    const found = items.find(i => i.name === 'Potion');
    expect(found).toBeDefined();
    expect(found?.price).toBe(500);
  });
});