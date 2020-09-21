import React, { useContext } from 'react';
import { AuthContext } from '../firebase/auth'
import firebase from '../firebase/config'

function DashboardPage() {
  const { user } = useContext(AuthContext);

  const onClickSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch(err) { alert(err); }
  }
  return (
    <h1>
      Hola {user.displayName}, este sera tu dashboard.
      <button onClick={onClickSignOut}>Sign out</button>
    </h1>
  );
}

export default DashboardPage;