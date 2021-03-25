import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
import Perfil from '../pages/Perfil';
import Endereco from '../pages/Perfil/Endereco';
import AnimaisPerdidos from '../pages/AnimaisPerdidos';
import DetalheAnimalPerdido from '../pages/DetalheAnimalPerdido';
import AnimaisEncontrados from '../pages/AnimaisEncontrados';
import MeusAnimais from '../pages/MeusAnimais';
import NovoAnimalPerdido from '../pages/NovoAnimalPerdido';
import EditarAnimalPerdido from '../pages/EditarAnimalPerdido';
import AnimaisAdocao from '../pages/AnimaisAdocao';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/cadastro" exact component={Cadastro} />

      <Route path="/home" exact component={Home} isPrivate />

      <Route path="/perfil" exact component={Perfil} isPrivate />

      <Route path="/perfil/endereco" exact component={Endereco} isPrivate />

      <Route
        path="/animais-perdidos"
        exact
        component={AnimaisPerdidos}
        isPrivate
      />

      <Route
        path="/animais-perdidos/:id"
        exact
        component={DetalheAnimalPerdido}
        isPrivate
      />

      <Route
        path="/animais-encontrados"
        exact
        component={AnimaisEncontrados}
        isPrivate
      />

      <Route path="/meus-animais" exact component={MeusAnimais} isPrivate />
      <Route
        path="/meus-animais/novo"
        exact
        component={NovoAnimalPerdido}
        isPrivate
      />

      <Route
        path="/meus-animais/editar/:id"
        exact
        component={EditarAnimalPerdido}
        isPrivate
      />

      <Route path="/adocao" exact component={AnimaisAdocao} isPrivate />
    </Switch>
  );
};

export default Routes;
