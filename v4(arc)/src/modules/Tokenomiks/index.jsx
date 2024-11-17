import { useMediaQuery } from 'usehooks-ts';
import SectionTitle from '../../components/SectionTitle/idnex';
import style from './Tokenomiks.module.scss';
import img from './assets/img.png';
import img2x from './assets/img@2x.png';
import imgMobile from './assets/img-mobile.png';
import imgMobile2x from './assets/img-mobile@2x.png';
import { Zoom } from 'react-reveal';
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from 'react-parallax-mouse';

const TokenomiksSection = () => {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <>
      <MouseParallaxContainer inverted resetOnLeave>
        <section id='tokenomics' className={style.tokenomiks}>
          <div className='container'>
            <SectionTitle.H2 className={style.tokenomiks__title}>
              TOKENOMICS
            </SectionTitle.H2>
            <div className={style.tokenomiksBody}>
              <Zoom>
                <MouseParallaxChild factorX={0.02} factorY={0.03}>
                  <img
                    src={isMobile ? imgMobile : img}
                    srcSet={`${isMobile ? imgMobile : img} 1x, ${
                      isMobile ? imgMobile2x : img2x
                    } 2x`}
                    alt=''
                  />
                </MouseParallaxChild>
              </Zoom>
            </div>
          </div>
        </section>
      </MouseParallaxContainer>
    </>
  );
};

export default TokenomiksSection;
