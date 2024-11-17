import { Fade } from 'react-reveal';
import SectionTitle from '../../components/SectionTitle/idnex';
import style from './Partners.module.scss';
import img1 from './assets/img1.png';
import img2 from './assets/img2.png';
import img3 from './assets/img3.png';
import img4 from './assets/img4.png';
import img5 from './assets/img5.png';
import img6 from './assets/img6.png';
import Marquee from 'react-fast-marquee';

const PartnersSection = () => {
  return (
    <section className={style.partners}>
      <div className='container'>
        <SectionTitle.H2 className={style.partners__title}>
          PARTNERS
        </SectionTitle.H2>
      </div>
      <Fade cascade>
        <Marquee className={style.partnersBody}>
          <div className={style.partnersBody__img}>
            <img src={img1} alt='' />
          </div>
          <div className={style.partnersBody__img}>
            <img src={img2} alt='' />
          </div>
          <div className={style.partnersBody__img}>
            <img src={img3} alt='' />
          </div>
          <div className={style.partnersBody__img}>
            <img src={img4} alt='' />
          </div>
          <div className={style.partnersBody__img}>
            <img src={img5} alt='' />
          </div>
          <div className={style.partnersBody__img}>
            <img src={img6} alt='' />
          </div>
          <div className={style.partnersBody__img}>
            <img src={img1} alt='' />
          </div>
          <div className={style.partnersBody__img}>
            <img src={img2} alt='' />
          </div>
          <div className={style.partnersBody__img}>
            <img src={img3} alt='' />
          </div>
          <div className={style.partnersBody__img}>
            <img src={img4} alt='' />
          </div>
          <div className={style.partnersBody__img}>
            <img src={img5} alt='' />
          </div>
          <div className={style.partnersBody__img}>
            <img src={img6} alt='' />
          </div>
        </Marquee>
      </Fade>
    </section>
  );
};

export default PartnersSection;
