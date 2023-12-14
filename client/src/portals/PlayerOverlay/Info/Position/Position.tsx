import "./Position.css";
import { skillsQualityStyle } from "../../../../Utils/skillsQualityStyle";

interface IPosition {
  arr: [string, number][],
}

const Position = ({ arr }: IPosition) => {
  return (
    arr.map((item, index) => <div key={index} className={`positions_tablet_pos positions_tablet_${item[0]} ${skillsQualityStyle(item[1])}`}>
      {item[1]}
    </div>
    ))
}

export default Position;