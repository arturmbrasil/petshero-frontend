import React, { useCallback, useEffect, useState } from 'react';

import { Container } from './styles';

import NavBar from '../../components/NavBar';

import Header from '../../components/Header';

import api from '../../services/api';

const Home: React.FC = () => {
  return (
    <Container>
      <NavBar />

      <div id="page-wrap">
        <Header />
      </div>
    </Container>
  );
};

export default Home;
