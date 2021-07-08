import './App.css';
import PayrollForm from './components/payroll-form/payroll-form'
import Header from './components/header/header';
import HomePage from './components/home/home'
import {
  BrowserRouter as Router, Switch, Route, Redirect
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>

          <Route exact path="/home">

            <HomePage />
          </Route>
          <Route exact path="/payroll-form">
            <PayrollForm />
          </Route>
          <Route exact path="">
            <Redirect exact from="/" to="/home" />
          </Route>

        </Switch>
      </Router>
    </div>
  );
}

export default App;