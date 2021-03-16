import React, { useCallback, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
// @ts-ignore
// import Carousel from 'react-elastic-carousel';
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

  const [lostAnimals, setLostAnimals] = useState<LostAnimal[]>([]);

  // const breakPoints = [
  //   { width: 1, itemsToShow: 1 },
  //   { width: 750, itemsToShow: 2 },
  //   { width: 1000, itemsToShow: 3 },
  //   { width: 1500, itemsToShow: 4 },
  //   { width: 2000, itemsToShow: 5 },
  // ];

  const handleClickAnimalPerdido = useCallback(
    (animal: LostAnimal) => {
      history.push(`/animais-perdidos/${animal.id}`);
    },
    [history],
  );

  useEffect(() => {
    api
      .get(`/lost-animals`, {
        params: {
          found: false,
        },
      })
      .then((response) => {
        if (response.data.length > 5) {
          const arrayNovo = response.data.slice(0, 5);
          setLostAnimals(arrayNovo);
        } else setLostAnimals(response.data);
      });
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
          {/* <Carousel
            breakPoints={breakPoints}
            showArrows={false}
            isRTL={false}
            disableArrowsOnEnd={false}
          > */}
          <ListaAnimaisPerdidos>
            {lostAnimals.map((animal, index) => (
              <AnimalPerdido
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                onClick={() => handleClickAnimalPerdido(animal)}
              >
                <img src={animal.avatar_url || dogImg} alt={animal.name} />
                <h3>{animal.name}</h3>
                <h5>{animal.description}</h5>
              </AnimalPerdido>
            ))}
          </ListaAnimaisPerdidos>
          {/* </Carousel> */}
          <Button
            type="button"
            onClick={() => {
              history.push(`/animais-perdidos`);
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
