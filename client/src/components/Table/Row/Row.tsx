import { RowData, Language } from "../../../types";
import { skillsQualityStyle } from "../../../Utils/skillsQualityStyle";
import { PlayerOverlay } from "../../../portals/PlayerOverlay/PlayerOverlay";
import { useToggle } from "../../../customHooks/useToggle";

interface IRow {
  item: RowData,
  lang: Language['lang']
}

const Row = ({ item, lang }: IRow) => {
  // eslint-disable-next-line
  const { attributes, skills, ...rest } = item;
  const [isToggled, , handleFalse, handleTrue] = useToggle();
  //console.log(rest);

  const keyTabbable = (e: React.KeyboardEvent<HTMLTableRowElement>) => {
    if (e.key === "Enter" || e.key === " ") handleTrue();
  }

  return (
    <tr tabIndex={0} onClick={handleTrue} onKeyDown={keyTabbable}>
      {Object.values({ ...skills, ...rest }).map((item, index) => <td key={index} className={skillsQualityStyle(item)}>
        {item}
      </td>)}
      {isToggled && <PlayerOverlay lang={lang} handleFalse={handleFalse} attributes={attributes} skills={skills} info={rest} />}
    </tr>
  )
}

export default Row;