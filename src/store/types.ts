import { IAuthor } from "../interfaces/author";
import { IBook } from "../interfaces/book";
import { IPublisher } from "../interfaces/publisher";

export interface IState {
  authors: IAuthor[];
  authorLoading: boolean;
  books: IBook[];
  bookLoading: boolean;
  publishers: IPublisher[];
  publisherLoading: boolean;
}

export type Actions = AddAuthorAction | LoadingAuthorAction | ClearAuthorAction | RemoveAuthorAction | UpdateAuthorAction |
  AddBookAction | LoadingBookAction | ClearBookAction | RemoveBookAction | UpdateBookAction |
  AddPublisherAction | LoadingPublisherAction | ClearPublisherAction | RemovePublisherAction | UpdatePublisherAction;

export type AddAuthorAction = { type: 'ADD_AUTHOR', payload: IAuthor };
export type LoadingAuthorAction = { type: 'LOADING_AUTHOR', payload: boolean };
export type ClearAuthorAction = { type: 'CLEAR_AUTHOR', payload: IAuthor[] };
export type RemoveAuthorAction = { type: 'REMOVE_AUTHOR', payload: number };
export type UpdateAuthorAction = { type: 'UPDATE_AUTHOR', payload: IAuthor };

export type AddBookAction = { type: 'ADD_BOOK', payload: IBook };
export type LoadingBookAction = { type: 'LOADING_BOOK', payload: boolean };
export type ClearBookAction = { type: 'CLEAR_BOOK', payload: IBook[] };
export type RemoveBookAction = { type: 'REMOVE_BOOK', payload: number };
export type UpdateBookAction = { type: 'UPDATE_BOOK', payload: IBook };

export type AddPublisherAction = { type: 'ADD_PUBLISHER', payload: IPublisher };
export type LoadingPublisherAction = { type: 'LOADING_PUBLISHER', payload: boolean };
export type ClearPublisherAction = { type: 'CLEAR_PUBLISHER', payload: IPublisher[] };
export type RemovePublisherAction = { type: 'REMOVE_PUBLISHER', payload: number };
export type UpdatePublisherAction = { type: 'UPDATE_PUBLISHER', payload: IPublisher };

