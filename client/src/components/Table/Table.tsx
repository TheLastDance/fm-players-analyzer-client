import './Table.css'
import { RowData } from '../../types'
import { titles } from '../../data/positionsTitles';
import Header from './Header/Header';

interface ITable {
  data: RowData[],
  setData: React.Dispatch<React.SetStateAction<RowData[]>>,
}

const Table = ({ data, setData }: ITable) => {
  const skills = data.length ? data[0].skills : [];
  const headers = data.length ? Object.keys({ ...skills, ...data[0] }).filter(item => item !== 'skills' && item !== "attributes") : [];
  const newData = data.length ? data.map(item => {
    // eslint-disable-next-line
    const { attributes, skills, ...rest } = item;
    return { ...skills, ...rest }
  }) : [];

  const handleTitles = (item: keyof typeof titles) => {
    if (Object.prototype.hasOwnProperty.call(titles, item)) {
      return titles[item];
    }
    return "";
  }

  const handleSort = (item: keyof typeof titles, toggle: boolean = false) => {
    if (!toggle) {
      if (handleTitles(item)) {
        setData(prev => [...prev].sort((a: RowData, b: RowData) => b.skills[item] - a.skills[item]));
      } else {
        setData(prev => [...prev].sort((a: RowData, b: RowData) => a[item] === b[item] ? 0 : a[item] < b[item] ? -1 : 1));
      }
    } else {
      if (handleTitles(item)) {
        setData(prev => [...prev].sort((a: RowData, b: RowData) => a.skills[item] - b.skills[item]));
      } else {
        setData(prev => [...prev].sort((a: RowData, b: RowData) => a[item] === b[item] ? 0 : a[item] < b[item] ? 1 : -1));
      }
    }
  }

  return (
    <section className='players_section'>
      <table>
        <thead>
          <tr>
            {headers.map((item, index) => <Header key={index} item={item} handleSort={handleSort} handleTitles={handleTitles} />)}
          </tr>
        </thead>
        <tbody>
          {newData.map((item, index) => <tr key={index}>
            {Object.values(item).map((item, index) => <td key={index}>
              {item}
            </td>)}
          </tr>)}
        </tbody>
      </table>
    </section>
  )
}

export default Table;