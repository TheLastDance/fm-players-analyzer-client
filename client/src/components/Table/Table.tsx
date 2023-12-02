import './Table.css'
import { useState, memo } from 'react';
import { RowData, newDataType } from '../../types'
import { titles } from '../../data/positionsTitles';
import Header from './Header/Header';
import { TablePagination } from '@mui/material';
import { skillsQualityStyle } from '../../Utils/skillsQualityStyle';
import { handleTitles } from '../../Utils/handleTitles';

interface ITable {
  data: RowData[],
  newData: newDataType[],
  setNewData: React.Dispatch<React.SetStateAction<newDataType[]>>,
}

const Table = memo(({ data, newData, setNewData }: ITable) => {
  const skills = data.length ? data[0].skills : [];
  const headers = data.length ? Object.keys({ ...skills, ...data[0] }).filter(item => item !== 'skills' && item !== "attributes") : [];
  const [page, setPage] = useState(0); // page of pagination
  const [qty, setQty] = useState(50); // quantity of rows inside table for pagination.

  const handleSort = (item: keyof typeof titles, toggle: boolean = false) => {
    if (!toggle) {
      if (handleTitles(item)) {
        setNewData(prev => [...prev].sort((a: newDataType, b: newDataType) => b[item] - a[item]));
      } else {
        setNewData(prev => [...prev].sort((a: newDataType, b: newDataType) => a[item] === b[item] ? 0 : a[item] < b[item] ? -1 : 1));
      }
    } else {
      if (handleTitles(item)) {
        setNewData(prev => [...prev].sort((a: newDataType, b: newDataType) => a[item] - b[item]));
      } else {
        setNewData(prev => [...prev].sort((a: newDataType, b: newDataType) => a[item] === b[item] ? 0 : a[item] < b[item] ? 1 : -1));
      }
    }
  }

  console.log(455);

  return (
    <section>
      <div className='players_table'>
        <table>
          <thead>
            <tr>
              {headers.map((item, index) => <Header key={index} item={item} handleSort={handleSort} />)}
            </tr>
          </thead>
          <tbody>
            {newData.slice(qty * page, (page + 1) * qty).map((item, index) => <tr key={index}>
              {Object.values(item).map((item, index) => <td key={index} className={skillsQualityStyle(item)}>
                {item}
              </td>)}
            </tr>)}
          </tbody>
        </table>
      </div>
      <TablePagination
        component={'div'}
        count={newData.length}
        onPageChange={(_, newPage: number) => setPage(newPage)}
        page={page}
        rowsPerPage={qty}
        onRowsPerPageChange={(e: React.ChangeEvent<HTMLInputElement>) => { setQty(parseInt(e.target.value, 10)); setPage(0) }}
        showFirstButton
        showLastButton
        sx={{ color: "var(--maincFontColor)" }}
      />
    </section>
  )
})

export default Table;