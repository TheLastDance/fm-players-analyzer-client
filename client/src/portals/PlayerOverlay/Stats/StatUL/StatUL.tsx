import "./StatUL.css";
import { TranslationPairs } from "../../../../types";
import { check, multipleCheck } from "../../../../Utils/skillsQualityStyle";
import { isMaskedByHalf } from "../../../../Utils/maskedAttributes";

interface IStatUL {
  skillType: string,
  arr: string[][]
}

const StatUL = ({ skillType, arr }: IStatUL) => {

  function valueColor(item: string) {
    const num = Number(item);
    const match = isMaskedByHalf(item);

    if (num) return multipleCheck([check(num > 15, "value_green"), check(num > 10, "value_yellow"), check(num < 5, "value_gray")]);
    if (match) return multipleCheck([check(Number(match[1]) > 15, "value_green"), check(Number(match[1]) > 10, "value_yellow"), check(Number(match[1]) <= 5, "value_gray")]);
    return "";
  }

  return (
    <div className={`${skillType}_stats`}>
      <h3>{skillType}</h3>
      <ul className='stats'>
        {(arr as [keyof TranslationPairs, string][]).map((item, index) => <li title={item[0]} key={index}>
          <p className="stat_attribute">{item[0]}</p>
          <p className={`stat_value ${valueColor(item[1])}`}>{item[1]}</p>
        </li>)}
      </ul>
    </div>
  )
}

export default StatUL;