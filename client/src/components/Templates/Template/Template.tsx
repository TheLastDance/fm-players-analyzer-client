import { useState, useId } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import DroppableComponent from '../Template/DroppableComponent/DroppableComponent';
import { attributesFull } from '../../../data/attributes';
import { coefficients } from '../../../data/coefficients';
import { Language, ITemplateArray, TiersEnum, ITemplateOne } from '../../../types';
import { Button } from '@mui/material';


interface ITemplate {
  lang: Language['lang'],
  setPositionForServer: React.Dispatch<React.SetStateAction<any>>,
  handleFalse: () => void,
  setTemplatesArray: React.Dispatch<React.SetStateAction<ITemplateOne[]>>,
  templatesArray: ITemplateOne[],
  item?: ITemplateOne,
}

const Template = ({ lang, setPositionForServer, handleFalse, templatesArray, setTemplatesArray, item }: ITemplate) => {
  const id = useId();
  const [template, setTemplates] = useState<ITemplateOne>(item || {
    name: "",
    toggled: false,
    id: id,
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
  const [error, setError] = useState("");

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

  const handleButton = () => {

    if (templatesArray.filter(item => item.name === template.name && item.id !== template.id).length) {
      return setError("Names of templates must be unique");
    }

    const positions = { ...template };
    const { name } = positions;
    const filtered: any = positions.templates.filter(item => item.name !== TiersEnum.noTier);
    const changed: any = filtered.map((item: any) => ({
      [item.name]: Object.fromEntries([...item.attributes.map((el: any) => ([el, coefficients[item.name as TiersEnum.tier_1]]))])
    }));

    const [tier_1, tier_2, tier_3, tier_4] = changed;

    if (item) {
      setPositionForServer((prev: any) => {
        delete prev[`#${item.name}`];
        return {
          ...prev,
          [`#${name}`]: {
            ...tier_1,
            ...tier_2,
            ...tier_3,
            ...tier_4,
          }
        }
      });
      setTemplatesArray(prev => [...prev].map(el => el.name === item.name ? template : el));
      handleCloseBtn();
    } else {
      setPositionForServer((prev: any) => ({
        ...prev,
        [`#${name}`]: {
          ...tier_1,
          ...tier_2,
          ...tier_3,
          ...tier_4,
        }
      }));
      setTemplatesArray(prev => [...prev, template]);
      handleFalse();
    }
  }

  const handleCloseBtn = () => {
    setTemplatesArray(prev => [...prev].map((item) => ({ ...item, toggled: false })));
    handleFalse();
  }


  return (
    <DragDropContext onDragEnd={handleDragDrop} >
      <div>
        <div className='input_name'>
          <label>
            <input maxLength={7} type="text" value={template.name} onChange={(e) => setTemplates(prev => ({ ...prev, name: e.target.value }))} />
          </label>
        </div>
        <Button variant='text' onClick={handleCloseBtn}>
          X
        </Button>
      </div>
      {error && <p>{error}</p>}
      <div className='droppables_container'>
        <div className='droppable_block'>
          {template.templates.map((item) =>
            <div key={item.name} >
              <DroppableComponent name={item.name} items={item.attributes} id={item.name} lang={lang} />
            </div>
          )}
        </div>
      </div>
      <div className='template_save_button'>
        <Button disabled={!template.name || template.templates[0].attributes.length === 47} onClick={handleButton} variant='contained' >Save</Button>
      </div>
    </DragDropContext>
  )
}

export default Template;