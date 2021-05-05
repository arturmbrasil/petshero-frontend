import styled, { css } from 'styled-components';
import { shade, lighten } from 'polished';

interface InfoProps {
  isFocused: boolean;
}
export const Container = styled.div``;

export const Content = styled.div`
  margin: 32px auto 0;
  width: 100%;
  max-width: 90vw;
  h1 {
    font-family: 'Open Sans';
    font-weight: 600;
    color: #f28759;
    margin-bottom: 8px;
  }
  h2 {
    font-family: 'Open Sans';
    font-weight: 600;
    color: ${lighten(0.01, '#f28759')};
    margin-bottom: 8px;
  }
  p {
    font-family: 'Open Sans';
    font-weight: 400;
    color: #333333;
  }
  a {
    text-align: center;
    text-decoration: none;
    color: #f28759;
    transition: color 0.2s;
    &:hover {
      color: ${shade(0.2, '#f28759')};
    }
  }
`;

export const Cabecalho = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const DetalheFlex = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  @media (max-width: 480px) {
    width: 100%;
    align-items: center;
    svg {
      display: none;
    }
  }
`;

export const Detalhes = styled.div`
  img {
    width: 186px;
    height: 186px;
    border-radius: 50%;
    border: 1px solid #f28759;
    margin-right: 24px;
  }
  @media (max-width: 480px) {
    width: 100%;

    img {
      height: auto;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 16px;
    }
  }
`;

export const ContentAnimal = styled.div<InfoProps>`
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
    max-width: 350px;
    margin-top: 0px;
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
`;

export const ListaMeusAnimais = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Animal = styled.div`
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

export const Divisor = styled.div`
  display: flex;
  border: solid 1px #f28759;
  width: 100%;
  /* margin-bottom: 32px; */
  opacity: 0.2;
`;

export const Campanha = styled.div`
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
    -webkit-line-clamp: 2;
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
