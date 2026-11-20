import { Component, inject, input, computed, signal } from '@angular/core';
import { BookService } from '../../../books/book.service'
import { MatFormFieldModule } from '@angular/material/form-field';
import { Book } from '../../../books/book';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BookDetail } from '../../../books/components/book-detail/book-detail';
import { BookForm } from '../../../books/components/book-form/book-form';
import { BookCard } from '../../../books/components/book-card/book-card';

@Component({
  imports: [RouterLink,MatFormFieldModule,MatInputModule,MatSelectModule,MatButtonModule,MatCardModule,MatIconModule,],
  selector: 'app-admin-books',
  styleUrl: './admin-books.css',
  templateUrl: './admin-books.html',
})
export class AdminBooks {
  private bookService = inject(BookService);
  readonly books = this.bookService.books;
  readonly confirmingDeleteId = signal<number | undefined>(undefined);

  askDelete(book: Book): void {
    this.confirmingDeleteId.set(book.id);
  }

  readonly loading = this.bookService.loading;
  readonly loadError = this.bookService.loadError;

  cancelDelete(): void {
    this.confirmingDeleteId.set(undefined);
  }

  confirmDelete(book: Book): void {
    this.bookService.deleteBook(book.id);
    this.confirmingDeleteId.set(undefined);
  }

}
