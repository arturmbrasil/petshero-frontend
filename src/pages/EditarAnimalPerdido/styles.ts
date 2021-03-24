import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div``;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -50px auto 0;
  width: 100%;
  form {
    margin: 80px 0;
    width: 360px;
    text-align: center;
    display: flex;
    flex-direction: column;
    h1 {
      font-family: 'Open Sans';
      font-weight: 600;
      color: #f28759;
      text-align: center;
      margin-left: 10px;
      margin-right: 10px;
      font-size: 24px;
    }
    h3 {
      color: #f28759;
      font-weight: 600;
      text-align: start;
      margin-left: 4px;
      margin-top: 16px;
      margin-bottom: 8px;
    }
    a {
      color: #f4ede8;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#f4ede8')};
      }
    }
    button {
      background-color: #f28759;
      transition: background-color 0.2s;
      &:hover {
        background-color: ${shade(0.2, '#f28759')};
      }
    }
  }
`;

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  position: relative;
  align-self: center;
  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
    object-fit: cover;
  }
  label {
    position: absolute;
    width: 48px;
    height: 48px;
    background: #f28759;
    border-radius: 50%;
    right: 0;
    bottom: 0;
    border: 0;
    cursor: pointer;
    transition: background-color 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
    input {
      display: none;
    }
    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }
    &:hover {
      background: ${shade(0.2, '#f28759')};
    }
  }
`;
