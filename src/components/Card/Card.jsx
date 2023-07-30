export default function Card({ card, onCardClick }) {
  return (
    <article className='element'>
      <button className='element__button-delete' type='button' />
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
          <span className='element__counter' />
        </div>
      </div>
    </article>
  );
}
