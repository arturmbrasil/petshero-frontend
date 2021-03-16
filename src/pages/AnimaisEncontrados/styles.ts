import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface InfoProps {
  isFocused: boolean;
}
export const Container = styled.div``;

export const Content = styled.div<InfoProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 32px auto 0;
  width: 100%;
  max-width: 90vw;
  h1 {
    font-family: 'Open Sans';
    font-weight: 600;
    color: #f28759;
    /* margin-bottom: 24px; */
    text-align: center;
    margin-left: 10px;
    margin-right: 10px;
  }
  p {
    font-family: 'Open Sans';
    font-weight: 400;
    color: #333333;
    margin-bottom: 24px;
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
  .animaisEncontrados {
    margin-bottom: 16px;
    text-decoration: none;
    color: #f28759;
    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, '#f28759')};
    }
  }
  .inputDiv {
    margin-top: 16px;
    margin-bottom: 16px;
    background-color: #fbfbfb;
    /* filter: drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.25)); */
    border-radius: 8px;
    padding: 16px;
    min-width: 350px;
    display: flex;
    align-items: center;
    border: 2px solid #aaa;
    color: #999999;
    ${(props) =>
      props.isFocused &&
      css`
        border: 2px solid #2c73e9;
        color: #2c73e9;
      `}
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
  }
  /* form {
    margin: 80px 0;
    width: 360px;
    text-align: center;
    display: flex;
    flex-direction: column;
    h1 {
      font-family: 'Open Sans';
      font-weight: 600;
      color: #f28759;
      margin-bottom: 24px;
      font-size: 20px;
      text-align: center;
    }
    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: ${shade(
    0.2,
    '#f4ede8',
  )};
      }
    }
    button {
      background-color: #f28759;
      transition: background-color 0.2s;
      &:hover {
        background-color: ${shade(
    0.2,
    '#f28759',
  )};
      }
    }
  } */
`;

export const ListaAnimaisEncontrados = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const AnimalEncontrado = styled.div`
  cursor: pointer;
  padding: 10px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 0px 8px 0px #cdcdcd;
  margin: 8px;

  img {
    height: 200px;
    width: 200px;
    object-fit: cover;
    box-shadow: 0px 0px 3px 0px #cdcdcd;
    border-radius: 8px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  h3 {
    color: #f28759;
  }

  h5 {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: #333333;
  }
`;
