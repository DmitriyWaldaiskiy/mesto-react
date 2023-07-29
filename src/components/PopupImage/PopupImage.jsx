export default function PopupImage({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup_image-zoom ${isOpen && 'popup_opened'}`}>
      <div className='popup__container'>
        <button type='button' className='popup__close-icon close-image' onClick={onClose} />
        <div className='popup__content-image'>
          <img className='popup__image' src={card.link ? card.link : '#'} alt={card.name ? `Фотография ${card.name}` : '#'} />
          <p className='popup__caption-image'>{`Фотография ${card.name}`}</p>
        </div>
      </div>
    </div>
  );
}
