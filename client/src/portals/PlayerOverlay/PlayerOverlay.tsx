import './PlayerOverlay.css'
import ReactDOM from "react-dom";
import { RowData, Language, ITranslationPairs } from '../../types';
import { useLockBodyScroll } from '@uidotdev/usehooks';
import { Button } from '@mui/material';
import anonymous_photo from "../../assets/anonymous_photo.jpg"
import { attributesFull } from '../../data/attributes';
import { wings, centers } from '../../data/positionsTitles';
import { skillsQualityStyle } from '../../Utils/skillsQualityStyle';
import FocusTrap from '@mui/material/Unstable_TrapFocus';

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

  console.log(info, attributes, skills);

  const filteredWings = Object.entries(skills).filter(item => wings.includes(item[0]));
  const filteredCenters = Object.entries(skills).filter(item => centers.includes(item[0]));


  return ReactDOM.createPortal((
    <FocusTrap open>
      <div tabIndex={-1}>
        <div className='overlay_bg'></div>
        <section className="player-overlay">
          <div className="close_button_container">
            <Button variant='text' color='inherit' size='large' onClick={handleFalse}>X</Button>
          </div>
          <div className='player-overlay_container'>
            <div className="player_overlay_info_positions">
              <div className='player-overlay_info'>
                <img className='player_photo' src={anonymous_photo} alt="anonymous photo" />
                <ul className="info">
                  <li>{`Best rating: ${skills.Max}`}</li>
                  {Object.entries(info).map((item, index) => <li key={index}>
                    {`${item[0]}: ${item[1]}`}
                  </li>)}
                </ul>
              </div>
              <div className="positions_tablet">
                {[...filteredWings, ...filteredWings].map((item, index) => <div key={index} className={`positions_tablet_pos positions_tablet_${item[0]} ${skillsQualityStyle(item[1])}`}>
                  {item[1]}
                </div>)}
                {filteredCenters.map((item, index) => <div key={index} className={`positions_tablet_pos positions_tablet_${item[0]} ${skillsQualityStyle(item[1])}`}>
                  {item[1]}
                </div>)}
              </div>
            </div>
            <div className='player-overlay_stats'>
              <ul className='stats'>
                {(Object.entries(attributes) as [keyof ITranslationPairs, string][]).map((item, index) => <li key={index}>
                  {`${attributesFull[lang][item[0]]}: ${item[1]}`}
                </li>)}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </FocusTrap>
  ), playerOverlayElement);
};