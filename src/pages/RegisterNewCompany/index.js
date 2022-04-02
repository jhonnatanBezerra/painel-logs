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

const planos = [
  { id: '01', nome: 'Plano Físcal', mountPrice: 145.00, instalation: 380.00 },
  { id: '02', nome: 'Plano Essencial', mountPrice: 185.00, instalation: 580.00 },
  { id: '03', nome: 'Plano Pró', mountPrice: 225.00, instalation: 680.00 },
]

const valueForComputer = 25.00

export const RegisterNewCompany = () => {

  const [cnpj, setCnpj] = useState();
  const [dataCompany, setDataCompany] = useState([]);
  const [dataCity, setDataCity] = useState([])
  const [isReady, setIsReady] = useState(false);
  const [currentDate] = useState(new Date());
  const [dataContract, setDataContract] = useState({});
  const [ie, setIe] = useState('');
  const inputRef = useRef(null);



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

      if (document !== dataCompany.cnpj && document !== '' && cnpj !== undefined) {

        setIsReady(true)
        const { data } = await axios.get(`https://brasilapi.com.br/api/cnpj/v1/${document}`);
        console.log('DADOS CNPJ ========================', data);
        setDataCompany(data);
        setDataContract({ ...dataContract, cnpj: data })
        queryCityAndState(data.cep);
        queryIE(document, data.uf);

      }
    } catch (error) {

      setDataCompany([]);
    }
    finally {

      setIsReady(false);
      inputRef.current.focus();

    }
  }

  const queryCityAndState = async (cep) => {
    try {
      setIsReady(true)
      const { data } = await axios.get(`https://brasilapi.com.br/api/cep/v2/${cep}`);
      setDataContract({ ...dataContract, ...data })
      setDataCity(data);
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
      console.log(data);
      setDataContract({ ...dataContract, ...data })
      setIe(data.registrations[0].number);
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
    console.log('dados do formulario => ', dataContract);
    alert('enviado  ')
  }

  const handleChangePlan = (e) => {
    console.log(e.target.value, planos);

  }

  const handleExportData = () => {
    console.log('dados da empresa -> ', dataContract)
  }

  return (
    <Layout pageName={'Cadastro'} icon={editIcon} >
      <div style={{ paddingTop: '10px', height: '100%', overflow: 'scroll', background: "#FFF", padding: '25px', borderRadius: '8px' }}>

        <Loader isReady={isReady} />

        <form onSubmit={handleSave}>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <h2 style={{ paddingRight: '1rem' }} >Dados da empresa</h2>

              {/* {dataCompany && dataCompany.descricao_situacao_cadastral === 'ATIVA' && <Chip label="Empresa ativaA" color={"primary"} />} */}
              {dataCompany && dataCompany.descricao_situacao_cadastral === 'BAIXADA' && <Chip label={`${dataCompany.descricao_situacao_cadastral} / ${dataCompany.descricao_motivo_situacao_cadastral}`} color={"error"} />}

            </div>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>

              <TextField
                InputLabelProps={{ shrink: true }}
                value={cnpj}
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
                value={dataCompany?.nome_fantasia}
                fullWidth id="outlined-basic"
                label="Nome fantasia"
                variant="outlined"
                disabled
              />

              <TextField
                InputLabelProps={{ shrink: true }}
                value={dataContract?.contact}
                fullWidth id="outlined-basic"
                label="Contato"
                sx={{ maxWidth: '25ch' }}
                inputRef={inputRef}
              />

              <TextField
                InputLabelProps={{ shrink: true }}
                value={dataContract?.foneContact}
                fullWidth id="outlined-basic"
                label="Telefone"
                sx={{ maxWidth: '25ch' }}
              />



            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>

              <TextField
                InputLabelProps={{ shrink: true }}
                value={dataCompany?.razao_social}
                fullWidth id="outlined-basic"
                label="Razão social"
                disabled
              />

              <TextField
                InputLabelProps={{ shrink: true }}
                value={ie}
                fullWidth id="outlined-basic"
                label="Inscrição estadual"
                variant="outlined"
                disabled
                sx={{ maxWidth: '25ch' }}
              />



              <TextField
                InputLabelProps={{ shrink: true }}
                value={dataCompany?.data_inicio_atividade && format(new Date(dataCompany?.data_inicio_atividade), 'dd/MM/yyyy')}
                fullWidth id="outlined-basic"
                label="Data de inicio de atividade"
                variant="outlined"
                disabled
                sx={{ maxWidth: '25ch' }} />

            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <TextField
                InputLabelProps={{ shrink: true }}
                value={dataCompany?.logradouro}
                fullWidth id="outlined-basic"
                label="Endereço"
                variant="outlined"
                disabled
              />


              <TextField
                value={dataCompany?.numero}
                InputLabelProps={{ shrink: true }}
                onChange={e => setDataCompany({ ...dataCompany, numero: e.target.value })}
                fullWidth id="outlined-basic"
                label="Número"
                variant="outlined"
                disabled
                sx={{ maxWidth: '10ch' }} />

              <TextField
                value={dataCompany?.bairro}
                InputLabelProps={{ shrink: true }}
                fullWidth id="outlined-basic"
                label="Bairro"
                disabled
                variant="outlined"
                sx={{ maxWidth: '25ch' }}
              />

              <TextField
                value={dataCity.state}
                InputLabelProps={{ shrink: true }}
                fullWidth id="outlined-basic"
                label="UF"
                variant="outlined"
                disabled
                sx={{ maxWidth: '10ch' }} />

              <TextField
                value={dataCity?.city}
                InputLabelProps={{ shrink: true }}
                fullWidth id="outlined-basic"
                label="Cidade"
                variant="outlined"
                disabled
                sx={{ maxWidth: '25ch' }} />

              <TextField
                value={dataCompany?.complemento}
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
                value={dataCompany?.porte}
                fullWidth id="outlined-basic"
                label="Porte"
                variant="outlined"
                disabled
                sx={{ maxWidth: '25ch' }} />

              {dataCompany?.opcao_pelo_simples ?
                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={dataCompany?.opcao_pelo_simples && 'Simples nacional'}
                  fullWidth id="outlined-basic"
                  label="Regime tributário"
                  variant="outlined"
                  disabled
                  sx={{ maxWidth: '25ch' }}
                />

                :

                <TextField
                  InputLabelProps={{ shrink: true }}
                  value={dataCompany?.opcao_pelo_simples && 'Simples nacional'}
                  fullWidth id="outlined-basic"
                  label="Regime tributário"
                  variant="outlined"
                  disabled
                  sx={{ maxWidth: '25ch' }}
                />

              }

              <TextField
                value={dataCompany?.cnae_fiscal}
                InputLabelProps={{ shrink: true }}
                fullWidth id="outlined-basic"
                label="CNAE fiscal"
                disabled
                sx={{ maxWidth: '20ch' }} />

              <TextField
                value={dataCompany?.cnae_fiscal_descricao}
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
                value={dataContract?.nameOwner}
                onChange={e => setDataContract({ ...dataContract, nameOwner: e.target.value })}
                InputLabelProps={{ shrink: true }}
                fullWidth id="outlined-basic"
                label="Nome"
                required
                variant="outlined" />

              <TextField
                value={dataContract?.cpf}
                onChange={e => setDataContract({ ...dataContract, cpf: maskCPF(e.target.value) })}
                InputLabelProps={{ shrink: true }}
                fullWidth id="outlined-basic"
                label="CPF "
                required
                variant="outlined"
                sx={{ maxWidth: '35ch' }} />

              <TextField
                value={dataContract?.phone}
                onChange={e => setDataContract({ ...dataContract, phone: maskPhone(e.target.value) })}
                InputLabelProps={{ shrink: true }}
                fullWidth id="outlined-basic"
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
                value={dataContract?.selectedPlan ? dataContract?.selectedPlan : setDataContract({ ...dataContract, selectedPlan: planos[1].nome })}
                onChange={handleChangePlan}
                // onChange={e => setDataContract({ ...dataContract, selectedPlan: e.target.value })}
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
                value={dataContract?.numberTerminals ? dataContract?.numberTerminals : setDataContract({ ...dataContract, numberTerminals: 1 })}
                onChange={e => setDataContract({ ...dataContract, numberTerminals: e.target.value })}
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
                  value={dataContract?.valueInstalations ? dataContract?.valueInstalations : setDataContract({ ...dataContract, valueInstalations: planos[1].instalation })}
                  onChange={e => setDataContract({ ...dataContract, valueInstalations: e.target.value })}
                  id="outlined-adornment-amount"
                  startAdornment={<InputAdornment position="start">R$</InputAdornment>}
                  label="Valor implantação"
                />
              </FormControl>

              <LocalizationProvider dateAdapter={AdapterDateFns} locale={brLocale}>
                <div>
                  <DatePicker
                    mask={'__/__/____'}
                    value={dataContract?.dateInstalations ? dataContract?.dateInstalations : setDataContract({ ...dataContract, dateInstalations: addDays(currentDate, 3) })}
                    onChange={e => setDataContract({ ...dataContract, dateInstalations: e })}
                    label="Vencimento do pagamento instalação"
                    renderInput={(params) => <TextField {...params} />}
                  />
                </div>
              </LocalizationProvider>

            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>

              <FormControl  >
                <InputLabel htmlFor="outlined-adornment-amount">Valor mensalidade</InputLabel>
                <OutlinedInput
                  value={dataContract?.valueOfMonthly ? dataContract?.valueOfMonthly : setDataContract({ ...dataContract, valueOfMonthly: planos[1].mountPrice })}
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
                InputLabelProps={{ shrink: true }}
                id="outlined-multiline-flexible"
                label="Observações"
                fullWidth
                type={'text'}
                multiline
                rows={5}
                // onChange={e => setDataContract({ ...dataContract, notes: e })}
                // value={dataContract?.notes ? dataContract?.notes.toString() : ''}
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