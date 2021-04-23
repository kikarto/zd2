import React, { useEffect } from 'react';
import { PPage } from '../../styled/Page';
import { PTable } from '../../styled/Table';
import { PRow } from '../../styled/Row';
import { PCell } from '../../styled/Cell';
import { Actions } from '../ui/Action';
import { IPublisher } from '../../interfaces/publisher';
// import { publishers } from '../../tempData/publishers';
import { Model } from '../../const/model';
import { PHeader } from '../../styled/Header';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from '../../store/types';
import { useHistory } from 'react-router-dom';
import { clearPublishers, removePublisher, setLoadingPublishers } from '../../store/actions';
import { Loading } from '../ui/Loading';
import { PToolbar } from '../../styled/Toolbar';
import { Button } from '../ui/Button';
import { Connect } from '../../libs/Connect';
import { parsePublishers, sortPublisher } from '../../libs/publisher';

interface IProps {
  page?: number;
}

const connect = new Connect();

export const PublisherList: React.FC<IProps> = ({ page = 1 }) => {
  const publishers: IPublisher[] = useSelector<IState, IPublisher[]>(state => sortPublisher(state.publishers));
  const loadingList = useSelector<IState, boolean>(state => state.publisherLoading);
  const history = useHistory();
  const dispatch = useDispatch();

  const add = () => {
    history.push(`/publisher`)
  }

  const refresh = async () => {
    dispatch(setLoadingPublishers(true));
    dispatch(clearPublishers());

    const response = await connect.find<IPublisher>(Model.Publisher);
    if (response) {
      dispatch(clearPublishers(parsePublishers(response)));
    }

    dispatch(setLoadingPublishers(false));
  }

  const remove = (id: number) => {
    dispatch(removePublisher(id));
  }

  useEffect(() => {
    if (publishers.length === 0) {
      refresh();
    }
  }, []);

  return <PPage className="publisher-list">
    <PHeader>Wydawnictwa</PHeader>
    <PToolbar>
      <Button label={'Dodaj wydawnictwo'} types={'info'} onClick={add}></Button>
      <Button label={'Odśwież liste'} types={'info'} onClick={refresh}></Button>
    </PToolbar>
    <PTable>
      <PRow columns={'1fr 10em 10em'} areas={'"name year action"'} isHeader={true}>
        <PCell name={'name'}>Wydawnictwo</PCell>
        <PCell name={'year'}>Rok założenia</PCell>
        <PCell name={'action'}></PCell>
      </PRow>
      <Loading state={loadingList}></Loading>
      {publishers.map(({ id = 0, name, establishmentYear: year }) => (
        <PRow columns={'1fr 10em 10em'} areas={'"name year action"'} key={name}>
          <PCell name={'name'}>{name}</PCell>
          <PCell name={'year'} types={'number'}>{year}</PCell>
          <Actions id={id} model={Model.Publisher} onRemove={remove}></Actions>
        </PRow>
      ))}
    </PTable>
  </PPage>;
}
