import React, { Fragment, useEffect, useState } from 'react';
import teleIcon from '../../assets/icons/telemetria.svg'
import { CardApp } from '../CardApp';
import axios from 'axios';
import MdPhone from '@mui/icons-material/SwapHoriz';
import { Table, Chip, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Backdrop, CircularProgress, Stack } from '@mui/material'
import { format } from 'date-fns';
import './styles.css';
import { ModalErros } from '../ModalErros';


export const Telemetria = () => {

  const [data, setData] = useState([])
  const [selectedCompany, setSelectedCompany] = useState('');
  const [type, setType] = useState('log')
  const [tagLog, setTagLog] = useState('');
  const [isFinish, setIsFinish] = useState(false);
  const [logs, setLogs] = useState([]);
  const [allLastDate, setAllLastDate] = useState([]);
  const [modal, setModal] = useState(false);
  const [selectedData, setSelectedData] = useState([]);

  useEffect(() => {

    getDataByCompany();

  }, [type, selectedCompany, tagLog])

  const getDataByCompany = async () => {

    setIsFinish(true);
    setAllLastDate([]);

    try {

      const { data } = await axios.get(`https://sisecf.app/log/api.php?view=6916316d3ce42c37cbe45a2895ebee077d473f94e80652c25323551b77091bfe&type=${type}&tag=${tagLog}&company=${selectedCompany}`, {
        headers: {
          'Content-Type': 'application/json',
          'auth': `85e9b0314345693bba49ee0a82e7110c7f94d30d554e466e89fcd78042eaa1e7`
        },
        timeout: 5000
      })

      setData(data);
      const response = groupBy(data, 'app')

      console.log(data);


      // getLastDateUse(data);

      const numberLogs = {
        powerAdminWeb: '00',
        powerAdminMobile: response['PowerAdmin Mobile V.2.0.0.0'].length,
        mormot: response['JBServerMormot'].length + response['JBServerMormot.exe'].length,
        comanda: response['Servidor Comanda V.: 2.0.0.1'].length + response['Servidor Comanda V.: 2.0.0.2'].length,
        whatsapp: response['ServidorZap'].length
      }

      setLogs(numberLogs);

    } catch (error) {

    }

    finally {
      setIsFinish(false)
    }
  }

  const getLastDateUse = async (data) => {
    if (type === 'log') {
      // const { data } = await axios.get(`https://sisecf.app/log/api.php?view=6916316d3ce42c37cbe45a2895ebee077d473f94e80652c25323551b77091bfe&history=726`, {
      let datas = [];
      data.map(async (e) => {

        const { data } = await axios.get(`https://sisecf.app/log/api.php?view=6916316d3ce42c37cbe45a2895ebee077d473f94e80652c25323551b77091bfe&history=${e.id}`, {
          headers: {
            'Content-Type': 'application/json',
            'auth': `85e9b0314345693bba49ee0a82e7110c7f94d30d554e466e89fcd78042eaa1e7`
          },
          timeout: 15000

        })

        datas.push({ id: e.id, lastDate: format(new Date(data[data.length - 1].created_at), 'dd/MM/yyyy HH:mm') })

        // console.log('ultimo => ', format(new Date(data[data.length - 1].created_at), 'dd/MM/yyyy HH:mm'));
        // console.log('ultimo => ', data);

        // return format(new Date(data[data.length - 1].created_at), 'dd/MM/yyyy HH:mm');
      })

      setAllLastDate(datas);
      console.log(datas);
      console.log('Fim...');

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

  const groupBy = (array, key) => {
    return array.reduce((acc, item) => ({
      ...acc,
      [item[key]]: [...(acc[item[key]] ?? []), item],
    }),
      {})
  }




  return (
    <Fragment>

      <ModalErros open={modal} closeModal={setModal} data={selectedData} />


      <div style={{ padding: '30px 35px 10px', width: 'calc(100vw - 275px)', display: 'flex', flexDirection: 'column', }}>

        <div style={{ display: 'flex', alignItems: 'center', }}>
          <h1 style={{ paddingRight: "16px", fontSize: '48px', color: '#6D6D6D' }}>Telemetria</h1>
          <img src={teleIcon} alt="icon" />
        </div>

        <div className='cardsApps scroll-x' >
          <CardApp titleApp={'PowerAdmin Mobile'} numberOfLogs={logs.powerAdminMobile} />
          <CardApp titleApp={'Comanda JB'} numberOfLogs={logs.comanda} />
          <CardApp titleApp={'Servidor mormot'} numberOfLogs={logs.mormot} />
          <CardApp titleApp={'Servidor whatsapp'} numberOfLogs={logs.whatsapp} />
          <CardApp titleApp={'PowerAdmin Web'} numberOfLogs={logs.powerAdminWeb} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>

          <div style={{ padding: '20px 0', }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }} >
              {type ? <Chip color={"primary"} deleteIcon={<MdPhone />} onDelete={() => handleDeletFilter('type')} label={type === 'log' ? 'Registro de logs' : 'Registro de erros'} /> : null}
              {selectedCompany ? <Chip color={"primary"} onDelete={() => handleDeletFilter('company')} label={selectedCompany} /> : null}
              {tagLog ? <Chip color="primary" onDelete={() => handleDeletFilter('log')} label={tagLog} /> : null}
            </Stack>
          </div>

          <div style={{ display: 'flex', maxHeight: 'calc(100vh - 340px)' }}>

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

              <TableContainer className='scroll-y' component={Paper}  >
                <Table aria-label="caption table">
                  <TableHead >
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell align="center">APP</TableCell>
                      <TableCell align="center">Empresa</TableCell>
                      <TableCell align="center">Log</TableCell>
                      {type === 'log' &&
                        <TableCell align="center">Contador de uso</TableCell>
                      }
                      {type === 'error' &&
                        <TableCell align="center">Detalhamento do erro</TableCell>
                      }


                      <TableCell align="center">Ultimo registro</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.map((log) => {


                      return (
                        <TableRow key={log.id}>
                          <TableCell component="th" scope="row">{log.id} </TableCell>
                          <TableCell align="center">{log.app}</TableCell>
                          <TableCell align="center" style={styles.pointer} onClick={e => { setSelectedCompany(e.target.innerText); setTagLog('') }} >{log.empresa}</TableCell>
                          <TableCell align="center" style={styles.pointer} onClick={e => { setTagLog(e.target.innerText); setSelectedCompany(log.empresa) }}>{log.id_action}</TableCell>
                          {type === 'log' &&
                            <TableCell align="center">{log.quantity_by_date}</TableCell>
                          }
                          {type === 'error' &&
                            <TableCell align="center" style={styles.pointer} onClick={() => { setModal(true); setSelectedData(log); }} >Ver detalhes</TableCell>
                          }
                          {/* <TableCell align="center">{allLastDate ? allLastDate[0].lastDate : 'null'}</TableCell> */}
                          <TableCell align="center">{format(new Date(log.created_at), 'dd/MM/yyyy HH:mm')}</TableCell>

                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>

            }
          </div>

        </div>


      </div>

    </Fragment>

  );
}

const styles = {
  pointer: {
    cursor: 'pointer'
  }
}