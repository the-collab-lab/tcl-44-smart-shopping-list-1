import { useState } from 'react';
import { db } from '../lib/firebase';
import { addDoc, collection } from 'firebase/firestore';
import useFetchItems from './useFetchItems';

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
      let document;
      checkDuplication(newItem)
        ? showErrorMessage()
        : (document = await addDoc(ListRef, {
            itemName: newItem,
            timeframe: parseInt(timeframe),
            lastPurchased,
            token,
          }));
      if (document) {
        setIsLoading(false);
        showSuccesMessage();
        setError(false);
      }
    } catch (e) {
      setError(true);
      setSuccessMessage(null);
    }
  };

  //-------------------------------------------------------------------------------------
  // HELPER FUNCTIONS

  //Check for duplication:
  //get the existing items list from firebase
  //loop through the existing items list to check if there is a match with current item
  //set itemExists to true if duplication and return it

  const checkDuplication = (newItem) => {
    let itemExists = false;

    items.forEach((itemObject) => {
      //Remove punctuation of existing item with regex
      let existingItem = itemObject.itemName;
      let cleanExistingItem = existingItem.replace(/[\W|_]/g, '');

      //Remove punctuation of current item with regex
      let currentItem = newItem;
      let cleanCurrentItem = currentItem.replace(/[\W|_]/g, '');

      //Check for duplication while normalizin capitalization
      if (cleanCurrentItem.toLowerCase() === cleanExistingItem.toLowerCase()) {
        itemExists = true;
      }
    });
    return itemExists;
  };

  //Set error message and erase it after 3 sec and focus text input
  const showErrorMessage = () => {
    setIsLoading(false);
    setDuplicateItemMessage('Item already added. Try another one.');

    setTimeout(() => {
      reference.current.focus();
      setDuplicateItemMessage('');
    }, 3000);
  };

  // set the success message to infor the user that the item is added, and erase it after 3 sec
  const showSuccesMessage = () => {
    setSuccessMessage('Item added');

    setTimeout(() => {
      reference.current.focus();
      setSuccessMessage('');
    }, 3000);
  };

  return { addItem, isLoading, successMessage, error, duplicateItemMessage };
};

export default useAddItem;
