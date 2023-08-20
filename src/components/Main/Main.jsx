import { useContext } from 'react';
import logo from '../../images/button.png';
import Card from '../Card/Card.jsx';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import Spiner from '../Spiner/Spiner.jsx';

export default function Main({
  onEditProfile,
  onEditAvatar,
  onAddPlace,
  onCardClick,
  onDelete,
  cards,
  isLoading,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main>
      <section className='profile'>
        <button type='button' className='profile__avatar-overlay' onClick={onEditAvatar}>
          <img
            className='profile__avatar'
            src={currentUser.avatar ? currentUser.avatar : '#'}
            alt='Автар профиля'
          />
        </button>
        <div className='profile__info'>
          <div className='profile__info-head'>
            <h1 className='profile__title'>{currentUser.name ? currentUser.name : ''}</h1>
            <button
              type='button'
              className='profile__button'
              aria-label='Кнопка редактирования профиля'
              onClick={onEditProfile}>
              <img src={logo} alt='Карандаш' />
            </button>
          </div>
          <p className='profile__subtitle'>
            {currentUser.about ? currentUser.about : ''}
          </p>
        </div>
        <button type='button' className='profile__add-button' onClick={onAddPlace} />
      </section>
      <ul className='elements'>
        {isLoading ? (
          <Spiner />
        ) : (
          cards.map((data) => {
            return (
              <div className='elements__list' key={data._id}>
                <Card card={data} onCardClick={onCardClick} onDelete={onDelete} />
              </div>
            );
          })
        )}
      </ul>
    </main>
  );
}
