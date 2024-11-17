import SectionTitle from '../../components/SectionTitle/idnex';
import TextBlock from '../../components/TextBlock';
import TextCard from '../../components/TextCard';
import style from './What.module.scss';
import icon1 from './assets/icon1.svg';
import icon2 from './assets/icon2.svg';
import icon3 from './assets/icon3.svg';
import icon4 from './assets/icon4.svg';
import icon5 from './assets/icon5.svg';
import { useMediaQuery } from 'usehooks-ts';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

const WhatSection = () => {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <section className={style.what}>
      <div className='container'>
        <SectionTitle.H3 className={style.what__title}>
          What Does Operating a <br /> <span>Bonkosaurus</span> Entail?
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
            spaceBetween={50}
            slidesPerView={1}
            autoHeight
          >
            <SwiperSlide>
              <TextCard
                className={style.whatBody__item}
                icon={icon1}
                title={'Active Network Participation'}
                text={
                  'Engage in the vital processes of validating and propagating transactions and blocks within the HIVE network.'
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <TextCard
                className={style.whatBody__item}
                icon={icon2}
                title={'Enhance Network Security'}
                text={
                  "Your participation bolsters the network's resilience and decentralization, pivotal in safeguarding the blockchain's integrity."
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <TextCard
                className={style.whatBody__item}
                icon={icon3}
                title={'Support and Nurture the Ecosystem'}
                text={
                  'Your involvement goes beyond mining; it supports the continuous growth and development of the HIVE network.'
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <TextCard
                className={style.whatBody__item}
                icon={icon4}
                title={'Solo Mining Capability'}
                text={
                  'Break free from the constraints of mining pools. With a HiVE Node, you have the independence to mine solo, directly benefiting from your efforts.'
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <TextCard
                className={style.whatBody__item}
                icon={icon5}
                title={'Exclusive Access to Features and Rewards'}
                text={
                  'Operating a HIVE Node unlocks a world of unique features and lucrative rewards, exclusive to node operators.'
                }
              />
            </SwiperSlide>
          </Swiper>
        )}
        {!isMobile && (
          <div className={style.whatBody}>
            <TextCard
              delay={100}
              className={style.whatBody__item}
              icon={icon1}
              title={'Active Network Participation'}
              text={
                'Engage in the vital processes of validating and propagating transactions and blocks within the HIVE network.'
              }
            />
            <TextCard
              delay={200}
              className={style.whatBody__item}
              icon={icon2}
              title={'Enhance Network Security'}
              text={
                "Your participation bolsters the network's resilience and decentralization, pivotal in safeguarding the blockchain's integrity."
              }
            />
            <TextCard
              delay={100}
              className={style.whatBody__item}
              icon={icon3}
              title={'Support and Nurture the Ecosystem'}
              text={
                'Your involvement goes beyond mining; it supports the continuous growth and development of the HIVE network.'
              }
            />
            <TextCard
              delay={200}
              className={style.whatBody__item}
              icon={icon4}
              title={'Solo Mining Capability'}
              text={
                'Break free from the constraints of mining pools. With a HiVE Node, you have the independence to mine solo, directly benefiting from your efforts.'
              }
            />
            <TextCard
              delay={100}
              className={style.whatBody__item}
              icon={icon5}
              title={'Exclusive Access to Features and Rewards'}
              text={
                'Operating a HIVE Node unlocks a world of unique features and lucrative rewards, exclusive to node operators.'
              }
            />
          </div>
        )}
        <TextBlock className={style.what__text}>
          Your role in driving innovation and growth in the{' '}
          <span>Bonkosaurus</span> ecosystem is just a click away. Preorder now
          and be prepared for February's exciting launch!
        </TextBlock>
      </div>
    </section>
  );
};

export default WhatSection;
