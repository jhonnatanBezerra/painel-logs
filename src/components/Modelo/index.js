import React from 'react';

import { Inicio } from './Inicio';
import { Contato } from './Contato';
import { Sobre } from './Sobre';


export const ModeloHome = () => {
  return (
    <nav>
      <ul>
        <Inicio />
        <Sobre />
        <Contato />
      </ul>
    </nav>
  );
}
