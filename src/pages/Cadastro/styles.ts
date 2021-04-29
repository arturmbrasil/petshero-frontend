import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

// import signUpBackground from '../../assets/sign-up-background.png';
import fundoImg from '../../assets/fundo2.png';
import logoImg from '../../assets/logo.png';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: stretch;

  flex: 1;
  background: url(${fundoImg}) no-repeat top;
  background-size: auto;

  img {
    -moz-transform: scaleX(-1);
    -o-transform: scaleX(-1);
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
    filter: FlipH;
    -ms-filter: 'FlipH';
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 700px;
`;

const appearFromRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const AnimationContainer = styled.div`
  display: flex;
  margin-top: -100px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: ${appearFromRight} 1s;
  form {
    margin: 10px 0 20px 0;
    width: 360px;
    text-align: center;
    div {
      margin-bottom: 8px;
    }
    h1 {
      margin-bottom: 24px;
      font-family: 'Open Sans';
      font-weight: 800;
      font-size: 54px;
      line-height: 63px;

      color: #f28759;
      text-shadow: -4px 4px 7px rgb(242 135 89 / 50%);
    }
    .checkbox {
      color: #f28759;
      font-size: 18px;
      font-weight: 700;

      input[type='checkbox'] {
        margin-right: 8px;
        transform: scale(1.5);
      }
    }
    a {
      color: #fff;
      display: block;
      margin-top: 24px;
      text-decoration: none;
      transition: color 0.2s;
      &:hover {
        color: ${shade(0.2, '#fff')};
      }
    }
  }
  > a {
    font-weight: 700;

    color: #f28759;
    display: block;
    margin-top: 12px;
    text-decoration: none;
    transition: color 0.2s;
    display: flex;
    align-items: center;
    text-shadow: 0 0 5px rgb(242 135 89 / 50%);
    &:hover {
      color: ${shade(0.2, '#f28759')};
    }
    svg {
      margin-right: 16px;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${logoImg}) no-repeat center;
  background-size: auto;
`;
