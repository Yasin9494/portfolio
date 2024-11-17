import style from './Accordion.module.scss';
import { useRef, useState } from 'react';
import questionIcon from './assets/question-icon.svg';
import answerIcon from './assets/answer.png';
import { Fade } from 'react-reveal';

const Accordion = ({ faq, isRoadmap, index, delay }) => {
  const { question, answer } = faq;
  const contentEl = useRef(null);
  const [clicked, setClicked] = useState(false);
  const handleToggle = () => {
    setClicked((prev) => !prev);
  };

  return (
    <Fade bottom delay={delay}>
      <div
        className={`${style.accordion} ${isRoadmap && style.roadmap} ${
          clicked && style.active
        }`}
      >
        <button onClick={handleToggle} className={style.accordion__btn}>
          <p>{question}</p>
          {!isRoadmap && (
            <span className={style.accordion__arrow}>
              {/* <img src={clicked ? answerIcon : questionIcon} alt='' /> */}
              <img src={questionIcon} alt='' />
            </span>
          )}
        </button>
        <div
          ref={contentEl}
          style={
            clicked
              ? { height: contentEl.current.scrollHeight }
              : { height: '0px' }
          }
          className={style.accordion__content}
        >
          <div className={style.accordion__answer}>
            {answer.map((item, index) => (
              <p key={index} dangerouslySetInnerHTML={{ __html: item }}></p>
            ))}
          </div>
        </div>
      </div>
    </Fade>
  );
};

export default Accordion;
