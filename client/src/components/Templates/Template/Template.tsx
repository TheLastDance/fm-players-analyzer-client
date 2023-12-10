import './Template.css';
import { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import DroppableComponent from '../Template/DroppableComponent/DroppableComponent';
import { attributesFull } from '../../../data/attributes';
import { Language, ITemplateArray, TiersEnum, ITemplateOne } from '../../../types';
import { Button, TextField, Checkbox, FormControlLabel } from '@mui/material';
import { textFieldStyle, buttonDisabled, BpIcon, BpCheckedIcon } from './MuiStyles';
import trash_icon from "../../../assets/trash_icon.svg";
import save_icon from "../../../assets/save_icon.svg";

interface ITemplate {
  lang: Language['lang'],
  handleFalse: () => void,
  setTemplatesArray: React.Dispatch<React.SetStateAction<ITemplateOne[]>>,
  templatesArray: ITemplateOne[],
  item?: ITemplateOne,
}

const Template = ({ lang, handleFalse, templatesArray, setTemplatesArray, item }: ITemplate) => {
  const id = Date.now().toString();
  const [error, setError] = useState("");
  // if item is undefined it means that we use this component to create new template and not to edit created one.
  const [template, setTemplates] = useState<ITemplateOne>(item || {
    name: "",
    toggled: false,
    id: id,
    checked: true,
    templates: [
      {
        name: TiersEnum.noTier,
        attributes: Object.keys(attributesFull[lang]),
      },
      {
        name: TiersEnum.tier_1,
        attributes: [],
      },
      {
        name: TiersEnum.tier_2,
        attributes: [],
      },
      {
        name: TiersEnum.tier_3,
        attributes: [],
      },
      {
        name: TiersEnum.tier_4,
        attributes: [],
      }
    ]
  });

  // handles drag and drop logic
  const handleDragDrop = (res: DropResult) => {
    const { source, destination } = res;
    const templates = [...template.templates];

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const itemSourceIndex = source.index;
    const itemDestinationIndex = destination.index;

    const storeSourceIndex = templates.findIndex(
      (store: ITemplateArray) => store.name === source.droppableId
    );
    const storeDestinationIndex = templates.findIndex(
      (store: ITemplateArray) => store.name === destination.droppableId
    );

    const newSourceItems = [...templates[storeSourceIndex].attributes];
    const newDestinationItems =
      source.droppableId !== destination.droppableId
        ? [...templates[storeDestinationIndex].attributes]
        : newSourceItems;

    const [deletedItem] = newSourceItems.splice(itemSourceIndex, 1);
    newDestinationItems.splice(itemDestinationIndex, 0, deletedItem);

    const newStores = [...templates];

    newStores[storeSourceIndex] = {
      ...templates[storeSourceIndex],
      attributes: newSourceItems,
    };
    newStores[storeDestinationIndex] = {
      ...templates[storeDestinationIndex],
      attributes: newDestinationItems,
    };

    setTemplates(prev => ({ ...prev, templates: newStores }));
  }

  console.log(template, template.name);

  // saves a template in array and storage and closes template component
  const handleButton = () => {
    const templates = [...templatesArray];

    if (templatesArray.filter(item => item.name === template.name && item.id !== template.id).length) {
      return setError("Names of templates must be unique");
    }

    if (item) {
      const newTemplates = templates.map(el => el.name === item.name ? template : el);
      setTemplatesArray(newTemplates);
      localStorage.setItem("templates", JSON.stringify(newTemplates.map((item) => ({ ...item, toggled: false }))));
      handleCloseBtn();
    } else {
      const newTemplates = [...templates, template];
      setTemplatesArray(newTemplates);
      localStorage.setItem("templates", JSON.stringify(newTemplates.map((item) => ({ ...item, toggled: false }))));
      handleFalse();
    }
  }

  // closes template
  const handleCloseBtn = () => {
    setTemplatesArray(prev => [...prev].map((item) => ({ ...item, toggled: false })));
    handleFalse();
  }

  // deletes template from array and storage
  const handleDeleteTemplate = () => {
    if (item) {
      const newTemplates = templatesArray.filter(el => el.id !== item.id);
      setTemplatesArray(templatesArray.filter(el => el.id !== item.id));
      localStorage.setItem("templates", JSON.stringify(newTemplates));
    }
  }

  return (
    <>
      <div className='template_input_cls_container'>
        <div className="template_input_cls-left">
          <TextField
            sx={textFieldStyle}
            error={error ? true : false}
            onChange={(e) => setTemplates(prev => ({ ...prev, name: e.target.value }))}
            id="outlined-error-helper-text"
            label="type template name"
            value={template.name}
            helperText={error}
            size='small'
            inputProps={{
              maxLength: 7,
              type: "text",
            }}
          />
          <FormControlLabel
            label="use a template"
            control={
              <Checkbox
                icon={<BpIcon />}
                checkedIcon={<BpCheckedIcon />}
                checked={template.checked}
                onChange={() => setTemplates(prev => ({ ...prev, checked: !prev.checked }))}
              />
            }
          />
        </div>
        <Button variant='text' color='inherit' size='large' onClick={handleCloseBtn}>
          X
        </Button>
      </div>
      <div className='droppables_container'>
        <div className='droppable_block'>
          <DragDropContext onDragEnd={handleDragDrop} >
            {template.templates.map((item) =>
              <DroppableComponent key={item.name} name={item.name} items={item.attributes} id={item.name} lang={lang} />
            )}
          </DragDropContext>
        </div>
      </div>
      <div className='template_save_delete_buttons'>
        {item ? <Button variant='contained' color='error' startIcon={<img src={trash_icon} />} onClick={handleDeleteTemplate}>Delete Template</Button> : <span></span>}
        <Button
          disabled={!template.name || template.templates[0].attributes.length === 47}
          endIcon={<img src={save_icon} />}
          sx={buttonDisabled}
          onClick={handleButton}
          variant='contained' >
          Save
        </Button>
      </div>
    </>
  )
}

export default Template;