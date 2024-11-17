import Accordion from '../../components/Accordion';
import SectionTitle from '../../components/SectionTitle/idnex';
import style from './Faq.module.scss';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import { useMediaQuery } from 'usehooks-ts';
import { useRef } from 'react';

const FaqSection = () => {
  const sliderRef = useRef(null);
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <section className={style.faq}>
      <div className='container'>
        <SectionTitle.H2 className={style.faq__title}>
          F<span>A</span>Q's
        </SectionTitle.H2>
        {isMobile && (
          <Swiper
            ref={sliderRef}
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
            onClick={(swiper) => {
              setTimeout(() => {
                swiper.updateAutoHeight(100);
              }, 100);
            }}
          >
            <SwiperSlide>
              <Accordion
                faq={{
                  question:
                    'How does $HiVE ensure the security and privacy of its users?',
                  answer: [
                    "Running a Hive Node on the $HiVE network allows you to actively participate in validating and propagating transactions and blocks. It enhances network security and decentralization and offers the advantage of solo mining. Hive Node operators also gain access to exclusive features and rewards, contributing significantly to the network's growth and development.",
                  ],
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Accordion
                faq={{
                  question: 'Is $HiVE accessible to non-technical users?',
                  answer: [
                    "Running a Hive Node on the $HiVE network allows you to actively participate in validating and propagating transactions and blocks. It enhances network security and decentralization and offers the advantage of solo mining. Hive Node operators also gain access to exclusive features and rewards, contributing significantly to the network's growth and development.",
                  ],
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Accordion
                faq={{
                  question:
                    'Can I participate in governance decisions on the $HiVE platform?',
                  answer: [
                    "Running a Hive Node on the $HiVE network allows you to actively participate in validating and propagating transactions and blocks. It enhances network security and decentralization and offers the advantage of solo mining. Hive Node operators also gain access to exclusive features and rewards, contributing significantly to the network's growth and development.",
                  ],
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Accordion
                faq={{
                  question:
                    'How can developers benefit from the $HiVE ecosystem?',
                  answer: [
                    "Running a Hive Node on the $HiVE network allows you to actively participate in validating and propagating transactions and blocks. It enhances network security and decentralization and offers the advantage of solo mining. Hive Node operators also gain access to exclusive features and rewards, contributing significantly to the network's growth and development.",
                  ],
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Accordion
                faq={{
                  question:
                    'What are the benefits of running a Hive Network Node?',
                  answer: [
                    "Running a Hive Node on the $HiVE network allows you to actively participate in validating and propagating transactions and blocks. It enhances network security and decentralization and offers the advantage of solo mining. Hive Node operators also gain access to exclusive features and rewards, contributing significantly to the network's growth and development.",
                  ],
                }}
              />
            </SwiperSlide>
            <SwiperSlide>
              <Accordion
                faq={{
                  question:
                    'What are the rewards for staking on the $HiVE platform?',
                  answer: [
                    "Running a Hive Node on the $HiVE network allows you to actively participate in validating and propagating transactions and blocks. It enhances network security and decentralization and offers the advantage of solo mining. Hive Node operators also gain access to exclusive features and rewards, contributing significantly to the network's growth and development.",
                  ],
                }}
              />
            </SwiperSlide>
          </Swiper>
        )}
        {!isMobile && (
          <div className={style.faqBody}>
            <Accordion
              delay={100}
              faq={{
                question:
                  'How does $HiVE ensure the security and privacy of its users?',
                answer: [
                  "Running a Hive Node on the $HiVE network allows you to actively participate in validating and propagating transactions and blocks. It enhances network security and decentralization and offers the advantage of solo mining. Hive Node operators also gain access to exclusive features and rewards, contributing significantly to the network's growth and development.",
                ],
              }}
            />
            <Accordion
              delay={100}
              faq={{
                question: 'Is $HiVE accessible to non-technical users?',
                answer: [
                  "Running a Hive Node on the $HiVE network allows you to actively participate in validating and propagating transactions and blocks. It enhances network security and decentralization and offers the advantage of solo mining. Hive Node operators also gain access to exclusive features and rewards, contributing significantly to the network's growth and development.",
                ],
              }}
            />
            <Accordion
              delay={150}
              faq={{
                question:
                  'Can I participate in governance decisions on the $HiVE platform?',
                answer: [
                  "Running a Hive Node on the $HiVE network allows you to actively participate in validating and propagating transactions and blocks. It enhances network security and decentralization and offers the advantage of solo mining. Hive Node operators also gain access to exclusive features and rewards, contributing significantly to the network's growth and development.",
                ],
              }}
            />
            <Accordion
              delay={150}
              faq={{
                question:
                  'How can developers benefit from the $HiVE ecosystem?',
                answer: [
                  "Running a Hive Node on the $HiVE network allows you to actively participate in validating and propagating transactions and blocks. It enhances network security and decentralization and offers the advantage of solo mining. Hive Node operators also gain access to exclusive features and rewards, contributing significantly to the network's growth and development.",
                ],
              }}
            />
            <Accordion
              delay={200}
              faq={{
                question:
                  'What are the benefits of running a Hive Network Node?',
                answer: [
                  "Running a Hive Node on the $HiVE network allows you to actively participate in validating and propagating transactions and blocks. It enhances network security and decentralization and offers the advantage of solo mining. Hive Node operators also gain access to exclusive features and rewards, contributing significantly to the network's growth and development.",
                ],
              }}
            />
            <Accordion
              delay={200}
              faq={{
                question:
                  'What are the rewards for staking on the $HiVE platform?',
                answer: [
                  "Running a Hive Node on the $HiVE network allows you to actively participate in validating and propagating transactions and blocks. It enhances network security and decentralization and offers the advantage of solo mining. Hive Node operators also gain access to exclusive features and rewards, contributing significantly to the network's growth and development.",
                ],
              }}
            />
          </div>
        )}
        <SectionTitle.H4 className={style.faq__subtitle}>
          For additional information or specific inquiries, we <br /> welcome
          you to connect with our dedicated team <br /> on the HiVE Telegram
          channel.
        </SectionTitle.H4>
      </div>
    </section>
  );
};

export default FaqSection;
