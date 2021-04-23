import React from 'react';
import { PLoading } from '../../styled/Loading';

export interface IProps {
  state?: boolean
}

export const Loading: React.FC<IProps> = ({ state = false }) => {
  return state ? <PLoading>Wczytywanie ...</PLoading> : <div></div>;
}
