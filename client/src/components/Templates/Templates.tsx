import './Templates.css'
import { useState, memo } from 'react';
import { Language, ITemplateOne } from '../../types';
import Template from './Template/Template';
import { useToggle } from '../../customHooks/useToggle';
import { Button } from '@mui/material';
import { buttonDisabled } from './Template/MuiStyles';
import checked_icon from "../../assets/check.svg";


interface ITemplates {
  lang: Language['lang'],
}

const Templates = memo(({ lang }: ITemplates) => {
  const storedTemplates = localStorage.getItem('templates');
  const positions = storedTemplates ? JSON.parse(storedTemplates) : [];
  const [createNew, , handleFalse, handleTrue] = useToggle();
  const [templatesArray, setTemplatesArray] = useState<ITemplateOne[]>(positions);
  const maxTemplates = 10;

  const handleToggleArray = (indexClicked: number) => {
    setTemplatesArray(prev => [...prev].map((item, index) => indexClicked === index ? ({ ...item, toggled: true }) : ({ ...item, toggled: false })));
    handleFalse();
  }

  const handleCreate = () => {
    setTemplatesArray(prev => [...prev].map((item) => ({ ...item, toggled: false }))); // untoggle current template
    handleTrue();
  }

  console.log(templatesArray);


  return (
    <section className='templates_section'>
      <div className="templates_header">
        <h2>Templates {`(${templatesArray.length}/${maxTemplates})`}</h2>
      </div>
      <div className="templates_menu">
        <div className="templates_group">
          {templatesArray.map((item, index) => <Button
            variant='contained'
            size='small'
            color='success'
            onClick={() => handleToggleArray(index)} key={item.id}
            startIcon={item.checked ? <img src={checked_icon} /> : null}
          >
            {item.name}
          </Button>)}
        </div>
        <Button sx={buttonDisabled} variant='outlined' disabled={templatesArray.length >= maxTemplates} onClick={handleCreate} >
          Create
        </Button>
      </div>
      {
        templatesArray.filter((item) => item.toggled).map((item) =>
          <Template
            key={item.id}
            lang={lang}
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
          handleFalse={handleFalse}
          templatesArray={templatesArray}
          setTemplatesArray={setTemplatesArray}
        />
      }
    </section>
  )
})

export default Templates;
