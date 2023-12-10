import './Table.css'
import { useState, memo } from 'react';
import { useToggle } from '../../customHooks/useToggle';
import { RowData } from '../../types'
import { titles } from '../../data/positionsTitles';
import Header from './Header/Header';
import { TablePagination } from '@mui/material';
import { handleTitles } from '../../Utils/handleTitles';
import Row from './Row/Row';
import fullscreen_icon from "../../assets/fullscreen_icon.svg";
import resize_icon from "../../assets/resize_icon.svg";

interface ITable {
  data: RowData[],
  setData: React.Dispatch<React.SetStateAction<RowData[]>>,
  page: number,
  setPage: React.Dispatch<React.SetStateAction<number>>,
  position: any,
}

const Table = memo(({ data, setData, page, setPage, position }: ITable) => {
  const skills = data.length ? data[0].skills : [];
  const headers = data.length ? Object.keys({ ...skills, ...data[0] }).filter(item => item !== 'skills' && item !== "attributes") : [];
  const [qty, setQty] = useState(50); // quantity of rows inside table for pagination.
  const [isResized, toggleResize] = useToggle();

  const handleSort = (item: keyof typeof titles, toggle: boolean = false) => {

    if (!toggle) {
      if (handleTitles(item, position)) {
        setData(prev => [...prev].sort((a: RowData, b: RowData) => b.skills[item] - a.skills[item]));
      } else {
        console.log(item);

        setData(prev => [...prev].sort((a: RowData, b: RowData) => a[item] === b[item] ? 0 : a[item] < b[item] ? -1 : 1));
      }
    } else {
      if (handleTitles(item, position)) {
        setData(prev => [...prev].sort((a: RowData, b: RowData) => a.skills[item] - b.skills[item]));
      } else {
        setData(prev => [...prev].sort((a: RowData, b: RowData) => a[item] === b[item] ? 0 : a[item] < b[item] ? 1 : -1));
      }
    }
  }

  console.log(455);

  return (
    <section className={isResized ? 'table_section resized_table' : 'table_section'}>
      <span className='resize_table_icon' title='resize table' onClick={toggleResize} >{isResized ? <img src={resize_icon} /> : <img src={fullscreen_icon} />}</span>
      <div className='players_table'>
        <table>
          <thead>
            <tr>
              {headers.map((item, index) =>
                <Header key={index} item={item} handleSort={handleSort} />)}
            </tr>
          </thead>
          <tbody>
            {data.slice(qty * page, (page + 1) * qty).map((item, index) => <Row key={index} item={item} />)}
          </tbody>
        </table>
      </div>
      <TablePagination
        component={'div'}
        count={data.length}
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