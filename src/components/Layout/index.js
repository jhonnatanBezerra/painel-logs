import React, { Fragment } from 'react';
import logo from '../../assets/images/jblogo.png';
import teleIcon from '../../assets/icons/telemetria.svg';
import calendarIcon from '../../assets/icons/calendar.svg';
import homeIcon from '../../assets/icons/home.svg';
import logoutIcon from '../../assets/icons/logout.svg';
import callIcon from '../../assets/icons/call.svg'
import bookIcon from '../../assets/icons/bookmark.svg'
import editIcon from '../../assets/icons/edit.svg'
import faqIcon from '../../assets/icons/question.svg'
import { IoMdArrowDropright } from 'react-icons/io'

import './styles.css';

export const Layout = ({ children, pageName, icon }) => {

  const data = Array(150).fill("");

  return (
    <Fragment>
      <div style={{ display: 'flex' }}>

        <header style={{ height: '100vh', background: ' #FFF', minWidth: '275px', width: '275px', display: 'flex', borderRight: '1px solid #E1E1E1' }}>

          <div style={{ padding: '40px 0px 10px 20px', display: 'flex', flexDirection: 'column', width: '100%' }}>

            <section style={{ display: 'flex', paddingBottom: '50px', }}>
              <img src={logo} alt="" style={{ height: '50px', width: '50px', objectFit: 'contain', borderRadius: '10px' }} />

              <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '12px' }}>
                <span style={{ fontWeight: 'bold', color: '#6D6D6D', lineHeight: '25px', fontSize: '20px' }}>JB Software</span>
                <p style={{ fontWeight: 'bold', color: '#A6A6A6', lineHeight: '17px', fontSize: '16px' }}>Sistemas gerenciais</p>
              </div>

            </section>

            <section style={{ display: 'flex', flexDirection: 'column', flex: 1, overflowY: 'auto', width: "100%" }}>

              <div style={{ padding: '25px 0px', borderBottom: '1px solid #e1e1e1' }}>

                <span style={{ display: 'flex', marginBottom: '36px' }}>
                  <img src={homeIcon} alt="icon" />
                  <a href="#" style={{ paddingLeft: '15px', textDecoration: "none", color: '#333333' }}>Home</a>
                </span>

                <span style={{ display: 'flex', marginBottom: '36px' }}>
                  <img src={calendarIcon} alt="icon" />
                  <a href="#" style={{ paddingLeft: '15px', textDecoration: "none", color: '#333333' }}>Atendimento</a>
                </span>

                <span style={{ display: 'flex', marginBottom: '36px' }}>
                  <img src={teleIcon} alt="icon" />
                  <a href="#" style={{ paddingLeft: '15px', textDecoration: "none", color: '#333333' }}>Telemetria</a>
                </span>

                <span style={{ display: 'flex', marginBottom: '36px' }}>
                  <img src={callIcon} alt="icon" />
                  <a href="#" style={{ paddingLeft: '15px', textDecoration: "none", color: '#333333' }}>Agenda telefonica</a>
                </span>



              </div>

              <div style={{ borderBottom: '1px solid #E1E1E1', }}>

                <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', paddingTop: '20px', marginBottom: '36px', }}>

                  <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingBottom: '30px', paddingRight: '15px' }}>
                    <span style={{ color: '#333333', fontWeight: 'bold' }}>Empresas</span>
                    <IoMdArrowDropright color='#333333' />
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

              </div>

              <div style={{ borderBottom: '1px solid #E1E1E1', }}>

                <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', paddingTop: '20px', marginBottom: '36px', }}>

                  <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingBottom: '30px', paddingRight: '15px' }}>
                    <span style={{ color: '#333333', fontWeight: 'bold' }}>Atendimento</span>
                    <IoMdArrowDropright color='#333333' />
                  </div>

                  <div style={{ display: "flex", width: '100%', paddingBottom: '16px' }}>
                    <img src={editIcon} alt="icon" />
                    <a href="#" style={{ paddingLeft: '15px', textDecoration: "none", color: '#333333' }}>Cadastro</a>
                  </div>

                  <div style={{ display: "flex", width: '100%', paddingBottom: '16px' }}>
                    <img src={bookIcon} alt="icon" />
                    <a href="#" style={{ paddingLeft: '15px', textDecoration: "none", color: '#333333' }}>Consulta</a>
                  </div>



                </div>

              </div>

              <div style={{ borderBottom: '1px solid #E1E1E1', }}>

                <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center', paddingTop: '20px', marginBottom: '36px', }}>

                  <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', width: '100%', paddingBottom: '30px', paddingRight: '15px' }}>
                    <span style={{ color: '#333333', fontWeight: 'bold' }}>Empresas</span>
                    <IoMdArrowDropright color='#333333' />
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

              </div>


            </section>

            <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 15px 15px 0' }}>
              <img src={logoutIcon} alt="icon" />
              <span style={{ color: '#333333', fontWeight: 'bold', paddingLeft: '15px' }}>Sair</span>
            </section>

          </div>
        </header>

        <div style={{ display: 'flex', flexDirection: "column", maxHeight: '100vh', padding: '10px 30px 10px 30px' }}>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-start', position: 'sticky', top: '0' }}>
            <h1 style={{ fontSize: '50px', paddingRight: '10px' }}>{pageName}</h1>
            <img src={icon} alt="icon" style={{ width: '35px', height: '35px' }} />
          </div>

          {children}

        </div>


      </div>
    </Fragment>
  );
}