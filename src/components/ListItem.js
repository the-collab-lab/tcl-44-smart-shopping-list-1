import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useEffect, useState } from 'react';

const oneDayInSeconds = 86400;
const ListItem = ({ itemData }) => {
    const [checked, setChecked] = useState(itemData.lastPurchased !== null)

    const wasPurchasedWithin24Hours = () => {
        if (itemData.lastPurchased === null) {
            return false
        }
        return (Math.floor(Date.now() / 1000 ) - itemData.lastPurchased.seconds) <= oneDayInSeconds
    }

    useEffect(() => {
        if (itemData.lastPurchased === null) {
            return false
        }
           
        if ((Math.floor(Date.now() / 1000 ) - itemData.lastPurchased.seconds) >= oneDayInSeconds) {
            setChecked(false)
        } else {
            setChecked(true)
        }
      }, [itemData]);

    const handleChange = () => {
        const docRef = doc(db, "List1", itemData.id)
        if (itemData.lastPurchased === null || (Math.floor(Date.now() / 1000 ) - itemData.lastPurchased.seconds) >= oneDayInSeconds)  {
            updateDoc(docRef, {lastPurchased: new Date()});
            setChecked(true)
        } else {
            setChecked(false)
        }
        console.log(itemData.id)
    };

    return (      
        <li><input type="checkbox" id="data.id" disabled={wasPurchasedWithin24Hours()} checked={checked} onChange={handleChange} /><span> {itemData.item}</span> </li>
    );
   
}
 
export default ListItem;
