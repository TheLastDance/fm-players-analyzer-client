import { useState } from 'react'
import './App.css'

type Attribute = {
  [innerKey: string]: number;
}

type RowData = {
  attributes: Attribute;
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
      fetch('http://localhost:3000/api', {
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
        {data && data.map((item: RowData) => <li key={item.Name}>
          <span>{item.Name}</span>
          <span>{item.Age}</span>
          <span>{item['Transfer Value']}</span>
        </li>)}
      </ul>
    </>
  )
}

export default App
