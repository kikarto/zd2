import React, { useEffect } from 'react';
import { PPage } from '../../styled/Page';
import { PTable } from '../../styled/Table';
import { PRow } from '../../styled/Row';
import { PCell } from '../../styled/Cell';
import { Actions } from '../ui/Action';
import { IBook } from '../../interfaces/book';
// import { books } from '../../tempData/books';
import { Model } from '../../const/model';
import { PHeader } from '../../styled/Header';
import { IState } from '../../store/types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { clearBooks, removeBook, setLoadingBooks } from '../../store/actions';
import { PToolbar } from '../../styled/Toolbar';
import { Button } from '../ui/Button';
import { Loading } from '../ui/Loading';
import { IAuthor } from '../../interfaces/author';
import { IPublisher } from '../../interfaces/publisher';
import { Connect } from '../../libs/Connect';
import { parseBooks, sortBook } from '../../libs/book';

interface IProps {
  page?: number;
}

const connect = new Connect();

export const BookList: React.FC<IProps> = ({ page = 1 }) => {
  const books: IBook[] = useSelector<IState, IBook[]>(state => sortBook(state.books));
  const loadingList = useSelector<IState, boolean>(state => state.bookLoading);
  const history = useHistory();
  const dispatch = useDispatch();
  const authors = useSelector<IState, IAuthor[]>(state => state.authors);
  const publishers = useSelector<IState, IPublisher[]>(state => state.publishers);

  const add = () => {
    history.push(`/book`)
  }

  const refresh = async () => {
    dispatch(setLoadingBooks(true));
    dispatch(clearBooks());

    const response = await connect.find<IBook>(Model.Book);
    if (response) {
      dispatch(clearBooks(parseBooks(response, authors, publishers)));
    }

    dispatch(setLoadingBooks(false));
  }

  const remove = (id: number) => {
    dispatch(removeBook(id));
  }

  useEffect(() => {
    if (books.length === 0) {
      refresh();
    }
  }, []);

  return <PPage className="book-list">
    <PHeader>Książki</PHeader>
    <PToolbar>
      <Button label={'Dodaj książkę'} types={'info'} onClick={add}></Button>
      <Button label={'Odśwież liste'} types={'info'} onClick={refresh}></Button>
    </PToolbar>
    <PTable>
      <PRow columns={'1fr 10em 1fr 10em'} areas={'"title title author action" "publisher year isbn action"'} isHeader={true}>
        <PCell name={'title'}>Tytuł książki</PCell>
        <PCell name={'year'}>Rok wydania</PCell>
        <PCell name={'isbn'}>Nr. ISBN</PCell>
        <PCell name={'author'}>Autor</PCell>
        <PCell name={'publisher'}>Wydawnictwo</PCell>
        <PCell name={'action'}></PCell>
      </PRow>
      <Loading state={loadingList}></Loading>
      {books.map(({ id = 0, title, publishmentYear: year, isbn, author, publisher }) => (
        <PRow columns={'1fr 10em 1fr 10em'} areas={'"title title author action" "publisher year isbn action"'} key={title + isbn}>
          <PCell name={'title'}>{title}</PCell>
          <PCell name={'year'} types={'number'}>{year}</PCell>
          <PCell name={'isbn'} types={'number'}>{isbn}</PCell>
          <PCell name={'author'}>{author?.lastName || '-'} {author?.firstName || '-'}</PCell>
          <PCell name={'publisher'}>{publisher?.name || '-'}</PCell>
          <Actions id={id} model={Model.Book} onRemove={remove}></Actions>
        </PRow>
      ))}
    </PTable>
  </PPage>;
}
