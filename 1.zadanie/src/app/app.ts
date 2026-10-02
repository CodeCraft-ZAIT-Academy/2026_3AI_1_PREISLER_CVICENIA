import { Component, signal } from '@angular/core';
import { BookList } from './book-list/book-list';
import {  MatToolbarModule  } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  imports: [BookList, MatToolbarModule, MatIconModule],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('1.zadanie');
}
