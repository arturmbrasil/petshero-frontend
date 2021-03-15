import React, { useCallback, useEffect, useRef, useState } from 'react';

import { useHistory } from 'react-router-dom';
// @ts-ignore
import Carousel from 'react-elastic-carousel';
import { isBoolean } from 'util';
import {
  Container,
  Content,
  ListaAnimaisPerdidos,
  AnimalPerdido,
} from './styles';

import NavBar from '../../components/NavBar';

import Header from '../../components/Header';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import dogImg from '../../assets/dog.jpg';

interface LostAnimal {
  id: string;
  name: string;
  description: string;
  avatar_url: string | null;
}

const Home: React.FC = () => {
  const { user, updateUser } = useAuth();
  const history = useHistory();
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile: boolean = width <= 900;
  const carouselRef = useRef(null);

  const [lostAnimals, setLostAnimals] = useState<LostAnimal[]>([]);

  const handleClickAnimalPerdido = useCallback(
    (animal: LostAnimal) => {
      history.push(`/ong/${animal.id}`);
    },
    [history],
  );

  const handleWindowSizeChange = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    api
      .get(`/lost-animals`, {
        params: {
          found: false,
        },
      })
      .then((response) => {
        if (response.data.length > 9) {
          const arrayNovo = response.data.slice(0, 9);
          setLostAnimals(arrayNovo);
        } else setLostAnimals(response.data);
      });

    window.addEventListener('resize', handleWindowSizeChange);
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <NavBar />
      <div id="page-wrap">
        <Header />

        <Content>
          <h1>
            Animais Perdidos{' '}
            <span aria-label="sad-cat" role="img">
              😿
            </span>
          </h1>
          <p>Você viu algum desses animais? Pode nos ajudar a encontrá-los?</p>
          <Carousel
            ref={carouselRef}
            showArrows={false}
            isRTL={false}
            itemsToShow={isMobile ? 1 : 3}
            disableArrowsOnEnd={false}
          >
            {lostAnimals.map((animal) => (
              <AnimalPerdido
                key={animal.id}
                onClick={() => handleClickAnimalPerdido(animal)}
              >
                <img src={animal.avatar_url || dogImg} alt={animal.name} />
                <h3>{animal.name}</h3>
                <h5>{animal.description}</h5>
              </AnimalPerdido>
            ))}
          </Carousel>
          <Button
            type="button"
            onClick={() => {
              console.log(isMobile);
            }}
          >
            VER TODOS
          </Button>
        </Content>
      </div>
    </Container>
  );
};

export default Home;
