import React from 'react';
import { Model } from '../../const/model';
import { Connect } from '../../libs/Connect';
import { PCell } from '../../styled/Cell';
import { Button } from '../ui/Button';
import { useHistory } from 'react-router-dom';
import { TData } from '../../types/data';

interface IProps {
  id: number;
  model: Model;
  onRemove: (id: number) => void;
}

const connect = new Connect();

export const Actions: React.FC<IProps> = ({ id, model, onRemove }) => {
  const history = useHistory();
  let pathEdit = '/';
  switch(model) {
    case Model.Author: pathEdit += 'author'; break;
    case Model.Book: pathEdit += 'book'; break;
    case Model.Publisher: pathEdit += 'publisher'; break;
  }
  pathEdit += `/${id}`

  const edit = (e: any) => {
    e.preventDefault();
    history.push(`${pathEdit}`)
  };

  const remove = async (e: any) => {
    e.preventDefault();
    // eslint-disable-next-line no-restricted-globals
    if (!confirm(`Czy na pewno usunąć wbraną pozycję?`)) {
      return;
    }

    try {
      const response = await connect.remove<TData>(model, id);
      if (response) {
        if ('error' in response && 'message' in response) {
          alert((response as any).message)
        } else {
          alert(`Usunięto wbraną pozycję.`)
          onRemove(response['id'] || 0)
          // history.push(`/${model}`)
        }
      }
    } catch(e) {
      alert(e)
    }

  };

  return <PCell name='action' types={'number'}>
    <Button label={'Edytuj'} types={'warning'} onClick={edit}></Button>
    <Button label={'Usuń'} types={'danger'} onClick={remove}></Button>
  </PCell>;
}
