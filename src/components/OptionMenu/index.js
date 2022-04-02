import React, { useState } from 'react';

import './styles.css';

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

export const OptionMenu = () => {

  const listOptions = [
    { name: 'Cadastro', icon: editIcon },
    { name: 'NF-e', icon: bookIcon },
    { name: 'NFC-e', icon: bookIcon },
  ]

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000', height: '100vh', }}>

      <section style={{ display: 'flex', flexDirection: 'column', overflowY: 'auto', minWidth: "15%", background: '#FFF', paddingLeft: '15px' }}>

        <Menu title={'Empresas'} listOption={listOptions} />
        <Menu title={'Atendimento'} listOption={listOptions} />
        <Menu title={'Banco de conhecimento'} listOption={listOptions} />





      </section>
    </div>

  );
}

export const Menu = ({ title, listOption }) => {

  const [open, setOpen] = useState(true)

  return (
    <div style={{ borderBottom: '1px solid #E1E1E1', }}>

      <div className={open ? 'wrapperMenuOpen' : 'wrapperMenuClosed'} >

        <div className='titleMenuContainer' onClick={() => setOpen(!open)} >
          <span className='titleMenu' >{title}</span>
          <IoMdArrowDropright className={open ? 'transformIcon' : 'notTransformIcon'} color='#333333' />
        </div>

        {listOption.map((option, index) => (
          <div key={index} className={`optionMenu ${!open && 'optionHidden'}`} >
            <img src={option.icon} alt="icon" />
            <a href="#" className='linkOption'>{option.name}</a>
          </div>
        ))}

      </div>

    </div>
  )
}