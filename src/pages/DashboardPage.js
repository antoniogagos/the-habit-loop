import React, { useContext, useEffect } from 'react';
import { AuthContext } from '../firebase/auth'
import { firebase } from '../firebase/config'
import styled from 'styled-components';

const Wrapper = styled.div`

`;

const Header = styled.header`
  
`;


function DashboardPage() {
  const { user } = useContext(AuthContext);

  useEffect(_ => {
    let mounted = true;
    if (mounted) {
    }
    return _ => mounted = false;
  });
  const onClickSignOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch(err) { alert(err); }
  }
  return (
    <Wrapper>
      <Header></Header>
      <h1>
        Hola {user.name}, este sera tu dashboard.
        <button onClick={onClickSignOut}>Sign out</button>
      </h1>
    </Wrapper>
  );
}

export default DashboardPage;