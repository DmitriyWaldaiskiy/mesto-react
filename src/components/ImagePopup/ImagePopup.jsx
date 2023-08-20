export default function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_image-zoom ${card ? 'popup_opened' : ''}`}
      onClick={onClose}>
      <div className='popup__container' onClick={(evt) => evt.stopPropagation()}>
        <button
          type='button'
          className='popup__close-icon close-image'
          onClick={onClose}
        />
        <div className='popup__content-image'>
          <img
            className='popup__image'
            src={card ? card.link : '#'}
            alt={card ? card.name : ''}
          />
          <p className='popup__caption-image'>{card ? card.name : ''}</p>
        </div>
      </div>
    </div>
  );
}
