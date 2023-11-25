import { useState } from 'react'
import './App.css'
interface IrowData {
  attributes: {
    [key: string]: number | string;
  }
}
function App() {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<IrowData[] | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <input type="file" accept="text/html" onChange={handlePhotoChange} />
        </label>
        <button type='submit'>Submit</button>
      </form>
      <ul>
        {data && data.map((item: IrowData) => <li key={item.attributes.Name}>
          <span>{item.attributes.Name}</span>
          <span>{item.attributes.Age}</span>
          <span>{item.attributes['Transfer Value']}</span>
        </li>)}
      </ul>
    </>
  )
}

export default App
