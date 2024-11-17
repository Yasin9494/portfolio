import { Fade, Zoom } from 'react-reveal';
import SectionTitle from '../../components/SectionTitle/idnex';
import style from './Staking.module.scss';
import bg from './assets/bg.jpg';
import egg from './assets/egg.mp4';
import eggWebm from './assets/egg.webm';
import {
  MouseParallaxChild,
  MouseParallaxContainer,
} from 'react-parallax-mouse';

const StakingSection = () => {
  return (
    <MouseParallaxContainer resetOnLeave>
      <section className={style.about}>
        <div className={style.about__bg}>
          <img src={bg} alt='' />
        </div>

        <div className='container'>
          {/* <SectionTitle.H2 className={style.about__title}>
            STAKING
          </SectionTitle.H2> */}
          <div className={style.aboutBody}>
            <Fade bottom>
              <div className={style.aboutBody__content}>
                <SectionTitle.H2>BONKO EGGS</SectionTitle.H2>
                <SectionTitle.H4>
                  Unlock 100X Returns as a $BONK Holder
                </SectionTitle.H4>
                <p>
                  Daily Bonko Egg RewardsReceive Bonko Eggs every 24 hours,
                  based on your $BONKO holdings.
                </p>
                <p>
                  Access to Solana Projects Use your Bonko Eggs to gain
                  exclusive access to whitelist, Solana Presales.
                </p>
                <p>
                  Simple Investment ProcessBonko Eggs the key to taking part in
                  pre-sales, collect your 500 Eggs for Early Access!
                </p>
              </div>
            </Fade>
            <div className={style.aboutBody__video}>
              <Zoom>
                <MouseParallaxChild factorX={0.02} factorY={0.03}>
                  <div className={style.aboutBody__videoItem}>
                    <video
                      preload='auto'
                      playsInline
                      webkit-playsInline
                      loop
                      autoPlay
                      muted
                    >
                      <source src={eggWebm} type='video/webm' />

                      <source src={egg} type='video/mp4' />
                    </video>
                  </div>
                </MouseParallaxChild>
              </Zoom>
            </div>
          </div>
        </div>
      </section>
    </MouseParallaxContainer>
  );
};

export default StakingSection;
