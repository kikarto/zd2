import React from 'react';
import { PModal } from '../../styled/Modal';
import { TType } from '../../styled/Styled';

export interface IProps {
  title?: string;
  content?: string;
  types?: TType;
}

export const Modal: React.FC<IProps> = ({ types = 'default', title, content }) => {
  return <PModal types={types}>{content}</PModal>;
}
