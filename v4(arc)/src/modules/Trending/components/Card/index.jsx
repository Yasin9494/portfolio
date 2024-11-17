import style from './Card.module.scss';

const Card = ({ icon, name, label, text, tags, startDate, ...props }) => {
  const tagsList = (
    <ul className={style.cardTags}>
      {tags.map((item, index) => {
        let classType = '';

        switch (item) {
          case 'SAFU':
            classType = style._pink;
            break;

          case 'AUDIT':
            classType = style._blue;
            break;

          case 'KYC':
            classType = style._green;
            break;

          case 'DOXX':
            classType = style._yellow;
            break;

          default:
            break;
        }

        return (
          <li key={index} className={classType}>
            {item}
          </li>
        );
      })}
    </ul>
  );

  return (
    <div {...props} className={`${style.card} ${props.className}`}>
      <div className={style.cardTop}>
        <div className={style.cardTop__img}>
          <img src={icon} alt='' />
        </div>
        <div className={style.cardTop__content}>
          <div className={style.cardTop__contentName}>{name}</div>
          <div className={style.cardTop__contentLabel}>
            <span>{label}</span>
            {startDate && <div className={style.startDate}>{startDate}</div>}
          </div>
        </div>
      </div>
      <div className={style.card__text}>{text}</div>
      {tagsList}
    </div>
  );
};

export default Card;
