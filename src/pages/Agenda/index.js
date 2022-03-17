import React from 'react';
import { Layout } from '../../components/Layout';
import './styles.css';
import callIcon from '../../assets/icons/call.svg'
import { CardPhone } from '../../components/CardPhone';


export const Agenda = () => {


  const data = Array(150).fill("");

  return (
    <Layout pageName={'Agenda telefonica'} icon={callIcon} >

      <div style={{ overflowY: 'scroll', }}>

        <table>
          <tr>
            <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>ID</th>
            <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>APP</th>
            <th style={{ padding: '35px', color: '#1f4173', textAlign: 'center', fontWeight: 'bold' }}>Empresa</th>

          </tr>

          {data.map((index) => (
            <tr key={index}>

              <td td style={{ padding: '35px', color: '#1f4173', borderTop: '1px solid #e1e1e1', textAlign: 'center' }} >Teste</td>
              <td style={{ padding: '35px', color: '#1f4173', borderTop: '1px solid #e1e1e1', textAlign: 'center' }} >teste</td>
              <td style={{ padding: '35px', color: '#1f4173', borderTop: '1px solid #e1e1e1', textAlign: 'center' }} >teste</td>

            </tr>
          ))}

        </table>

      </div>

    </Layout>
  );
}