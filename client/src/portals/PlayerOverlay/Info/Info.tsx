import "./Info.css";
import anonymous_photo from "../../../assets/anonymous_photo.jpg";
import { RowData, PositionsEnum } from "../../../types";
import { wings, centers } from '../../../data/positionsTitles';
import Position from "./Position/Position";

interface IInfo {
  skills: RowData['skills'],
  info: {
    [key: string]: string,
  }
}

const Info = ({ skills, info }: IInfo) => {

  const filteredWings = Object.entries(skills).filter(item => wings.includes(item[0] as PositionsEnum));
  const filteredCenters = Object.entries(skills).filter(item => centers.includes(item[0] as PositionsEnum));

  return (
    <div className="player_overlay_info_positions">
      <div className='player-overlay_info'>
        <img className='player_photo' src={anonymous_photo} alt="anonymous photo" />
        <ul className="info">
          <li>
            <p className="underlined_prop">{`Best rating: `}</p>
            <p>{skills.Max}</p>
          </li>
          {Object.entries(info).map((item, index) => <li key={index}>
            <p className="underlined_prop">{`${item[0]}: `}</p>
            <p>{item[1]}</p>
          </li>)}
        </ul>
      </div>
      <div className="positions_tablet">
        <Position arr={[...filteredWings, ...filteredWings]} />
        <Position arr={filteredCenters} />
      </div>
    </div>
  )
}

export default Info;