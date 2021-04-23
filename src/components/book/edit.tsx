import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Model } from '../../const/model';
import { IAuthor } from '../../interfaces/author';
import { IBook } from '../../interfaces/book';
import { IInput } from '../../interfaces/input';
import { IPublisher } from '../../interfaces/publisher';
import { addBook, updateBook } from '../../store/actions';
import { IState } from '../../store/types';
import { PHeader } from '../../styled/Header';
import { PPage } from '../../styled/Page';
import { Form } from '../ui/Form';

interface IProps {
  // id?: number;
}

export const BookEdit: React.FC<IProps> = () => {
  const { id } = useParams<{ id?: string }>();
  const bookId = parseInt(id || "0", 10);
  const toDayYear = (new Date(Date.now())).getFullYear();
  const authors = useSelector<IState, IAuthor[]>(state => state.authors);
  const authorLabels = authors.map(({ firstName, lastName }) => `${lastName} ${firstName}`);
  const publishers = useSelector<IState, IPublisher[]>(state => state.publishers);
  const publisherLabels = publishers.map(({ name }) => `${name}`);
  let values: IBook = { title: '', isbn: 0, publishmentYear: toDayYear, authorId: 0, publisherId: 0, authorLabel: '', publisherLabel: '' };
  const inputs: IInput[] = [
    { name: 'id', type: 'hidden' },
    {
      label: 'Tytuł',
      name: 'title',
      validate: (val: string) => val.length > 0
    },
    {
      label: 'Nr. ISBN',
      name: 'isbn',
      validate: (val: string) => {
        if (!(/^[0-9-]{13,17}$/gi.test(val)))
          return false;

        val = val.replace(/-/gi, '');

        return val.length === 13;
      }
    },
    {
      label: 'Rok wydania',
      type: 'number',
      name: 'publishmentYear',
      validate: (val: string) => val.length > 0 && parseInt(val, 10) <= toDayYear
    },
    {
      label: 'Autor',
      name: 'authorLabel',
      options: authorLabels,
      optionObjects: authors,
      optionKeys: ['lastName', 'firstName'],
      optionIdKey: 'authorId',
      validate: (val: string) => authorLabels.includes(val)
    },
    {
      label: 'Wydawnictwo',
      name: 'publisherLabel',
      options: publisherLabels,
      optionObjects: publishers,
      optionKeys: ['name'],
      optionIdKey: 'publisherId',
      validate: (val: string) => publisherLabels.includes(val)
    },
  ];
  const dispatch = useDispatch();
  const books = useSelector<IState, IBook[]>(state => state.books)

  if (bookId > 0) {
    const book = books.find(({ id }) => id === bookId);
    if (book) {
      const bookAuthor = authors.find(({ id }) => id === book.authorId);
      book.authorLabel = bookAuthor ? `${bookAuthor.lastName} ${bookAuthor.firstName}` : '';
      const bookPublisher = publishers.find(({ id }) => id === book.publisherId);
      book.publisherLabel = bookPublisher ? `${bookPublisher.name}` : '';
      values = book;
    }
  }

  return <PPage className="book-edit">
    <PHeader>{bookId > 0 ? 'Edycja książki' : 'Nowa książka' }</PHeader>
    <Form
      model={Model.Book}
      inputs={inputs}
      values={values}
      messageOnAdded={'Pomyślnie dodano nową książke'}
      messageOnUpdated={'Pomyślnie zaktualizowano książkę'}
      callbackOnAdded={(e) => dispatch(addBook(e as IBook))}
      callbackOnUpdated={(e) => dispatch(updateBook(e as IBook))}
    ></Form>
  </PPage>;
}
