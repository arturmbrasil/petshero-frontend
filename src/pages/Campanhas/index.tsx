import React, { useCallback, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom';
import { MenuItem, Select } from '@material-ui/core';
import { Container, Content, ListaCampanhas, Campanha } from './styles';

import NavBar from '../../components/NavBar';

import Header from '../../components/Header';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import dogImg from '../../assets/default.png';

interface CampanhaInterface {
  id: string;
  ong_id: string;
  animal_id: string;
  target_value: string;
  received_value: string;
  title: string;
  description: string;
  activated: string;
  ong: {
    id: string;
    name: string;
    whatsapp: string;
    email: string;
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

const Campanhas: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [pesquisa, setPesquisa] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filtro, setFiltro] = React.useState('Title');

  const history = useHistory();

  const [campanhas, setCampanhas] = useState<CampanhaInterface[]>([]);

  const handleClickCampanha = useCallback(
    (camp: CampanhaInterface) => {
      history.push(`/campanhas/${camp.id}`);
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
    api.get(`/campaigns`).then((response) => {
      setCampanhas(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <NavBar />
      <div id="page-wrap">
        <Header />

        <Content isFocused={isFocused}>
          <h1>
            Campanhas de arrecadação!{' '}
            <span aria-label="money" role="img">
              💰
            </span>
          </h1>
          <p>Doe para essas campanhas e ajude a causa!</p>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h4 style={{ marginRight: '16px' }}>Pesquisar por:</h4>
            <Select
              labelId="select-pesquisa"
              id="simple-select-pesquisa"
              value={filtro}
              name="Title"
              onChange={handleChangeFiltro}
              style={{ width: '150px', height: '36px', textAlign: 'center' }}
            >
              <MenuItem key="Title" value="Title">
                Título
              </MenuItem>
              <MenuItem key="ONG" value="ONG">
                Nome da ONG
              </MenuItem>
              <MenuItem key="Animal" value="Animal">
                Nome do Animal
              </MenuItem>
            </Select>
          </div>
          <div className="inputDiv">
            <FiSearch />
            <input
              placeholder="Pesquisar"
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChange={handlePesquisa}
            />
          </div>
          {/* <Link className="animaisEncontrados" to="/adotados">
            Ver animais que já foram adotados
          </Link> */}
          <ListaCampanhas>
            {campanhas
              .filter((camp) => {
                if (filtro === 'Title') {
                  if (camp.title.toUpperCase().includes(pesquisa.toUpperCase()))
                    return camp;
                } else if (filtro === 'ONG') {
                  if (
                    camp.ong.name.toUpperCase().includes(pesquisa.toUpperCase())
                  )
                    return camp;
                } else if (filtro === 'Animal') {
                  if (
                    camp.ongAnimal?.name
                      .toUpperCase()
                      .includes(pesquisa.toUpperCase())
                  )
                    return camp;
                }
                return null;
                // relatorio.nome.toUpperCase().includes(pesquisa.toUpperCase()),
              })
              .map((camp) => (
                <Campanha
                  key={camp.id}
                  onClick={() => handleClickCampanha(camp)}
                >
                  <img src={camp.avatar_url || dogImg} alt={camp.title} />
                  <h3>{camp.title}</h3>
                  <h5>{camp.description}</h5>
                  <h5 style={{ marginTop: '3px' }}>
                    <span aria-label="money" role="img">
                      🐾
                    </span>{' '}
                    {camp.ongAnimal?.name} - {camp.ong.name}
                  </h5>
                  {/* <h5 style={{ marginBottom: '3px' }}>- {camp.ong.name}</h5> */}
                  <h6>Meta: R${camp.target_value}</h6>
                  <h6>Arrecadado: R${camp.received_value}</h6>
                </Campanha>
              ))}
          </ListaCampanhas>
        </Content>
      </div>
    </Container>
  );
};

export default Campanhas;
