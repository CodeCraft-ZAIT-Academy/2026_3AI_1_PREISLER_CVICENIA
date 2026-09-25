import { Component, signal } from '@angular/core';
import { BookList } from './book-list/book-list';

@Component({
  imports: [BookList],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('1.zadanie');
}
