import { useState } from 'react'
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import Nav from './components/Nav/Nav';
import Form from './components/Form/Form';
import Table from './components/Table/Table';
import { Language, newDataType, RowData } from './types';
import { extractFromArray } from './Utils/extractFromArray';


function App() {
  const storedData = localStorage.getItem('data');
  const storedLang = localStorage.getItem('lang') as Language['lang'];
  const storedNewData = localStorage.getItem('newData');
  const initialData: RowData[] = storedData ? JSON.parse(storedData) : [];
  const initialLang: Language['lang'] = storedLang ? storedLang : 'en';
  const initialNewData: newDataType[] = storedNewData ? JSON.parse(storedNewData) : [];
  const [file, setFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState<RowData[]>(initialData);
  const [newData, setNewData] = useState<newDataType[]>(initialNewData);
  const [lang, setLang] = useState(initialLang);


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    setFile(newFile);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      const formData = new FormData();
      formData.append('htmlFile', file);
      formData.append('lang', lang);
      // https://fm-players-analyzer.onrender.com/api
      fetch('http://localhost:3000/api', {
        method: 'POST',
        body: formData,
      })
        .then(res => res.json())
        .then(json => {
          setData(json);
          localStorage.setItem('data', JSON.stringify(json));
          setNewData(json.length ? json.map(extractFromArray) : data);
          localStorage.setItem('newData', JSON.stringify(json.map(extractFromArray)));
        })
    }
  }

  console.log(file, data);

  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Form handleFileChange={handleFileChange} handleSubmit={handleSubmit} />
        {data.length ? <Table data={data} newData={newData} setNewData={setNewData} /> : null}
      </main>
    </>
  )
}

export default App
