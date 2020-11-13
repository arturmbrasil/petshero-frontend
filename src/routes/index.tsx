import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SignIn from '../pages/SignIn';
import Home from '../pages/Home';
import Cadastro from '../pages/Cadastro';
// import Lojas from '../pages/Lojas';
// import Cadastros from '../pages/Cadastros/Principal';
// import Classes from '../pages/Cadastros/Classes';
// import Produtos from '../pages/Cadastros/Produtos';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/cadastro" component={Cadastro} />

      <Route path="/home" component={Home} isPrivate />

      {/* <Route path="/minhas-lojas" component={Lojas} isPrivate /> */}

      {/* <Route path="/cadastros" exact component={Cadastros} isPrivate />

      <Route path="/cadastros/classes" exact component={Classes} isPrivate />

      <Route path="/cadastros/produtos" exact component={Produtos} isPrivate /> */}
    </Switch>
  );
};

export default Routes;
