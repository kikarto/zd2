import React, { useEffect } from 'react';
import { PPage } from '../../styled/Page';
import { PTable } from '../../styled/Table';
import { PRow } from '../../styled/Row';
import { PCell } from '../../styled/Cell';
import { Actions } from '../ui/Action';
import { IAuthor } from '../../interfaces/author';
// import { authors } from '../../tempData/authors';
import { Model } from '../../const/model';
import { PHeader } from '../../styled/Header';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store/types';
import { PToolbar } from '../../styled/Toolbar';
import { Button } from '../ui/Button';
import { useHistory } from 'react-router-dom';
import { Loading } from '../ui/Loading';
import { clearAuthors, removeAuthor, setLoadingAuthors } from '../../store/actions';
import { Connect } from '../../libs/Connect';
import { parseAuthors, sortAuthor } from '../../libs/author';

interface IProps {
  page?: number;
}

const connect = new Connect();

export const AuthorList: React.FC<IProps> = ({ page = 1 }) => {
  const authors = useSelector<IState, IAuthor[]>(state => sortAuthor(state.authors));
  const loadingList = useSelector<IState, boolean>(state => state.authorLoading);
  const history = useHistory();
  const dispatch = useDispatch();

  const add = () => {
    history.push(`/author`)
  }

  const refresh = async () => {
    dispatch(setLoadingAuthors(true));
    dispatch(clearAuthors());

    const response = await connect.find<IAuthor>(Model.Author);
    if (response) {
      dispatch(clearAuthors(parseAuthors(response)));
    }

    dispatch(setLoadingAuthors(false));
  }

  const remove = (id: number) => {
    dispatch(removeAuthor(id));
  }

  useEffect(() => {
    if (authors.length === 0) {
      refresh();
    }
  }, []);

  return <PPage className="author-list">
    <PHeader>Autorzy</PHeader>
    <PToolbar>
      <Button label={'Dodaj autora'} types={'info'} onClick={add}></Button>
      <Button label={'Odśwież liste'} types={'info'} onClick={refresh}></Button>
    </PToolbar>
    <PTable>
      <PRow columns={'1fr 10em'} areas={'"name action"'} isHeader={true}>
        <PCell name={'name'}>Autor</PCell>
        <PCell name={'action'}></PCell>
      </PRow>
      <Loading state={loadingList}></Loading>
      {authors.map(({ id = 0, lastName, firstName }) => (
        <PRow columns={'1fr 10em'} areas={'"name action"'} key={`${lastName} ${firstName}`}>
          <PCell name={'name'}>{lastName} {firstName}</PCell>
          <Actions id={id} model={Model.Author} onRemove={remove}></Actions>
        </PRow>
      ))}
    </PTable>
  </PPage>;
}
