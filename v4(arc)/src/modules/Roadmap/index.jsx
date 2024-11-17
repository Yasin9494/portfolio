import { useMediaQuery } from 'usehooks-ts';
import SectionTitle from '../../components/SectionTitle/idnex';
import style from './Roadmap.module.scss';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import './pagination.scss';
import { Fade } from 'react-reveal';

const RoadmapSection = () => {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <section id='roadmap' className={style.roadmap}>
      <div className='container'>
        <SectionTitle.H2 className={style.roadmap__title}>
          ROADMAP
        </SectionTitle.H2>
        {isMobile ? (
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
              <div className={style.roadmapCard}>
                <div className={style.roadmapCard__num}>1</div>
                <div className={style.roadmapCard__text}>
                  <p>Platform Launch and Community Engagement</p>
                  <ul>
                    <li>
                      Launch the BONKOPAD $BONKO platform with a focus on user
                      experience.
                    </li>
                    <li>
                      Kickstart an engaging community-driven approach, using
                      social media, interactive forums, and live Q&A sessions.
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <div className={style.roadmapCard}>
                <div className={style.roadmapCard__num}>2</div>
                <div className={style.roadmapCard__text}>
                  <p> Strategic Marketing and Project Hype</p>
                  <ul>
                    <li>
                      Implement dynamic marketing campaigns to build excitement
                      around upcoming Solana project presales.
                    </li>
                    <li>
                      Spotlight each project, highlighting their unique features
                      and potential in the blockchain space.
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={style.roadmapCard}>
                <div className={style.roadmapCard__num}>3</div>
                <div className={style.roadmapCard__text}>
                  <p> Expansion of User Rewards and Partnerships</p>
                  <ul>
                    <li>
                      Introduce an enhanced rewards program, incentivizing
                      active participation and long-term commitment.
                    </li>
                    <li>
                      Formulate partnerships with key crypto influencers and
                      media for greater outreach and credibility.
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              {' '}
              <div className={style.roadmapCard}>
                <div className={style.roadmapCard__num}>4</div>
                <div className={style.roadmapCard__text}>
                  <p> Mobile App Development and User-Centric Features</p>
                  <ul>
                    <li>
                      Develop and release a mobile app, ensuring accessibility
                      and convenience for on-the-go investors.
                    </li>
                    <li>
                      Roll out community-driven features, such as project voting
                      and feedback mechanisms, to involve users in
                      decision-making.
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={style.roadmapCard}>
                <div className={style.roadmapCard__num}>5</div>
                <div className={style.roadmapCard__text}>
                  <p> Advanced Tools and Educational Initiatives</p>
                  <ul>
                    <li>
                      Integrate sophisticated analytics tools for better
                      investment insights and strategies.
                    </li>
                    <li>
                      Launch educational initiatives, including webinars and
                      informational content, to empower users with knowledge
                      about blockchain investments.
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className={style.roadmapCard}>
                <div className={style.roadmapCard__num}>6</div>
                <div className={style.roadmapCard__text}>
                  <p>Global Expansion and Sustainability Initiatives</p>
                  <ul>
                    <li>
                      Strategically expand into new global markets, adapting to
                      diverse investor needs.
                    </li>
                    <li>
                      Implement sustainability practices within the platform,
                      promoting eco-friendly blockchain technology.
                    </li>
                  </ul>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        ) : (
          <div className={style.roadmapBody}>
            <Fade bottom delay={100}>
              <div className={style.roadmapCard}>
                <div className={style.roadmapCard__num}>1</div>
                <div className={style.roadmapCard__text}>
                  <p>Platform Launch and Community Engagement</p>
                  <ul>
                    <li>
                      Launch the BONKOPAD $BONKO platform with a focus on user
                      experience.
                    </li>
                    <li>
                      Kickstart an engaging community-driven approach, using
                      social media, interactive forums, and live Q&A sessions.
                    </li>
                  </ul>
                </div>
              </div>
            </Fade>
            <Fade bottom delay={200}>
              <div className={style.roadmapCard}>
                <div className={style.roadmapCard__num}>2</div>
                <div className={style.roadmapCard__text}>
                  <p> Strategic Marketing and Project Hype</p>
                  <ul>
                    <li>
                      Implement dynamic marketing campaigns to build excitement
                      around upcoming Solana project presales.
                    </li>
                    <li>
                      Spotlight each project, highlighting their unique features
                      and potential in the blockchain space.
                    </li>
                  </ul>
                </div>
              </div>
            </Fade>
            <Fade bottom delay={300}>
              <div className={style.roadmapCard}>
                <div className={style.roadmapCard__num}>3</div>
                <div className={style.roadmapCard__text}>
                  <p> Expansion of User Rewards and Partnerships</p>
                  <ul>
                    <li>
                      Introduce an enhanced rewards program, incentivizing
                      active participation and long-term commitment.
                    </li>
                    <li>
                      Formulate partnerships with key crypto influencers and
                      media for greater outreach and credibility.
                    </li>
                  </ul>
                </div>
              </div>
            </Fade>
            <Fade bottom delay={100}>
              <div className={style.roadmapCard}>
                <div className={style.roadmapCard__num}>4</div>
                <div className={style.roadmapCard__text}>
                  <p> Mobile App Development and User-Centric Features</p>
                  <ul>
                    <li>
                      Develop and release a mobile app, ensuring accessibility
                      and convenience for on-the-go investors.
                    </li>
                    <li>
                      Roll out community-driven features, such as project voting
                      and feedback mechanisms, to involve users in
                      decision-making.
                    </li>
                  </ul>
                </div>
              </div>
            </Fade>
            <Fade bottom delay={200}>
              <div className={style.roadmapCard}>
                <div className={style.roadmapCard__num}>5</div>
                <div className={style.roadmapCard__text}>
                  <p> Advanced Tools and Educational Initiatives</p>
                  <ul>
                    <li>
                      Integrate sophisticated analytics tools for better
                      investment insights and strategies.
                    </li>
                    <li>
                      Launch educational initiatives, including webinars and
                      informational content, to empower users with knowledge
                      about blockchain investments.
                    </li>
                  </ul>
                </div>
              </div>
            </Fade>
            <Fade bottom delay={300}>
              <div className={style.roadmapCard}>
                <div className={style.roadmapCard__num}>6</div>
                <div className={style.roadmapCard__text}>
                  <p>Global Expansion and Sustainability Initiatives</p>
                  <ul>
                    <li>
                      Strategically expand into new global markets, adapting to
                      diverse investor needs.
                    </li>
                    <li>
                      Implement sustainability practices within the platform,
                      promoting eco-friendly blockchain technology.
                    </li>
                  </ul>
                </div>
              </div>
            </Fade>
          </div>
        )}
      </div>
    </section>
  );
};

export default RoadmapSection;
