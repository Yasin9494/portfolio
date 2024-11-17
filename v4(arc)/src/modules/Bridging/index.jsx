import { useMediaQuery } from 'usehooks-ts';
import SectionTitle from '../../components/SectionTitle/idnex';
import style from './Bridging.module.scss';
import bg from './assets/bg.jpg';
import bgMobile from './assets/bg-mobile.jpg';
import { Fade } from 'react-reveal';

const BridgingSection = () => {
  const isMobile = useMediaQuery('(max-width:767px)');

  return (
    <section className={style.bridging}>
      <div className={style.bridging__bg}>
        <img src={isMobile ? bgMobile : bg} alt='' />
      </div>

      <div className='container'>
        <div className={style.bridgingBody}>
          <SectionTitle.H2 className={style.bridging__title}>
            <span>Bonkosaurus</span>
            <br />
            BRIDGING
          </SectionTitle.H2>
          <SectionTitle.H4 className={style.bridging__subtitle}>
            Introducing HiVE Network Bridge: Revolutionizing BRC20 and ERC20
            Token Transfers
          </SectionTitle.H4>
          <Fade bottom cascade>
            <p>
              Experience seamless cross-chain token transfers like never before
              with HiVE Network Bridge, a testament to our unwavering commitment
              to user experience.
            </p>
            <p>
              Designed with both safety and ease in mind, HiVE Network Bridge
              emerges as a reliable tool, revolutionizing the way users interact
              with BRC20 tokens across multiple chains.
            </p>
          </Fade>
        </div>
      </div>
    </section>
  );
};

export default BridgingSection;
