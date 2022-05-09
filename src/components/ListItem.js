import { useEffect, useState } from 'react';
//firebase
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
//utils
import { estimate } from '../utils/estimates';
import { calcCurrentDateInSeconds, oneDayInSeconds } from '../utils/constants';

const style = {
  listStyleType: 'none',
  textAlign: 'left',
};

const ListItem = ({ itemData, color }) => {
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
    const timeframe = itemData.timeframe;
    let color;
    if (timeframe < 7) color = 'green';
    if (timeframe <= 30 && timeframe >= 7) color = 'yellow';
    if (timeframe > 30) color = 'red';

    return color;
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
      <input
        style={{ borderColor: getItemCategory() }}
        type="checkbox"
        id="data.id"
        disabled={wasPurchasedWithin24Hours()}
        checked={checked}
        onChange={handleChange}
      />
      <span> {itemData.itemName}</span>{' '}
    </li>
  );
};

export default ListItem;
