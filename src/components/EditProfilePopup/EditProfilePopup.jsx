import { useEffect } from 'react';
import { useContext } from 'react';
import CurrentUserContext from '../../contexts/CurrentUserContext.js';
import useFormValidation from '../../utils/useFormValidation.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser, isSending }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, isInputValid, handleChange, reset, setValue } =
    useFormValidation();

  useEffect(() => {
    setValue('username', currentUser.name);
    setValue('job', currentUser.about);
  }, [currentUser, setValue]);

  function resetForClose() {
    onClose();
    reset({ username: currentUser.name, job: currentUser.about });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ username: values.username, job: values.job }, reset);
  }

  return (
    <PopupWithForm
      name='profile__button'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={resetForClose}
      isValid={isValid}
      isSending={isSending}
      disabled={isSending}
      onSubmit={handleSubmit}>
      <label className='popup__input-element'>
        <input
          id='username'
          name='username'
          type='text'
          placeholder='Введите имя'
          className={`popup__input ${
            isInputValid.username === undefined || isInputValid.username
              ? ''
              : 'popup__input_invalid'
          }`}
          minLength={2}
          maxLength={30}
          required
          value={values.username ? values.username : ''}
          disabled={isSending}
          onChange={handleChange}
        />
        <span className='popup__input-error popup__input_type_username'>
          {errors.username}
        </span>
      </label>
      <label className='popup__input-element'>
        <input
          id='job'
          name='job'
          type='text'
          placeholder='Расскажите о себе'
          className={`popup__input ${
            isInputValid.job === undefined || isInputValid.job
              ? ''
              : 'popup__input_invalid'
          }`}
          minLength={2}
          maxLength={200}
          required
          value={values.job ? values.job : ''}
          onChange={handleChange}
        />
        <span className='popup__input-error popup__input_type_job'>{errors.job}</span>
      </label>
    </PopupWithForm>
  );
}
