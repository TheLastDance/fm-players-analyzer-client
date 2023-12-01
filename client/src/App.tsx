import { useState } from 'react'
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './App.css'
import { RowData } from './types';
import Nav from './components/Nav/Nav';
import Form from './components/Form/Form';
import { Language } from './types';


function App() {
  const storedData = localStorage.getItem('data');
  const storedLang = localStorage.getItem('lang') as Language['lang'];
  const initialData: RowData[] = storedData ? JSON.parse(storedData) : [];
  const initialLang: Language['lang'] = storedLang ? storedLang : 'en';
  const [file, setFile] = useState<File | undefined>(undefined);
  const [data, setData] = useState<RowData[]>(initialData);
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
        })
    }
  }

  const handleSort = (item: string) => {
    setData(prev => [...prev].sort((a: RowData, b: RowData) => b.skills[item] - a.skills[item]));
  }

  console.log(file, data);


  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Form handleFileChange={handleFileChange} handleSubmit={handleSubmit} />
        <ul style={{ margin: "30px 0" }}>
          {data.length ? data.map((item: RowData, index) => <li key={index}>
            <span>{item['Best Pos']}</span>
            <span>{item.Name}</span>
            <span>{item.Age}</span>
            <span>{item['Transfer Value']}</span>
            <span onClick={() => handleSort('ST')}>{item.skills.ST.toFixed(2)}</span>
            <span onClick={() => handleSort('CD')}>{item.skills.CD.toFixed(2)}</span>
            <span onClick={() => handleSort('GK')}>{item.skills.GK.toFixed(2)}</span>
            <span onClick={() => handleSort('CM')}>{item.skills.CM.toFixed(2)}</span>
            <span onClick={() => handleSort('Winger')}>{item.skills.Winger.toFixed(2)}</span>
            <span onClick={() => handleSort('DM')}>{item.skills.DM.toFixed(2)}</span>
            <span onClick={() => handleSort('AM')}>{item.skills.AM.toFixed(2)}</span>
            <span onClick={() => handleSort('WM')}>{item.skills.WM.toFixed(2)}</span>
            <span onClick={() => handleSort('FB')}>{item.skills.FB.toFixed(2)}</span>
            <span onClick={() => handleSort('WB')}>{item.skills.WB.toFixed(2)}</span>
          </li>) : null}
        </ul>
      </main>
    </>
  )
}

export default App
