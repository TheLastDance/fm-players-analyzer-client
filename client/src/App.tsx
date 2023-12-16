import { useState } from 'react'
import '@fontsource/roboto/400.css';
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
import { countTags } from './Utils/countTags';
import { ErrorBoundary } from 'react-error-boundary';
import Rules from './components/Rules/Rules';
import Footer from './components/Footer/Footer';

const maxPlayers = 1500;

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

    try {
      const tagsQuantity = await countTags(file);
      setError("");

      if (file && tagsQuantity && tagsQuantity <= maxPlayers) {
        setIsLoading(true)
        const formData = new FormData();

        const serverPositions = templateArraytoServerObj(localStorage.getItem('templates'));

        formData.append('htmlFile', file);
        formData.append('lang', lang);
        formData.append('positionForServer', serverPositions);

        //https://fm-players-analyzer.onrender.com/api
        const response = await fetch('https://bewildered-fish-stockings.cyclic.app', {
          method: 'POST',
          body: formData,
        });

        const json = await response.json();

        if (response.ok) {
          setData(json);
          localStorage.setItem('data', JSON.stringify(json));
          setPositionForServer(JSON.parse(serverPositions));
          localStorage.setItem('serverTemplates', serverPositions);
          setPage(0);
          return;
        }
        setError(json.error);
      }

      if (!file) return setError("Upload html format file please");
      if (tagsQuantity && tagsQuantity > maxPlayers) return setError("Your file must have less than 1500 players");

    } catch (error) {
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
