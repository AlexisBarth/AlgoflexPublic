import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import About from './components/pages/About';
import Home from './components/pages/Home';
import Welcome from './components/pages/Welcome';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import NotFound from './components/pages/NotFound';
import ForgetPassword from './components/pages/ForgetPassword';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/welcome" exact component={Welcome} />
        <Route path="/about" exact component={About} />
        <Route path="/login" exact component={Login} />
        <Route path="/ForgetPassword" exact component={ForgetPassword} />
        <Route path="/signup" exact component={Signup} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;