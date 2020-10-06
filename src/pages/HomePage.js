import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = styled.button`
  font-size: 1.5em;
  text-align: center;
  cursor: pointer;
  border: none;
  padding: 0;
  margin: 0;
  ${props => !props.primary && 'border: 2px solid #232323;'}
  background: ${props => props.primary ? 'palevioletred' : 'inherit'};
`;

const Title = styled.h1`
  font-size: 2.5em;
  color: #232323;
  text-align: center;
`;

const StyledLink = styled(Link) `
  text-decoration: none;
  color: #232323;
  padding: 10px;
  width: inherit;
  height: inherit;
  display: block;
  font-weight: bold;
`;
const Wrapper = styled.section`
  padding: 4em;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 575px;
  margin: 0 auto;
`;

const HomePage = () => {
  return (
    <Wrapper>
      <Title>The Habit Loop</Title>
      <Button><StyledLink to="/signin">Sign in</StyledLink></Button>
      <Button primary><StyledLink to="/signup">Try it FREE</StyledLink></Button>
    </Wrapper>
  )
}

export default HomePage;