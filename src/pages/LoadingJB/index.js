import React, { Fragment } from 'react';
import { LoadingSpinning, CloseButton } from './styles.js';
import { FiMenu } from 'react-icons/fi';
import './styles.css';
// import Logo from '../../assets/images/logo4.png';
import { width } from '@mui/system';
import Logo from '../../assets/images/logo3.png';


export const LoadingJB = () => {
  return (
    <div style={{ width: "100%", background: '#FFF' }}>

      <nav className='navbar'>
        <a href="#" className='logo'><img src={Logo} alt="" /></a>

        {/* Buttom close */}
        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="hamburger">
          <span className="bun bun-top">
            <span className="bun-crust bun-crust-top"></span>
          </span>
          <span className="bun bun-bottom">
            <span className="bun-crust bun-crust-bottom"></span>
          </span>
        </label>
        {/* End buttom close */}

        <div className="menu">
          <ul className="list">
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Funcionalidades</a></li>
            <li><a href="#">Suporte</a></li>
            <li><a href="#">Sobre-nós</a></li>
            <li><a href="#">Contato</a></li>
          </ul>
        </div>


      </nav>

    </div>
  );
}