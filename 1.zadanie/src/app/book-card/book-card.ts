import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Book } from '../book';
import {BookDetail} from '../book-detail/book-detail'; 

@Component({
  imports: [MatCardModule,MatButtonModule,MatIconModule, BookDetail],
  selector: 'app-book-card',
  styleUrl: './book-card.css',
  templateUrl: './book-card.html',
})
export class BookCard {
  book = input.required<Book>();
  showDetails: boolean = false;
  favorite: boolean = true;

  toggleDetails(): void {
    this.showDetails = !this.showDetails;
  }

  zobrazoblubencov(): void {
    this.favorite = !this.favorite;
  }

  genreColor(): string {
  switch (this.book().genre) {
    case 'Fantasy':
      return '#7c3aed';
    case 'Science Fiction':
      return '#0891b2';
    case 'Mystery':
      return '#ca8a04';
    case 'Romance':
      return '#db2777';
    case 'Horror':
      return '#b91c1c';
    case 'Classic':
      return '#92400e';
    case "Children's Literature":
      return '#16a34a';
    default:
      return '#94a3b8';
  }
}
borrow(): void {
  this.book().available = false;
}

giveBack(): void {
  this.book().available = true;
}
}
