import React from 'react';
import './styles.css';
import logo from '../../assets/images/jblogo.png'

import teleIcon from '../../assets/icons/telemetria.svg'
import callIcon from '../../assets/icons/call.svg'
import bookIcon from '../../assets/icons/bookmark.svg'
import editIcon from '../../assets/icons/edit.svg'
import logoutIcon from '../../assets/icons/logout.svg'
import faqIcon from '../../assets/icons/question.svg'
import { IoMdArrowDropright } from 'react-icons/io'

export const Aside = () => {
  return (
    <aside style={{ background: '#FFF', width: '275px', height: '100vh', borderRight: '1px solid #E1E1E1', padding: '40px 20px', display: 'flex', flexDirection: 'column' }}>

      <header style={{ display: 'flex', alignItems: "flex-start", justifyContent: 'center' }}>
        <img src={logo} alt="" style={{ height: '50px', width: '50px', objectFit: 'contain', borderRadius: '10px' }} />

        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '12px' }}>
          <span style={{ fontWeight: 'bold', color: '#6D6D6D', lineHeight: '25px', fontSize: '20px' }}>JB Software</span>
          <p style={{ fontWeight: 'bold', color: '#A6A6A6', lineHeight: '17px', fontSize: '16px' }}>Sistemas gerenciais</p>
        </div>

      </header>

      <main style={{ padding: '70px 0', display: 'flex', flexDirection: 'column', flex: 1 }}>

        <section style={{ borderBottom: '1px solid #E1E1E1', }}>

          <span style={{ display: 'flex', marginBottom: '36px' }}>
            <img src={teleIcon} alt="icon" />
            <a href="#" style={{ paddingLeft: '15px', textDecoration: "none", color: '#333333' }}>Telemetria</a>
          </span>

          <span style={{ display: 'flex', marginBottom: '36px' }}>
            <img src={faqIcon} alt="icon" />
            <a href="#" style={{ paddingLeft: '15px', textDecoration: "none", color: '#333333' }}>FAQ</a>
          </span>
        </section>

        <section style={{ borderBottom: '1px solid #E1E1E1', }}>

          <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', paddingTop: '20px', marginBottom: '36px', }}>

            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingBottom: '30px' }}>
              <span style={{ color: '#333333', fontWeight: 'bold' }}>Empresas</span>
              <IoMdArrowDropright color='#333333' />
            </div>

            <div style={{ display: "flex", width: '100%', paddingBottom: '16px' }}>
              <img src={callIcon} alt="icon" />
              <a href="#" style={{ paddingLeft: '15px', textDecoration: "none", color: '#333333' }}>Agenda telefonica</a>
            </div>

            <div style={{ display: "flex", width: '100%', paddingBottom: '16px' }}>
              <img src={editIcon} alt="icon" />
              <a href="#" style={{ paddingLeft: '15px', textDecoration: "none", color: '#333333' }}>Cadastro</a>
            </div>

            <div style={{ display: "flex", width: '100%', paddingBottom: '16px' }}>
              <img src={bookIcon} alt="icon" />
              <a href="#" style={{ paddingLeft: '15px', textDecoration: "none", color: '#333333' }}>NF-e</a>
            </div>

            <div style={{ display: "flex", width: '100%', paddingBottom: '16px' }}>
              <img src={bookIcon} alt="icon" />
              <a href="#" style={{ paddingLeft: '15px', textDecoration: "none", color: '#333333' }}>NFC-e</a>
            </div>

          </div>

        </section>

      </main>

      <footer style={{ display: "flex", alignItems: 'center', justifyContent: 'flex-start', width: '100%', }}>

        <img src={logoutIcon} alt="icon" />
        <span style={{ color: '#333333', fontWeight: 'bold', paddingLeft: '15px' }}>Sair</span>

      </footer>

    </aside>

  );
}