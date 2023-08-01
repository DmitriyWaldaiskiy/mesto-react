import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import PopupWithForm from './PopupWithForm/PopupWithForm.jsx';
import ImagePopup from './ImagePopup/ImagePopup.jsx';
import { useState } from 'react';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsisEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsisEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(false);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsisEditAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  // function handleDeleteClick() {}

  function handleCartClick(card) {
    setSelectedCard(card);
  }

  return (
    <div className='page'>
      <Header />

      <Main
        onEditProfile={handleEditProfileClick}
        onEditAvatar={handleEditAvatarClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCartClick}
      />

      <Footer />

      <PopupWithForm
        name='profile__button'
        title='Редактировать профиль'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}>
        <label className='popup__input-element'>
          <input
            id='place'
            name='place'
            type='text'
            placeholder='Введите имя'
            className='popup__input popup__input_type_place'
            minLength={2}
            maxLength={30}
            required=''
          />
          <span className='place-error popup__input-error' />
        </label>
        <label className='popup__input-element'>
          <input
            id='link'
            name='link'
            type='url'
            placeholder='Расскажите о себе'
            className='popup__input popup__input_type_link'
            required=''
          />
          <span className='link-error popup__input-error' />
        </label>
      </PopupWithForm>

      <PopupWithForm
        name='popup_add'
        title='Новое место'
        titleButton='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}>
        <label className='popup__input-element'>
          <input
            id='place'
            name='place'
            type='text'
            placeholder='Название'
            className='popup__input popup__input_type_place'
            minLength={2}
            maxLength={30}
            required
          />
          <span className='place-error popup__input-error' />
        </label>
        <label className='popup__input-element'>
          <input
            id='link'
            name='link'
            type='url'
            placeholder='Ссылка на картинку'
            className='popup__input popup__input_type_link'
            required
          />
          <span className='link-error popup__input-error' />
        </label>
      </PopupWithForm>

      <PopupWithForm
        name='popup-avatar-edit'
        title='Обновить аватар'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}>
        <label className='popup__input-element'>
          <input
            id='avatar'
            name='avatar'
            type='url'
            placeholder='Ссылка на картинку'
            className='popup__input popup__input_type_avatar'
            required
          />
          <span className='avatar-error popup__input-error' />
        </label>
      </PopupWithForm>

      <ImagePopup card={selectedCard} onClose={closeAllPopups} />

      <PopupWithForm name='popup-delete' title='Вы уверены?' titleButton='Да' />
    </div>
  );
}

export default App;
