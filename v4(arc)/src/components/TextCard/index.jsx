import { Fade } from 'react-reveal';
import style from './TextCard.module.scss';

const TextCard = ({ icon, title, text, className, delay }) => {
  return (
    <Fade delay={delay}>
      <div className={`${style.card} ${className}`}>
        <div className={style.card__icon}>
          <img src={icon} alt='' />
        </div>
        <div className={style.card__title}>{title}</div>
        <div
          className={style.card__text}
          dangerouslySetInnerHTML={{ __html: text }}
        ></div>
      </div>
    </Fade>
  );
};

export default TextCard;
