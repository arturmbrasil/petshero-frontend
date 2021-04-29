import React, { useCallback, useEffect, useState } from 'react';
import { FiArrowLeftCircle, FiMapPin, FiSearch } from 'react-icons/fi';
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

interface Ongs {
  id: string;
  name: string;
  email: string;
  address_id: string;
  whatsapp: string;
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

const DetalheOng: React.FC<DetailProps> = ({ match }) => {
  const { user, updateUser } = useAuth();
  const [pesquisa, setPesquisa] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filtro, setFiltro] = React.useState('Nome');

  const history = useHistory();

  const [ong, setOng] = useState<Ongs | null>({} as Ongs);
  const [animais, setAnimais] = useState<Animal[]>([]);

  const handleClickAnimal = useCallback(
    (animal: Animal) => {
      history.push(`/adocao/${animal.id}`);
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
      .get(`/ongs`, { params: { id: match?.params?.id } })
      .then((response) => {
        if (response.data[0].updated_at) {
          response.data[0].updated_at = format(
            parseISO(response.data[0].updated_at),
            'dd/MM/yyyy HH:mm',
          );
        }
        response.data[0].linkWhats = `https://api.whatsapp.com/send?phone=${response.data[0].whatsapp}&text=Ol%C3%A1%20${response.data[0].name}!`;
        response.data[0].mailTo = `mailto:${response.data[0].email}`;
        if (response.data[0].address) {
          response.data[0].linkMaps = `https://www.google.com.br/maps/place/${response.data[0].address.street},${response.data[0].address.number},${response.data[0].address.neighborhood},${response.data[0].address.city}-${response.data[0].address.uf}-${response.data[0].address.cep}`;
        }

        setOng(response.data[0]);
      })
      .catch((err) => {
        setOng(null);
      });

    api
      .get(`/ongs/animals`, { params: { ong_id: match?.params?.id } })
      .then((response) => {
        if (response.data.length > 5) {
          const arrayNovo = response.data.slice(0, 5);
          setAnimais(arrayNovo);
        } else setAnimais(response.data);
      })
      .catch((err) => {
        setAnimais([]);
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
          {ong ? (
            <Detalhes>
              <Cabecalho>
                {ong.avatar_url ? (
                  <img src={ong.avatar_url} alt={ong.name} />
                ) : (
                  <img src={logoImg} alt={ong.name} />
                )}
                <DetalheFlex>
                  <h1>{ong.name}</h1>
                  <p>
                    WhatsApp:{' '}
                    <a target="_blank" rel="noreferrer" href={ong.linkWhats}>
                      {ong.whatsapp}
                    </a>
                  </p>
                  <p>
                    Email:{' '}
                    <a target="_blank" rel="noreferrer" href={ong.mailTo}>
                      {ong.email}
                    </a>
                  </p>
                  {ong.address && (
                    <p>
                      <a
                        target="_blank"
                        rel="noreferrer"
                        href={ong.linkMaps}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginTop: '8px',
                        }}
                      >
                        <FiMapPin
                          color="#f28759"
                          style={{ marginRight: '4px' }}
                        />
                        {ong.address.street}, {ong.address.number},{' '}
                        {ong.address.neighborhood}, {ong.address.city} -{' '}
                        {ong.address.uf} - CEP: {ong.address.cep}
                      </a>
                    </p>
                  )}
                </DetalheFlex>
              </Cabecalho>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center',
                  marginTop: '24px',
                }}
              >
                <h1 style={{ fontSize: '24px' }}>
                  Nossa chave PIX é: <br />
                  pix_aqui
                </h1>
              </div>

              {animais.length !== 0 && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    textAlign: 'center',
                    marginTop: '24px',
                  }}
                >
                  <Divisor />
                  <ContentAnimal isFocused={isFocused}>
                    <h1>Animais da Ong (últimas atualizações)</h1>
                    {/* <p>Você viu algum desses animais? Pode nos ajudar a encontrá-los?</p> */}

                    <ListaMeusAnimais>
                      {animais
                        .filter((animalFiltrado) => {
                          if (filtro === 'Nome') {
                            if (
                              animalFiltrado.name
                                .toUpperCase()
                                .includes(pesquisa.toUpperCase())
                            )
                              return animalFiltrado;
                          } else if (filtro === 'Especie') {
                            if (
                              animalFiltrado.species
                                .toUpperCase()
                                .includes(pesquisa.toUpperCase())
                            )
                              return animalFiltrado;
                          } else if (filtro === 'Raca') {
                            if (
                              animalFiltrado.breed
                                .toUpperCase()
                                .includes(pesquisa.toUpperCase())
                            )
                              return animalFiltrado;
                          }
                          return null;
                          // relatorio.nome.toUpperCase().includes(pesquisa.toUpperCase()),
                        })
                        .map((animal) => (
                          <Animal
                            key={animal.id}
                            onClick={() => handleClickAnimal(animal)}
                          >
                            {animal.adopted && (
                              <h2
                                style={{
                                  position: 'absolute',
                                  fontFamily: 'Open Sans, sans-serif',
                                  background: 'rgb(242, 135, 89, 0.8)',
                                  padding: '0 32px 0 32px',
                                  color: 'white',
                                  width: '200px',
                                  textAlign: 'center',
                                }}
                              >
                                Adotado!
                              </h2>
                            )}
                            <img
                              src={animal.avatar_url || dogImg}
                              alt={animal.name}
                            />
                            <h3>{animal.name}</h3>
                            <h5>
                              {animal.species}, {animal.breed}
                            </h5>
                            <h5>{animal.description}</h5>
                          </Animal>
                        ))}
                    </ListaMeusAnimais>
                  </ContentAnimal>
                </div>
              )}
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

export default withRouter(DetalheOng);
