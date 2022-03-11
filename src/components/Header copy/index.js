import React, { useEffect } from 'react';
import { HeaderContainer, NavigationHeader, NavLink } from './styles.js'
import Logo from '../../assets/images/logo.png'
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {


  const path = useLocation().pathname;

  useEffect(() => {
    if (path === '/') {
      document.title = 'JB - SOFTWARE - TELEMETRIA'
    } else {
      document.title = 'JB - SOFTWARE - ' + path.replace('/', '').toLocaleUpperCase()
    }
  }, [])

  return (
    <HeaderContainer>
      <div className='content'>
        <img src={Logo} />

        <NavigationHeader>

          <Link to={'/'}>JB - Telemetria</Link>
          <Link to={'/modules'}>JB - Módulos</Link>
          {/* <Link >Senha manutenção</Link> */}
          <Link >Agenda</Link>

        </NavigationHeader>

      </div>


    </HeaderContainer >
  );
}