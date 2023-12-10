import "./DroppableComponent.css"
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

    <Droppable droppableId={id}>
      {(provided) => (
        <div className={`store_container store_container_${name}`} {...provided.droppableProps} ref={provided.innerRef}>
          <div className="store_header">
            <h3>
              {name}
            </h3>
            <span>
              {name === "tier_1" ? " (Most significant skills)" : name === "tier_4" ? " (Least significant skills)" : name === "no_tier" ? " (Unnecessary skills)" : ""}
            </span>
          </div>
          <ul className='store_items'>
            {items.map((item, index) => <Draggable draggableId={item} index={index} key={item}>
              {(provided) => (
                <li className="store_item" {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef} >
                  <p title={attributesFull[lang][item as keyof ITranslationPairs]} >{attributesFull[lang][item as keyof ITranslationPairs]}</p>
                </li>
              )}
            </Draggable>)}
            {provided.placeholder}
          </ul>
        </div>
      )}
    </Droppable>

  )
}

export default DroppableComponent;