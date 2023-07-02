import styled from '@emotion/styled';

export const Header = styled.header`
  top: 0;
  left: 0;
  position: sticky;
  z-index: 1100;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 64px;
  padding: 12px 24px;

  color: cadetblue;
  background-color: cadetblue;
  box-shadow: 2px 5px 10px 2px rgba(0, 0, 0, 0.4);
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 600px;
  background-color: #fff;
  border-radius: 3px;
  overflow: hidden;
  &:hover,
  &:focus {
    box-shadow: 2px 2px 6px 2px rgba(0, 0, 0, 0.4);
  }
`;

export const Button = styled.button`
  display: inline-block;
  width: 60px;
  height: 60px;
  border: 0;
  opacity: 0.6;
  transition: opacity 250ms cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  outline: none;

  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.4);
  }
`;

export const Label = styled.span`
  font-weight: 700;
`;

export const Input = styled.input`
  display: inline-block;
  width: 100%;
  height: 30px;
  font: inherit;
  font-size: 20px;
  border: none;
  outline: none;
  padding-left: 4px;
  padding-right: 4px;
  &::placeholder {
    font: inherit;
    font-size: 20px;
  }
`;
