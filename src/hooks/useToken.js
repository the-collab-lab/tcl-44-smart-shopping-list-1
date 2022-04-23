import { TokenContext } from '../context/tokenContext';
import { useContext } from 'react';

const useToken = () => {
  const value = useContext(TokenContext);
  if (value === undefined) {
    console.log('Error');
  }
  return value;
};

export default useToken;
