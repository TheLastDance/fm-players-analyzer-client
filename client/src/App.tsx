import { useState } from 'react'
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import Nav from './components/Nav/Nav';
import Form from './components/Form/Form';
import Table from './components/Table/Table';
import { Language, RowData } from './types';


function App() {
  const storedData = localStorage.getItem('data');
  const storedLang = localStorage.getItem('lang') as Language['lang'];
  const initialData: RowData[] = storedData ? JSON.parse(storedData) : [];
  const initialLang: Language['lang'] = storedLang ? storedLang : 'en';
  const [file, setFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState<RowData[]>(initialData);
  const [lang, setLang] = useState(initialLang);
  const [page, setPage] = useState(0); // page of pagination


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
          setPage(0);
        })
    }
  }

  console.log(file, data);

  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Form handleFileChange={handleFileChange} handleSubmit={handleSubmit} />
        {data.length ? <Table data={data} setData={setData} page={page} setPage={setPage} /> : null}
      </main>
    </>
  )
}

export default App
