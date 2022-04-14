import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Modelo } from './pages/Modelo';
import { ModeloHome } from './components/Modelo';


export const Routes = () => {
  return (
    <BrowserRouter>
      <Modelo />
      <Switch>
        {/* <Route path="/" exact component={Login} />
        <Route path="/telemetria" exact component={Telemetria} />
        <Route path="/agenda" exact component={Agenda} />
       
        <Route path="/teste" exact component={Testes} />
        <Route path="/register" exact component={RegisterNewCompany} />
        <Route path="/newUser" exact component={Register} />
        <Route path="/atendimento" exact component={Atendimento} />
        <Route path="/pdf" exact component={PDFModel} />
        <Route path="/contrato" exact component={NovoContrato} /> */}

        <Route path="/teste" exact component={ModeloHome} />

      </Switch>
    </BrowserRouter>
  )
}