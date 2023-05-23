import React from 'react';
import App from './_app';
import { Web3ContextProvider } from '../contexts/Web3Context';
import { UserProvider } from '../contexts/UserContext';

export default function Index(){

  return(
  <React.StrictMode>
   <Web3ContextProvider>
      <UserProvider>
        { typeof window !=="undefined" &&<App />}
      </UserProvider>
    </Web3ContextProvider>
  </React.StrictMode>
)
    }
