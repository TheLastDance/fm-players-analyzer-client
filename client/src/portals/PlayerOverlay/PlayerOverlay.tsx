import './PlayerOverlay.css'
import ReactDOM from "react-dom";
import { RowData, Language } from '../../types';
import { useLockBodyScroll } from '@uidotdev/usehooks';
import { Button } from '@mui/material';
import FocusTrap from '@mui/material/Unstable_TrapFocus';
import Info from './Info/Info';
import Stats from './Stats/Stats';

export interface IPlayerOverlayProps {
  lang: Language['lang'],
  handleFalse: () => void,
  attributes: RowData['attributes'],
  skills: RowData['skills'],
  info: {
    [key: string]: string,
  }
}

export const PlayerOverlay: React.FC<IPlayerOverlayProps> = ({ info, attributes, skills, handleFalse, lang }) => {
  useLockBodyScroll();
  const playerOverlayElement = document.getElementById("player-overlay");
  if (!playerOverlayElement) {
    return null;
  }

  return ReactDOM.createPortal((
    <FocusTrap open>
      <div className='tabIndex_div' tabIndex={-1}>
        <div className='overlay_bg'></div>
        <section className="player-overlay">
          <div className="close_button_container">
            <Button variant='text' color='inherit' size='large' sx={{ zIndex: 5 }} onClick={handleFalse}>X</Button>
          </div>
          <div className='player-overlay_container'>
            <Info info={info} skills={skills} />
            <Stats lang={lang} attributes={attributes} />
          </div>
        </section>
      </div>
    </FocusTrap>
  ), playerOverlayElement);
};