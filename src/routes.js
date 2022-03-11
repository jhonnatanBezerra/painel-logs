import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { Home } from './pages/Home';
import { CompanyModules } from './pages/CompanyModules';
import { Test } from './pages/Test';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Test} />
        <Route path="/home" exact component={Home} />
        <Route path="/modules" exact component={CompanyModules} />

      </Switch>
    </BrowserRouter>
  )
}