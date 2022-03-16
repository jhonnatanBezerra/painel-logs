import React from 'react';
import { Aside } from '../../components/Aside';
import { Telemetria } from '../../components/Telemetria';

import './styles.css';

export const TableTest = () => {
  return (
    <div style={{ display: 'flex' }}>
      <Aside />
      <Telemetria />
    </div>

  );
}