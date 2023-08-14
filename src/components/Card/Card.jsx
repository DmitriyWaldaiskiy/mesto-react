export default function Card({ card, onCardClick, onDelete }) {
  return (
    <article className='element'>
      <button className='element__button-delete' type='button' onClick={onDelete} />
      <img
        className='element__images'
        src={card.link}
        alt={`Фотография ${card.name}`}
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className='element__container'>
        <h2 className='element__heading'>{card.name}</h2>
        <div>
          <button type='button' className='element__like' />
          <span className='element__counter'>{card.likes.length}</span>
        </div>
      </div>
    </article>
  );
}
