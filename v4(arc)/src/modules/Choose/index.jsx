import { useMediaQuery } from 'usehooks-ts';
import SectionTitle from '../../components/SectionTitle/idnex';
import TextBlock from '../../components/TextBlock';
import TextCard from '../../components/TextCard';
import style from './What.module.scss';
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

const ChooseSection = () => {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <section className={style.what}>
      <div className='container'>
        <SectionTitle.H3 className={style.what__title}>
          Why Choose HiVE <br /> Network Bridge?
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
                title={'Seamless Cross-Chain Transfers'}
                text={
                  'Effortlessly bridge BRC20 tokens to other chains, redefining simplicity and efficiency in token transfers.'
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <TextCard
                className={style.whatBody__item}
                icon={icon2}
                title={'Enhanced Security and Usability'}
                text={
                  'Our user-centric approach ensures a safe and intuitive experience, prioritizing your peace of mind in every transaction.'
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <TextCard
                className={style.whatBody__item}
                icon={icon3}
                title={'Developer-Friendly Platform'}
                text={
                  'We invite developers to tap into HiVE’s potential, creating innovative cross-chain applications that redefine the DeFi landscape.'
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <TextCard
                className={style.whatBody__item}
                icon={icon4}
                title={'First Dual-Sided Bridge'}
                text={
                  'HiVE Network stands as the first of its kind, offering dual-sided bridging capabilities for easy transfers between BRC20 and ERC20 tokens.'
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <TextCard
                className={style.whatBody__item}
                icon={icon5}
                title={'Unparalleled Liquidity'}
                text={
                  'By facilitating fluid cross-network transfers, HiVE Network propels liquidity to new heights, enhancing the accessibility and utility of BRC and ERC tokens.'
                }
              />
            </SwiperSlide>
            <SwiperSlide>
              <TextCard
                className={style.whatBody__item}
                icon={icon6}
                title={'Mission-Driven Development'}
                text={
                  'Our core mission is straightforward – to amplify liquidity and accessibility for BRC and ERC tokens in a secure, user-centric environment.'
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
              title={'Seamless Cross-Chain Transfers'}
              text={
                'Effortlessly bridge BRC20 tokens to other chains, redefining simplicity and efficiency in token transfers.'
              }
            />
            <TextCard
              delay={200}
              className={style.whatBody__item}
              icon={icon2}
              title={'Enhanced Security and Usability'}
              text={
                'Our user-centric approach ensures a safe and intuitive experience, prioritizing your peace of mind in every transaction.'
              }
            />
            <TextCard
              delay={100}
              className={style.whatBody__item}
              icon={icon3}
              title={'Developer-Friendly Platform'}
              text={
                'We invite developers to tap into HiVE’s potential, creating innovative cross-chain applications that redefine the DeFi landscape.'
              }
            />
            <TextCard
              delay={200}
              className={style.whatBody__item}
              icon={icon4}
              title={'First Dual-Sided Bridge'}
              text={
                'HiVE Network stands as the first of its kind, offering dual-sided bridging capabilities for easy transfers between BRC20 and ERC20 tokens.'
              }
            />
            <TextCard
              delay={100}
              className={style.whatBody__item}
              icon={icon5}
              title={'Unparalleled Liquidity'}
              text={
                'By facilitating fluid cross-network transfers, HiVE Network propels liquidity to new heights, enhancing the accessibility and utility of BRC and ERC tokens.'
              }
            />
            <TextCard
              delay={200}
              className={style.whatBody__item}
              icon={icon6}
              title={'Mission-Driven Development'}
              text={
                'Our core mission is straightforward – to amplify liquidity and accessibility for BRC and ERC tokens in a secure, user-centric environment.'
              }
            />
          </div>
        )}
        <TextBlock className={style.what__text}>
          <SectionTitle.H4>
            Your Gateway to Advanced Token Interoperability
          </SectionTitle.H4>
          <br />
          <br />
          HiVE Network isn't just a tool; it's a gateway to the future of
          decentralized finance. <br />
          <br /> By bridging the gap between BRC20 and ERC20 tokens, we're not
          only streamlining transactions but also fostering a more
          interconnected and fluid blockchain ecosystem. <br />
          <br /> Embrace the next level of token interoperability with MultiBit
          Bridge. Whether you're a user seeking efficient token transfer or a
          developer aspiring to build cross-chain solutions, MultiBit is your
          platform of choice.
        </TextBlock>
      </div>
    </section>
  );
};

export default ChooseSection;
