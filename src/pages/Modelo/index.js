import React from 'react';

import { HashLink as Link } from 'react-router-hash-link';

import './styles.css';

export const Modelo = () => {
  return (
    <div className="menu">
      <header>
        <nav>
          <ul>
            <li className="menuBar" id="home">
              <Link smooth to="#home">Home</Link>
              <Link smooth to="#sobre">Sobre</Link>
              <Link smooth to="#contato">Contato</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}