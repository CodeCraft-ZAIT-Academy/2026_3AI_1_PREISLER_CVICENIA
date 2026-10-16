import { Component, input, output  } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../../book';
import {BookDetail} from '../book-detail/book-detail'; 
import { BookForm } from '../book-form/book-form';
import { getGenreColor } from '../../genre.colors';

@Component({
  imports: [MatCardModule,MatButtonModule,MatIconModule, BookDetail, BookForm],
  selector: 'app-book-card',
  styleUrl: './book-card.css',
  templateUrl: './book-card.html',
})
export class BookCard {
  book = input.required<Book>();
  showDetails: boolean = false;
  favorite = output<void>();

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
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

  editing: boolean = false;

  startEdit(): void {
    this.editing = true;
  }

  saveEdit(book: Book): void {
    this.edited.emit(book);
    this.editing = false;
  }

  cancelEdit(): void {
    this.editing = false;
  }

  deleted = output<void>();

  confirmingDelete: boolean = false;

  askDelete(): void {
    this.confirmingDelete = true;
  }

  cancelDelete(): void {
    this.confirmingDelete = false;
  }

  confirmDelete(): void {
    this.deleted.emit();
  }
}
