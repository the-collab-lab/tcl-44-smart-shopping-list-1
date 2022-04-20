import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';

const ShareTokenForm = ({ setToken }) => {
  const [error, setError] = useState(null);
  const [selectedToken, setSelectedToken] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    checkIfTokenExists();
  };

  const checkIfTokenExists = async () => {
    const docRef = collection(db, 'List1');
    const queryParam = query(docRef, where('token', '==', selectedToken));
    const listSnap = await getDocs(queryParam);

    if (listSnap.docs.length === 0) {
      setError('Token does not exist please try again or create a new list');
      setSelectedToken('');
    } else {
      setError(null);
      localStorage.setItem('token', selectedToken);
      setToken(selectedToken);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="shareToken">
        <input
          type="text"
          id="shareToken"
          placeholder="three word token"
          onChange={(e) => setSelectedToken(e.target.value)}
          value={selectedToken}
        />
        <button>Join an existing list</button>
        <p>{error}</p>
      </label>
    </form>
  );
};

export default ShareTokenForm;
