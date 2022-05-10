import { useEffect, useState } from 'react';
//firebase
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
//utils
import { estimate } from '../utils/estimates';
import {
  calcCurrentDateInSeconds,
  oneDayInSeconds,
  getDaysSinceLastTransaction,
} from '../utils/constants';

const style = {
  listStyleType: 'none',
  textAlign: 'left',
};

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

  useEffect(() => {
    if (itemData.lastPurchased === null) {
      return false;
    }
    if (nowMinusLastPurchased() >= oneDayInSeconds) {
      setChecked(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemData]);

  const getItemCategory = () => {
    const daysSinceLastTransaction = getDaysSinceLastTransaction(itemData);
    const timeframe = itemData.timeframe;
    if (daysSinceLastTransaction > timeframe * 2) return 'category-inactive';
    if (timeframe < 7) return 'category-soon';
    if (timeframe <= 30 && timeframe >= 7) return 'category-kind-of-soon';
    if (timeframe > 30) return 'category-not-soon';
  };

  const handleChange = () => {
    const docRef = doc(db, 'Lists', itemData.id);
    if (
      itemData.lastPurchased === null ||
      nowMinusLastPurchased() >= oneDayInSeconds
    ) {
      updateDoc(docRef, {
        lastPurchased: new Date(),
        timeframe: estimate(itemData),
        totalPurchases: itemData.totalPurchases + 1,
      });
      setChecked(true);
    }
  };

  return (
    <li style={style}>
      <label htmlFor={itemData.id} className="for-checkbox">
        <input
          aria-label={getItemCategory()}
          className={getItemCategory()}
          type="checkbox"
          id={itemData.id}
          disabled={wasPurchasedWithin24Hours()}
          checked={checked}
          onChange={handleChange}
        />
        <span> {itemData.itemName}</span>{' '}
      </label>
    </li>
  );
};

export default ListItem;
