import React, { Fragment } from 'react';
import logo from '../../assets/images/jblogo.png';
import teleIcon from '../../assets/icons/telemetria.svg';
import calendarIcon from '../../assets/icons/calendar.svg';
import homeIcon from '../../assets/icons/home.svg';

import './styles.css';

export const Test = () => {
  return (
    <Fragment>
      <div style={{ display: 'flex' }}>

        <header style={{ height: '100vh', background: ' #FFF', minWidth: '275px', width: '275px', display: 'flex', borderRight: '1px solid #E1E1E1' }}>
          <div style={{ padding: '40px 20px 10px 20px', display: 'flex', flexDirection: 'column' }}>

            <section style={{ display: 'flex', paddingBottom: '50px', }}>
              <img src={logo} alt="" style={{ height: '50px', width: '50px', objectFit: 'contain', borderRadius: '10px' }} />

              <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '12px' }}>
                <span style={{ fontWeight: 'bold', color: '#6D6D6D', lineHeight: '25px', fontSize: '20px' }}>JB Software</span>
                <p style={{ fontWeight: 'bold', color: '#A6A6A6', lineHeight: '17px', fontSize: '16px' }}>Sistemas gerenciais</p>
              </div>

            </section>

            <section style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>

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

              </div>

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

              </div>
            </section>

          </div>
        </header>

        <section style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'scroll', maxHeight: '100vh', paddingLeft: '36px' }}>

          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>
          <h1 style={{ fontSize: '50px', marginBottom: '10px' }}>Sou a main</h1>

        </section>

      </div>
    </Fragment>
  );
}