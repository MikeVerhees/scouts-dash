import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Auth } from './Auth/Auth';
import { Home } from './Home/Home';
import { Members } from './Members/Members';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AuthCheck } from 'reactfire';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />

        <Auth></Auth>
      </header>
      <body>
        <Router>
          <div>
            <nav>
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/members'>Members</Link>
                </li>
              </ul>
            </nav>

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
        </Router>
      </body>
    </div>
  );
}

export default App;
