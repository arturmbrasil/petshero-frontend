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

const Home: React.FC = () => {
  const { user, updateUser } = useAuth();
  const history = useHistory();
  const [width, setWidth] = useState<number>(window.innerWidth);
  const isMobile: boolean = width <= 900;
  const carouselRef = useRef(null);

  const handleClickAnimalPerdido = useCallback(
    (id: number) => {
      history.push(`/ong/${id}`);
    },
    [history],
  );

  const handleWindowSizeChange = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
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
            <AnimalPerdido onClick={() => handleClickAnimalPerdido(0)}>
              <img src={dogImg} alt="Animal perdido" />
              <h3>Bolt</h3>
              <h5>
                O Supercão! Essa é a descrição do animal perdido. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Ullam distinctio
                eos atque itaque? Quam fuga officia dolores nostrum maxime
                repudiandae id aliquid dolor numquam quia eveniet, explicabo
                esse, earum pariatur?
              </h5>
            </AnimalPerdido>
            <AnimalPerdido onClick={() => handleClickAnimalPerdido(0)}>
              <img src={dogImg} alt="Animal perdido" />
              <h3>Bolt</h3>
              <h5>
                O Supercão! Essa é a descrição do animal perdido. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Ullam distinctio
                eos atque itaque? Quam fuga officia dolores nostrum maxime
                repudiandae id aliquid dolor numquam quia eveniet, explicabo
                esse, earum pariatur?
              </h5>
            </AnimalPerdido>
            <AnimalPerdido onClick={() => handleClickAnimalPerdido(0)}>
              <img src={dogImg} alt="Animal perdido" />
              <h3>Bolt</h3>
              <h5>
                O Supercão! Essa é a descrição do animal perdido. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Ullam distinctio
                eos atque itaque? Quam fuga officia dolores nostrum maxime
                repudiandae id aliquid dolor numquam quia eveniet, explicabo
                esse, earum pariatur?
              </h5>
            </AnimalPerdido>
            <AnimalPerdido onClick={() => handleClickAnimalPerdido(0)}>
              <img src={dogImg} alt="Animal perdido" />
              <h3>Bolt</h3>
              <h5>
                O Supercão! Essa é a descrição do animal perdido. Lorem ipsum
                dolor sit amet consectetur adipisicing elit. Ullam distinctio
                eos atque itaque? Quam fuga officia dolores nostrum maxime
                repudiandae id aliquid dolor numquam quia eveniet, explicabo
                esse, earum pariatur?
              </h5>
            </AnimalPerdido>
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
