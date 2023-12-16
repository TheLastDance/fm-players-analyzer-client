import "./Stats.css";
import { RowData, Language, AttributesEnum } from "../../../types";
import { attributesFull, technicalAttr, mentalAttr, physicalAttr, goalkeepingAttr } from "../../../data/attributes";
import StatUL from "./StatUL/StatUL";
import { Droppable, Draggable, DragDropContext, DropResult } from "react-beautiful-dnd";
import { useState } from "react";
import { maskSkillHandling } from "../../../Utils/maskedAttributes";

interface IStats {
  lang: Language['lang'],
  attributes: RowData['attributes'],
}

const Stats = ({ lang, attributes }: IStats) => {
  const { Hea, Jum, Bra, Pac, Acc } = attributes;

  function AttrFilterAndSort(skillTypeArray: string[]) {
    return Object.entries(attributes).filter(item => skillTypeArray.includes(item[0]))
      .map(item => ([attributesFull[lang][(item[0] as AttributesEnum)], item[1]]))
      .sort((a, b) => a[0] === b[0] ? 0 : a[0] < b[0] ? -1 : 1);
  }

  const technical = AttrFilterAndSort(technicalAttr);
  const goalkeeping = AttrFilterAndSort(goalkeepingAttr);

  const [draggables, setDraggables] = useState([{ skillType: "Technical", array: [...technical] }, { skillType: "Goalkeeping", array: [...goalkeeping] }]);

  function handleDragDrop(res: DropResult) {
    const { source, destination } = res;
    const newDraggables = [...draggables];

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const [deleted] = newDraggables.splice(source.index, 1);
    newDraggables.splice(destination.index, 0, deleted);

    return setDraggables(newDraggables)
  }

  const mental = AttrFilterAndSort(mentalAttr);
  const physical = AttrFilterAndSort(physicalAttr);

  const aerialHeading = (maskSkillHandling(Hea) + maskSkillHandling(Jum) + maskSkillHandling(Bra)) / 3;
  const speed = (maskSkillHandling(Pac) + maskSkillHandling(Acc)) / 2;

  return (
    <div className='player-overlay_stats'>
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="droppable_attributes_container">
          {(provided) => (
            <div className="droppable_attributes_container" {...provided.droppableProps} ref={provided.innerRef}>
              {draggables.map((item, index) => <Draggable draggableId={item.skillType} index={index} key={item.skillType}>
                {(provided) => (
                  <div {...provided.dragHandleProps} {...provided.draggableProps} ref={provided.innerRef}>
                    <StatUL skillType={item.skillType} arr={item.array} />
                  </div>
                )}
              </Draggable>)}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="not_droppable_attributes_container">
        <div className="mental_physical">
          <StatUL skillType="Mental" arr={mental} />
          <StatUL skillType="Physical" arr={physical} />
        </div>
        <div className="merged_skills">
          <StatUL skillType="Merged Skills" arr={[["Aerial duel (Jump + Head + Bravery)", aerialHeading.toFixed(1)], ["Speed (Pace + Acceleration)", speed.toFixed(1)]]} />
        </div>
      </div>
    </div>
  )
}

export default Stats;