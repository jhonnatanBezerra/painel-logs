import React, { useEffect } from 'react';
import { useParams } from "react-router-dom";
import { format, addDays, addMonths } from "date-fns";
import * as extenso from 'extenso'

import { BsCheckSquare } from 'react-icons/bs';


export const PDFModel = (props) => {

  const { data } = props.location.state;

  console.log(data);

  const day = data.contract_data.due_day;
  const month = new Date(data.contract_data.due_month_and_year).getMonth();
  const year = new Date(data.contract_data.due_month_and_year).getFullYear();
  const dateOfDue = new Date(year, month, day);


  const maskPhone = (value) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");

    return value;

  }

  const formatMoney = (numberValue) => {

    if (typeof numberValue === 'number') {
      numberValue = numberValue.toString();
    }

    return parseFloat(numberValue)
      .toFixed(2) // casas decimais
      .replace('.', ',')
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  const validadeDays = () => {
    var created_at = data.contract_data.created_at;
    var validate_at = data.contract_data.contract_validation;
    var timeDiff = Math.abs(validate_at.getTime() - created_at.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

    return diffDays;
  }


  return (
    <div style={{ width: '100%', height: '100%', display: 'flex', }}>
      <div style={{ maxWidth: '840px', margin: '0 auto' }}>

        <section style={{ padding: '50px 0 70px', borderBottom: '1px solid #ccc' }}>
          <h1 style={{ fontWeight: '300', fontSize: '36px' }}>{data.company_data.fantasy_name} - {data.contact.name} {data.contact.phone && maskPhone(data.contact.phone)} - {data.company_data.adress.city_name}-{data.company_data.adress.state}</h1>
        </section>

        <section style={{ display: 'flex', flexDirection: 'column', padding: '10px 0px', borderBottom: '1px solid #ccc' }}>

          <span style={{ fontSize: '14pt', fontWeight: '500' }}>Proposta SisECF - JB SOFTWARE.</span>
          <span style={{ fontSize: '14pt', fontWeight: '500' }}>Empresa: {data.company_data.fantasy_name} - {data.contact.name} {data.contact.phone && maskPhone(data.contact.phone)} - {data.company_data.adress.city_name}-{data.company_data.adress.state} </span>
          <span style={{ fontSize: '14pt', fontWeight: '500' }}>PREVISAO DE INSTALAÇÃO: {format(new Date(data.contract_data.date_of_instalation), 'dd/MM/yyyy')}</span>

        </section>

        <section style={{ display: 'flex', flexDirection: 'column', padding: '10px 0px ', }}>
          <div style={{ display: 'flex' }}>
            <span style={{ fontSize: '12pt', fontWeight: '500' }}>Assinatura Mensal:&nbsp;&nbsp;</span>
            <p style={{ color: 'rgb(229, 158, 37)' }}>{data.contract_data.plan_selected}</p>
          </div>

          <div style={{ display: 'flex' }}>
            <span style={{ fontSize: '12pt', fontWeight: '500' }}>Implantação/Treinamento:&nbsp;&nbsp;</span>
            <p style={{ color: 'rgb(26, 157, 255)' }}> R$ {formatMoney(data.contract_data.value_of_instalation)} no {data.contract_data.payment_method} p/ {format(new Date(data.contract_data.bank_slip_date), 'dd/MM/yyyy')}</p>
          </div>

          <div style={{ display: 'flex' }}>
            <span style={{ fontSize: '12pt', fontWeight: '500' }}>Mensalidade:&nbsp;&nbsp;</span>
            <p style={{ color: 'rgb(85, 255, 144)' }}> R$ {formatMoney(data.contract_data.value_monthly)}  ** Boleto p/ {format(new Date(dateOfDue), 'dd/MM/yyyy')}</p>
          </div>

          <div style={{ display: 'flex' }}>
            <span style={{ fontSize: '12pt', fontWeight: '500' }}>Estação de Trabalho:&nbsp;&nbsp;</span>
            <p style={{ color: '' }}>{data.contract_data.number_of_computer} ({extenso(data.contract_data.number_of_computer)}) Computador</p>
          </div>

        </section>

        <section style={{ display: 'flex', flexDirection: 'column', padding: '10px 0px 50px', borderBottom: '1px solid #ccc' }}>
          <strong>Módulos :</strong>

          <ul style={{ listStyle: 'none' }}>
            <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <BsCheckSquare />
              <span>&nbsp; Gestão de Vendas [ Orçamentos, Pedidos, Comissão];</span>
            </li>

            <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <BsCheckSquare />
              <span>&nbsp; Emissão de Nota Fiscal de Consumidor Eletrônica -NFCe [Mod.65];</span>
            </li>

            <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <BsCheckSquare />
              <span>&nbsp; Emissão de Nota Fiscal Eletrônica-NFe [Mod.55];</span>
            </li>

            <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <BsCheckSquare />
              <span>&nbsp; Contas a Receber + Relatórios de Cobranças + Controle de Cheques de Terceiros;</span>
            </li>

            <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <BsCheckSquare />
              <span>&nbsp; Fluxo de Caixa;</span>
            </li>

            <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <BsCheckSquare />
              <span>&nbsp; Gestão de Estoque [</span>
            </li>

            <ul style={{ padding: '0 0 0 40px' }}>

              <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                <BsCheckSquare />
                <span>&nbsp; Lançamentos de Compras automatizada por Importação XML;</span>
              </li>

              <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                <BsCheckSquare />
                <span>&nbsp; Formação de Custo e Preço de Venda;</span>
              </li>

              <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                <BsCheckSquare size={24} />
                <span style={{ paddingLeft: '10px', textAlign: 'left  ' }}>Compras , Remessas, Bonificação, Devolução, Consumo Interno, Uso e Consumo, Baixa de Estoque decorrente de Perda por Vencimento;</span>
              </li>

              <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                <BsCheckSquare />
                <span>&nbsp; Auditoria de Estoque (Balanço);</span>
              </li>

            </ul>

            <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <BsCheckSquare />
              <span>&nbsp; Devolução de Fornecedores Automatizada por XML;</span>
            </li>

            <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <BsCheckSquare />
              <span>&nbsp; Contas a Pagar [Fornecedores];</span>
            </li>

            <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <BsCheckSquare />
              <span>&nbsp; Controle de Despesas(Plano de Contas Desburocratizado [ Custo Operacional da Empresa ])</span>
            </li>

            <ul style={{ padding: '0 0 0 40px' }}>

              <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                <BsCheckSquare />
                <span>&nbsp; Provisionamento de Despesas;</span>
              </li>

              <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
                <BsCheckSquare />
                <span>&nbsp; Impressão de Recibo de Pagamento;</span>
              </li>

            </ul>

            <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <BsCheckSquare />
              <span>&nbsp; Controle Bancário; </span>
            </li>

            <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <BsCheckSquare />
              <span>&nbsp; Folha de Pagamento ; </span>
            </li>

            <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <BsCheckSquare />
              <span>&nbsp; Demonstrativo de Resultados do Exercicio + Análise Gerencial [Informações Gerenciais]; </span>
            </li>

            <li style={{ display: 'flex', alignItems: 'center', margin: '5px 0' }}>
              <BsCheckSquare />
              <span>&nbsp; Multiusuário  possibilitando configuração de Acesso de cada usuário; </span>
            </li>



          </ul>

        </section>

        <section style={{ display: 'flex', flexDirection: 'column', padding: '10px 0px', borderBottom: '1px solid #ccc' }}>
          <span style={{ fontSize: '12pt', fontWeight: '500' }}>Suporte Online Ilimitado durante horário Comercial.</span>

          <ul>
            <ul style={{ padding: '0 0 0 80px' }}>
              <li>Suporte a Atualização de Obrigatoriedades da SEFAZ-MS;</li>
              <li>Suporte a Atualização/Reinstalação do Sistema em casos de Formatação do Computador;</li>
              <li>Suporte a Dúvidas através da Central de Atendimentos [ Skype, Telefone, WhatsApp];</li>

            </ul>
          </ul>


        </section>

        <section style={{ display: 'flex', flexDirection: 'column', padding: '10px 0px', borderBottom: '1px solid #ccc' }}>

          <span style={{ fontSize: '12pt', fontWeight: '500' }}>Requisitos/Sugestões para Implantação.</span>

          <ul style={{ padding: '0 0 0 40px' }}>

            <li>Computador com Sistema Operacional: Windows 10 , Windows Server 2016 ou  Superior.</li>

          </ul>


        </section>

        <section style={{ display: 'flex', flexDirection: 'column', padding: '10px 0px', }}>
          <p style={{ fontSize: '14px' }}>Contato : Luiz&nbsp;&nbsp;JB Software - 3461-5952 e  9-9965-9658&nbsp;&nbsp;Data {format(new Date(data.contract_data.created_at), 'dd/MM/yyyy')}  Valido por {validadeDays()} dias</p>
          <p style={{ fontSize: '14px' }}>Conheça mais a JB Software:&nbsp; www.sisecf.com</p>
        </section>

      </div>
    </div >

  );
}