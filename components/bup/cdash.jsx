"use client";
import React, { useState } from 'react';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import Draggable from './Draggable';
import Droppable from './Droppable';
import "./Cdash.css";
import Image from 'next/image';
import Searchf from './Search';

function Example() {
  const [itemPositions, setItemPositions] = useState({
    item1: null,
    item2: null,
    item3: null,
  });

  const [activeId, setActiveId] = useState(null);

  const draggableItems = [
    { id: 'item1', content: <p><b>Sandaru</b><br />Course - Software Eng</p> },
    { id: 'item2', content: <p><b>Piumantha</b><br />Course - Software Eng</p> },
    { id: 'item3', content: <p><b>Indunil</b><br />Course - Software Eng</p> },
  ];

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { over, active } = event;

    if (over) {
      if(over.id == "Positive"){
        console.log("Item dropped on positive");
      }
      else if(over.id == "Negative"){
        console.log("item dropped on negative");
      }
        setItemPositions((prev) => ({
          ...prev,
          [active.id]: over.id,
        }));  
    }

    setActiveId(null);
  }

  return (
    <div className="flex h-full">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {/* Render draggables that aren't in a droppable */}
        <div className="left-con">
          <div className="imglogo">
            <Image src="/logo1.png" width={250} height={300} alt="Logo" />
          </div>
          <div className="cards z-20">
            {draggableItems.map((item) =>
              !itemPositions[item.id] && (
                <Draggable key={item.id} id={item.id} className="std-card">
                  {item.content}
                </Draggable>
              )
            )}
          </div>
        </div>

        <div className="right-con -z-10">
          <Searchf />
          <div className="flex w-full">
            <div className="rounded bg-white border-solid m-10 w-5/12">
              <Droppable id="Positive">
                {draggableItems.map((item) =>
                  itemPositions[item.id] === "Positive" && (
                    <Draggable key={item.id} id={item.id}>
                      {item.content}
                    </Draggable>
                  )
                )}
                {!Object.values(itemPositions).includes("Positive") && "Drop here"}
              </Droppable>
            </div>

            <div className="rounded bg-white border-solid m-10 w-5/12">
              <Droppable id="Negative">
                {draggableItems.map((item) =>
                  itemPositions[item.id] === "Negative" && (
                    <Draggable key={item.id} id={item.id}>
                      {item.content}
                    </Draggable>
                  )
                )}
                {!Object.values(itemPositions).includes("Negative") && "Drop here"}
              </Droppable>
            </div>
          </div>
        </div>

        {/* Drag overlay ensures visibility during drag */}
        <DragOverlay>
          {activeId ? (
            <div className="std-card">{draggableItems.find((item) => item.id === activeId)?.content}</div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

export default Example;
