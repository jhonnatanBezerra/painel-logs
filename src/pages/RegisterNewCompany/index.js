import React, { useState, useRef, useEffect } from "react";
import {
  Backdrop, Box, Button, Checkbox,
  Chip,
  CircularProgress, FormControl,
  FormControlLabel, FormGroup,
  InputAdornment, InputLabel,
  MenuItem, OutlinedInput,
  TextField,
} from "@mui/material";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import brLocale from 'date-fns/locale/pt-BR'
import { Layout } from '../../components/Layout'
import editIcon from '../../assets/icons/edit.svg'
import axios from 'axios'
import { format, addDays, addMonths } from "date-fns";

import { Link, useHistory, } from "react-router-dom";

const planos = [
  { id: '01', nome: 'Plano Físcal', mountPrice: 145.00, instalation: 380.00 },
  { id: '02', nome: 'Plano Essencial', mountPrice: 185.00, instalation: 580.00 },
  { id: '03', nome: 'Plano Pró', mountPrice: 225.00, instalation: 680.00 },
]

const paymentMethods = [
  { id: '01', nome: "Pix", },
  { id: '02', nome: "Boleto" }
]

const valueForComputer = 25.00

export const RegisterNewCompany = () => {

  const [cnpj, setCnpj] = useState();
  // novos dados
  const [currentDate] = useState(new Date());
  const inputRef = useRef(null);
  const [isReady, setIsReady] = useState(false);
  const [dataQueryCNPJ, setDataQueryCNPJ] = useState([]);
  const [dataQueryCityAndState, setDataQueryCityAndState] = useState([]);
  const [dataQueryIE, setDataQueryCNPJIE] = useState([]);
  const [dataContact, setDataContact] = useState([]);
  const [dataOwner, setDataOwner] = useState([]);
  const [dataContract, setDataContract] = useState({});

  const [selectedPlan, setSelectedPlan] = useState(planos[1].nome);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(paymentMethods[0].nome);
  const [error, setError] = useState('');


  const history = useHistory();



  const maskCNPJ = (value) => {

    value = value.replace(/\D/g, '');

    return value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");

  }

  const maskCPF = (value) => {
    value = value.replace(/\D/g, '');
    return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");

  }

  const maskPhone = (value) => {
    value = value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");

    return value;

  }

  const queryCNPJ = async () => {
    try {

      const document = cnpj.replaceAll('.', '').replaceAll('/', '').replaceAll('-', '');
      setError('')


      setIsReady(true);
      const { data } = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${document}`);
      setDataQueryCNPJ(data);
      console.log('Dados CNPJ -> ', data);
      queryCityAndState(data.cep);
      queryIE(document, data.uf);


    } catch (error) {

      setError(error.response.data.message);

      // console.log(error.response.data.message);

      setDataQueryCNPJ([]);

    }
    finally {

      setIsReady(false);
      inputRef.current.focus();

    }
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

  const queryCityAndState = async (cep) => {
    try {
      setIsReady(true)
      const { data } = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`);
      setDataQueryCityAndState(data);
      console.log('Dados CIDADE -> ', data);
    } catch (error) {
      console.log('erro consulta CIDADE&ESTADO');
    }
    finally {
      setIsReady(false)
    }
  }

  const queryIE = async (cnpj, state) => {
    setIsReady(true)
    const keys = ['06de3304-b4f7-4c1d-ad1e-efca02c59872-139c8fce-2431-423d-9e27-b853e6df2e25', '94ba3490-1f0f-44b5-8d70-cbc284c6d2ea-990eb578-b185-412b-b813-fe00f288b70a']
    const keyToUse = keys[Math.floor(Math.random() * 2)];

    try {
      const { data } = await axios.get(`https://api.cnpja.com/office/${cnpj}?registrations=${state}`, {
        headers: {
          'Authorization': keyToUse,
        }
      });

      setDataQueryCNPJIE(data);
      console.log('Dados IE -> ', data);

    } catch (error) {
      console.log('erro consulta IE');

    }
    finally {
      setIsReady(false);
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      queryCNPJ();
    }

  }

  const handleSave = (e) => {
    e.preventDefault();
  }

  const handleChangePlan = (e) => {
    setSelectedPlan(e.target.value);
    setDataContact({ ...dataContact, selectedPlan: e.target.value });
  }

  const handleChangePaymentMethod = (e) => {
    setSelectedPaymentMethod(e.target.value);
    setDataContact({ ...dataContact, selectedPaymentMethod: e.target.value });
  }

  const handleExportData = (e) => {


    const data = {

      company_data: {
        company_name: dataQueryCNPJ?.razao_social,
        fantasy_name: dataQueryCNPJ?.nome_fantasia,
        cnpj: dataQueryCNPJ?.cnpj,
        state_registration: dataQueryIE?.registrations[0].number,
        email: dataQueryIE?.emails[0].address,
        port: dataQueryCNPJ?.porte,
        situation_register: dataQueryCNPJ?.descricao_situacao_cadastral,

        adress: {
          street: dataQueryCNPJ?.logradouro,
          number: dataQueryCNPJ?.numero,
          district: dataQueryCNPJ?.bairro,
          zip_code: dataQueryCNPJ?.cep,
          state: dataQueryCNPJ?.uf,
          city_name: dataQueryCNPJ?.municipio,
        },

      },


      contact: {
        name: dataContact?.contact_name,
        phone: dataContact?.contact_phone,
      },

      owner_data: {
        name: dataOwner?.nameOwner,
        cpf: dataOwner?.cpf,
        phone: dataOwner?.phoneOwner,
      },

      contract_data: {
        plan_selected: selectedPlan,
        number_of_computer: dataContract?.numberOfComputers,
        date_of_instalation: dataContract?.dateInstalations,
        value_of_instalation: dataContract?.valueInstalations,
        bank_slip_date: dataContract?.bankSlipDate,
        value_monthly: dataContract?.valueOfMonthly,
        due_day: dataContract?.dueDay,
        due_month_and_year: dataContract?.dueMounthYear,
        contract_validation: dataContract?.proposalDate,
        contract_notes: dataContract?.notes,
        payment_method: selectedPaymentMethod,
        created_at: new Date()

      }


    }


    e.preventDefault();


    history.push({
      pathname: '/pdf',
      state: { data },

    });
  }

  return (
    <Layout pageName={'Cadastro'} icon={editIcon} >
      <div style={{ paddingTop: '10px', height: '100%', overflow: 'scroll', background: "#FFF", padding: '25px', borderRadius: '8px' }}>

        <Loader isReady={isReady} />

        <form onSubmit={handleSave}>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2 style={{ paddingRight: '1rem' }} >Dados da empresa</h2>

              {dataQueryCNPJ && dataQueryCNPJ.descricao_situacao_cadastral === 'BAIXADA' && <Chip label={`${dataQueryCNPJ.descricao_situacao_cadastral} / ${dataQueryCNPJ.descricao_motivo_situacao_cadastral}`} color={"error"} />}
              {error && <Chip label={error} color={"error"} />}


            </div>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>

              <TextField
                InputLabelProps={{ shrink: true }}
                onChange={e => setCnpj(maskCNPJ(e.target.value))}
                onKeyPress={e => handleKeyPress(e)}
                onBlur={queryCNPJ}
                required
                fullWidth id="outlined-basic"
                label="CNPJ"
                variant="outlined"
                sx={{ maxWidth: '25ch' }} />

              <TextField
                InputLabelProps={{ shrink: true }}
                value={dataQueryCNPJ?.nome_fantasia}
                fullWidth id="outlined-basic"
                label="Nome fantasia"
                variant="outlined"
                disabled
              />

              <TextField
                InputLabelProps={{ shrink: true }}
                value={dataContact?.contact_name}
                onChange={e => setDataContact({ ...dataContact, contact_name: e.target.value })}
                fullWidth id="outlined-basic"
                label="Contato"
                sx={{ maxWidth: '25ch' }}
                inputRef={inputRef}
              />

              <TextField
                InputLabelProps={{ shrink: true }}
                value={dataContact?.contact_phone && maskPhone(dataContact?.contact_phone)}
                onChange={e => setDataContact({ ...dataContact, contact_phone: e.target.value })}
                fullWidth id="outlined-basic"
                label="Telefone"
                sx={{ maxWidth: '25ch' }}
              />



            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>

              <TextField
                InputLabelProps={{ shrink: true }}
                value={dataQueryCNPJ?.razao_social}
                fullWidth id="outlined-basic"
                label="Razão social"
                disabled
              />

              <TextField
                InputLabelProps={{ shrink: true }}
                value={dataQueryIE?.registrations !== undefined ? dataQueryIE?.registrations[0].number : ''}
                fullWidth id="outlined-basic"
                label="Inscrição estadual"
                variant="outlined"
                disabled
                sx={{ maxWidth: '25ch' }}
              />



              <TextField
                InputLabelProps={{ shrink: true }}
                value={dataQueryCNPJ?.data_inicio_atividade && format(new Date(dataQueryCNPJ?.data_inicio_atividade), 'dd/MM/yyyy')}
                fullWidth id="outlined-basic"
                label="Data de inicio de atividade"
                variant="outlined"
                disabled
                sx={{ maxWidth: '25ch' }} />

            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                value={dataQueryCNPJ?.logradouro}
                fullWidth id="outlined-basic"
                label="Endereço"
                variant="outlined"
                disabled
              />


              <TextField
                value={dataQueryCNPJ?.numero}
                InputLabelProps={{ shrink: true }}
                fullWidth id="outlined-basic"
                label="Número"
                variant="outlined"
                disabled
                sx={{ maxWidth: '10ch' }} />

              <TextField
                value={dataQueryCNPJ?.bairro}
                InputLabelProps={{ shrink: true }}
                fullWidth id="outlined-basic"
                label="Bairro"
                disabled
                variant="outlined"
                sx={{ maxWidth: '25ch' }}
              />

              <TextField
                value={dataQueryCNPJ.uf}
                InputLabelProps={{ shrink: true }}
                fullWidth id="outlined-basic"
                label="UF"
                variant="outlined"
                disabled
                sx={{ maxWidth: '10ch' }} />

              <TextField
                value={dataQueryCityAndState?.city !== undefined ? dataQueryCityAndState?.city : ''}
                InputLabelProps={{ shrink: true }}
                fullWidth id="outlined-basic"
                label="Cidade"
                variant="outlined"
                disabled
                sx={{ maxWidth: '25ch' }} />

              <TextField
                value={dataQueryCNPJ?.complemento}
                InputLabelProps={{ shrink: true }}
                fullWidth id="outlined-basic"
                label="Complemento"
                disabled
                variant="outlined"
                sx={{ maxWidth: '25ch' }} />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>

              <TextField
                InputLabelProps={{ shrink: true }}
                value={dataQueryCNPJ?.porte}
                fullWidth id="outlined-basic"
                label="Porte"
                variant="outlined"
                disabled
                sx={{ maxWidth: '25ch' }} />

              {dataQueryCNPJ?.opcao_pelo_simples ?
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={dataQueryCNPJ?.opcao_pelo_simples && 'Simples Nacional'}
                  fullWidth id="outlined-basic"
                  label="Regime tributário"
                  variant="outlined"
                  disabled
                  sx={{ maxWidth: '25ch' }}
                />

                :

                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={dataQueryCNPJ?.opcao_pelo_simples && 'Microeemprendedor Individual'}
                  fullWidth id="outlined-basic"
                  label="Regime tributário"
                  variant="outlined"
                  disabled
                  sx={{ maxWidth: '25ch' }}
                />

              }

              <TextField
                value={dataQueryCNPJ?.cnae_fiscal}
                InputLabelProps={{ shrink: true }}
                fullWidth id="outlined-basic"
                label="CNAE fiscal"
                disabled
                sx={{ maxWidth: '20ch' }} />

              <TextField
                value={dataQueryCNPJ?.cnae_fiscal_descricao}
                InputLabelProps={{ shrink: true }}
                fullWidth id="outlined-basic"
                label="CNAE fiscal descrição"
                disabled
                variant="outlined" />

            </Box>

          </Box>

          {/* Dados do proprietario */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>


            <h2>Dados do responsável</h2>


            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>

              <TextField
                value={dataOwner?.nameOwner}
                onChange={e => setDataOwner({ ...dataOwner, nameOwner: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
                label="Nome"
                required
                variant="outlined" />

              <TextField
                value={dataOwner?.cpf && maskCPF(dataOwner?.cpf)}
                onChange={e => setDataOwner({ ...dataOwner, cpf: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
                label="CPF "
                required
                variant="outlined"
                sx={{ maxWidth: '35ch' }} />

              <TextField
                value={dataOwner?.phoneOwner && maskPhone(dataOwner?.phoneOwner)}
                onChange={e => setDataOwner({ ...dataOwner, phoneOwner: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth
                label="Telefone"
                required
                variant="outlined"
                sx={{ maxWidth: '35ch' }} />

            </Box>
          </Box>

          {/* Dados da proposta */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>


            <h2>Dados da proposta</h2>


            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>

              <TextField
                value={dataContract?.selectedPlan ? dataContract?.selectedPlan : selectedPlan}
                onChange={handleChangePlan}
                id="outlined-select-currency"
                select
                fullWidth
                label="Plano contratado"
                sx={{ maxWidth: '25ch' }}
              >
                {planos.map((option) => (
                  <MenuItem key={option.id} value={option.nome} >
                    {option.nome}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                value={dataContract?.numberOfComputers ? dataContract?.numberOfComputers : setDataContract({ ...dataContract, numberOfComputers: 1 })}
                onChange={e => setDataContract({ ...dataContract, numberOfComputers: e.target.value })}
                id="outlined-select-currency"
                fullWidth
                type={'number'}
                label="Quantidade de terminais"
                sx={{ maxWidth: '18ch' }}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
                <div>
                  <DatePicker
                    mask={'__/__/____'}
                    value={dataContract?.dateInstalations ? dataContract?.dateInstalations : setDataContract({ ...dataContract, dateInstalations: addDays(currentDate, 3) })}
                    onChange={e => setDataContract({ ...dataContract, dateInstalations: e })}
                    label="Previsão de instalação"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </LocalizationProvider>

              <FormControl  >
                <InputLabel htmlFor="outlined-adornment-amount">Valor implantação</InputLabel>
                <OutlinedInput
                  value={dataContract?.valueInstalations ? formatMoney(dataContract?.valueInstalations) : setDataContract({ ...dataContract, valueInstalations: planos[1].instalation })}
                  onChange={e => setDataContract({ ...dataContract, valueInstalations: e.target.value })}
                  id="outlined-adornment-amount"
                  startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                  label="Valor implantação"
                />
              </FormControl>

              <TextField
                InputLabelProps={{ shrink: true }}
                // value={selectedPaymentMethod}
                value={selectedPaymentMethod}
                // value={dataContract?.selectedPaymentMethod ? dataContract?.selectedPaymentMethod : setDataContract({ ...dataContract, selectedPaymentMethod: selectedPaymentMethod })}
                onChange={handleChangePaymentMethod}
                select
                fullWidth
                label="Forma de pagamento"
                sx={{ maxWidth: '25ch' }}
              >
                {paymentMethods.map((option) => (
                  <MenuItem key={option.id} value={option.nome} >
                    {option.nome}
                  </MenuItem>
                ))}
              </TextField>



            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>


              <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
                <div>
                  <DatePicker
                    mask={'__/__/____'}
                    value={dataContract?.bankSlipDate ? dataContract?.bankSlipDate : setDataContract({ ...dataContract, bankSlipDate: addDays(currentDate, 3) })}
                    // value={dataContract?.dateInstalations ? dataContract?.dateInstalations : setDataContract({ ...dataContract, dateInstalations: addDays(currentDate, 3) })}

                    onChange={e => setDataContract({ ...dataContract, bankSlipDate: e })}
                    label="Vencimento do pagamento instalação"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </LocalizationProvider>



              <FormControl  >
                <InputLabel htmlFor="outlined-adornment-amount">Valor mensalidade</InputLabel>
                <OutlinedInput
                  value={dataContract?.valueOfMonthly ? formatMoney(dataContract?.valueOfMonthly) : setDataContract({ ...dataContract, valueOfMonthly: planos[1].mountPrice })}
                  onChange={e => setDataContract({ ...dataContract, valueOfMonthly: e.target.value })}
                  id="outlined-adornment-amount"
                  startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                  label="Valor mensalidade"
                />
              </FormControl>

              <TextField
                value={dataContract?.dueDay ? dataContract?.dueDay : setDataContract({ ...dataContract, dueDay: 1 })}
                onChange={e => setDataContract({ ...dataContract, dueDay: e.target.value })}
                id="outlined-select-currency"
                fullWidth
                type={'number'}
                label="Dia de vencimento"
                sx={{ maxWidth: '18ch' }}
              />

              <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
                <div>
                  <DatePicker
                    mask={'__/____'}
                    views={['year', 'month']}
                    value={dataContract?.dueMounthYear ? dataContract?.dueMounthYear : setDataContract({ ...dataContract, dueMounthYear: addMonths(currentDate, 1) })}
                    onChange={e => setDataContract({ ...dataContract, dueMounthYear: e })}
                    label="1° vencimento"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </LocalizationProvider>


              <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
                <div>
                  <DatePicker
                    mask={'__/__/____'}
                    value={dataContract?.proposalDate ? dataContract?.proposalDate : setDataContract({ ...dataContract, proposalDate: addDays(currentDate, 7) })}
                    onChange={e => setDataContract({ ...dataContract, proposalDate: e })}
                    label="Validade da proposta"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </LocalizationProvider>


            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                value={dataContract?.notes ? dataContract?.notes : ''}
                onChange={e => setDataContract({ ...dataContract, notes: e.target.value })}
                InputLabelProps={{ shrink: true }}
                label="Observações"
                fullWidth
                type={'text'}
                multiline
                rows={5}
                sx={{}}
              />
            </Box>


          </Box>

          {/* Pacotes adicionais */}
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>


            <h4>Pacotes adicionais</h4>


            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>

              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="SNGPC / Farmácia Popular;" />
                <FormControlLabel control={<Checkbox />} label="Modulo boleto bancário;" />
                <FormControlLabel control={<Checkbox />} label="Sped fiscal;" />

              </FormGroup>

              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Modulo produção;" />
                <FormControlLabel control={<Checkbox />} label="Controle de mesa + Comanda;" />
                <FormControlLabel control={<Checkbox />} label="SisCargas;" />
              </FormGroup>

              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="Gestão de entrega;" />
                <FormControlLabel control={<Checkbox />} label="Desossa;" />
                <FormControlLabel control={<Checkbox />} label="Modulo WhatsApp;" />
              </FormGroup>

              <FormGroup>
                <FormControlLabel control={<Checkbox />} label="PowerAdmin Mobile;" />
                <FormControlLabel control={<Checkbox />} label="Cotação;" />
              </FormGroup>


            </Box>



          </Box>

          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <Button type="submit" sx={{ width: '25ch' }} variant="contained">Salvar</Button>

            <Button sx={{ width: '25ch', }} onClick={handleExportData} color="success" variant="contained">Exportar dados</Button>
          </Box>


        </form>


      </div>
    </Layout >
  )

}


const Loader = ({ isReady }) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isReady}
      onClick={null}>
      <CircularProgress color="inherit" />
      <h1 style={{ marginLeft: '16px' }}>Pesquisando dados ...</h1>
    </Backdrop>
  )
}