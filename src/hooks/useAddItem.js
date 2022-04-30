import { useState } from 'react';
import { db } from '../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import useFetchItems from './useFetchItems';
import {
  checkDuplication,
  showErrorMessage,
  showSuccessMessage,
} from '../utils/helpers';

const useAddItem = (reference) => {
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState(null);
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
        });
        if (addedDocument) {
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

  return { addItem, isLoading, successMessage, error, duplicateItemMessage };
};

export default useAddItem;
