import React, { Fragment, useState, useEffect } from 'react';
import { Header } from '../../components/Header';
import { ModalDetails } from '../../components/ModalDetails'
import { format } from 'date-fns'
import { encode } from 'base-64'
import { TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, MenuItem, CircularProgress, Backdrop, } from '@mui/material'
import axios from 'axios'
import { TailSpin, } from "react-loader-spinner";
import './styles.css';
import { LoaderContainer } from '../../components/TableLogs/styles';
import { useLocation } from 'react-router-dom'
import { AsideMenu } from '../../components/MenuLateral';


export const CompanyModules = () => {

  const [dados, setDados] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [textInput, setTextInput] = useState('');
  const [currency, setCurrency] = React.useState("ALL");
  const [isFinish, setIsFinish] = useState(false)
  const [modal, setModal] = useState(false);
  const currencies = [

    {
      value: "ALL",
      label: "Todas empresas"
    },
    {
      value: "INACTIVES",
      label: "Sem verificação"
    },
  ];

  const location = useLocation();

  console.log(location.pathname.replace('/', ''));


  useEffect(() => {
    getAllData();
  }, [])


  const getAllData = async () => {
    try {
      setIsFinish(true)
      let query = 'select * from CONTROLECLI';
      query = encode(query)

      const { data } = await axios.get(`http://10.1.1.16:5952/?command=${query}`);
      setDados(data);

    } catch (error) {
      console.log(error);
    }
    finally {
      setIsFinish(false)
    }

  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      searchCompany();
    }

  }

  const searchCompany = async () => {
    try {

      let query;

      if (isNaN(textInput)) {
        query = `select * from CONTROLECLI where empresa like '%${textInput}%'`
      } else {
        query = `select * from CONTROLECLI where codreg like '%${textInput}%'`
      }

      query = encode(query);

      const { data } = await axios.get(`http://10.1.1.16:5952/?command=${query}`);
      setDados(data);

    } catch (error) {
      console.log('erro ao pesquisar ');
    }
  }

  const handleChange = (event) => {
    setCurrency(event.target.value);
  };

  const selectData = (e) => {
    setSelectedData(e);
    setModal(true);
  }


  return (
    <Fragment>

      <AsideMenu>

        {isFinish ?


          <Backdrop
            sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isFinish}
            onClick={null}
          >
            <CircularProgress color="inherit" />
            <h1 style={{ marginLeft: '16px' }}>Carregando lista de empresas ...</h1>
          </Backdrop>

          :
          <Fragment>
            <ModalDetails open={modal} closeModal={setModal} data={selectedData} />

            <div className='home-container'>

              <div className='search-box'>

                <TextField fullWidth id="outlined-search" label="Pesquise por nome ou codreg"
                  type="search" value={textInput} onChange={e => setTextInput(e.target.value.toUpperCase())}
                  onKeyPress={e => handleKeyPress(e)}
                />

                <TextField sx={{ width: '40ch', ml: 2, }}
                  id="outlined-select-currency"
                  select
                  label="Filtros"
                  value={currency.toUpperCase()}
                  onChange={handleChange}
                >
                  {currencies.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

              </div>

              <Box >

                <TableContainer className='tableModules' >
                  <Table aria-label="caption table">
                    <TableHead sx={{ background: '#E7EBF0' }}>
                      <TableRow>
                        {/* <TableCell>ID</TableCell> */}
                        <TableCell>COD.REG</TableCell>
                        <TableCell >EMPRESA</TableCell>
                        <TableCell >TELEFONE</TableCell>
                        <TableCell >ULT.VERIFICAÇÃO</TableCell>
                        <TableCell >CIDADE</TableCell>
                        <TableCell >PLANO</TableCell>
                        {/* <TableCell >ULT.ACESSO</TableCell> */}
                      </TableRow>
                    </TableHead>
                    <TableBody>

                      {dados.map((company, index) => {

                        if (company.empresa && company.empresa !== 'JB') {
                          return (
                            <TableRow className='line-company' key={company.codreg} onClick={() => selectData(company)}>
                              {/* <TableCell >{index + 1}</TableCell> */}
                              <TableCell >{company.codreg}</TableCell>
                              <TableCell >{company.empresa}</TableCell>
                              <TableCell >{company.foneEmp ? company.foneEmp : 'Telefone não cadastrado'}</TableCell>
                              <TableCell >{format(new Date(company.dataultVerif), 'dd/MM/yyyy')}</TableCell>
                              <TableCell >Não informado</TableCell>
                              <TableCell >Não informado</TableCell>
                              {/* <TableCell >Não informado</TableCell> */}
                            </TableRow>
                          )
                        }


                      })}
                    </TableBody>
                  </Table>
                </TableContainer>

              </Box>
            </div>

          </Fragment>
        }
      </AsideMenu>
    </Fragment>
  );
}