import styled from 'styled-components';

export const PNavbar = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-items: center;
  gap: 0.5em;
  padding: 0.5em 1em;
  width: 100%;
  max-width: 1200px;
  background-color: var(--color-bg-content);
  box-shadow: 0px 10px 10px var(--color-bg-hover);
`;
