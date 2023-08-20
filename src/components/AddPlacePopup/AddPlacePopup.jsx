import useFormValidation from '../../utils/useFormValidation.js';
import PopupWithForm from '../PopupWithForm/PopupWithForm.jsx';

export default function AddPlacePopup({ isOpen, onClose, onAddPlace, isSending }) {
  const { values, errors, isValid, isInputValid, handleChange, reset } =
    useFormValidation();

  function resetForClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ place: values.place, link: values.link }, reset);
  }

  return (
    <PopupWithForm
      name='popup_add'
      title='Новое место'
      titleButton='Создать'
      isOpen={isOpen}
      onClose={resetForClose}
      isValid={isValid}
      onSubmit={handleSubmit}
      isSending={isSending}>
      <label className='popup__input-element'>
        <input
          id='place'
          name='place'
          type='text'
          placeholder='Название'
          className={`popup__input ${
            isInputValid.place === undefined || isInputValid.place
              ? ''
              : 'popup__input_invalid'
          }`}
          minLength={2}
          maxLength={30}
          required
          value={values.place ? values.place : ''}
          disabled={isSending}
          onChange={handleChange}
        />
        <span className=' popup__input-error'>{errors.place}</span>
      </label>
      <label className='popup__input-element'>
        <input
          id='link'
          name='link'
          type='url'
          placeholder='Ссылка на картинку'
          className={`popup__input ${
            isInputValid.link === undefined || isInputValid.link
              ? ''
              : 'popup__input_invalid'
          }`}
          required
          value={values.link ? values.link : ''}
          disabled={isSending}
          onChange={handleChange}
        />
        <span className=' popup__input-error'>{errors.link}</span>
      </label>
    </PopupWithForm>
  );
}
