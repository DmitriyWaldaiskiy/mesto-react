import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import ButtonLike from '../ButtonLike/ButtonLike.jsx';

export default function Card({ card, onCardClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <article className='element'>
      {currentUser === card.owner._id && (
        <button
          className='element__button-delete'
          type='button'
          onClick={() => onDelete(card._id)}
        />
      )}
      <img
        className='element__images'
        src={card.link}
        alt={`Фотография ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className='element__container'>
        <h2 className='element__heading'>{card.name}</h2>
        <ButtonLike likes={card.likes} myid={currentUser._id} cardid={card._id} />
      </div>
    </article>
  );
}
