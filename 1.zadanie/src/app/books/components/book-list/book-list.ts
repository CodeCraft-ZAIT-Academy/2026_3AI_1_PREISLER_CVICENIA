import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';
import { BookCard } from '../book-card/book-card';
import { BookForm } from '../book-form/book-form';
import { Cart } from '../../../cart/components/cart/cart';
import { Book } from '../../book';
import { generateBooks } from '../../book-generator';
import { BookService } from '../../book.service';

@Component({
  selector: 'app-book-list',
  imports: [
    BookCard,
    BookForm,
    Cart,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonToggleModule
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css'
})
export class BookList {
  private bookService = inject(BookService);
  myBooks: Book[] = [
    {
      id: 1,
      title: 'Hobit',
      author: 'J. R. R. Tolkien',
      year: 1937,
      available: true,
      genre: 'Fantasy',

      pages: 310,
      favorite: false
    },
    {
      id: 2,
      title: '1984',
      author: 'George Orwell',
      year: 1949,
      available: false,
      genre: 'Dystopia',

      pages: 328,
      favorite: false
    },
    {
      id: 3,
      title: 'Malý princ',
      author: 'Antoine de Saint-Exupéry',
      year: 1943,
      available: true,
      genre: 'Fiction',

      pages: 96,
      favorite: false
    }
  ];

  readonly maxBorrowed = this.bookService.maxBorrowed;

  readonly books = this.bookService.books;

  limitBorrowed(books: Book[]): Book[] {
    let borrowedCount = 0;

    return books.map(book => {
      if (book.available) {
        return book;
      }

      borrowedCount++;

      if (borrowedCount > this.maxBorrowed) {
        return { ...book, available: true };
      }

      return book;
    });
  }

  readonly searchText = signal('');
  readonly availability = signal('all');
  readonly sortBy = signal('none');
  readonly favoritesOnly = signal(false);

  readonly visibleBooks = computed(() => {
    const list = this.bookService.getFilteredBooks(
      this.searchText(),
      this.availability(),
      this.sortBy()

    )
    return this.favoritesOnly() ? list.filter(b => b.favorite) : list;
  });

  clearSearch(): void {
    this.searchText.set('');
    this.firstPage();
  }

  addBook(book: Book): void {
    this.bookService.addBook(book);
    this.firstPage();
  }

  updateBook(updated: Book): void {
    this.bookService.updateBook(updated)
  }

  deleteBook(deleted: Book): void {
    this.bookService.deleteBook(deleted.id);
    if (this.currentPage() > this.pageCount()) {
      this.lastPage();
    }
  }

  zobrazoblubencov(book: Book): void {
    this.bookService.toggleFavorite(book.id);
  }

  readonly borrowedBooks = this.bookService.borrowedBooks;

  borrow(book: Book): void {
    if (!this.bookService.borrowBook(book.id)) {
      alert(`Naraz môžeš mať požičaných najviac ${this.maxBorrowed} kníh. Najskôr nejakú vráť.`);
      return;
    }
  }

  giveBack(book: Book): void {
    this.bookService.returnBook(book.id);
  }

  readonly currentPage = signal(1);
  readonly pageSize = signal(5);
  readonly pageSizes = [5, 10, 20];


  readonly pageCount = computed(() =>
    Math.max(1, Math.ceil(this.visibleBooks().length / this.pageSize()))
  );

  isOnCurrentPage(index: number): boolean {
    const start = (this.currentPage() - 1) * this.pageSize();
    return index >= start && index < start + this.pageSize();
  }


  previousPage(): void {
    this.currentPage.update(p => Math.max(1, p - 1));
  }

  nextPage(): void {
    this.currentPage.update(p => Math.min(this.pageCount(), p + 1));
  }

  firstPage(): void { this.currentPage.set(1); }

  lastPage(): void { this.currentPage.set(this.pageCount()); }

  goToPage(page: number): void {
    this.currentPage.set(Math.max(1, Math.min(page, this.pageCount())));
  }
  resetFilters(): void {
    this.searchText.set('');
    this.firstPage();
    this.availability.set('all');
    this.sortBy.set('none');

  }

  setPageSize(size: number): void {
    this.pageSize.set(size);
    this.firstPage();
  }
  readonly totalBooks = computed(() =>
    (this.books().length)
  );
  readonly availableBooks =
    this.books().filter(book => book.available)
    ;

  readonly firstShown = computed(() =>
    (this.currentPage() - 1) * this.pageSize() + 1
  );

  readonly lastShown = computed(() =>
    Math.min(this.currentPage() * this.pageSize(), this.visibleBooks().length)
  );

  readonly pages = computed(() =>
    Array.from({ length: this.pageCount() }, (_, i) => i + 1)
  );

  readonly pagedBooks = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.visibleBooks().slice(start, start + this.pageSize());
  });
}