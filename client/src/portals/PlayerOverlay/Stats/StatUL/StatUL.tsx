import "./StatUL.css";
import { TranslationPairs } from "../../../../types";

interface IStatUL {
  skillType: string,
  arr: string[][],
}

const StatUL = ({ skillType, arr }: IStatUL) => {

  return (
    <div className={`${skillType}_stats`}>
      <h3>{skillType}</h3>
      <ul className='stats'>
        {(arr as [keyof TranslationPairs, string][]).map((item, index) => <li title={item[0]} key={index}>
          {`${[item[0]]}: ${item[1]}`}
        </li>)}
      </ul>
    </div>
  )
}

export default StatUL;