import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface ButtonProps {
  color: 'blue' | 'red' | 'yellow' | 'orange' | 'purple' | 'green';
}

const colorVariations = {
  blue: css`
    background: #2c73e9;

    &:hover {
      background: ${shade(0.2, '#2c73e9')};
    }
  `,
  red: css`
    background: #e9482c;

    &:hover {
      background: ${shade(0.2, '#e9482c')};
    }
  `,
  yellow: css`
    background: #e9a72c;

    &:hover {
      background: ${shade(0.2, '#e9a72c')};
    }
  `,
  orange: css`
    background: #f28759;

    &:hover {
      background: ${shade(0.2, '#F28759')};
    }
  `,
  purple: css`
    background: #652ce9;

    &:hover {
      background: ${shade(0.2, '#652ce9')};
    }
  `,
  green: css`
    background: #2ce99d;

    &:hover {
      background: ${shade(0.2, '#2ce99d')};
    }
  `,
};

export const Container = styled.button<ButtonProps>`
  border: 0;
  border-radius: 8px;
  padding: 0 16px;
  color: #fff;
  font-weight: 600;
  font-size: 24;
  width: 100%;
  margin-top: 16px;
  transition: background-color 0.2s;
  height: 54px;

  ${(props) => colorVariations[props.color || 'blue']}
`;
