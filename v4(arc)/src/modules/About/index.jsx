import { useMediaQuery } from 'usehooks-ts';
import SectionTitle from '../../components/SectionTitle/idnex';
import style from './About.module.scss';
import { Fade, Zoom } from 'react-reveal';

const AboutSection = () => {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <section id='about' className={style.about}>
      <div className='container'>
        <div className={style.aboutBody}>
          <div className={style.aboutBody__video}>
            <div className={style.aboutBody__videoItem}>
              <iframe
                src='https://www.youtube.com/embed/xw38ChU9utI?si=lPGGUmebOAptI6Zl'
                title='YouTube video player'
                frameborder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                allowfullscreen
              ></iframe>
            </div>
            {/* {!isMobile && (
              <div className={style.aboutBottom}>
                <Zoom>
                  <div className={style.aboutBottom__buy}>
                    <a href='.' target='_blank' rel='noreferrer'>
                      INSTANT BUY
                    </a>
                    BUY $BONKO COIN TODAY.
                  </div>
                </Zoom>
              </div>
            )} */}
          </div>
          <Fade bottom cascade>
            <div className={style.aboutBody__content}>
              <SectionTitle.H3>About</SectionTitle.H3>
              <p>
                BONKOPAD $BONKO is your easy way to join early-stage projects on
                the Solana blockchain. Get simple, direct access to new, HYPED
                Solana projects.
              </p>
            </div>
          </Fade>
          {/* {isMobile && (
            <div className={style.aboutBottom}>
              <Zoom>
                <div className={style.aboutBottom__buy}>
                  <a href='.' target='_blank' rel='noreferrer'>
                    INSTANT BUY
                  </a>
                  BUY $BONKO COIN TODAY.
                </div>
              </Zoom>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
