import React, { useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import * as Api from '../firebase/api';
import styled from 'styled-components';
import GoogleLogoRef from '../images/google-logo.svg'
import AppleLogoRef from '../images/apple-logo.svg'

const AppleLogo = AppleLogoRef;
const GoogleLogo = GoogleLogoRef;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const AuthErrorText = styled.div`
  margin: 20px 0;
  text-align: center;
  color: #B71C1C;
  line-height: 20px;
`;

const SeparatorLine = styled.div`
  height: 2px;
  width: 100%;
  margin: 20px 0;
  background: #00000008;
  position: relative;
  span {
    position: absolute;
    top: -19px;
    background: #fff;
    right: calc(50% - 20px);
    padding: 10px;
    box-sizing: border-box;
    color: #969696;
  }
`;

const Button = styled.button`
  border: none;
  width: 100%;
  background-color: #3F51B5;
  padding: 16px;
  color: #fffffff7;
  border-radius: 6px;
  font-family: 'Helvetica';
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
`;

const LogButton = styled(Button)`
  align-items: center;
  background: #fff;
  height: 52px;
  border-radius: 5px;
  border: 2px solid #ECEFF1;
  color: #263238;
  display: flex;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  margin-bottom: 20px;
  padding: 10px;
  &#apple {
  }
  img {
    margin-right: 15px;
  }
  &.facebook-logo {
    color: #fff;
    padding: 3px;
    background: #1877F2;
  }
`;

const Title = styled.h1`
  font-size: 1.5em;
  color: #232323;
  text-align: center;
`;

const Wrapper = styled.section`
  max-width: 425px;
  height: 100%;
  margin: 0 auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 1.5em;
  box-sizing: border-box;
`;



const Section = styled.section`
  > input {
    color: "palevioletred";
    padding: 16px;
    background: #f7f7f7;
    border: none;
    border-radius: 3px;
    box-sizing: border-box;
    font-family: inherit;
    width: 100%;
    margin-bottom: 12px;
    font-size: 14px;
    border-radius: 6px;
    &:invalid + span::before {
      content: '✖';
      color: #E91E63;
    }
    &:valid + span::before {
      content: '✓';
      color: #388e3c;
    }
    &:placeholder-shown + span::before {
      display: none;
    }
    & + span {
      position: relative;
    }
    & + span::before {
      font-weight: bold;
      position: absolute;
      right: 4px;
      top: 0px;
    }
  }
  > label {
    line-height: 28px;
  }
`;
const BottomFormText = styled.div`
  text-align: center;
  font-size: 16px;
  font-weight: 500;
  margin-top: 30px;
`;

const StyledLink = styled(Link)`
  color: #ffa031;
  display: inline-block;
  padding-bottom: 2px;
  border-bottom: 2px solid #ffa031;
  margin-left: 8px;
  text-decoration: none;
`;

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [authError, setAuthError] = useState(null);

  const handleSignIn = useCallback(async (evt) => {
    evt.preventDefault();
    const provider = evt.target.id;
    try {
      setDisabled(true);
      await Api.signInProvider({provider, email});
    } catch (err) {
      setAuthError(err.message);
      setDisabled(false);
    }
  });

  const handleCustomSignIn = useCallback(async (evt) => {
    evt.preventDefault();
    try {
      setDisabled(true);
      await Api.signInCustom({email, password});
    } catch(err) {
      setAuthError(err.message);
      setDisabled(false);
    } 
  });

  return (
    <>
    <Form onSubmit={handleCustomSignIn}>
      <Title>Welcome Back!</Title>
      <LogButton type="button" id="google" onClick={handleSignIn}><img alt="Google Logo" src={GoogleLogo}/>Sign in with Google</LogButton>
      <LogButton type="button" id="apple" onClick={handleSignIn}><img alt="Apple Logo" src={AppleLogo}/>Sign in with Apple</LogButton>
      <SeparatorLine><span>or</span></SeparatorLine>
      <Section>
        <label htmlFor="email">Email</label>
        <input
            value={email} id="email" name="email" required
            onChange={(evt) => setEmail(evt.target.value)}
            autoCapitalize="off" tabIndex="0" autoComplete="email"  type="email"></input>
      </Section>
      <Section>
        <label htmlFor="password">Password</label>
        <input
            value={password} tabIndex="0" autoComplete="current-password" required
            onChange={evt => setPassword(evt.currentTarget.value)}
            type="password" id="password" name="password"></input>
      </Section>
      {authError && <AuthErrorText>{authError}</AuthErrorText>}
      <Button type="submit" disabled={disabled}>Sign in</Button>
    </Form>
    <BottomFormText>Don't have an account?<StyledLink to="/signup">Create one</StyledLink></BottomFormText>
    </>
  )
}

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [authError, setAuthError] = useState(null);
  const handleSignUp = async (evt) => {
    evt.preventDefault();
    setDisabled(true);
    const provider = evt.target.id;
    try {
      await Api.signInProvider({provider});
    } catch (err) {
      setAuthError(err.message);
      setDisabled(false);
    }
  };

  const handleCustomSignUp = async (evt) => {
    evt.preventDefault();
    setDisabled(true);
    try {
      await Api.createUser({username, email, password});
    } catch(err) {
      setAuthError(err.message);
      setDisabled(false);
    } 
  }

  return (
    <>
    <Form>
      <Title>Welcome!</Title>
      <LogButton type="button" id="google" onClick={handleSignUp}><img src={GoogleLogo} alt="Google logo"/>Sign up with Google</LogButton>
      <LogButton type="button" id="apple" onClick={handleSignUp}><img alt="Apple Logo" src={AppleLogo}/>Sign up with Apple</LogButton>
      <SeparatorLine><span>or</span></SeparatorLine>
      <Section>
        <label htmlFor="email">Email</label>
        <input
          placeholder=" " id="email" tabIndex="0" autoCorrect="off" required
          value={email} onChange={(evt) => setEmail(evt.target.value)}
          name="email" autoComplete="username" autoCapitalize="off" type="email"></input>
        <span></span>
      </Section>
      {disabled && <div>Loading</div>}      
      <Section>
        <label htmlFor="name">Name</label>
        <input
          placeholder=" " id="name"  tabIndex="0" autoCorrect="off" required
          value={username} onChange={(evt) => setUsername(evt.target.value)}
          name="name" autoComplete="name" type="text"></input>
        <span></span>
      </Section>
      <Section>
        <label htmlFor="password">Password</label>
        <input
          placeholder=" " id="password" tabIndex="0" required
          value={password} onChange={(evt) => setPassword(evt.target.value)}
          name="new-password" pattern="^.{6,}$" autoComplete="new-password" type="password"></input>
        <span></span>
      </Section>
      {Boolean(authError) && <AuthErrorText>{authError}</AuthErrorText>}
      <Button disabled={disabled} onClick={handleCustomSignUp}>Sign Up</Button>
    </Form>
    <BottomFormText>Already have an account?<StyledLink to="/signin">Sign in</StyledLink></BottomFormText>
    </>
  )
}

function AccessPage({ location }) {
  return (
    <Wrapper>{location.pathname === '/signin' ? <SignIn/> : <SignUp/>}</Wrapper>
  )
}

export default AccessPage;