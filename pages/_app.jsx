import React from 'react';
import Login from './login';
import Home from './home';
import { useUser } from '../contexts/UserContext';
import '../styles/styles.css';

export default function App() {
  const { user } = useUser();

  return  !user ? <Login /> : <Home />; 
}
