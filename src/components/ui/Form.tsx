import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Model } from '../../const/model';
import { IInput } from '../../interfaces/input';
import { Connect } from '../../libs/Connect';
import { PError } from '../../styled/Error';
import { TData } from '../../types/data';
import { Button } from './Button';
import { Input } from './Input';
import { Loading } from './Loading';

export interface IForm extends React.HTMLProps<HTMLFormElement> {
  model: Model;
  inputs: IInput[];
  values?: TData;
  messageOnAdded?: string;
  messageOnUpdated?: string;
  callbackOnAdded: (data: TData) => void;
  callbackOnUpdated: (data: TData) => void;
}

const connect = new Connect();

export const Form: React.FC<IForm> = ({
  model,
  inputs,
  values = {},
  messageOnAdded = 'Pomyślnie dodano nową pozycje.',
  messageOnUpdated = 'Pomyślnie zaktualizowano pozycje.',
  callbackOnAdded = () => null,
  callbackOnUpdated = () => null,
}) => {
  const history = useHistory();
  const [error, setError] = useState("");
  const [value, setValue] = useState<TData | {}>(values);
  const [loading, setLoading] = useState(false);
  const onChange = (nameField: string, valueField: string | number) => {
    setValue({ ...value, [nameField]: valueField })
  }

  const fields = inputs.map((input, lp) => {
    return <Input
      { ...input }
      value={input.name in values ? (values as any)[input.name].toString() : ''}
      onChange={(e) => onChange(input.name, (e.target as any).value)}
      key={lp}
    />
  });

  const onCancel = (e: any) => {
    e.preventDefault();
    history.push(`/${model}`);
  };

  const onSave = async (e: any) => {
    e.preventDefault();
    setError('');

    const errors: string[] = inputs
      .map(({
        name,
        validate = (_: string) => true,
        messageOnError,
      }) => {
        if (!validate((value as any)[name] || ''))
          return messageOnError || `Błędnie wypełnione pole ${name}.`;
        return '';
      })
      .filter(err => err.length > 0);

    if (errors.length > 0) {
      setError(errors.join(`\n`));
      return;
    }

    setLoading(true);
    try {
      const valueToSend: any = {};
      inputs.forEach(({ name, options, optionObjects, optionKeys, optionIdKey }: IInput) => {
        let valueInput: string | number | undefined = undefined;
        if (name in value) {
          valueInput = (value as any)[name];
        }
        if (options && optionObjects && optionKeys && optionIdKey) {
          const optionValue = optionObjects.find(option => {
            const optionValueFromKeys: string = optionKeys
              .map(key => option[key] || '')
              .join(' ');
            return optionValueFromKeys === valueInput;
          })
          valueToSend[optionIdKey] = optionValue['id'] || 0;
        } else {
          valueToSend[name] = valueInput;
        }
      });
      const isNew = valueToSend.id === 0;
      const response = await connect.insertOrUpdate<TData>(model, valueToSend as TData);
      if (response) {
        if ('error' in response && 'message' in response) {
          alert((response as any).message)
        } else {
          // history.push(`/${model}`);
          if (isNew) {
            alert(messageOnAdded)
            callbackOnAdded(response);
          } else {
            alert(messageOnUpdated)
            callbackOnUpdated(response);
          }
        }
      }
    } catch (e: any) {
      setError(e.message);
    }
    setLoading(false);
  };
  

  return <div>
    <div>
      {fields}
    </div>
    <div>
      <Button label={'Powrót do listy'} onClick={onCancel} disabled={loading}></Button>
      <Button label={'Zapisz'} types={'primary'} onClick={onSave} disabled={loading}></Button>
    </div>
    <Loading state={loading}></Loading>
    {error ? <PError>{error}</PError> : ''}
  </div>;
}
