import SectionTitle from '../../components/SectionTitle/idnex';
import TextBlock from '../../components/TextBlock';
import TextCard from '../../components/TextCard';
import style from './Why.module.scss';
import icon1 from './assets/icon1.svg';
import icon2 from './assets/icon2.svg';
import icon3 from './assets/icon3.svg';
import icon4 from './assets/icon4.svg';
import icon5 from './assets/icon5.svg';
import icon6 from './assets/icon6.svg';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { useMediaQuery } from 'usehooks-ts';

const WhySection = () => {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <section className={style.why}>
      <div className='container'>
        <SectionTitle.H3 className={style.why__text}>
          <span>
            tRY OUR SOLANA TELEGRAM TRADING <br /> BOT <br />
            Bonkosaurus bot 1% fEES
          </span>{' '}
          <br /> $BONKO BOTS usage fee's 1% <br /> REVSHARE EVERY 24 HOURS TO
          HOLDERS
        </SectionTitle.H3>
        <SectionTitle.H3 className={style.why__title}>
          Why Choose BONKOPAD $BONKO?
        </SectionTitle.H3>

        {isMobile && (
          <Swiper
            modules={[Pagination]}
            pagination={{
              clickable: true,
              bulletClass: `${style.slider__bullet}`,
              bulletActiveClass: `${style.active}`,
            }}
            className={style.slider}
            spaceBetween={0}
            slidesPerView={1}
            autoHeight
          >
            <SwiperSlide>
              <TextCard
                className={style.whyBody__item}
                icon={icon1}
                title={'User-Friendly Interface for Easy Access'}
                text={
                  'BONKOPAD $BONKO is designed for simplicity, making Solana project presales accessible to both novice and seasoned investors. Our platform ensures a smooth and intuitive experience, allowing users to participate in presales without navigating complex systems.'
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <TextCard
                className={style.whyBody__item}
                icon={icon2}
                title={'Expertly Curated Solana Projects'}
                text={
                  'We specialize in selecting high-potential Solana projects for our presales, providing users with opportunities to invest in the future of blockchain. Our team conducts thorough research and analysis to bring only the best projects to our platform.'
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <TextCard
                className={style.whyBody__item}
                icon={icon3}
                title={'Mission-Driven Focus on Solana Ecosystem'}
                text={
                  'Our mission is clear – to enhance accessibility and liquidity for Solana-based projects through a secure and user-focused platform. BONKOPAD $BONKO is dedicated to supporting the growth and innovation within the Solana ecosystem.'
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <TextCard
                className={style.whyBody__item}
                icon={icon4}
                title={'Prioritizing Security in Investments'}
                text={
                  'We place a high emphasis on security, ensuring a safe and reliable investment environment. Our platform is built with robust security measures, safeguarding your investments and peace of mind.'
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <TextCard
                className={style.whyBody__item}
                icon={icon5}
                title={' Streamlined Participation in Presales'}
                text={
                  'BONKOPAD $BONKO simplifies the process of participating in Solana presales. Our platform is designed for seamless engagement, making it easier than ever to invest in early-stage blockchain projects.'
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <TextCard
                className={style.whyBody__item}
                icon={icon6}
                title={'Exclusive Access to Early Investment Opportunities'}
                text={
                  'BONKOPAD $BONKO provides its users with exclusive early access to presales of cutting-edge Solana projects. This unique opportunity allows investors to get in at the ground level of innovative ventures, potentially reaping significant rewards as these projects grow and develop within the Solana ecosystem.'
                }
              />
            </SwiperSlide>
          </Swiper>
        )}
        {!isMobile && (
          <div className={style.whyBody}>
            <TextCard
              delay={100}
              className={style.whyBody__item}
              icon={icon1}
              title={'User-Friendly Interface for Easy Access'}
              text={
                'BONKOPAD $BONKO is designed for simplicity, making Solana project presales accessible to both novice and seasoned investors. Our platform ensures a smooth and intuitive experience, allowing users to participate in presales without navigating complex systems.'
              }
            />
            <TextCard
              delay={200}
              className={style.whyBody__item}
              icon={icon2}
              title={'Expertly Curated Solana Projects'}
              text={
                'We specialize in selecting high-potential Solana projects for our presales, providing users with opportunities to invest in the future of blockchain. Our team conducts thorough research and analysis to bring only the best projects to our platform.'
              }
            />
            <TextCard
              delay={300}
              className={style.whyBody__item}
              icon={icon3}
              title={'Mission-Driven Focus on Solana Ecosystem'}
              text={
                'Our mission is clear – to enhance accessibility and liquidity for Solana-based projects through a secure and user-focused platform. BONKOPAD $BONKO is dedicated to supporting the growth and innovation within the Solana ecosystem.'
              }
            />
            <TextCard
              delay={100}
              className={style.whyBody__item}
              icon={icon4}
              title={'Prioritizing Security in Investments'}
              text={
                'We place a high emphasis on security, ensuring a safe and reliable investment environment. Our platform is built with robust security measures, safeguarding your investments and peace of mind.'
              }
            />
            <TextCard
              delay={200}
              className={style.whyBody__item}
              icon={icon5}
              title={' Streamlined Participation in Presales'}
              text={
                'BONKOPAD $BONKO simplifies the process of participating in Solana presales. Our platform is designed for seamless engagement, making it easier than ever to invest in early-stage blockchain projects.'
              }
            />
            <TextCard
              delay={300}
              className={style.whyBody__item}
              icon={icon6}
              title={'Exclusive Access to Early Investment Opportunities'}
              text={
                'BONKOPAD $BONKO provides its users with exclusive early access to presales of cutting-edge Solana projects. This unique opportunity allows investors to get in at the ground level of innovative ventures, potentially reaping significant rewards as these projects grow and develop within the Solana ecosystem.'
              }
            />
          </div>
        )}
        <TextBlock className={style.whyText}>
          <span>$BONKO COIN</span>
        </TextBlock>
      </div>
    </section>
  );
};

export default WhySection;
