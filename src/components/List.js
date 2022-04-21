import { useState, useEffect } from 'react';
//firebase
import { db } from '../lib/firebase';
import { onSnapshot, collection, query, where } from 'firebase/firestore';
import { Navigate } from 'react-router-dom';
import { setGlobalList } from '../utils/GlobalData';

const List = () => {
  const [datas, setData] = useState([]);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const ListRef = collection(db, 'List1');
    const q = query(ListRef, where('token', '==', token));
    const unsb = onSnapshot(q, ListRef, (snapshot) => {
      //grab the list coming from firebase
      let existingItemsList = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      //set list in globalData.js
      setGlobalList(existingItemsList);

      //set list in this component
      setData([...existingItemsList]);
    });

    return () => unsb();
  }, [token]);

  if (localStorage.getItem('token') === null) {
    return <Navigate to="/" />;
  }

  const dataElements = datas.map((data) => (
    <ul key={data.id}>
      <li> {data.Item} </li>
    </ul>
  ));

  return <div>{dataElements}</div>;
};

export default List;
