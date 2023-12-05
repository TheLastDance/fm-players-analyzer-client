import './Templates.css'
import { useState } from 'react';
import { Language, ITemplateOne } from '../../types';
import Template from './Template/Template';
import { useToggle } from '../../customHooks/useToggle';
import { Button } from '@mui/material';


interface ITemplates {
  lang: Language['lang'],
  setPositionForServer: React.Dispatch<React.SetStateAction<any>>,
}

const Templates = ({ lang, setPositionForServer }: ITemplates) => {
  const [createNew, , handleFalse, handleTrue] = useToggle();
  const [templatesArray, setTemplatesArray] = useState<ITemplateOne[]>([]);
  const maxTemplates = 5;

  const handleToggleArray = (indexClicked: number) => {
    setTemplatesArray(prev => [...prev].map((item, index) => indexClicked === index ? ({ ...item, toggled: true }) : ({ ...item, toggled: false })));
    handleFalse();
  }

  const handleCreate = () => {
    setTemplatesArray(prev => [...prev].map((item) => ({ ...item, toggled: false })));
    handleTrue();
  }

  console.log(templatesArray);


  return (
    <section className='template_section'>
      <div className="header_2">
        <h1>Templates {`(${templatesArray.length}/5)`}</h1>
      </div>
      <div className="templates_menu">
        <div className="templates_group">
          {templatesArray.map((item, index) => <Button variant='contained' size='small' color='success' onClick={() => handleToggleArray(index)} key={item.id} >
            {item.name}
          </Button>)}
        </div>
        <Button variant='outlined' disabled={templatesArray.length >= maxTemplates} onClick={handleCreate} >
          Create
        </Button>
      </div>
      {
        templatesArray.filter((item) => item.toggled).map((item) =>
          <Template
            key={item.id}
            lang={lang}
            setPositionForServer={setPositionForServer}
            handleFalse={handleFalse}
            templatesArray={templatesArray}
            setTemplatesArray={setTemplatesArray}
            item={item}
          />
        )
      }
      {
        createNew && <Template
          lang={lang}
          setPositionForServer={setPositionForServer}
          handleFalse={handleFalse}
          templatesArray={templatesArray}
          setTemplatesArray={setTemplatesArray}
        />
      }
    </section>
  )
}

export default Templates;
