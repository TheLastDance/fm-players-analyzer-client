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
          <li>{`Best rating: ${skills.Max}`}</li>
          {Object.entries(info).map((item, index) => <li key={index}>
            {`${item[0]}: ${item[1]}`}
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