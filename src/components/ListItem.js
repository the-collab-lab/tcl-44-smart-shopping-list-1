import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useEffect, useState } from 'react';

const oneDayInSeconds = 86400;

const style = {
       listStyleType: 'none',
       textAlign: 'left'
}
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
        } 
      }, [itemData]);

    const handleChange = () => {
        const docRef = doc(db, "Lists", itemData.id)
        if (itemData.lastPurchased === null || (Math.floor(Date.now() / 1000 ) - itemData.lastPurchased.seconds) >= oneDayInSeconds)  {
            updateDoc(docRef, {lastPurchased: new Date()});
            setChecked(true)
        } 
        console.log(itemData.id)    
    };

    return (      
        <li style={style}><input type="checkbox" id="data.id" disabled={wasPurchasedWithin24Hours()} checked={checked} onChange={handleChange} /><span> {itemData.itemName}</span> </li>
    );
   
}
 
export default ListItem;
