import React, { useCallback, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom';
import { MenuItem, Select } from '@material-ui/core';
import { Container, Content, ListaMeusAnimais, Animal } from './styles';

import NavBar from '../../components/NavBar';

import Header from '../../components/Header';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import dogImg from '../../assets/default.png';
import Button from '../../components/Button';

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

const MeusAnimaisOng: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [pesquisa, setPesquisa] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filtro, setFiltro] = React.useState('Nome');

  const history = useHistory();

  const [meusAnimaisOng, setMeusAnimaisOng] = useState<Animal[]>([]);

  const handleClickAnimal = useCallback(
    (animal: Animal) => {
      history.push(`/animais-ong/editar/${animal.id}`);
    },
    [history],
  );

  const handleCadastrar = useCallback(() => {
    history.push(`/animais-ong/novo`);
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

  useEffect(() => {
    api
      .get(`/ongs/animals`, { params: { ong_id: user.id } })
      .then((response) => {
        setMeusAnimaisOng(response.data);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <NavBar />
      <div id="page-wrap">
        <Header />

        <Content isFocused={isFocused}>
          <h1>Animais da Ong</h1>
          {/* <p>Você viu algum desses animais? Pode nos ajudar a encontrá-los?</p> */}
          <div
            style={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}
          >
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
              <MenuItem key="Especie" value="Especie">
                Espécie
              </MenuItem>
              <MenuItem key="Raca" value="Raca">
                Raça
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
          <Button onClick={handleCadastrar}>CADASTRAR ANIMAL DA ONG</Button>
          <ListaMeusAnimais>
            {meusAnimaisOng
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
                  <img src={animal.avatar_url || dogImg} alt={animal.name} />
                  <h3>{animal.name}</h3>
                  <h5>
                    {animal.species}, {animal.breed}
                  </h5>
                  <h5>{animal.description}</h5>
                </Animal>
              ))}
          </ListaMeusAnimais>
        </Content>
      </div>
    </Container>
  );
};

export default MeusAnimaisOng;
