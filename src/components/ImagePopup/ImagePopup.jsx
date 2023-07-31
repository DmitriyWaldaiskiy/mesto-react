export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_image-zoom ${card.isOpen && 'popup_opened'}`}>
      <div className='popup__container'>
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
