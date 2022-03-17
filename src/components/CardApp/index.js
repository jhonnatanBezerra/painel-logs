import React from 'react';
import iconCard from '../../assets/icons/iconCard.svg'
import './styles.css';
import { CircularProgress } from '@mui/material'


export const CardApp = ({ titleApp, numberOfLogs }) => {
  return (
    <div style={{ minWidth: '300px', width: '300px', height: '105px', background: '#FFF', borderRadius: '8px', display: 'flex', alignItems: 'center', padding: '15px' }}>

      <img src={iconCard} alt="icon" />

      <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '20px' }}>
        <p style={{ fontSize: '16px', color: '#A3AED0' }}>{titleApp}</p>
        {numberOfLogs ?
          <span style={{ fontSize: '36px', color: '#1B2559', fontWeight: '700' }}>{numberOfLogs}</span>
          :
          <CircularProgress size={40} sx={{ color: '#1B2559' }} />
        }
      </div>

    </div>
  );
}