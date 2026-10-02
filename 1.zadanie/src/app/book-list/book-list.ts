import { Component } from '@angular/core';
import { BookCard } from '../book-card/book-card';
import { Book } from '../book';
import { generateBooks } from '../book-generator';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@Component({
  imports: [BookCard, MatButtonModule,MatIconModule ],
  selector: 'app-book-list',
  styleUrl: './book-list.css',
  templateUrl: './book-list.html',
})

export class BookList {
  books: Book[] = [
  {
    id: 1,
    title: 'Hobit',
    author: 'J. R. R. Tolkien',
    year: 1937,
    available: true,
    genre: 'Fantasy',
    pages: 960,
    favorite: true
  
  },
  {
    id: 2,
    title: '1984',
    author: 'George Orwell',
    year: 1949,
    available: false,
    genre: 'Dystopia',
    pages: 650,
    favorite: true
  },
  {
    id: 3,
    title: 'Malý princ',
    author: 'Antoine de Saint-Exupéry',
    year: 1943,
    available: true,
    genre: 'Fiction',
    pages: 250,
    favorite: true
  }

];
BookList: Book[] = this.books.concat(generateBooks(40,4));

currentPage: number = 1
pagesize: number = 5;

pageCount():number{
  return Math.ceil(this.BookList.length / this.pagesize)
}

isOnCurrentpage(index:number): boolean {
  const start = (this.currentPage -1) * this.pagesize;
  return index >= start && index < start + this.pagesize;
}
 previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.pageCount()) {
      this.currentPage++;
    }
  }

}
