import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Telemetria } from './pages/Telemetria';
import { Agenda } from './pages/Agenda';

export const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Telemetria} />
        <Route path="/agenda" exact component={Agenda} />

      </Switch>
    </BrowserRouter>
  )
}