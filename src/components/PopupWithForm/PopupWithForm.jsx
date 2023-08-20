export default function PopupWithForm({
  name,
  title,
  titleButton,
  children,
  isOpen,
  onClose,
  onSubmit,
  isSending,
  isValid = true,
}) {
  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={onClose}>
      <div className='popup__container' onClick={(evt) => evt.stopPropagation()}>
        <button type='button' className='popup__close-icon' onClick={onClose} />
        <div className='popup__content'>
          <h2
            className={`popup__head ${
              name === 'popup-delete' ? 'popup__head_type_head-delete-delete' : ''
            }`}>
            {title}
          </h2>
          <form name={name} className='popup__form' noValidate onSubmit={onSubmit}>
            {children}
            <button
              type='submit'
              className={`popup__button-submit ${
                isSending ? 'popup__button-submit_loading' : ''
              } ${isValid ? '' : 'popup__button-submit_off'}`}
              disabled={isSending}>
              {isSending ? '' : titleButton || 'Сохранить'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
