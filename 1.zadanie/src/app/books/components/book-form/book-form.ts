import { Component,input, output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Book } from '../../book';
import { GENRES } from '../../genres';


@Component({
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  selector: 'app-book-form',
  styleUrl: './book-form.css',
  templateUrl: './book-form.html',
})
export class BookForm {
  book = input<Book>();
  saved = output<Book>();
   cancelled = output<void>();

  genres: string[] = GENRES;
  currentYear: number = new Date().getFullYear();

  draft: Book = this.emptyBook();

  ngOnInit(): void {
    const book = this.book();

    if (book) {
      this.draft = { ...book };
    }
  }

  isEditMode(): boolean {
    return this.book() !== undefined;
  }

  save(form: NgForm): void {
    this.saved.emit({ ...this.draft });

    if (!this.isEditMode()) {
      this.draft = this.emptyBook();
      form.resetForm(this.draft);
    }
  }

  cancel(): void {
    this.cancelled.emit();
  }

  emptyBook(): Book {
    return {
      id: 0,
      title: '',
      author: '',
      year: this.currentYear,
      available: true,
      genre: '',
      pages: 100,
      favorite: false
    };
  }

}
