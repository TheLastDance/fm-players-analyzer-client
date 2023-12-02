import { RowData } from "../../../types";
import { skillsQualityStyle } from "../../../Utils/skillsQualityStyle";

interface IRow {
  item: RowData,
}

const Row = ({ item }: IRow) => {
  // eslint-disable-next-line
  const { attributes, skills, ...rest } = item;

  return (
    <tr>
      {Object.values({ ...skills, ...rest }).map((item, index) => <td key={index} className={skillsQualityStyle(item)}>
        {item}
      </td>)}
    </tr>
  )
}

export default Row;