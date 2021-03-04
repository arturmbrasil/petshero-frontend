import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { NavLink } from 'react-router-dom';
import {
  FiBarChart2,
  FiHome,
  FiLogOut,
  FiTrendingUp,
  FiUser,
} from 'react-icons/fi';

import { useAuth } from '../../hooks/auth';

import { Container } from './styles';

const NavBar: React.FC = () => {
  const { signOut } = useAuth();

  // useEffect(() => {}, []);

  return (
    <Container>
      <Menu pageWrapId="page-wrap">
        <NavLink className="menu-item" activeClassName="selected" to="/home">
          <FiHome />
          Home
        </NavLink>

        <NavLink className="menu-item" activeClassName="selected" to="/perfil">
          <FiUser />
          Meu Perfil
        </NavLink>

        <NavLink className="menu-item" activeClassName="selected" to="/ongs">
          <FiBarChart2 />
          Ongs
        </NavLink>
        <NavLink className="menu-item" activeClassName="selected" to="/adocao">
          <FiTrendingUp />
          Adoção
        </NavLink>
        <NavLink
          className="menu-item"
          activeClassName="selected"
          to="/campanhas"
        >
          <FiTrendingUp />
          Campanhas
        </NavLink>
        <NavLink
          className="menu-item"
          activeClassName="selected"
          to="/animais-perdidos"
        >
          <FiTrendingUp />
          Animais Perdidos
        </NavLink>
        <NavLink className="menu-item bordertop" onClick={signOut} to="/">
          <FiLogOut />
          Sair
        </NavLink>
      </Menu>
    </Container>
  );
};

export default NavBar;
