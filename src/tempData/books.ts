import { IBook } from "../interfaces/book";
import { authors } from "./authors";
import { publishers } from "./publishers";

export const books: IBook[] = [
  {
    id: 1,
    title: "Some Title 1",
    isbn: 1234567890123,
    publishmentYear: 1900,
    authorId: 1,
    author: authors.find(({ id }) => id === 1),
    publisherId: 1,
    publisher: publishers.find(({ id }) => id === 1),
  },
  {
    id: 2,
    title: "Some Title 2",
    isbn: 1234567890123,
    publishmentYear: 1923,
    authorId: 2,
    author: authors.find(({ id }) => id === 2),
    publisherId: 2,
    publisher: publishers.find(({ id }) => id === 2),
  },
  {
    id: 3,
    title: "Some Title 3",
    isbn: 1234567890123,
    publishmentYear: 2000,
    authorId: 3,
    author: authors.find(({ id }) => id === 3),
    publisherId: 3,
    publisher: publishers.find(({ id }) => id === 3),
  },
];
