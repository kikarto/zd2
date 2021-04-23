import styled from 'styled-components';

interface IRow {
  columns?: string
  rows?: string
  areas?: string
  isHeader?: boolean
}

export const PRow = styled.div<IRow>`
  display: grid;
  grid-template-columns: ${({columns}) => columns || 'auto'};
  grid-template-rows: ${({rows}) => rows || 'auto'};
  grid-template-areas: ${({areas}) => areas || 'auto'};
  align-items: center;
  ${({isHeader}) => isHeader ? 'font-weight: 700;' : ''}
  padding: 0.5em 1em;
  transition: background-color 0.5s;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-bg-hover);
  }

  ${({isHeader}) => !isHeader ? `
  &:hover {
    background-color: var(--color-bg-hover);
  }
  ` : ''}
`;
