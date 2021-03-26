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

interface Animal {
  id: string;
  ong_id: string;
  name: string;
  age: string;
  gender: string;
  size: string;
  species: string;
  breed: string;
  description: string;
  adopted: boolean;
  updated_at: string;
  avatar_url: string | null;
  ong: {
    name: string;
    whatsapp: string;
  };
  linkWhats: string;
  mailTo: string;
}

type DetailParams = {
  id: string;
};
type DetailProps = RouteComponentProps<DetailParams>;

const DetalheAdocao: React.FC<DetailProps> = ({ match }) => {
  const { user, updateUser } = useAuth();
  const [pesquisa, setPesquisa] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filtro, setFiltro] = React.useState('Nome');

  const history = useHistory();

  const [animal, setAnimal] = useState<Animal | null>({} as Animal);

  useEffect(() => {
    api
      .get(`/ongs/animals`, { params: { id: match?.params?.id } })
      .then((response) => {
        if (response.data[0].updated_at) {
          response.data[0].updated_at = format(
            parseISO(response.data[0].updated_at),
            'dd/MM/yyyy HH:mm',
          );
        }
        response.data[0].linkWhats = `https://api.whatsapp.com/send?phone=${response.data[0].ong.whatsapp}&text=Ol%C3%A1%20${response.data[0].ong.name}!%20Vi%20que%20o(a)%20${response.data[0].name}%20est%C3%A1%20para%20ado%C3%A7%C3%A3o!`;
        response.data[0].mailTo = `mailto:${response.data[0].ong.email}`;
        setAnimal(response.data[0]);
        console.log(response.data[0]);
      })
      .catch((err) => {
        setAnimal(null);
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
          {/* <Link to="/animais-perdidos">
            <FiArrowLeftCircle size={32} />
          </Link> */}
          {animal ? (
            <Detalhes>
              <h1>{animal.name}</h1>
              <p style={{ marginBottom: '16px', color: '#777' }}>
                Ver página da ONG:{' '}
                <Link
                  style={{ display: 'inline', color: '#f09f7d' }}
                  to={`ongs/${animal.ong_id}`}
                >
                  {animal.ong?.name}
                </Link>
              </p>
              <p>Espécie: {animal.species}</p>
              <p>Raça: {animal.breed}</p>
              <p>Sexo: {animal.gender}</p>
              <p>Porte: {animal.size}</p>
              <p>Idade: {animal.age}</p>
              <p>Descrição: {animal.description}</p>

              {!animal.adopted ? (
                <>
                  <a target="_blank" rel="noreferrer" href={animal.linkWhats}>
                    Quero entrar em contato com a ONG via WhatsApp!
                  </a>
                  <a target="_blank" rel="noreferrer" href={animal.mailTo}>
                    Quero entrar em contato com a ONG via Email!
                  </a>
                </>
              ) : (
                <h3>
                  Esse animal já foi adotado e já está em um lar recebendo muito
                  carinho!
                </h3>
              )}
              <img src={animal.avatar_url || dogImg} alt={animal.name} />
              <p>Última atualização: {animal.updated_at}</p>
            </Detalhes>
          ) : (
            <>
              <h1 style={{ marginTop: '0' }}>
                Ops, ocorreu algum erro aqui...
              </h1>
            </>
          )}
        </Content>
      </div>
    </Container>
  );
};

export default withRouter(DetalheAdocao);
