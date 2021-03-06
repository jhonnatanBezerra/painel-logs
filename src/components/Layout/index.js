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
import { IoMdArrowDropright, IoIosArrowDropdown } from 'react-icons/io'
import { IoExitOutline, } from 'react-icons/io5';

import './styles.css';
import { Menu, OptionMenu } from '../OptionMenu';

const optionCompany = [
  { name: 'Cadastro', icon: editIcon },
  { name: 'NF-e', icon: bookIcon },
  { name: 'NFC-e', icon: bookIcon },
]

const optionAttendance = [
  { name: 'Cadastro', icon: editIcon },
  { name: 'Consulta', icon: bookIcon },
]

export const Layout = ({ children, pageName, icon }) => {


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

              <Menu title={'Empresas'} listOption={optionCompany} />

              <Menu title={'Atendimento'} listOption={optionAttendance} />

              <Menu title={'Banco de conhecimento'} listOption={optionAttendance} />


            </section>

            <section style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px 15px 15px 0' }}>
              <div style={{}}>
                <span style={{ fontWeight: 'bold', textAlign: 'center' }}>Jhonnatan Bezerra</span>
                <p style={{ fontSize: '.8rem' }}>Programa????o</p>
              </div>

              <IoExitOutline style={{ fontSize: '1.5rem', marginLeft: '0.5rem', cursor: 'pointer' }} />
            </section>

          </div>
        </header>

        <div style={{ display: 'flex', flexDirection: "column", maxHeight: '100vh', padding: '10px 30px', width: "100%" }}>

          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'flex-start', position: 'sticky', top: '0', background: '#FFF', padding: '0 15px' }}>
            <h1 style={{ fontSize: '50px', paddingRight: '10px' }}>{pageName}</h1>
            <img src={icon} alt="icon" style={{ width: '35px', height: '35px' }} />
          </div>

          {children}

        </div>


      </div>
    </Fragment>
  );
}