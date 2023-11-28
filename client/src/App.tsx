import { useState } from 'react'
import './App.css'

type Attribute = {
  [innerKey: string]: number;
}

type RowData = {
  attributes: Attribute;
  skills: {
    ST: number,
    CD: number,
    [key: string]: number;
  }
} & {
  [key: string]: string | number;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<RowData[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFile(file);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('htmlFile', file);
      fetch('http://localhost:3000/api', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(json => setData(json))
    }
  }

  const handleSort = (item: string) => {
    setData(prev => [...prev].sort((a: RowData, b: RowData) => b.skills[item] - a.skills[item]));
  }

  console.log(file, data);


  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="file" accept="text/html" onChange={handleFileChange} />
        </label>
        <button type='submit'>Submit</button>
      </form>
      <ul>
        {data.length ? data.map((item: RowData, index) => <li key={index}>
          {item['Best Pos'] && <span>{item['Best Pos']}</span>}
          <span>{item.Name}</span>
          <span>{item.Age}</span>
          <span>{item['Transfer Value']}</span>
          <span onClick={() => handleSort('ST')}>{item.skills.ST.toFixed(2)}</span>
          <span onClick={() => handleSort('CD')}>{item.skills.CD.toFixed(2)}</span>
          <span onClick={() => handleSort('GK')}>{item.skills.GK.toFixed(2)}</span>
          <span onClick={() => handleSort('CM')}>{item.skills.CM.toFixed(2)}</span>
          <span onClick={() => handleSort('Winger')}>{item.skills.Winger.toFixed(2)}</span>
          <span onClick={() => handleSort('Overall')}>{item.skills.Overall.toFixed(2)}</span>
        </li>) : null}
      </ul>
    </>
  )
}

export default App
