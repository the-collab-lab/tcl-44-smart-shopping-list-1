import { useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

const ShareTokenForm = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState(null);
  let navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('token', token);
    checkIfTokenExists();
  };

  const checkIfTokenExists = async () => {
    const docRef = collection(db, 'List1');
    const queryParam = query(docRef, where('token', '==', token));
    const listSnap = await getDocs(queryParam);
    if (listSnap.docs.length === 0) {
      setError('Token does not exist please try again or create a new list');
      setToken('');
    } else {
      setError(null);
      navigate('/list');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="shareToken">
        <input
          type="text"
          id="shareToken"
          placeholder="three word token"
          onChange={(e) => setToken(e.target.value)}
          value={token}
        />
        <button>Join an existing list</button>
        <p>{error}</p>
      </label>
    </form>
  );
};

export default ShareTokenForm;
