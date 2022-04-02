import React, { useEffect, useState } from 'react';
import { Layout } from '../../components/Layout';
import './styles.css';
import callIcon from '../../assets/icons/call.svg'

import { CardPhone } from '../../components/CardPhone';
import { BsSearch } from 'react-icons/bs';
import axios from 'axios'
import { TextField, InputAdornment, MenuItem, Box, CircularProgress, Backdrop } from '@mui/material';
import SearchIcon from "@mui/icons-material/Search";

const filters = [
  {
    value: "Empresa",
    label: "empresa"
  },
  {
    value: "Cidade",
    label: "cidade"
  },
  {
    value: "Telefone",
    label: "telefone"
  },
  {
    value: "Contato",
    label: "contato"
  }
];


export const Agenda = () => {


  const data = Array(150).fill("");

  const [searchText, setSearchText] = useState('');
  const [params, setParams] = useState('');
  const [filter, setFilter] = useState("Empresa");
  const [listCompanies, setListCompanies] = useState([]);
  const [isFinish, setIsFinish] = useState(false);

  // useEffect(() => {
  //   getAllCompanies();
  // }, [])

  useEffect(() => {
    setTimeout(() => {
      searchByQuery();
    }, 600);
  }, [searchText])

  const serachCompanies = async () => {

    try {

      let query = '';

      if (params === '' || params === 'empresa') {
        query = searchText + query;
      }

      if (params === 'cidade') {
        query = searchText + `&city=${params}`
      }

      if (params === 'telefone') {
        query = searchText + `&phone=${params}`
      }

      if (params === 'contato') {
        query = searchText + `&contact=${params}`
      }

      const { data } = await axios.post(`https://portal.sisecf.com/api/agenda/busca?search=${query}`, {
        headers: {
          'Content-Type': 'application/json',
          'authToken': `d256bb7ce8ae5c1ea648323354fa9d10cf18e902`
        },
        timeout: 5000
      });
      console.log(data);

    } catch (error) {

    }
  }

  const searchByQuery = async () => {
    try {

      const { data } = await axios.get(`http://10.1.1.12:8000/empresas/?nome=${searchText}`);
      setListCompanies(data);
      console.log('dados => ', data);
    } catch (error) {

    }
    finally {
      setIsFinish(false);
    }
  }

  const handleChangeFilter = (e) => {
    setFilter(e.target.value)
  }

  const getAllCompanies = async () => {
    try {
      setIsFinish(true);
      const { data } = await axios.get('http://10.1.1.12:8000/empresas/?nome=a');
      setListCompanies(data);

    } catch (error) {

    }
    finally {
      setIsFinish(false);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchByQuery();
    }

  }


  return (
    <Layout pageName={'Agenda telefonica'} icon={callIcon} >

      <Box fullWidth sx={{ display: "flex", mb: 2, mt: 2 }} >

        <TextField label="Pesquise por nome da empresa ou razão social"
          onChange={e => setSearchText(e.target.value)}
          onKeyPress={e => handleKeyPress(e)}
          variant="outlined" sx={{ background: "#FFF", borderRadius: '8px', width: '100%', }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }} />

        <TextField sx={{ width: '40ch', ml: 2, borderRadius: '8px', background: "#FFF", }}
          select
          variant="outlined"
          label="Filtros de busca"
          value={filter}
          onChange={handleChangeFilter}
        >
          {filters.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </TextField>

      </Box>

      {isFinish ?

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isFinish}
          onClick={null}
        >
          <CircularProgress color="inherit" />
          <h1 style={{ marginLeft: '16px' }}>Carregando dados ...</h1>
        </Backdrop>

        :

        <div style={{ overflowY: 'scroll', }}>
          <table>
            <thead>
              <tr>
                <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>CodReg</th>
                <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>Empresa</th>
                <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>Razão social</th>
                <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>CNPJ</th>
                {/* <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>Cidade</th> */}
                <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>Telefones</th>
                {/* <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>Módulos</th> */}

              </tr>
            </thead>

            <tbody>

            </tbody>
          </table>

        </div>

      }

    </Layout>
  );
}