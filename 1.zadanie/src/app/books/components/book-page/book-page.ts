import { Component, inject, input, computed } from '@angular/core';
import { BookService } from '../../book.service'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BookDetail } from '../../components/book-detail/book-detail';
import { BookForm } from '../../components/book-form/book-form';
import { BookCard } from '../../components/book-card/book-card';




@Component({
  imports: [MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule,MatIconModule,RouterLink,MatCardModule,BookDetail],
  selector: 'app-book-page',
  styleUrl: './book-page.css',
  templateUrl: './book-page.html',
})
export class BookPage {
  private bookService = inject(BookService);
  id = input.required<string>();
  readonly book = computed(() => this.bookService.getBookById(Number(this.id())));

  borrow(book: any): void {
    this.bookService.borrowBook(book.id);
    if (!this.bookService.borrowBook(book.id)) {
      alert(`Naraz môžeš mať požičaných najviac 10 kníh. Najskôr nejakú vráť.`);
      return;
    }
  }

  returnBook(book: any): void {
    this.bookService.returnBook(book.id);
  }

  toggleFavorite(book: any): void {
    this.bookService.toggleFavorite(book.id);
  }

  updateBook(updated: any): void {
    this.bookService.updateBook(updated);
  }
}


