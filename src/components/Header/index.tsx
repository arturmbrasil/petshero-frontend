import React from 'react';
import { useAuth } from '../../hooks/auth';

import { Container, Profile } from './styles';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Profile>
        <span>
          Bem-vindo, <strong>{user.name}</strong>
        </span>
      </Profile>
    </Container>
  );
};

export default Header;
