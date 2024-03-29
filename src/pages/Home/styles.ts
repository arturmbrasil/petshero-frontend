import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Content = styled.div`
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
  a {
    font-weight: 600;
    font-size: 20px;
    margin-bottom: 32px;
    margin-top: 16px;
    text-decoration: none;
    color: #f28759;
    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, '#f28759')};
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

export const Lista = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Card = styled.div`
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
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  h5 {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: #333333;
  }

  h6 {
    max-width: 200px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: #bbb;
    margin-top: 4px;
  }
`;

export const Divisor = styled.div`
  display: flex;
  border: solid 1px #f28759;
  width: 100vw;
  margin-bottom: 32px;
  opacity: 0.2;
`;
