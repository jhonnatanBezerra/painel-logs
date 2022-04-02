import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Telemetria } from './pages/Telemetria';
import { Agenda } from './pages/Agenda';
import { Testes, } from './pages/Testes';
import { Login } from './pages/Login';
import { RegisterNewCompany } from './pages/RegisterNewCompany';


export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/telemetria" exact component={Telemetria} />
        <Route path="/agenda" exact component={Agenda} />
        <Route path="/teste" exact component={Testes} />
        <Route path="/register" exact component={RegisterNewCompany} />

      </Switch>
    </BrowserRouter>
  )
}