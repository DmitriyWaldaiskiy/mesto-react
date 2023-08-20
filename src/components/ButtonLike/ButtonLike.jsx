import { useEffect } from 'react';
import { useState } from 'react';
import api from '../../utils/api.js';

export default function ButtonLike({ likes, myid, cardid }) {
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(likes.length);

  useEffect(() => {
    setIsLike(likes.some((element) => myid === element._id));
  }, [likes, myid]);

  function handleLike() {
    if (isLike) {
      api
        .deleteLike(cardid)
        .then((res) => {
          setIsLike(false);
          setCount(res.likes.length);
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`));
    } else {
      api
        .addLike(cardid)
        .then((res) => {
          setIsLike(true);
          setCount(res.likes.length);
        })
        .catch((err) => console.error(`Ошибка при установке лайка ${err}`));
    }
  }

  return (
    <div>
      <button
        type='button'
        className={`element__like ${isLike && 'element__like_active'}`}
        onClick={handleLike}
      />
      <span className='element__counter'>{count}</span>
    </div>
  );
}
