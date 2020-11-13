import React from 'react';
import { IconBaseProps } from 'react-icons';

import { Container } from './styles';

interface CardProps {
  color: 'blue' | 'red' | 'yellow' | 'orange' | 'purple' | 'green';
  title: string;
  description: string;
  icon: React.ComponentType<IconBaseProps>;
  width?: string;
}

const Card: React.FC<CardProps> = ({
  color,
  title,
  description,
  icon: Icon,
  width,
}) => {
  return (
    <Container color={color} width={width}>
      <h1>{title}</h1>
      <p>
        {Icon && <Icon />}
        {description}
      </p>
    </Container>
  );
};

export default Card;
