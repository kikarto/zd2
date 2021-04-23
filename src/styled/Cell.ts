import styled from 'styled-components';

export type TCell = 'string' | 'number';

interface ICell {
  name: string;
  types?: TCell;
}

export const PCell = styled.div<ICell>`
  grid-area: ${({name}) => name || 'column'};
  ${({types}) => types === 'number' ? 'justify-self: end;' : ''}
  padding: 0.25em 0.5em;
  display: flex;
  gap: .25em;
`;
