/**
 * Name: Brendan Centeno
 * Date: July 4, 2026
 * Assignment Title: E-Commerce Platform - Pokémon Item Mart
 */

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
