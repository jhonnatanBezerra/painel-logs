import React, { useState } from 'react';
import { WrapperAside, FooterAsideWrapper, HeaderAsideWrapper, MainAsideWrapper, DirectLinksWrapper } from './styles.js';
import { MenuWrapper, TitleMenu, ListMenu, ListItem } from './styles.js';
import Logo from '../../assets/images/logo2.png';

import { GrHomeRounded } from 'react-icons/gr'
import { GoGraph } from 'react-icons/go';
import { GiNotebook } from 'react-icons/gi';
import { IoExitOutline, } from 'react-icons/io5';
import { IoIosArrowDropdown, } from 'react-icons/io';
import { BiErrorAlt, } from 'react-icons/bi';
import { MdOutlineVerifiedUser, } from 'react-icons/md';
import { FaPhone, FaRegEdit } from 'react-icons/fa';
import { CgFileDocument, } from 'react-icons/cg';

const optionCompany = [
  { name: 'Cadastro', icon: FaRegEdit },
  { name: 'NF-e', icon: CgFileDocument },
  { name: 'NFC-e', icon: CgFileDocument },
]

const optionAttendance = [
  { name: 'Logs', icon: MdOutlineVerifiedUser },
  { name: 'Erros', icon: BiErrorAlt },
]


export const Testes = () => {

  return (

    <WrapperAside>

      <HeaderAsideWrapper>
        <img src={Logo} alt="Logo" />
      </HeaderAsideWrapper>

      <MainAsideWrapper>

        <DirectLinksWrapper>
          <div>
            <GrHomeRounded />
            <p>Home</p>
          </div>

          <div>
            <GiNotebook />
            <p>Atendimento</p>
          </div>

          <div>
            <GoGraph />
            <p>Telemetria</p>
          </div>

          <div>
            <FaPhone />
            <p>Agenda telefonica</p>
          </div>


        </DirectLinksWrapper>

        <Menu listOption={optionAttendance} title='Telemetria' />

        <Menu listOption={optionCompany} title='Empresas' />

        <Menu listOption={optionAttendance} title='Telemetria' />

        <Menu listOption={optionCompany} title='Empresas' />


        <Menu listOption={optionAttendance} title='Telemetria' />

        <Menu listOption={optionCompany} title='Empresas' />


        <Menu listOption={optionAttendance} title='Telemetria' />

        <Menu listOption={optionCompany} title='Empresas' />



      </MainAsideWrapper>

      <FooterAsideWrapper>
        <div>
          <span>Jhonnatan Bezerra</span>
          <p>Programação</p>
        </div>

        <IoExitOutline />

      </FooterAsideWrapper>

    </WrapperAside>

  );
}

const Menu = ({ title, listOption }) => {

  const [open, setOpen] = useState(true)

  return (
    <MenuWrapper >

      <TitleMenu onClick={() => setOpen(!open)} isOpen={open ? 0 : 180}  >
        <strong>{title}</strong>
        <IoIosArrowDropdown />
      </TitleMenu>

      <ListMenu isOpen={open ? true : false} >

        {listOption.map((item, index) => (

          <ListItem key={index}>
            <item.icon />
            <p>{item.name}</p>
          </ListItem>

        ))}




      </ListMenu>




    </MenuWrapper>
  )
}