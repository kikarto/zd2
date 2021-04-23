import { IAuthor } from "../interfaces/author";
import { IBook } from "../interfaces/book";
import { IPublisher } from "../interfaces/publisher";

export const parseBooks = (response: any, authors: IAuthor[], publishers: IPublisher[]): IBook[] => {
  const books: IBook[] = [];
  for (const id in response) {
    const book: IBook = response[id];
    const bookAuthor = authors.find(({ id }) => id === book.authorId);
    if (bookAuthor) {
      book.author = bookAuthor;
      book.authorLabel = `${bookAuthor.lastName} ${bookAuthor.firstName}`;
    }
    const bookPublisher = publishers.find(({ id }) => id === book.publisherId);
    if (bookPublisher) {
      book.publisher = bookPublisher;
      book.publisherLabel = `${bookPublisher.name}`;
    }
    books.push(book)
  }
  return books;
}

export const sortBook = (books: IBook[]): IBook[] => {
  return books.sort((firstBook, secondBook) => {
    const first = firstBook.title.toUpperCase();
    const second = secondBook.title.toUpperCase();
    if (first < second) {
      return -1;
    }
    if (first > second) {
      return 1;
    }
    return 0;
  })
}