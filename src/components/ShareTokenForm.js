import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import useToken from '../hooks/useToken';

const ShareTokenForm = () => {
  const [incorrectTokenError, setincorrectTokenError] = useState(null);
  const [selectedToken, setSelectedToken] = useState('');
  const { setToken } = useToken();

  const handleSubmit = (e) => {
    e.preventDefault();
    checkIfTokenExists();
  };

  const checkIfTokenExists = async () => {
    const docRef = collection(db, 'List1');
    const queryParam = query(docRef, where('token', '==', selectedToken));
    const listSnap = await getDocs(queryParam);

    if (listSnap.docs.length === 0) {
      setincorrectTokenError(
        'Token does not exist please try again or create a new list',
      );
      setSelectedToken('');
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
        type="text"
        id="shareToken"
        placeholder="three word token"
        onChange={(e) => setSelectedToken(e.target.value)}
        value={selectedToken}
      />
      <button>Join an existing list</button>
      {incorrectTokenError && <p>{incorrectTokenError}</p>}
    </form>
  );
};

export default ShareTokenForm;
