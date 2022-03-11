import React, { Fragment, useEffect, useState } from 'react';
import { format } from 'date-fns'
import axios from 'axios';
import {
  Button, Stack, TableCell, tableCellClasses, TableRow, TableHead, TableContainer, TableBody, Table, Paper, styled,
  Chip,
  Backdrop,
  CircularProgress
} from '@mui/material';
import MdPhone from '@mui/icons-material/SwapHoriz';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


export const TableLogs = () => {

  const [data, setData] = useState([])
  const [selectedCompany, setSelectedCompany] = useState('');
  const [type, setType] = useState('log')
  const [tagLog, setTagLog] = useState('');
  const [isFinish, setIsFinish] = useState(false)

  useEffect(() => {

    getDataByCompany();

  }, [type, selectedCompany, tagLog])

  const groupBy = (array, key) => {
    return array.reduce((acc, item) => ({
      ...acc,
      [item[key]]: [...(acc[item[key]] ?? []), item],
    }),
      {})
  }

  const getDataByCompany = async () => {

    setIsFinish(true)

    try {

      const { data } = await axios.get(`https://sisecf.app/log/api.php?view=6916316d3ce42c37cbe45a2895ebee077d473f94e80652c25323551b77091bfe&type=${type}&tag=${tagLog}&company=${selectedCompany}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth': `85e9b0314345693bba49ee0a82e7110c7f94d30d554e466e89fcd78042eaa1e7`
        },
        timeout: 5000
      })

      setData(data);

    } catch (error) {

    }

    finally {
      setIsFinish(false)
    }
  }

  const handleChangeTypeLog = () => {

    if (type === 'log') {
      setType('error');
      setTagLog('');

    } else {
      setType('log');
      setTagLog('');
    }

  }


  const handleDeletFilter = (filter) => {
    if (filter === 'log') {
      setTagLog('')
    }

    if (filter === 'company') {
      setSelectedCompany('');
      setTagLog('')
    }

    if (filter === 'type') {
      handleChangeTypeLog();
    }

  }



  return (
    <Fragment>

      <Stack direction="row" spacing={2} mb={1} sx={{ alignItems: 'center' }} >

        {/* <Button variant="contained" disabled={type === 'log' && true} onClick={handleChangeTypeLog} sx={{ background: 'blue' }}>Registro de logs</Button>
        <Button variant="contained" disabled={type === 'error' && true} onClick={handleChangeTypeLog} color="error">Registro de erros</Button> */}

        {type ? <Chip color={"primary"} deleteIcon={<MdPhone />} onDelete={() => handleDeletFilter('type')} label={type === 'log' ? 'Registro de logs' : 'Registro de erros'} /> : null}
        {selectedCompany ? <Chip color={"primary"} onDelete={() => handleDeletFilter('company')} label={selectedCompany} /> : null}
        {tagLog ? <Chip color="primary" onDelete={() => handleDeletFilter('log')} label={tagLog} /> : null}

        {/* {type ? <Fragment><span>Registros de:</span> <Chip variant="outlined" color="info" onDelete={() => handleDeletFilter('type')} label={type === 'log' ? 'Logs' : 'Erros'} /> </Fragment> : null}
        {selectedCompany ? <Fragment><span>Empresa:</span> <Chip variant="outlined" color="info" onDelete={() => handleDeletFilter('company')} label={selectedCompany} /> </Fragment> : null}
        {tagLog ? <Fragment><span>Tag de log:</span> <Chip variant="outlined" color="info" onDelete={() => handleDeletFilter('log')} label={tagLog} />  </Fragment> : null} */}



      </Stack>

      {isFinish ?
        // <LoaderContainer>

        //   <TailSpin
        //     height="150"
        //     width="150"
        //     color='#2280FF'
        //     ariaLabel='loading'
        //   />

        //   <h1>Carregando dados ...</h1>

        // </LoaderContainer>

        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={isFinish}
          onClick={null}
        >
          <CircularProgress color="inherit" />
          <h1 style={{ marginLeft: '16px' }}>Carregando dados ...</h1>
        </Backdrop>




        :
        <TableContainer component={Paper} >

          <Table stickyHeader={true} sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead >
              <TableRow>
                <StyledTableCell>ID</StyledTableCell>
                <StyledTableCell align="center">App</StyledTableCell>
                <StyledTableCell align="center">Empresa</StyledTableCell>
                <StyledTableCell align="center">Log</StyledTableCell>
                {type === 'log' &&
                  <StyledTableCell align="center">Contador de uso</StyledTableCell>
                }

                <StyledTableCell align="center">Último registro</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {data.map((log) => (
                <StyledTableRow key={log.id}>
                  <StyledTableCell component="th" scope="row"> {log.id} </StyledTableCell>
                  <StyledTableCell align="center"> {log.app} </StyledTableCell>
                  <StyledTableCell align="center" onClick={e => { setSelectedCompany(e.target.innerText); setTagLog('') }}> <a href="#">{log.empresa}</a> </StyledTableCell>
                  <StyledTableCell align="center" onClick={e => { setTagLog(e.target.innerText); setSelectedCompany(log.empresa) }}> <a href="#">{log.id_action}</a>  </StyledTableCell>
                  {type === 'log' &&
                    <StyledTableCell align="center"> {log.quantity_by_date} </StyledTableCell>
                  }
                  <StyledTableCell align="center"> {format(new Date(log.created_at), 'dd/MM/yyyy HH:mm')} </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>

        </TableContainer>
      }




    </Fragment>
  );
}