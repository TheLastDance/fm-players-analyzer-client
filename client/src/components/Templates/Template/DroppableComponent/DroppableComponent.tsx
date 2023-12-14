import "./DroppableComponent.css"
import { Droppable, Draggable } from "react-beautiful-dnd";
import { attributesFull } from "../../../../data/attributes";
import { Language, TranslationPairs, TiersEnum } from "../../../../types";

interface IDroppableComponent {
  name: string,
  id: string,
  items: string[],
  lang: Language['lang'],
}

const { noTier, tier_1, tier_4 } = TiersEnum;

function DroppableComponent({ name, items, id, lang }: IDroppableComponent) {
  return (
    <div className={`store_container store_container_${name}`} >
      <div className="store_header">
        <h3>
          {name}
        </h3>
        <span>
          {name === tier_1 ? " (Most significant skills)" : name === tier_4 ? " (Least significant skills)" : name === noTier ? " (Unnecessary skills)" : ""}
        </span>
      </div>
      <Droppable droppableId={id}>
        {(provided) => (
          <ul className='store_items' {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => <Draggable draggableId={item} index={index} key={item}>
              {(provided) => (
                <li className="store_item" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} >
                  <p title={attributesFull[lang][item as keyof TranslationPairs]} >{attributesFull[lang][item as keyof TranslationPairs]}</p>
                </li>
              )}
            </Draggable>)}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  )
}

export default DroppableComponent;