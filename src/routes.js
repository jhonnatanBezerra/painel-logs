import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { CompanyModules } from './pages/CompanyModules';
import { Test } from './pages/Test';
import { TableTest } from './pages/TableTest';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Test} />
        <Route path="/home" exact component={Home} />
        <Route path="/modules" exact component={CompanyModules} />
        <Route path="/telemetria" exact component={TableTest} />

      </Switch>
    </BrowserRouter>
  )
}