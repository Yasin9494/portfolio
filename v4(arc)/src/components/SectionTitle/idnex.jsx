import { Fade } from 'react-reveal';
import style from './SectionTitle.module.scss';

const SectionTitle = {
  H2: ({ children, className }) => {
    return (
      <Fade bottom>
        <h2 className={`${style.title} ${style.h2} ${className}`}>
          {children}
        </h2>
      </Fade>
    );
  },
  H3: ({ children, className }) => {
    return (
      <Fade bottom>
        <h3 className={`${style.title} ${style.h3} ${className}`}>
          {children}
        </h3>
      </Fade>
    );
  },
  H4: ({ children, className }) => {
    return (
      <Fade bottom>
        <h4 className={`${style.title} ${style.h4} ${className}`}>
          {children}
        </h4>
      </Fade>
    );
  },
};

export default SectionTitle;
