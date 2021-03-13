import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Auth } from './Auth/Auth';
import { Home } from './Home/Home';
import { Members } from './Members/Members';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthCheck } from 'reactfire';
import IconButton from '@material-ui/core/IconButton';
import { Group } from '@material-ui/icons';

function App() {
  return (
    <Router>
      <div className='App'>
        <header className='App-header'>
          <Link to='/'>
            <img src={logo} className='App-logo' alt='logo' />
          </Link>
          <nav>
            <AuthCheck fallback=''>
              <Link to='/members'>
                <IconButton color='secondary' aria-label='members'>
                  <Group />
                </IconButton>
              </Link>
            </AuthCheck>
          </nav>
          <Auth></Auth>
        </header>

        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Switch>
            <Route path='/members'>
              <AuthCheck fallback='Home'>
                <Members />
              </AuthCheck>
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
