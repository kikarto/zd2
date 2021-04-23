import React, { useState } from 'react';
import { PInput } from '../../styled/Input';
import { IInput } from '../../interfaces/input';
import { PError } from '../../styled/Error';
import { PInputBox } from '../../styled/InputBox';
import { PInputLabel } from '../../styled/InputLabel';

export const Input: React.FC<IInput> = ({
    label,
    name,
    type = 'text',
    validate = (_: string) => true,
    onChange = (e: any) => null,
    options = [],
    value: initValue = '',
    messageOnError,
  }) => {
  const [error, setError] = useState('');
  const [value, setValue] = useState(initValue);
  const dataList = options.map(value => {
    return <option value={value} key={value} />;
  })

  const onChangeValue = (e: any) => {
    const val = e.target.value;
    setError('');
    setValue(val);
    onChange(e);
    if (!validate(val)) {
      setError(messageOnError || `Błędnie wypełnione pole ${name}`);
    }
  }
  
  return <PInputBox>
    <PInputLabel>{label}</PInputLabel>
    <PInput {...{ name, type, value, list: `${name}-datalist` }} onChange={onChangeValue}></PInput>
    <datalist id={`${name}-datalist`}>
      {dataList}
    </datalist>
    <PError>{error}</PError>
  </PInputBox>;
}
