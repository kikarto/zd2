import React from 'react';
import { PButton } from '../../styled/Button';
import { TType } from '../../styled/Styled';

export interface IButton extends React.HTMLProps<HTMLButtonElement> {
  label: string;
  types?: TType;
  disabled?: boolean;
}

export const Button: React.FC<IButton> = ({ types = 'default', label, onClick, disabled = false }) => {
  return <PButton types={types} onClick={onClick} disabled={disabled}>{label}</PButton>;
}
