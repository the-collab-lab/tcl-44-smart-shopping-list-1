import { doc, updateDoc, deleteDoc} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { estimate } from '../utils/estimates';

const oneDayInSeconds = 86400;

const style = {
  listStyleType: 'none',
  textAlign: 'left',
};
const ListItem = ({ itemData }) => {
  const [checked, setChecked] = useState(itemData.lastPurchased !== null);

  const nowMinusLastPurchased = () => {
    return Math.floor(Date.now() / 1000) - itemData.lastPurchased.seconds;
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


  //to delete items
 const deleteItem = async() =>{
     if(window.confirm("Are you sure you want to delete this item?")){
        await deleteDoc(doc(db, "Lists", itemData.id));
     }
     else{
         console.log("no")
     }
 }

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
      <>
    <li style={style}>
      <input
        type="checkbox"
        id="data.id"
        disabled={wasPurchasedWithin24Hours()}
        checked={checked}
        onChange={handleChange}
      />
      <span> {itemData.itemName}</span>{' '}
      <button onClick={deleteItem}>delete item</button>
    </li>
 </>
  );
};

export default ListItem;
