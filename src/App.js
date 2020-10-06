import React from 'react';
import DashboardPage from './pages/DashboardPage'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

import { AuthProvider } from './firebase/auth'
import PrivateRoute from './pages/PrivateRoute'
import AccessPage from './pages/AccessPage'

function App() {
  return (
    <Router>
      <AuthProvider>
        <PrivateRoute exact path="/" component={DashboardPage}/>
        <Route exact path={["/signin", "/signup"]} component={AccessPage}/>
      </AuthProvider>
    </Router>
  );
}

export default App;