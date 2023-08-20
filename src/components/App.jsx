import Header from './Header/Header.jsx';
import Main from './Main/Main.jsx';
import Footer from './Footer/Footer.jsx';
import PopupWithForm from './PopupWithForm/PopupWithForm.jsx';
import ImagePopup from './ImagePopup/ImagePopup.jsx';
import { useCallback, useEffect, useState } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import api from '../utils/api.js';
import EditProfilePopup from './EditProfilePopup/EditProfilePopup.jsx';
import EditAvatarPopup from './EditAvatarPopup/EditAvatarPopup.jsx';
import AddPlacePopup from './AddPlacePopup/AddPlacePopup.jsx';

function App() {
  //popups
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsisEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setIsisDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isSending, setIsSending] = useState(false);
  // context
  const [currentUser, setCurrentUser] = useState({});
  //cart
  const [cards, setCards] = useState([]);
  const [isCardsLoading, setIsCardsLoading] = useState(true);
  const [deletCardId, setDeleteCardId] = useState('');

  const setAllStatesClosePopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsisEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsisDeletePopupOpen(false);
    setSelectedCard(null);
  }, []);

  const closePopupEsc = useCallback(
    (evt) => {
      if (evt.key === 'Escape') {
        setAllStatesClosePopups();
        document.removeEventListener('keydown', closePopupEsc);
      }
    },
    [setAllStatesClosePopups]
  );

  const closeAllPopups = useCallback(() => {
    setAllStatesClosePopups();
    document.removeEventListener('keydown', closePopupEsc);
  }, [setAllStatesClosePopups, closePopupEsc]);

  function setEventListenerForDocument() {
    document.addEventListener('keydown', closePopupEsc);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListenerForDocument();
  }

  function handleEditAvatarClick() {
    setIsisEditAvatarPopupOpen(true);
    setEventListenerForDocument();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListenerForDocument();
  }

  function handleDeleteClick(cardId) {
    setDeleteCardId(cardId);
    setIsisDeletePopupOpen(true);
    setEventListenerForDocument();
  }

  function handleCartClick(card) {
    setSelectedCard(card);
    setEventListenerForDocument();
  }

  useEffect(() => {
    setIsCardsLoading(true);
    Promise.all([api.getProfileInfo(), api.getCards()])
      .then(([userData, cardData]) => {
        setCurrentUser(userData);
        setCards(cardData);
        setIsCardsLoading(false);
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }, []);

  function handleDeleteSubmit(evt) {
    evt.preventDefault();
    setIsSending(true);
    api
      .deleteCard(deletCardId)
      .then((res) => {
        setCards(
          cards.filter((card) => {
            return card._id !== deletCardId;
          })
        );
        closeAllPopups();
        setIsSending(false);
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }

  function handleUpdateUser(userData, reset) {
    setIsSending(true);
    api
      .setUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsSending(false);
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }

  function handleUpdateAvatar(userdata, reset) {
    setIsSending(true);
    api
      .setNewAvatar(userdata)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
        setIsSending(false);
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }

  function handleAddCard(cardData, reset) {
    setIsSending(true);
    api
      .addCard(cardData)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
        setIsSending(false);
      })
      .catch((error) => console.error(`Ошибка ${error}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Header />

        <Main
          onEditProfile={handleEditProfileClick}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCartClick}
          onDelete={handleDeleteClick}
          cards={cards}
          isLoading={isCardsLoading}
        />

        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          isSending={isSending}
        />

        <AddPlacePopup
          onAddPlace={handleAddCard}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          isSending={isSending}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          isSending={isSending}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />

        <PopupWithForm
          name='popup-delete'
          title='Вы уверены?'
          titleButton='Да'
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDeleteSubmit}
          isSending={isSending}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
