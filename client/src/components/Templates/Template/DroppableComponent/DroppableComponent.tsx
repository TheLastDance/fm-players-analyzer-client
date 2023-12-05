import { Droppable, Draggable } from "react-beautiful-dnd";
import { attributesFull } from "../../../../data/attributes";
import { Language, ITranslationPairs } from "../../../../types";

interface IDroppableComponent {
  name: string,
  id: string,
  items: string[],
  lang: Language['lang'],
}

function DroppableComponent({ name, items, id, lang }: IDroppableComponent) {
  return (
    <div className='store_container'>
      <div className="store_header">
        <h3>{name}</h3>
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <div className="store_items">
              {items.map((item, index) => <Draggable draggableId={item} index={index} key={item}>
                {(provided) => (
                  <div className="store_item" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} >
                    <p title={attributesFull[lang][item as keyof ITranslationPairs]} >{attributesFull[lang][item as keyof ITranslationPairs]}</p>
                  </div>
                )}
              </Draggable>)}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default DroppableComponent;