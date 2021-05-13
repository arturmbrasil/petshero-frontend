import React, { useCallback, useEffect, useState } from 'react';
import { FiArrowLeftCircle, FiInfo, FiMapPin, FiSearch } from 'react-icons/fi';
import { format, parseISO } from 'date-fns';

import {
  Link,
  RouteComponentProps,
  useHistory,
  withRouter,
} from 'react-router-dom';
import { MenuItem, Select } from '@material-ui/core';
import {
  Container,
  Content,
  Detalhes,
  Cabecalho,
  DetalheFlex,
  ContentAnimal,
  ListaMeusAnimais,
  Animal,
  Divisor,
  Campanha,
} from './styles';
import logoImg from '../../assets/logo.png';

import NavBar from '../../components/NavBar';

import Header from '../../components/Header';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import dogImg from '../../assets/default.png';
import ScrollToTop from '../../components/ScrollToTop';

interface Animal {
  id: string;
  name: string;
  age: string;
  gender: string;
  size: string;
  species: string;
  breed: string;
  description: string;
  adopted: boolean;
  avatar_url: string | null;
  ong: { name: string };
}

interface CampanhaInterface {
  id: string;
  ong_id: string;
  animal_id: string;
  target_value: string;
  received_value: string;
  title: string;
  description: string;
  activated: boolean;
  ong: {
    id: string;
    name: string;
    whatsapp: string;
    email: string;
    pix: string;
    avatar_url: string | null;
  };
  ongAnimal: {
    id: string;
    name: string;
    age: string;
    gender: string;
    size: string;
    species: string;
    breed: string;
    adopted: boolean;
    description: string;
    avatar_url: string | null;
  };
  avatar_url: string | null;
}

interface Ongs {
  id: string;
  name: string;
  email: string;
  address_id: string;
  whatsapp: string;
  pix: string;
  avatar_url: string | null;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    uf: string;
    cep: string;
  };
  updated_at: string;
  linkWhats: string;
  linkMaps: string;
  mailTo: string;
}

type DetailParams = {
  id: string;
};
type DetailProps = RouteComponentProps<DetailParams>;

const DetalheCampanha: React.FC<DetailProps> = ({ match }) => {
  const { user, updateUser } = useAuth();
  const [isFocused, setIsFocused] = useState(false);

  const history = useHistory();

  const [ong, setOng] = useState<Ongs | null>({} as Ongs);
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [campanha, setCampanha] = useState<CampanhaInterface | null>(
    {} as CampanhaInterface,
  );

  const handleClickAnimal = useCallback(
    (animal: Animal) => {
      history.push(`/adocao/${animal.id}`);
    },
    [history],
  );

  const handleClickCampanha = useCallback(
    (camp: CampanhaInterface) => {
      history.push(`/campanhas/${camp.id}`);
    },
    [history],
  );

  useEffect(() => {
    api
      .get(`/campaigns`, {
        params: { id: match?.params?.id },
      })
      .then((response) => {
        setCampanha(response.data[0]);
      })
      .catch((err) => {
        setCampanha(null);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <ScrollToTop />
      <NavBar />
      <div id="page-wrap">
        <Header />

        <Content>
          {campanha ? (
            <Detalhes>
              <Cabecalho>
                {campanha.avatar_url ? (
                  <img src={campanha.avatar_url} alt={campanha.title} />
                ) : (
                  <img src={dogImg} alt={campanha.title} />
                )}
                <DetalheFlex>
                  <h1>Conheça a campanha!</h1>

                  <h2>{campanha.title}</h2>
                  <p
                    style={{
                      marginBottom: '8px',
                    }}
                  >
                    {campanha.description}
                  </p>
                  <p>
                    Meta: R$
                    {campanha.target_value}
                  </p>
                  <p>
                    Arrecadado: R$
                    {campanha.received_value}
                  </p>
                  {campanha.ong && (
                    <p>
                      <Link
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginTop: '8px',
                        }}
                        to={`/ongs/${campanha.ong.id}`}
                      >
                        <FiInfo
                          color="#f28759"
                          style={{ marginRight: '4px' }}
                        />
                        Essa campanha foi criada por: {campanha.ong.name}
                      </Link>
                    </p>
                  )}
                </DetalheFlex>
              </Cabecalho>

              {campanha.ongAnimal && (
                <>
                  <Cabecalho style={{ marginTop: '48px' }}>
                    {campanha.ongAnimal.avatar_url ? (
                      <img
                        src={campanha.ongAnimal.avatar_url}
                        alt={campanha.ongAnimal.name}
                      />
                    ) : (
                      <img src={dogImg} alt={campanha.ongAnimal.name} />
                    )}
                    <DetalheFlex>
                      <h1>Essa campanha foi feita especialmente para: </h1>
                      <h2>{campanha.ongAnimal.name}</h2>
                      <p>{campanha.ongAnimal.description}</p>

                      <p>
                        <Link
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: '8px',
                          }}
                          to={`/adocao/${campanha.ongAnimal.id}`}
                        >
                          <FiInfo
                            color="#f28759"
                            style={{ marginRight: '4px' }}
                          />
                          Ver mais sobre {campanha.ongAnimal.name}
                        </Link>
                      </p>
                    </DetalheFlex>
                  </Cabecalho>
                </>
              )}

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  marginTop: '24px',
                }}
              >
                <h1 style={{ fontSize: '24px' }}>
                  Quer nos ajudar nessa campanha? <br />
                  Nossa chave PIX é: <br />
                  {campanha?.ong?.pix}
                </h1>
              </div>
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

export default withRouter(DetalheCampanha);
