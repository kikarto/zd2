import { IAuthor } from "../interfaces/author";
import { IBook } from "../interfaces/book";
import { IPublisher } from "../interfaces/publisher";
import { Actions } from "./types";

export const addAuthor = (author: IAuthor): Actions => ({
  type: "ADD_AUTHOR",
  payload: author,
});

export const setLoadingAuthors = (loading: boolean): Actions => ({
  type: "LOADING_AUTHOR",
  payload: loading,
});

export const clearAuthors = (authors: IAuthor[] = []): Actions => ({
  type: "CLEAR_AUTHOR",
  payload: authors,
});

export const removeAuthor = (authorId: number): Actions => ({
  type: "REMOVE_AUTHOR",
  payload: authorId,
});

export const updateAuthor = (author: IAuthor): Actions => ({
  type: "UPDATE_AUTHOR",
  payload: author,
});

export const addBook = (book: IBook): Actions => ({
  type: "ADD_BOOK",
  payload: book,
});

export const setLoadingBooks = (loading: boolean): Actions => ({
  type: "LOADING_BOOK",
  payload: loading,
});

export const clearBooks = (books: IBook[] = []): Actions => ({
  type: "CLEAR_BOOK",
  payload: books,
});

export const removeBook = (bookId: number): Actions => ({
  type: "REMOVE_BOOK",
  payload: bookId,
});

export const updateBook = (book: IBook): Actions => ({
  type: "UPDATE_BOOK",
  payload: book,
});

export const addPublisher = (publisher: IPublisher): Actions => ({
  type: "ADD_PUBLISHER",
  payload: publisher,
});

export const setLoadingPublishers = (loading: boolean): Actions => ({
  type: "LOADING_PUBLISHER",
  payload: loading,
});

export const clearPublishers = (publishers: IPublisher[] = []): Actions => ({
  type: "CLEAR_PUBLISHER",
  payload: publishers,
});

export const removePublisher = (publisherId: number): Actions => ({
  type: "REMOVE_PUBLISHER",
  payload: publisherId,
});

export const updatePublisher = (publisher: IPublisher): Actions => ({
  type: "UPDATE_PUBLISHER",
  payload: publisher,
});
