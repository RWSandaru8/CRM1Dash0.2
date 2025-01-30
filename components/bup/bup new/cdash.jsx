"use client";
import React, { useState } from "react";
import { DndContext, DragOverlay } from "@dnd-kit/core";
import Draggable from "./Draggable";
import Droppable from "./Droppable";
import "./Cdash.css";
import Image from "next/image";
import Searchf from "./Search";
import Callswbtn from "./Callswbtn";

function Example() {
  const [itemPositions, setItemPositions] = useState({
    item1: null,
    item2: null,
    item3: null,
  });

  const [activeId, setActiveId] = useState(null);
  const [tempDropTarget, setTempDropTarget] = useState(null); // Track the temporary drop target before the confirmation
  const [showDialog, setShowDialog] = useState(false); // Dialog visibility

  const draggableItems = [
    { id: "item1", content: <p><b>Sandaru</b><br />Course - Software Eng</p> },
    { id: "item2", content: <p><b>Piumantha</b><br />Course - Software Eng</p> },
    { id: "item3", content: <p><b>Indunil</b><br />Course - Software Eng</p> },
  ];

  function handleDragStart(event) {
    setActiveId(event.active.id); // Set the active ID
  }

  function handleDragEnd(event) {
    const { over, active } = event;

    if (over) {
      setTempDropTarget(over.id);
      setShowDialog(true); // Show confirmation dialog
    } else {
      setActiveId(null);
    }
  }

  function handleConfirm() {
    setItemPositions((prev) => ({
      ...prev,
      [activeId]: tempDropTarget,
    }));
    setActiveId(null);
    setTempDropTarget(null);
    setShowDialog(false);
  }

  function handleCancel() {
    setActiveId(null);
    setTempDropTarget(null);
    setShowDialog(false);
  }

  return (
    <div className="flex h-full">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="left-con">
          <div className="imglogo">
            <Image src="/logo1.png" width={250} height={300} alt="Logo" />
          </div>
          <div className="callswbtndiv">
            <Callswbtn activeCall="call1"/>
          </div>
          <div className="cards z-20 justify-center">
            {draggableItems.map((item) =>
              !itemPositions[item.id] && activeId !== item.id && ( // Render only if not active
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

            <div className="rounded bg-white border-solid m-10 w-5/12 h-2/5">
              <Droppable id="Negative" className="h-full">
                <div className="h-full w-full">
                  <div className="flex justify-between">
                    <p className="text-left p-2">Negative</p>
                    <div className="text-center border border-blue-950 rounded-full p-2 w-2/6">Drop Here</div>
                  </div>
                  <div className="text-center p-4">
                    <p className="text-8xl">69</p><br />
                    <p className="mb-5">Current Negative leads</p>
                  </div>
                </div>
                /*{draggableItems.map((item) =>
                  itemPositions[item.id] === "Negative" && (
                    <Draggable key={item.id} id={item.id}>
                      {item.content}
                    </Draggable>
                  )
                )}*/
                {!Object.values(itemPositions).includes("Negative")}
              </Droppable>
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="std-card">{draggableItems.find((item) => item.id === activeId)?.content}</div>
          ) : null}
        </DragOverlay>

        {/* Dialog for confirmation */}
        {showDialog && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded shadow-lg">
              <p className="mb-4">Do you want to confirm the drop?</p>
              <div className="flex justify-end">
                <button
                  onClick={handleCancel}
                  className="mr-4 px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </DndContext>
    </div>
  );
}

export default Example;

