import "./Stats.css";
import { RowData, Language, AttributesEnum } from "../../../types";
import { attributesFull, technicalAttr, mentalAttr, physicalAttr, goalkeepingAttr } from "../../../data/attributes";
import StatUL from "./StatUL/StatUL";

interface IStats {
  lang: Language['lang'],
  attributes: RowData['attributes'],
}

const Stats = ({ lang, attributes }: IStats) => {

  function toArray(skillTypeArray: string[]) {
    return Object.entries(attributes).filter(item => skillTypeArray.includes(item[0]))
      .map(item => ([attributesFull[lang][(item[0] as AttributesEnum)], item[1]]))
      .sort((a, b) => a[0] === b[0] ? 0 : a[0] < b[0] ? -1 : 1);
  }

  const technical = toArray(technicalAttr);
  const mental = toArray(mentalAttr);
  const physical = toArray(physicalAttr);
  const goalkeeping = toArray(goalkeepingAttr);

  return (
    <div className='player-overlay_stats'>
      <StatUL skillType="Technical" arr={technical} />
      <StatUL skillType="Mental" arr={mental} />
      <StatUL skillType="Physical" arr={physical} />
      <StatUL skillType="Goalkeeping" arr={goalkeeping} />
    </div>
  )
}

export default Stats;