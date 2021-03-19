import React, { useCallback, useEffect, useState } from 'react';
import { FiArrowLeftCircle } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';

import {
  Link,
  RouteComponentProps,
  useHistory,
  withRouter,
} from 'react-router-dom';
import { MenuItem, Select } from '@material-ui/core';
import { Container, Content, Detalhes } from './styles';

import NavBar from '../../components/NavBar';

import Header from '../../components/Header';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import dogImg from '../../assets/default.png';
import ScrollToTop from '../../components/ScrollToTop';

interface LostAnimal {
  id: string;
  name: string;
  age: string;
  gender: string;
  size: string;
  species: string;
  breed: string;
  description: string;
  found: boolean;
  updated_at: string;
  avatar_url: string | null;
  owner: {
    name: string;
    whatsapp: string;
  };
  linkWhats: string;
}

type DetailParams = {
  id: string;
};
type DetailProps = RouteComponentProps<DetailParams>;

const DetalheAnimalPerdido: React.FC<DetailProps> = ({ match }) => {
  const { user, updateUser } = useAuth();
  const [pesquisa, setPesquisa] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filtro, setFiltro] = React.useState('Nome');

  const history = useHistory();

  const [lostAnimal, setLostAnimal] = useState<LostAnimal | null>(
    {} as LostAnimal,
  );

  const handleClickAnimalPerdido = useCallback(
    (animal: LostAnimal) => {
      history.push(`/animais-perdidos/${animal.id}`);
    },
    [history],
  );

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handlePesquisa = useCallback((e) => {
    console.log(e.target.value);
    setPesquisa(e.target.value);
  }, []);

  const handleChangeFiltro = useCallback((event) => {
    setFiltro(event.target.value);
  }, []);

  useEffect(() => {
    api
      .get(`/lost-animals`, { params: { id: match?.params?.id } })
      .then((response) => {
        if (response.data[0].updated_at) {
          response.data[0].updated_at = format(
            parseISO(response.data[0].updated_at),
            'dd/MM/yyyy HH:mm',
          );
        }
        response.data[0].linkWhats = `https://api.whatsapp.com/send?phone=${response.data[0].owner.whatsapp}&text=Ol%C3%A1%20${response.data[0].owner.name}!%20Vi%20que%20o(a)%20${response.data[0].name}%20est%C3%A1%20perdido(a)%2C%20acho%20que%20posso%20te%20ajudar!`;
        setLostAnimal(response.data[0]);
      })
      .catch((err) => {
        setLostAnimal(null);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ScrollToTop />
      <NavBar />
      <div id="page-wrap">
        <Header />

        <Content isFocused={isFocused}>
          <Link to="/animais-perdidos">
            <FiArrowLeftCircle size={32} />
          </Link>
          {lostAnimal ? (
            <Detalhes>
              <h1>{lostAnimal.name}</h1>
              <p>Espécie: {lostAnimal.species}</p>
              <p>Raça: {lostAnimal.breed}</p>
              <p>Sexo: {lostAnimal.gender}</p>
              <p>Porte: {lostAnimal.size}</p>
              <p>Idade: {lostAnimal.age}</p>
              <p>Descrição: {lostAnimal.description}</p>
              {!lostAnimal.found ? (
                <a target="_blank" rel="noreferrer" href={lostAnimal.linkWhats}>
                  Acha que encontrou esse animal? Clique aqui para entrar em
                  contato!
                </a>
              ) : (
                <h3>Esse animal já foi encontrado!</h3>
              )}
              <img
                src={lostAnimal.avatar_url || dogImg}
                alt={lostAnimal.name}
              />
              <p>Última atualização: {lostAnimal.updated_at}</p>
            </Detalhes>
          ) : (
            <>
              <h1>Ops, ocorreu algum erro aqui...</h1>
            </>
          )}
        </Content>
      </div>
    </Container>
  );
};

export default withRouter(DetalheAnimalPerdido);
