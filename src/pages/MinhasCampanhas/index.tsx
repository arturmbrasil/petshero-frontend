import React, { useCallback, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom';
import { MenuItem, Select } from '@material-ui/core';
import { Container, Content, ListaMeusAnimais, Campanha } from './styles';

import NavBar from '../../components/NavBar';

import Header from '../../components/Header';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import dogImg from '../../assets/default.png';
import Button from '../../components/Button';

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

const MinhasCampanhas: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [pesquisa, setPesquisa] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filtro, setFiltro] = React.useState('Title');

  const [mostraAtivos, setMostraAtivos] = useState(true);

  const history = useHistory();

  const [minhasCampanhas, setMinhasCampanhas] = useState<CampanhaInterface[]>(
    [],
  );

  const handleClickCampanha = useCallback(
    (camp: CampanhaInterface) => {
      history.push(`/minhas-campanhas/editar/${camp.id}`);
    },
    [history],
  );

  const handleCadastrar = useCallback(() => {
    history.push(`/minhas-campanhas/nova`);
  }, [history]);

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

  const handleMostraAtivos = useCallback(() => {
    setMostraAtivos(!mostraAtivos);
  }, [mostraAtivos]);

  useEffect(() => {
    api.get(`/campaigns`, { params: { ong_id: user.id } }).then((response) => {
      setMinhasCampanhas(response.data);
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
            {mostraAtivos
              ? 'Minhas campanhas ativas'
              : 'Minhas campanhas inativas'}
          </h1>
          <p>Aqui você pode criar ou editar novas campanhas de arrecadação!</p>
          <div
            style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}
          >
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
          <Button onClick={handleCadastrar}>CADASTRAR CAMPANHA</Button>

          <button
            type="button"
            className="animaisEncontrados"
            onClick={handleMostraAtivos}
            style={{
              backgroundColor: `transparent`,
              border: 0,
              marginTop: `-20px`,
            }}
          >
            {mostraAtivos
              ? 'Mostrar campanhas inativas'
              : 'Mostrar campanhas ativas'}
          </button>

          <ListaMeusAnimais>
            {minhasCampanhas
              .filter((camp) => {
                if (mostraAtivos) {
                  if (camp.activated) {
                    if (filtro === 'Title') {
                      if (
                        camp.title
                          .toUpperCase()
                          .includes(pesquisa.toUpperCase())
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
                  }
                } else if (!camp.activated) {
                  if (filtro === 'Title') {
                    if (
                      camp.title.toUpperCase().includes(pesquisa.toUpperCase())
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
          </ListaMeusAnimais>
        </Content>
      </div>
    </Container>
  );
};

export default MinhasCampanhas;
