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
  }
} & {
  [key: string]: string | number;
}

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<RowData[] | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFile(file);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('htmlFile', file);
      fetch('/api', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(json => setData(json))
    }
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
        {data && data.map((item: RowData, index) => <li key={index}>
          {item['Best Pos'] && <span>{item['Best Pos']}</span>}
          <span>{item.Name}</span>
          <span>{item.Age}</span>
          <span>{item['Transfer Value']}</span>
          <span onClick={() => setData([...data].sort((a, b) => b.skills.ST - a.skills.ST))}>{item.skills.ST.toFixed(2)}</span>
          <span>{item.skills.CD.toFixed(2)}</span>
        </li>)}
      </ul>
    </>
  )
}

export default App
