import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent],
  template: `
    <app-navbar></app-navbar>
    <main class="py-4 bg-light min-vh-100">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {
  title = 'Pokemon Mart';
}
