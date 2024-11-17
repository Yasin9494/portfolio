import { Fade } from 'react-reveal';
import style from './TextBlock.module.scss';

const TextBlock = ({ className, children }) => {
  return (
    <Fade>
      <div className={`${style.text} ${className}`}>
        <Fade>{children}</Fade>
      </div>
      ;
    </Fade>
  );
};

export default TextBlock;
