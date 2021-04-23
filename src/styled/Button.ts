import styled from 'styled-components';
import { getColor, TType } from './Styled';

interface IButton {
  types?: TType
}

export const PButton = styled.button<IButton>`
  padding: 1em;
  background: ${({ types }) => getColor(types || 'default')};
  border: 1px solid transparent;
  color: ${({ types }) => types === 'default' ? 'var(--color-text)' : 'var(--color-white)'};
  cursor: pointer;
  transition: background .3s, color .3s;

  &:hover {
    background: var(--color-bg-hover);
    border: 1px solid ${({ types }) => getColor(types || 'default')};
    color: ${({ types }) => getColor(types || 'default')};
  }
`;
