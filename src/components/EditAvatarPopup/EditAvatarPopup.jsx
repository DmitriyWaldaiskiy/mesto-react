import { useRef } from 'react';
import useFormValidation from '../../utils/useFormValidation.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isSending }) {
  const input = useRef();
  const { values, errors, isValid, isInputValid, handleChange, reset } =
    useFormValidation();

  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: input.current.value }, reset);
  }

  return (
    <PopupWithForm
      name='popup-avatar-edit'
      title='Обновить аватар'
      isOpen={isOpen}
      isSending={isSending}
      isValid={isValid}
      onClose={resetForClose}
      onSubmit={handleSubmit}>
      <label className='popup__input-element'>
        <input
          ref={input}
          id='avatar'
          name='avatar'
          type='url'
          placeholder='Ссылка на картинку'
          className={`popup__input ${
            isInputValid.avatar === undefined || isInputValid.avatar
              ? ''
              : 'popup__input_invalid'
          }`}
          value={values.avatar ? values.avatar : ''}
          disabled={isSending}
          onChange={handleChange}
          required
        />
        <span className='popup__input-error'>{errors.avatar}</span>
      </label>
    </PopupWithForm>
  );
}
