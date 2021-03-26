import React, { useCallback, useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
// @ts-ignore
// import Carousel from 'react-elastic-carousel';
import { Container, Content, Lista, Card, Divisor } from './styles';

import NavBar from '../../components/NavBar';

import Header from '../../components/Header';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import dogImg from '../../assets/default.png';

interface LostAnimal {
  id: string;
  name: string;
  description: string;
  avatar_url: string | null;
}

interface AdoptionAnimal {
  id: string;
  name: string;
  description: string;
  avatar_url: string | null;
  ong: { name: string };
}

const Home: React.FC = () => {
  const { user, updateUser } = useAuth();
  const history = useHistory();

  const [lostAnimals, setLostAnimals] = useState<LostAnimal[]>([]);
  const [adoptionAnimals, setAdoptionAnimals] = useState<AdoptionAnimal[]>([]);

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

  const handleClickAnimalAdocao = useCallback(
    (animal: AdoptionAnimal) => {
      history.push(`/adocao/${animal.id}`);
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

    api
      .get(`/ongs/animals`, {
        params: {
          adopted: false,
        },
      })
      .then((response) => {
        if (response.data.length > 5) {
          const arrayNovo = response.data.slice(0, 5);
          setAdoptionAnimals(arrayNovo);
        } else setAdoptionAnimals(response.data);
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

          {lostAnimals.length === 0 ? (
            <h1>Ainda não temos nenhum animal perdido cadastrado...</h1>
          ) : (
            <>
              <p>
                Você viu algum desses animais? Pode nos ajudar a encontrá-los?
              </p>
              <Lista>
                {lostAnimals.map((animal, index) => (
                  <Card
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    onClick={() => handleClickAnimalPerdido(animal)}
                  >
                    <img src={animal.avatar_url || dogImg} alt={animal.name} />
                    <h3>{animal.name}</h3>
                    <h5>{animal.description}</h5>
                  </Card>
                ))}
              </Lista>
              <Link to="animais-perdidos">VER TODOS</Link>
            </>
          )}

          <Divisor />

          <h1>
            Adote!{' '}
            <span aria-label="love-cat" role="img">
              😻
            </span>
          </h1>

          {adoptionAnimals.length === 0 ? (
            <h1>Ainda não temos nenhum animal para adoção cadastrado...</h1>
          ) : (
            <>
              <p>
                Todos esses animais estão para adoção! Nos ajude a encontrar um
                lar para eles!
              </p>
              <Lista>
                {adoptionAnimals.map((animal, index) => (
                  <Card
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    onClick={() => handleClickAnimalAdocao(animal)}
                  >
                    <img src={animal.avatar_url || dogImg} alt={animal.name} />
                    <h3>{animal.name}</h3>
                    <h5>{animal.description}</h5>
                    <h6>{animal.ong.name}</h6>
                  </Card>
                ))}
              </Lista>
              <Link to="adocao">VER TODOS</Link>
            </>
          )}
          <Divisor />
        </Content>
      </div>
    </Container>
  );
};

export default Home;
