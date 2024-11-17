import { linksContent } from '../../links';
import style from './Socials.module.scss';
import tgIcon from './assets/tg.jsx';
import xIcon from './assets/x.jsx';
import ytIcon from './assets/yt.jsx';

const Socials = ({ className }) => {
  return (
    <div className={`${style.socials} ${className}`}>
      <a href={linksContent.telegram} target='_blank' rel='noreferrer'>
        {tgIcon}
      </a>
      <a href={linksContent.twitter} target='_blank' rel='noreferrer'>
        {xIcon}
      </a>
      {/* <a href={linksContent.youtube} target='_blank' rel='noreferrer'>
        {ytIcon}
      </a> */}
    </div>
  );
};

export default Socials;
