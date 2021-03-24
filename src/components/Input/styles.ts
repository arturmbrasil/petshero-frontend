import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background-color: #fff;

  /* filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.25)); */
  border-radius: 8px;
  padding: 16px;
  width: 100%;

  display: flex;
  align-items: center;

  border: 2px solid #fff;
  color: #999999;

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #e9482c;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border: 2px solid #f28759;
      color: #f28759;
    `}

  ${(props) =>
    props.isFilled &&
    css`
      color: #f28759;
    `}

  & + div {
    margin-top: 8px;
  }

  input {
    flex: 1;
    border: 0;
    background: transparent;

    color: #000000;

    &::placeholder {
      color: #999999;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;

  svg {
    margin: 0;
  }

  span {
    background: #e9482c;
    color: #fff;

    &::before {
      border-color: #e9482c transparent;
    }
  }
`;
