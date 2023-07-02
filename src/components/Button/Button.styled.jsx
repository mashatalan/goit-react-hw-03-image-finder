import styled from '@emotion/styled';

export const LoadMore = styled.button`
  padding: 8px 16px;
  border-radius: 2px;
  background-color: cadetblue;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
  display: inline-block;
  color: black;
  border: 0;
  text-decoration: none;
  cursor: pointer;
  font-family: inherit;
  font-size: 18px;
  line-height: 24px;
  font-style: normal;
  font-weight: 500;
  min-width: 180px;
  box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.4);
  &:hover {
    background-color: white;
    box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.4);
  }
`;
