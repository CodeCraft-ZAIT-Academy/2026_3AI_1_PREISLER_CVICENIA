import { Component, signal, inject } from '@angular/core';
import { BookList } from './books/components/book-list/book-list';
import { CartPage } from './cart/components/cart-page/cart-page';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { BookService } from './books/book.service';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';

@Component({
  imports: [MatToolbarModule, MatIconModule, RouterOutlet,MatButtonModule,RouterLink,MatBadgeModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('1.zadanie');
  private bookService = inject(BookService);
  readonly borrowedBooks = this.bookService.borrowedBooks;
}
