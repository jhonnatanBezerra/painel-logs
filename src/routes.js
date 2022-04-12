import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Telemetria } from './pages/Telemetria';
import { Agenda } from './pages/Agenda';
import { Testes, } from './pages/Testes';
import { Login } from './pages/Login';
import { RegisterNewCompany } from './pages/RegisterNewCompany';
import { Register } from './pages/Register';
import { Atendimento } from './pages/Atendimento';
import { PDFModel } from './pages/PDFModel';


export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/telemetria" exact component={Telemetria} />
        <Route path="/agenda" exact component={Agenda} />
        <Route path="/teste" exact component={Testes} />
        <Route path="/register" exact component={RegisterNewCompany} />
        <Route path="/newUser" exact component={Register} />
        <Route path="/atendimento" exact component={Atendimento} />
        <Route path="/pdf" exact component={PDFModel} />

      </Switch>
    </BrowserRouter>
  )
}