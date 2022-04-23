import { createContext } from 'react';
import { useState } from 'react';

export const TokenContext = createContext();

const TokenProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
};

export default TokenProvider;
