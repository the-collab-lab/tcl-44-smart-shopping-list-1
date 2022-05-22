
import { useEffect, useState } from 'react';
//firebase
import { db } from '../lib/firebase';
import { doc, updateDoc, deleteDoc} from 'firebase/firestore';
//utils
import { estimate } from '../utils/estimates';
//react Icons
import * as VSCicons from 'react-icons/vsc';
//css
import '../App.css';

import {
  calcCurrentDateInSeconds,
  oneDayInSeconds,
  getDaysSinceLastTransaction,
} from '../utils/dateHelpers';

const ListItem = ({ itemData }) => {
  const [checked, setChecked] = useState(itemData.lastPurchased !== null);

  const nowMinusLastPurchased = () => {
    return (
      Math.floor(calcCurrentDateInSeconds()) - itemData.lastPurchased.seconds
    );
  };

  const wasPurchasedWithin24Hours = () => {
    if (itemData.lastPurchased === null) {
      return false;
    }
    return nowMinusLastPurchased() <= oneDayInSeconds;
  };


//doc reference for an item
  const docRef = doc(db, 'Lists', itemData.id);


  useEffect(() => {
    if (itemData.lastPurchased === null) {
      return false;
    }
    if (nowMinusLastPurchased() >= oneDayInSeconds) {
      setChecked(false);
    }

    if (getDaysSinceLastTransaction(itemData) > itemData.timeframe * 2) {
      const docRef = doc(db, 'Lists', itemData.id);
      updateDoc(docRef, {
        isActive: false,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemData]);



  //Brings up a confirmation prompt before deleting the item, and if confirmed, deletes the item.
 const deleteItem = async() =>{
     if(window.confirm("Are you sure you want to delete this item?")){
        await deleteDoc(docRef);
     }
     else{
         return
     }
 }

  const getItemCategory = () => {
    const daysSinceLastTransaction = getDaysSinceLastTransaction(itemData);
    const timeframe = itemData.timeframe;
    if (daysSinceLastTransaction > timeframe * 2) return 'category-inactive';
    if (timeframe < 7) return 'category-soon';
    if (timeframe <= 30 && timeframe >= 7) return 'category-kind-of-soon';
    if (timeframe > 30) return 'category-not-soon';
  };


  const handleChange = () => {
    if (
      itemData.lastPurchased === null ||
      nowMinusLastPurchased() >= oneDayInSeconds
    ) {
      updateDoc(docRef, {
        lastPurchased: new Date(),
        timeframe: estimate(itemData),
        totalPurchases: itemData.totalPurchases + 1,
        isActive: true,
      });
      setChecked(true);
    }
  };

  return (
      <>
    <li className={`flex items-center justify-between rounded-2xl w-72 p-3 my-2 ${getItemCategory()}`}>
      <label htmlFor={itemData.id} className="for-checkbox">
        <input
          aria-label={getItemCategory()}
          type="checkbox"
          id={itemData.id}
          disabled={wasPurchasedWithin24Hours()}
          checked={checked}
          onChange={handleChange}
        />
        <span> {itemData.itemName}</span>
      </label>
      <div className="text-right">
        <button className='deleteIconStyle' onClick={deleteItem}>
          <VSCicons.VscTrash/>
        </button>
      </div>
    </li>
 </>
  );
};

export default ListItem;
