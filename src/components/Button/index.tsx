import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'blue' | 'red' | 'yellow' | 'orange' | 'purple' | 'green';
}

const Button: React.FC<ButtonProps> = ({
  children,
  color = 'blue',
  ...rest
}) => (
  <Container type="button" color={color} {...rest}>
    {children}
  </Container>
);

export default Button;
