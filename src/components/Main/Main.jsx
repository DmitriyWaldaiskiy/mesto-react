import { useEffect, useState } from 'react';
import logo from '../../images/button.png';
import api from '../../utils/api';
import Card from '../Card/Card.jsx';

export default function Main({ onEditProfile, onEditAvatar, onAddPlace, onCardClick }) {
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getProfileInfo(), api.getCards()]).then(([userData, cardData]) => {
      setUserName(userData.name);
      setUserDescription(userData.about);
      setUserAvatar(userData.avatar);
      cardData.forEach((data) => (data.myid = userData._id));
      setCards(cardData);
    });
  }, []);

  return (
    <main>
      <section className='profile'>
        <button type='button' className='profile__avatar-overlay' onClick={onEditAvatar}>
          <img className='profile__avatar' src={userAvatar} alt='Автар профиля' />
        </button>
        <div className='profile__info'>
          <div className='profile__info-head'>
            <h1 className='profile__title'>{userName}</h1>
            <button type='button' className='profile__button' aria-label='Кнопка редактирования профиля' onClick={onEditProfile}>
              <img src={logo} alt='Карандаш' />
            </button>
          </div>
          <p className='profile__subtitle'>{userDescription}</p>
        </div>
        <button type='button' className='profile__add-button' onClick={onAddPlace} />
      </section>
      <ul className='elements'>
        {cards.map((data) => {
          return (
            <div className='elements__list' key={data._id}>
              <Card card={data} onCardClick={onCardClick} />
            </div>
          );
        })}
      </ul>
    </main>
  );
}
