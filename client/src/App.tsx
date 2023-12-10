import { useState } from 'react'
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import Nav from './components/Nav/Nav';
import Form from './components/Form/Form';
import Table from './components/Table/Table';
import Templates from './components/Templates/Templates';
import { Language, RowData } from './types';
import { templateArraytoServerObj } from './Utils/templateArrayToServerObject';
import { LoadingOverlay } from './portals/LoadingOverlay/LoadingOverlay';


function App() {
  const storedData = localStorage.getItem('data');
  const storedLang = localStorage.getItem('lang') as Language['lang'];
  const storedPositions = localStorage.getItem('serverTemplates');
  const initialData: RowData[] = storedData ? JSON.parse(storedData) : [];
  const initialLang: Language['lang'] = storedLang ? storedLang : 'en';
  const positions = storedPositions ? JSON.parse(storedPositions) : {};
  const [file, setFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState<RowData[]>(initialData);
  const [lang, setLang] = useState(initialLang);
  const [positionForServer, setPositionForServer] = useState(positions);
  const [page, setPage] = useState(0); // page of pagination
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile = e.target.files?.[0];
    if (newFile?.type === "text/html") setFile(newFile);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file) {
      setIsLoading(true)
      const formData = new FormData();
      const serverPositions = templateArraytoServerObj(localStorage.getItem('templates'));
      localStorage.setItem('serverTemplates', serverPositions);

      formData.append('htmlFile', file);
      formData.append('lang', lang);
      formData.append('positionForServer', serverPositions);

      setPositionForServer(JSON.parse(serverPositions));
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
        .catch(err => console.log(err))
        .finally(() => setIsLoading(false))
    }
  }

  console.log(data);

  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Templates lang={lang} />
        <Form handleFileChange={handleFileChange} handleSubmit={handleSubmit} />
        {data.length ? <Table data={data} setData={setData} page={page} setPage={setPage} position={positionForServer} /> : null}
      </main>
      <LoadingOverlay isVisible={isLoading} />
    </>
  )
}

export default App
