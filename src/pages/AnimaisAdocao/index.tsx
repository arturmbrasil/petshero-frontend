import React, { useCallback, useEffect, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { Link, useHistory } from 'react-router-dom';
import { MenuItem, Select } from '@material-ui/core';
import { Container, Content, ListaAnimaisAdocao, AnimalAdocao } from './styles';

import NavBar from '../../components/NavBar';

import Header from '../../components/Header';

import { useAuth } from '../../hooks/auth';

import api from '../../services/api';
import dogImg from '../../assets/default.png';

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

const AnimaisAdocao: React.FC = () => {
  const { user, updateUser } = useAuth();
  const [pesquisa, setPesquisa] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [filtro, setFiltro] = React.useState('Nome');

  const history = useHistory();

  const [animals, setAnimals] = useState<Animal[]>([]);

  const handleClickAnimalAdocao = useCallback(
    (animal: Animal) => {
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
      .get(`/ongs/animals`, { params: { adopted: false } })
      .then((response) => {
        setAnimals(response.data);
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
            Animais para Adoção{' '}
            <span aria-label="sad-cat" role="img">
              😻
            </span>
          </h1>
          <p>
            Todos esses animais estão para adoção! Nos ajude a encontrar um lar
            para eles
          </p>
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
          <Link className="animaisEncontrados" to="/animais-encontrados">
            Ver animais que já foram adotados
          </Link>
          <ListaAnimaisAdocao>
            {animals
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
                <AnimalAdocao
                  key={animal.id}
                  onClick={() => handleClickAnimalAdocao(animal)}
                >
                  <img src={animal.avatar_url || dogImg} alt={animal.name} />
                  <h3>{animal.name}</h3>
                  <h5>
                    {animal.species}, {animal.breed}
                  </h5>
                  <h5>{animal.description}</h5>
                  <h6>{animal.ong.name}</h6>
                </AnimalAdocao>
              ))}
          </ListaAnimaisAdocao>
        </Content>
      </div>
    </Container>
  );
};

export default AnimaisAdocao;
