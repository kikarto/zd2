import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Model } from '../../const/model';
import { IAuthor } from '../../interfaces/author';
import { IInput } from '../../interfaces/input';
import { addAuthor, updateAuthor } from '../../store/actions';
import { IState } from '../../store/types';
import { PHeader } from '../../styled/Header';
import { PPage } from '../../styled/Page';
import { Form } from '../ui/Form';

interface IProps {
  // id?: number;
}

export const AuthorEdit: React.FC<IProps> = () => {
  const { id } = useParams<{ id?: string }>();
  const authorId = parseInt(id || "0", 10);
  let values: IAuthor = { firstName: '', lastName: '' };
  const inputs: IInput[] = [
    { name: 'id', type: 'hidden' },
    { label: 'Imię', name: 'firstName', validate: (val: string) => val.length > 0 },
    { label: 'Nazwisko', name: 'lastName', validate: (val: string) => val.length > 0 },
  ];
  const dispatch = useDispatch();
  const authors = useSelector<IState, IAuthor[]>(state => state.authors);

  if (authorId > 0) {
    const author = authors.find(({ id }) => id === authorId);
    if (author) {
      values = author;
    }
  }

  return <PPage className="author-edit">
    <PHeader>{authorId > 0 ? 'Edycja autora' : 'Nowy autor' }</PHeader>
    <Form
      model={Model.Author}
      inputs={inputs}
      values={values}
      messageOnAdded={'Pomyślnie dodano nowego autora'}
      messageOnUpdated={'Pomyślnie zaktualizowano autora'}
      callbackOnAdded={(e) => dispatch(addAuthor(e as IAuthor))}
      callbackOnUpdated={(e) => dispatch(updateAuthor(e as IAuthor))}
    ></Form>
  </PPage>;
}
