import { faker } from '@faker-js/faker';
import { Book } from './book';

export function generateBooks(count: number, firstID: number): Book[] {
    const book: Book[] = [];

    for(let i = 0; i< count; i++){
        book.push({
            id: firstID +i,
            title: faker.book.title(),
            author: faker.book.author(),
            year: faker.number.int({min:1750, max:2026}),
            pages: faker.number.int({min:200, max:1000}),
            available: faker.datatype.boolean(),
            genre: faker.book.genre(),
            favorite: faker.datatype.boolean(),
        });
    }

    return book;
}