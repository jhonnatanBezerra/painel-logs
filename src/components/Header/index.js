import React, { useEffect } from 'react';
import { HeaderContainer, NavigationHeader, NavLink } from './styles.js'
import Logo from '../../assets/images/logo.png'
import { Link, useLocation } from 'react-router-dom';

export const Header = () => {


  const path = useLocation().pathname;

  useEffect(() => {
    if (path === '/home') {
      document.title = 'JB - SOFTWARE - TELEMETRIA'
    } else {
      document.title = 'JB - SOFTWARE - MÓDULOS';
    }
  }, [])

  return (
    <HeaderContainer>



      <div className='content'>
        <img src={Logo} />

        <NavigationHeader>

          <Link to={'/home'}>JB - Telemetria</Link>
          <Link to={'/modules'}>JB - Módulos</Link>
          <Link >Agenda</Link>

        </NavigationHeader>

      </div>


    </HeaderContainer >
  );
}