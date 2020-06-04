import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import Login from './components/Login/Login';
import User from './components/User/User';
import styles from './App.module.scss';

function App() {

  return (
    <div className={styles.App}>
        <Switch>
          <Route exact path='/login' component={Login}/>
          <Route exact path='/user' component={User}>
          </Route>  
          <Route exact path='/'>
            <Redirect to={'/login'}/>
          </Route>
        </Switch>
    </div>
  );
}

export default App;
