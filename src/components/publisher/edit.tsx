import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Model } from '../../const/model';
import { IInput } from '../../interfaces/input';
import { IPublisher } from '../../interfaces/publisher';
import { addPublisher, updatePublisher } from '../../store/actions';
import { IState } from '../../store/types';
import { PHeader } from '../../styled/Header';
import { PPage } from '../../styled/Page';
import { Form } from '../ui/Form';

interface IProps {
  id?: number;
}

export const PublisherEdit: React.FC<IProps> = () => {
  const { id } = useParams<{ id?: string }>();
  const publisherId = parseInt(id || "0", 10);
  const toDayYear = (new Date(Date.now())).getFullYear();
  let values: IPublisher = { name: '', establishmentYear: toDayYear };
  const inputs: IInput[] = [
    { name: 'id', type: 'hidden' },
    { label: 'Nazwa', name: 'name', validate: (val: string) => val.length > 0 },
    { label: 'Rok założenia', type: 'number', name: 'establishmentYear', validate: (val: string) => val.length > 0 && parseInt(val, 10) <= toDayYear },
  ];
  const dispatch = useDispatch();
  const publishers = useSelector<IState, IPublisher[]>(state => state.publishers);

  if (publisherId > 0) {
    const publisher = publishers.find(({ id }) => id === publisherId);
    if (publisher) {
      values = publisher;
    }
  }

  return <PPage className="publisher-edit">
    <PHeader>{publisherId > 0 ? 'Edycja wydawnictwa' : 'Nowe wydawnictwo' }</PHeader>
    <Form
      model={Model.Publisher}
      inputs={inputs}
      values={values}
      messageOnAdded={'Pomyślnie dodano nowe wydawnictwo'}
      messageOnUpdated={'Pomyślnie zaktualizowano wydawnictwo'}
      callbackOnAdded={(e) => dispatch(addPublisher(e as IPublisher))}
      callbackOnUpdated={(e) => dispatch(updatePublisher(e as IPublisher))}
    ></Form>
  </PPage>;
}