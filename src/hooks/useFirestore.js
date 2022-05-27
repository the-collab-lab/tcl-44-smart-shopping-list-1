import { useState, useEffect, useReducer } from 'react';
//firestore
import { db } from '../lib/firebase';
import { addDoc, collection, doc, deleteDoc } from 'firebase/firestore';
//helpers
import useFetchItems from './useFetchItems';
import {
  checkDuplication,
  showErrorMessage,
  showSuccessMessage,
} from '../utils/helpers';

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case 'IS_LOADING':
      return { ...state, isLoading: true, error: null };
    case 'DUPLICATED_ITEM':
      return {
        ...state,
        isLoading: false,
        duplicateItemMessage: action.payload,
      };
    case 'DOCUMENT_ADDED':
      return {
        ...state,
        isLoading: false,
        error: null,
        successMessage: 'Item added',
      };
    case 'RESET_MESSAGE':
      return { ...state, duplicateItemMessage: '', successMessage: '' };
    case 'ERROR':
      return { ...state, isLoading: false, error: true, successMessage: '' };
  }
};

const initialState = {
  isLoading: false,
  error: null,
  successMessage: '',
  duplicateItemMessage: '',
};

const useFirstore = (reference) => {
  const [state, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);
  const { data: items } = useFetchItems();

  const addItem = async (newItem, timeframe, token, lastPurchased = null) => {
    dispatch({ type: 'IS_LOADING' });
    try {
      const ListRef = collection(db, 'Lists');

      if (checkDuplication(items, newItem)) {
        showErrorMessage(reference, dispatch);
      } else {
        const addedDocument = await addDoc(ListRef, {
          itemName: newItem,
          timeframe: parseInt(timeframe),
          lastPurchased,
          token,
          totalPurchases: 0,
          isActive: true,
        });
        if (addedDocument && isCancelled === false) {
          dispatch({ type: 'DOCUMENT_ADDED' });
          showSuccessMessage(reference, dispatch);
        }
      }
    } catch (e) {
      dispatch({ type: 'ERROR' });
    }
  };

  const deleteItem = async (id) => {
    try {
      const docRef = doc(db, 'Lists', id);
      if (window.confirm('Are you sure you want to delete this item?')) {
        await deleteDoc(docRef);
      } else {
        return;
      }
    } catch (e) {
      dispatch({ action: 'ERROR' });
      console.log(e);
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return {
    addItem,
    deleteItem,
    state,
  };
};

export default useFirstore;
