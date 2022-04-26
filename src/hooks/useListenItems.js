import { useState, useEffect } from 'react';
//firebase
import { db } from '../lib/firebase';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import useToken from './useToken';

const useListenItems = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [listeningError, setListeningError] = useState(null);
  const { token } = useToken();

  useEffect(() => {
    setIsLoading(true);
    const ListRef = collection(db, 'List1');
    const queryParam = query(ListRef, where('token', '==', token));
    const unsb = onSnapshot(
      queryParam,
      (snapshot) => {
        const result = [];
        snapshot.forEach((doc) => {
          result.push({ ...doc.data(), id: doc.id });
        });

        setIsLoading(false);
        setData(result);
        setListeningError(null);
      },
      (error) => {
        setIsLoading(false);
        setListeningError('could not fetch data');
      },
    );

    return () => unsb();
  }, [token]);

  return { data, isLoading, listeningError };
};

export default useListenItems;
