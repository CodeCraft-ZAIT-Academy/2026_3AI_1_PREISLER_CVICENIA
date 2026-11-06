import { Routes } from '@angular/router';
import { BookList } from './books/components/book-list/book-list';
import { CartPage } from './cart/components/cart-page/cart-page';
import { BookPage } from './books/components/book-page/book-page';


export const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BookList, title: 'Knihy' },
  { path: 'cart', component: CartPage, title: 'Košík' },
  { path: 'books/:id', component: BookPage, title: 'Detail knihy' },
];
