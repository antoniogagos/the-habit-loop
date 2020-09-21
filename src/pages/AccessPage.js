import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../firebase/auth.js';
import app from '../firebase/config';
import styled from 'styled-components';
import GoogleLogo from '../images/google-logo.svg'

function SignIn() {
  const [email, setEmail] = useState('');

  const handleSignIn = async (evt) => {
    evt.preventDefault();
    try {
      const provider = new app.auth.GoogleAuthProvider();
      await app.auth().signInWithPopup(provider);
    } catch (err) { console.warn(err); }
  };

  const handleCustomSignIn = (evt) => {
    evt.preventDefault();
  }

  return (
    <>
    <Form>
      <Title>Welcome Back!</Title>
      <Input
          onChange={(evt) => setEmail(evt.target.value)}
          autocapitalize="off" tabIndex="0" autoComplete="username" 
          type="email" placeholder="Email"></Input>
      <Button
          disabled={!Boolean(email)}
          onClick={handleCustomSignIn}
          type="submit'">Sign Up</Button>
    </Form>
    <SeparatorLine><div>or</div></SeparatorLine>
    <LogButton onClick={handleSignIn}>
      <img alt="Google Logo" src={GoogleLogo}/>Sign in with Google
    </LogButton>
    <BottomFormText>Don't have an account?<StyledLink to="/signup">Sign up</StyledLink></BottomFormText>
    </>
  )
}

function SignUp() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  
  const handleSignUp = async (evt) => {
    evt.preventDefault();
    try {
      const provider = new app.auth.GoogleAuthProvider();
      await app.auth().signInWithPopup(provider);
    } catch (err) { console.warn(err); }
  };

  const handleCustomSignUp = async (evt) => {
    evt.preventDefault();
  }

  return (
    <>
    <Form>
      <Title>Welcome!</Title>
      <Input
          value={email}
          onChange={(evt) => setEmail(evt.target.value)}
          autocapitalize="off" tabIndex="0" autoComplete="username"
          type="email" placeholder="Email"></Input>
      <Input
          value={username}
          onChange={(evt) => setUsername(evt.target.value)}
          tabIndex="0" autoComplete="name" type="text"
          placeholder="Name"></Input>
      <Button
          disabled={!(Boolean(username) && Boolean(email))}
          onClick={handleCustomSignUp} type="submit">Sign Up</Button>
    </Form>
    <SeparatorLine><div>or</div></SeparatorLine>
    <LogButton onClick={handleSignUp}>
      <img src={GoogleLogo} alt="Google logo"/>Sign up with Google
    </LogButton>
    <BottomFormText>Already have an account?<StyledLink to="/signin">Sign in</StyledLink></BottomFormText>
    </>
  )
}

function AccessPage({ history, location }) {
  const { user } = useContext(AuthContext);
  useEffect(_ => {
    if (user) {
      history.push("/");
    }
  }, [user]);
  return (
    <Wrapper>{location.pathname === '/signin' ? <SignIn/> : <SignUp/>}</Wrapper>
  )
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
`

const SeparatorLine = styled.div`
  height: 2px;
  width: 100%;
  margin: 20px 0;
  background: #dedede;
  position: relative;
  div {
    position: absolute;
    top: -19px;
    background: #fff;
    right: calc(50% - 20px);
    padding: 10px;
    box-sizing: border-box;
    color: #969696;
  }
`

const Button = styled.button`
  border: none;
  width: 100%;
  background-color: ${ props => props.disabled ? '#4285f459' : '#4285f4' };
  padding: 14px;
  color: #fff;
  border-radius: 6px;
  font-family: 'Helvetica';
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;
`

const LogButton = styled(Button)`
  align-items: center;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #e6e6e6;
  color: #666;
  display: flex;
  font-size: 14px;
  font-weight: bold;
  justify-content: center;
  margin-bottom: 10px;
  padding: 10px;
  img {
    margin-right: 15px;
  }
  &.facebook-logo {
    color: #fff;
    padding: 3px;
    background: #1877F2;
  }
`

const Title = styled.h1`
  font-size: 1.5em;
  color: #232323;
  text-align: center;
`

const Wrapper = styled.section`
  width: 385px;
  height: 100%;
  margin: 100px auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  box-sizing: border-box;
`;

const BottomFormText = styled.div`
  text-align: center;
  font-size: 14px;
  font-weight: 500;
`;

const StyledLink = styled(Link)`
  color: #ffa031;
  display: inline-block;
  padding-bottom: 2px;
  border-bottom: 2px solid #ffa031;
  margin-left: 8px;
  text-decoration: none;
`;

const Input = styled.input`
  color: ${ props => props.inputColor || "palevioletred" };
  padding: 16px;
  background: #f7f7f7;
  border: none;
  border-radius: 3px;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 12px;
  font-size: 14px;
  border-radius: 6px;
    &:: placeholder {
    color: #0000007a;
  }
  font-family: inherit;
`;

export default AccessPage;