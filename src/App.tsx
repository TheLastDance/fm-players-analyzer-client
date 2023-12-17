import { useState } from 'react'
import './App.css'
import Nav from './components/Nav/Nav';
import Form from './components/Form/Form';
import Table from './components/Table/Table';
import Templates from './components/Templates/Templates';
import Rules from './components/Rules/Rules';
import Footer from './components/Footer/Footer';
import { Language, RowData } from './types';
import { templateArraytoServerObj } from './Utils/templateArrayToServerObject';
import { LoadingOverlay } from './portals/LoadingOverlay/LoadingOverlay';
import { readFile, htmlToData } from './Utils/processFile/processFuncs';
import { ErrorBoundary } from 'react-error-boundary';
import { fileValidation } from './Utils/processFile/errorHandlings';
import { calculationAlgorithm } from './Utils/processFile/processFuncs';

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
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError("");
    const newFile = e.target.files?.[0];
    if (newFile?.type === "text/html") return setFile(newFile);
    setFile(undefined);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const serverPositions = templateArraytoServerObj(localStorage.getItem('templates'));

    try {
      setError("");
      setIsLoading(true);

      if (!file) return fileValidation();

      const readedFile = await readFile(file);
      const newData = htmlToData(readedFile, lang);

      if (newData) {
        const maxData = calculationAlgorithm(serverPositions, newData);
        setPositionForServer(serverPositions);
        localStorage.setItem('serverTemplates', JSON.stringify(serverPositions));
        setPage(0);
        setData(maxData as RowData[]);
        localStorage.setItem('data', JSON.stringify(maxData));
      }
    } catch (error) {
      console.log(error);
      const err = error as Error;
      setError(err.message);
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Rules />
        <Templates lang={lang} />
        <Form handleFileChange={handleFileChange} handleSubmit={handleSubmit} />
        <ErrorBoundary
          fallback={<h3 className='error_block'>Error occured, please check your html file</h3>}
          resetKeys={[file]}
        >
          {error && <h3 className='error_block'>{error}</h3>}
          {data.length ? <Table lang={lang} data={data} setData={setData} page={page} setPage={setPage} position={positionForServer} /> : null}
        </ErrorBoundary>
      </main>
      <Footer />
      <LoadingOverlay isVisible={isLoading} />
    </>
  )
}

export default App
