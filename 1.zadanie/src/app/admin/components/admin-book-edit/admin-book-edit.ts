import { Component, inject, input, computed, signal } from '@angular/core';
import { BookService } from '../../../books/book.service'
import { MatFormFieldModule } from '@angular/material/form-field';
import { Book } from '../../../books/book';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { BookDetail } from '../../../books/components/book-detail/book-detail';
import { BookForm } from '../../../books/components/book-form/book-form';
import { BookCard } from '../../../books/components/book-card/book-card';

@Component({
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, MatIconModule, BookForm],
  selector: 'app-admin-book-edit',
  styleUrl: './admin-book-edit.css',
  templateUrl: './admin-book-edit.html',
})
export class AdminBookEdit {
  private router = inject(Router);
  private bookService = inject(BookService);
  readonly id = input<string>();
  readonly isEditMode = computed(() => this.id() !== undefined);

  readonly book = computed(() => {
    const currentId = this.id();
    return currentId ? this.bookService.getBookById(Number(currentId)) : undefined;
  });

  save(bookData: Book): void {
    if (this.isEditMode()) {
      const updatedBook = { ...bookData, id: Number(this.id()) };
      this.bookService.updateBook(updatedBook);
    } else {
      this.bookService.addBook(bookData);
    }
    this.router.navigate(['/admin']);
  }

  cancel(): void {
    this.router.navigate(['/admin']);
  }
}
