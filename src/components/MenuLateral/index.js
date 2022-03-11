
import React, { useState } from 'react';
import { BiHelpCircle } from 'react-icons/bi'
import { FaBriefcase, FaRegFileAlt } from 'react-icons/fa'
import { Header } from '../../components/Header';

import './styles.css'


export const AsideMenu = ({ children }) => {

  const [active, setActive] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>

      <Header />

      <div className='content'>



        <aside className={active ? 'open' : 'closed'} onMouseOut={() => setActive(false)} onMouseOver={() => setActive(true)}>

          <ul style={{ padding: '0 10px' }}>

            <li className='list' >
              <p className={!active && 'hide'}>Empresas</p>
              <span ><FaBriefcase /></span>
            </li>

            <li className='list' >
              <p className={!active && 'hide'}>NFe</p>
              <span ><FaRegFileAlt /></span>
            </li>

            <li className='list' >
              <p className={!active && 'hide'}>NFCe</p>
              <span ><FaRegFileAlt /></span>
            </li>

            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>
            <li className='list' >
              <p className={!active && 'hide'}>FAQ</p>
              <span ><BiHelpCircle /></span>
            </li>

          </ul>
        </aside>




        {children}




      </div>


    </div>
  );
}