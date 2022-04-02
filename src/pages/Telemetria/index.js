import React, { useEffect, useState } from 'react';

import { Layout } from '../../components/Layout';
import { CardApp } from '../../components/CardApp';
import { format } from 'date-fns';
import axios from 'axios';
import { ModalErros } from '../../components/ModalErros';
import { Backdrop, Chip, CircularProgress, Stack } from '@mui/material';
import MdPhone from '@mui/icons-material/SwapHoriz';
import './styles.css';
import teleIcon from '../../assets/icons/telemetria.svg';

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
    <Layout pageName={'Telemetria'} icon={teleIcon} >

      <ModalErros open={modal} closeModal={setModal} data={selectedData} />



      <div style={{ overflowY: 'scroll', width: '100%' }}>
        {/* <div style={{ overflowY: 'scroll' }}> */}

        <div style={{ display: 'flex', gap: '20px', overflow: 'scroll', maxWidth: '100%', minHeight: '110px' }}>
          <CardApp titleApp={'PowerAdmin Mobile'} numberOfLogs={logs.powerAdminMobile} />
          <CardApp titleApp={'Comanda JB'} numberOfLogs={logs.comanda} />
          <CardApp titleApp={'Servidor mormot'} numberOfLogs={logs.mormot} />
          <CardApp titleApp={'Servidor whatsapp'} numberOfLogs={logs.whatsapp} />
          <CardApp titleApp={'PowerAdmin Web'} numberOfLogs={logs.powerAdminWeb} />
        </div>

        <div style={{}} >

          <div style={{ padding: '20px 0', }}>
            <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }} >
              {type ? <Chip color={"primary"} deleteIcon={<MdPhone />} onDelete={() => handleDeletFilter('type')} label={type === 'log' ? 'Registro de logs' : 'Registro de erros'} /> : null}
              {selectedCompany ? <Chip color={"primary"} onDelete={() => handleDeletFilter('company')} label={selectedCompany} /> : null}
              {tagLog ? <Chip color="primary" onDelete={() => handleDeletFilter('log')} label={tagLog} /> : null}
            </Stack>
          </div>

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

            <table>
              <tr>
                <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>ID</th>
                <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>APP</th>
                <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>Empresa</th>
                <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>LOG</th>

                {type === 'log' &&
                  <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>Contador de uso</th>
                }

                {type === 'error' &&
                  <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>Detalhamento do erro</th>
                }
                <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>Último registro</th>
              </tr>

              {data.map((log) => (
                <tr key={log.id}>
                  <td td style={{ padding: '35px', color: '#1f4173', borderTop: '1px solid #e1e1e1', textAlign: 'center' }} >{log.id}</td>
                  <td style={{ padding: '35px', color: '#1f4173', borderTop: '1px solid #e1e1e1', textAlign: 'center' }}>{log.app}</td>
                  <td style={{ padding: '35px', color: '#1f4173', borderTop: '1px solid #e1e1e1', textAlign: 'center' }} onClick={e => { setSelectedCompany(e.target.innerText); setTagLog('') }} >{log.empresa}</td>
                  <td style={{ padding: '35px', color: '#1f4173', borderTop: '1px solid #e1e1e1', textAlign: 'center' }} onClick={e => { setTagLog(e.target.innerText); setSelectedCompany(log.empresa) }}>{log.id_action}</td>
                  {type === 'log' &&
                    <td style={{ padding: '35px', color: '#1f4173', borderTop: '1px solid #e1e1e1', textAlign: 'center' }}>{log.quantity_by_date}</td>
                  }
                  {type === 'error' &&
                    <td style={{ padding: '35px', color: '#1f4173', borderTop: '1px solid #e1e1e1', textAlign: 'center' }} onClick={() => { setModal(true); setSelectedData(log); }} >Ver detalhes</td>
                  }
                  <td style={{ padding: '35px', color: '#1f4173', borderTop: '1px solid #e1e1e1', textAlign: 'center' }}>{format(new Date(log.created_at), 'dd/MM/yyyy HH:mm')}</td>
                </tr>
              ))}

            </table>
          }
        </div>
      </div>

    </Layout>
  );
}