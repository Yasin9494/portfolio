import { Fade } from 'react-reveal';
import Presale from '../../components/Presale';
import SectionTitle from '../../components/SectionTitle/idnex';
import style from './Node.module.scss';

const NodeSection = () => {
  return (
    <section className={style.node}>
      <div className='container'>
        <div className={style.nodeBody}>
          <Presale />
          <div className={style.nodeBody__content}>
            <SectionTitle.H2>NODE</SectionTitle.H2>
            <SectionTitle.H4>
              <span>
                Introducing the HIVE Node - <br /> Powered by Bonkosaurus.
              </span>
            </SectionTitle.H4>
            <Fade bottom cascade>
              <p>Introducing the HIVE Node - Powered by Bonkosaurus.</p>
              <p>
                Embrace the forefront of blockchain technology by operating a
                HIVE Node, powered by $HiVE, the cornerstone node software for
                the HIVE cryptocurrency network.
              </p>
              <p>
                As a HIVE Node operator, you're not just a user; you become a
                pivotal element in the HIVE ecosystem, contributing directly to
                its strength and decentralization.
              </p>
              <p>Preorder Now for February Delivery!</p>
              <p>
                Reserve your HIVE Node today and be among the first to access
                this cutting-edge technology in February. By preordering, you
                position yourself at the vanguard of the HIVE ecosystem, ready
                to harness its full potential.
              </p>
            </Fade>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NodeSection;
