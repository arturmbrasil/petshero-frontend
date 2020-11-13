import styled, { css } from 'styled-components';

interface CardProps {
  color: 'blue' | 'red' | 'yellow' | 'orange' | 'purple' | 'green';
  width?: string;
}

const backgroundVariations = {
  blue: css`
    background-color: #2c73e9;
  `,
  red: css`
    background-color: #e9482c;
  `,
  yellow: css`
    background-color: #e9a72c;
  `,
  orange: css`
    background-color: #e9782c;
  `,
  purple: css`
    background-color: #652ce9;
  `,
  green: css`
    background-color: #2ce99d;
  `,
};

const colorVariations = {
  blue: css`
    color: #2c73e9;
  `,
  red: css`
    color: #e9482c;
  `,
  yellow: css`
    color: #e9a72c;
  `,
  orange: css`
    color: #e9782c;
  `,
  purple: css`
    color: #652ce9;
  `,
  green: css`
    color: #2ce99d;
  `,
};

export const Container = styled.div<CardProps>`
  /* width: 362px; */
  width: ${(props) => (props.width ? props.width : '362px')};

  height: 116px;
  box-sizing: border-box;
  box-shadow: 0px 7px 38px rgba(0, 0, 0, 0.15);
  border-radius: 8px 8px 8px 8px;

  margin-left: 19px;
  margin-right: 19px;

  margin-top: 0px;

  background-color: #fafafa;

  h1 {
    ${(props) => backgroundVariations[props.color || 'blue']}

    border-radius: 8px 8px 0px 0px;

    font-family: 'Open Sans';
    font-weight: 600;
    font-size: 24px;
    line-height: 20px;

    display: flex;
    place-content: center;

    padding: 16px;
    letter-spacing: 0.25px;

    color: #ffffff;
  }

  p {
    background-color: #fafafa;

    display: flex;
    place-content: center;
    align-items: center;

    margin-top: 20px;

    font-family: 'Open Sans';
    font-weight: 400;
    font-size: 22px;
    line-height: 20px;

    letter-spacing: 0.25px;

    color: #000000;

    svg {
      margin-right: 16px;

      ${(props) => colorVariations[props.color || 'blue']}
    }
  }
`;
