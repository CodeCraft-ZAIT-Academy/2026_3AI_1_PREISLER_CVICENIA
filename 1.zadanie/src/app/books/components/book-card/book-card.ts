import { Component, input, output, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../../book';
import { BookDetail } from '../book-detail/book-detail';
import { BookForm } from '../book-form/book-form';
import { getGenreColor } from '../../genre.colors';

@Component({
  imports: [MatCardModule, MatButtonModule, MatIconModule, BookDetail, BookForm],
  selector: 'app-book-card',
  styleUrl: './book-card.css',
  templateUrl: './book-card.html',
})
export class BookCard {
  book = input.required<Book>();
  favorite = output<void>();
  readonly showDetails = signal(false);
  readonly editing = signal(false);
  readonly confirmingDelete = signal(false);

  toggleDetails(): void {
    this.showDetails.update(open => !open);
  }

  zobrazoblubencov(): void {
    this.favorite.emit();
  }

  genreColor(): string {
    return getGenreColor(this.book().genre);
  }
  borrow(): void {
    this.book().available = false;
  }

  giveBack(): void {
    this.book().available = true;
  }
  edited = output<Book>();

  startEdit(): void { this.editing.set(true); }

  saveEdit(book: Book): void {
    this.edited.emit(book);
    this.editing.set(false);
  }

  cancelEdit(): void { this.editing.set(false); }

  deleted = output<void>();
  askDelete(): void { this.confirmingDelete.set(true); }

  cancelDelete(): void { this.confirmingDelete.set(false); }

  confirmDelete(): void {
    this.deleted.emit();
  }
}
