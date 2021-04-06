import React, { useCallback, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom';
import { MenuItem, Select } from '@material-ui/core';
import { Container, Content, ListaOngs, Ong } from './styles';

import NavBar from '../../components/NavBar';

import Header from '../../components/Header';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import dogImg from '../../assets/default.png';

interface ONGInterface {
  id: string;
  name: string;
  avatar_url: string | null;
  address_id: string;
  address: {
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    uf: string;
    cep: string;
  };
}

const Ongs: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [pesquisa, setPesquisa] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filtro, setFiltro] = React.useState('Nome');

  const history = useHistory();

  const [ongstate, setOng] = useState<ONGInterface[]>([]);

  const handleClickOng = useCallback(
    (ong: ONGInterface) => {
      history.push(`/ongs/${ong.id}`);
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
    api.get(`/ongs`).then((response) => {
      setOng(response.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <NavBar />
      <div id="page-wrap">
        <Header />

        <Content isFocused={isFocused}>
          <h1>ONGs </h1>
          <p>Conheça as ongs que lutam pela causa animal!</p>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <h4 style={{ marginRight: '16px' }}>Pesquisar por:</h4>
            <Select
              labelId="select-pesquisa"
              id="simple-select-pesquisa"
              value={filtro}
              name="Nome"
              onChange={handleChangeFiltro}
              style={{ width: '150px', height: '36px', textAlign: 'center' }}
            >
              <MenuItem key="Nome" value="Nome">
                Nome
              </MenuItem>
              <MenuItem key="Cidade" value="Cidade">
                Cidade
              </MenuItem>
              <MenuItem key="UF" value="UF">
                UF
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
          <ListaOngs>
            {ongstate
              .filter((ong) => {
                if (filtro === 'Nome') {
                  if (ong.name.toUpperCase().includes(pesquisa.toUpperCase()))
                    return ong;
                } else if (filtro === 'Cidade') {
                  if (
                    ong.address?.city
                      .toUpperCase()
                      .includes(pesquisa.toUpperCase())
                  )
                    return ong;
                } else if (filtro === 'UF') {
                  if (
                    ong.address?.uf
                      .toUpperCase()
                      .includes(pesquisa.toUpperCase())
                  )
                    return ong;
                }
                return null;
                // relatorio.nome.toUpperCase().includes(pesquisa.toUpperCase()),
              })
              .map((ong) => (
                <Ong key={ong.id} onClick={() => handleClickOng(ong)}>
                  <img src={ong.avatar_url || dogImg} alt={ong.name} />
                  <h3>{ong.name}</h3>
                  {ong.address_id && (
                    <>
                      <h6>
                        {ong.address?.street}, {ong.address?.number} -{' '}
                        {ong.address?.neighborhood}
                      </h6>
                      <h6>
                        {ong.address?.city}, {ong.address?.uf}
                      </h6>
                      <h6>{ong.address?.cep}</h6>
                    </>
                  )}
                </Ong>
              ))}
          </ListaOngs>
        </Content>
      </div>
    </Container>
  );
};

export default Ongs;
