import { useState } from 'react';
import { db } from '../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import useFetchItems from './useFetchItems';
import {
  checkDuplication,
  showErrorMessage,
  showSuccessMessage,
} from '../utils/helpers';
import { useEffect } from 'react';

const useAddItem = (reference) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [duplicateItemMessage, setDuplicateItemMessage] = useState('');
  const { data: items } = useFetchItems();

  const addItem = async (newItem, timeframe, token, lastPurchased = null) => {
    setIsLoading(true);
    try {
      const ListRef = collection(db, 'Lists');

      if (checkDuplication(items, newItem)) {
        showErrorMessage(reference, setIsLoading, setDuplicateItemMessage);
      } else {
        const addedDocument = await addDoc(ListRef, {
          itemName: newItem,
          timeframe: parseInt(timeframe),
          lastPurchased,
          token,
          totalPurchases: 0,
          createdAt: new Date(),
        });
        if (addedDocument && isCancelled === false) {
          setIsLoading(false);
          showSuccessMessage(reference, setSuccessMessage);
          setError(false);
        }
      }
    } catch (e) {
      setError(true);
      setSuccessMessage(null);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { addItem, isLoading, successMessage, error, duplicateItemMessage };
};

export default useAddItem;
