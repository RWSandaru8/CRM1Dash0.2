"Use client";
import React from 'react';
import {useDroppable} from '@dnd-kit/core';

export function Droppable(props) {
  const {isOver, setNodeRef} = useDroppable({
    id: props.id,
  });
  
  const style = {
    color: isOver ? 'darkgreen' : undefined,
    opacity: isOver ? 1 : 1,
    transition: 'opacity 0.2s, color 0.2s',
    padding: '1rem',
    border: '2px solid #ccc',
    borderRadius: '4px',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {props.children}
    </div>
  );
}

export default Droppable;