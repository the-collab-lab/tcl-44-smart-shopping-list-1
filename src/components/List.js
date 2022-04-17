import { useState, useEffect } from 'react';
//firebase
import { db } from '../lib/firebase';
import { onSnapshot, collection, query, where } from 'firebase/firestore';

const List = () => {
  const [datas, setData] = useState([]);
  useEffect(() => {
    const ListRef = collection(db, 'List1');
    const q = query(ListRef, where('token', '==', 'reda and tobi'));
    const unsb = onSnapshot(q, ListRef, (snapshot) => {
      setData(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });

    return () => unsb();
  }, []);

  const dataElements = datas.map((data) => (
    <ul key={data.id}>
      <li> {data.Item} </li>
    </ul>
  ));

  return <div>{dataElements}</div>;
};

export default List;
