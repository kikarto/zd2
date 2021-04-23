import { Actions, IState } from "./types";

const initialState: IState = {
  authors: [],
  authorLoading: false,
  books: [],
  bookLoading: false,
  publishers: [],
  publisherLoading: false,
};

export const reducer = (state: IState = initialState, action: Actions) => {
  switch (action.type) {
    case 'ADD_AUTHOR':
      return { ...state, authors: [ ...state.authors, action.payload ] };
    case 'LOADING_AUTHOR':
      return { ...state, authorLoading: action.payload };
    case 'CLEAR_AUTHOR':
      return { ...state, authors: action.payload };
    case 'REMOVE_AUTHOR':
      const findAuthorIndex = state.authors.findIndex(({ id }) => id === action.payload);
      if (findAuthorIndex >= 0) {
        state.authors.splice(findAuthorIndex, 1);
      }
      return { ...state };
    case 'UPDATE_AUTHOR':
      const findAuthorIndexUp = state.authors.findIndex(({ id }) => id === action.payload.id);
      if (findAuthorIndexUp >= 0) {
        state.authors[findAuthorIndexUp] = action.payload;
      } else {
        state.authors.push(action.payload);
      }
      return { ...state };
    
    case 'ADD_BOOK':
      return { ...state, books: [ ...state.books, action.payload ] };
    case 'LOADING_BOOK':
      return { ...state, bookLoading: action.payload };
    case 'CLEAR_BOOK':
      return { ...state, books: action.payload };
    case 'REMOVE_BOOK':
      const findBookIndex = state.books.findIndex(({ id }) => id === action.payload);
      if (findBookIndex >= 0) {
        state.books.splice(findBookIndex, 1);
      }
      return { ...state };
    case 'UPDATE_BOOK':
      const findBookIndexUp = state.books.findIndex(({ id }) => id === action.payload.id);
      if (findBookIndexUp >= 0) {
        state.books[findBookIndexUp] = action.payload;
      } else {
        state.books.push(action.payload);
      }
      return { ...state };

    case 'ADD_PUBLISHER':
      return { ...state, publishers: [ ...state.publishers, action.payload ] };
    case 'LOADING_PUBLISHER':
      return { ...state, publisherLoading: action.payload };
    case 'CLEAR_PUBLISHER':
      return { ...state, publishers: action.payload };
    case 'REMOVE_PUBLISHER':
      const findPublisherIndex = state.publishers.findIndex(({ id }) => id === action.payload);
      if (findPublisherIndex >= 0) {
        state.publishers.splice(findPublisherIndex, 1);
      }
      return { ...state };
    case 'UPDATE_PUBLISHER':
      const findPublisherIndexUp = state.publishers.findIndex(({ id }) => id === action.payload.id);
      if (findPublisherIndexUp >= 0) {
        state.publishers[findPublisherIndexUp] = action.payload;
      } else {
        state.publishers.push(action.payload);
      }
      return { ...state };
    
    default:
      return state;
  };
};
