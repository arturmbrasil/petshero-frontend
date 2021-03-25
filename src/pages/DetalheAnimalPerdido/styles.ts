import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface InfoProps {
  isFocused: boolean;
}
export const Container = styled.div``;

export const Content = styled.div<InfoProps>`
  margin: 32px auto 0;
  width: 100%;
  max-width: 90vw;
  h1 {
    font-family: 'Open Sans';
    font-weight: 600;
    color: #f28759;
    margin-top: -45px;
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
  }
  p {
    font-family: 'Open Sans';
    font-weight: 400;
    color: #333333;
    margin-bottom: 2px;
    margin-left: 10px;
    margin-right: 10px;
    text-align: center;
  }
  button {
    margin-bottom: 32px;
    background-color: #f28759;
    transition: background-color 0.2s;
    &:hover {
      background-color: ${shade(0.2, '#f28759')};
    }
  }
  a {
    margin-bottom: 16px;
    text-decoration: none;
    color: #f28759;
    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, '#f28759')};
    }
  }
`;

export const Detalhes = styled.div`
  margin-bottom: 16px;
  margin-top: 55px;

  a {
    display: block;
    text-align: center;

    margin-bottom: 16px;
    margin-top: 16px;
    text-decoration: none;
    color: #f28759;
    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, '#f28759')};
    }
  }

  img {
    /* height: 300px; */
    width: 80vw;
    object-fit: cover;
    box-shadow: 0px 0px 3px 0px #cdcdcd;
    border-radius: 8px;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 16px;
    margin-bottom: 16px;
  }

  h3 {
    display: block;
    text-align: center;
    margin-bottom: 16px;
    margin-top: 16px;
    color: #f28759;
  }
`;
