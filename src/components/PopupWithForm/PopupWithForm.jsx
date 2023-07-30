export default function PopupWithForm({
  name,
  title,
  titleButton,
  children,
  isOpen,
  onClose,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}>
      <div className='popup__container'>
        <button type='button' className='popup__close-icon' onClick={onClose} />
        <div className='popup__content'>
          <h2 className='popup__head'>{title}</h2>
          <form
            name='profile-form'
            className='popup__form profileForm'
            noValidate>
            {children}
            <button type='submit' className='popup__button-submit'>
              {titleButton || 'Сохранить'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
