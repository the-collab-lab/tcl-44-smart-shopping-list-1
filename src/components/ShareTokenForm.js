import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import useToken from '../hooks/useToken';
import Button from '../components/Button';

const ShareTokenForm = () => {
  const [incorrectTokenError, setincorrectTokenError] = useState(null);
  const [selectedToken, setSelectedToken] = useState('');
  const { setToken } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    checkIfTokenExists();
  };

  const checkIfTokenExists = async () => {
    const docRef = collection(db, 'Lists');
    const queryParam = query(docRef, where('token', '==', selectedToken));
    const listSnap = await getDocs(queryParam);

    if (listSnap.docs.length === 0) {
      setincorrectTokenError(
        'Token does not exist please try again or create a new list',
      );
      setSelectedToken('');
      setTimeout(() => {
        setincorrectTokenError('');
      }, 3000);
    } else {
      setincorrectTokenError(null);
      localStorage.setItem('token', selectedToken);
      setToken(selectedToken);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <label htmlFor="shareToken">Share token</label>
      <input
        className="input"
        type="text"
        id="shareToken"
        placeholder="three word token"
        onChange={(e) => setSelectedToken(e.target.value)}
        value={selectedToken}
      />
      <Button text="Join existing list" width={'w-52'} />
      {incorrectTokenError && <p>{incorrectTokenError}</p>}
    </form>
  );
};

export default ShareTokenForm;
