"use client";
import React, { useState, useEffect } from "react";
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
  const [tempDropTarget, setTempDropTarget] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [positiveNO, setPositiveNO] = useState(50);
  const [negativeNO, setNegativeNO] = useState(20);
  const [animatePositive, setAnimatePositive] = useState(false);
  const [animateNegative, setAnimateNegative] = useState(false);

  useEffect(() => {
    if (animatePositive) {
      const timer = setTimeout(() => setAnimatePositive(false), 500);
      return () => clearTimeout(timer);
    }
  }, [animatePositive]);

  useEffect(() => {
    if (animateNegative) {
      const timer = setTimeout(() => setAnimateNegative(false), 500);
      return () => clearTimeout(timer);
    }
  }, [animateNegative]);

  const draggableItems = [
    { id: "Sandaru", content: <p><b>Sandaru</b><br />Course - Software Eng</p> },
    { id: "Piumantha", content: <p><b>Piumantha</b><br />Course - Software Eng</p> },
    { id: "Indunil", content: <p><b>Indunil</b><br />Course - Software Eng</p> },
    { id: "Naveen", content: <p><b>Naveen</b><br />Course - Software Eng</p> },
    { id: "Dilesha", content: <p><b>Dilesha</b><br />Course - Software Eng</p> },
    { id: "Dasantha", content: <p><b>Dasantha</b><br />Course - Software Eng</p> },
  ];

  function handleDragStart(event) {
    setActiveId(event.active.id);
  }

  function handleDragEnd(event) {
    const { over, active } = event;

    if (over) {
      setTempDropTarget(over.id);
      setShowDialog(true); // set the confiramation message visibility
    } else {
      setActiveId(null);
    }
  }

  function showAlert(message) {
    const alertContainer = document.getElementById('alert-container');
    alertContainer.textContent = message;
    alertContainer.classList.remove('-translate-y-full');
    alertContainer.classList.add('translate-y-4');
    setTimeout(() => {
      alertContainer.classList.remove('translate-y-4');
      alertContainer.classList.add('-translate-y-full');
    }, 2000); // Hide after 2 seconds
  }

  function handleConfirm() {
    setItemPositions((prev) => ({
      ...prev,
      [activeId]: tempDropTarget,
    }));
    if (tempDropTarget === "Positive") {
      setPositiveNO(positiveNO + 1);
      setAnimatePositive(true);
    } else if (tempDropTarget === "Negative") {
      setNegativeNO(negativeNO + 1);
      setAnimateNegative(true);
    }
    console.log(activeId + " has been dropped on the " + tempDropTarget);
    showAlert(activeId + " has been dropped on the " + tempDropTarget + "Section");
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
      <div id="alert-container" className="alertboxc"></div>
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
            <div className="rounded bg-white border-solid m-10 w-5/12 h-3/6">
              <Droppable id="Positive" className="h-full">
              <div className="h-full w-full">
                  <div className="flex justify-between">
                    <p className="text-left p-2">Positive</p>
                    <div className="text-center border border-blue-950 rounded-full p-2 w-2/6">Drop Here</div>
                  </div>
                  <div className="text-center p-4">
                    <p className={`number ${animatePositive ? 'animate' : ''} text-8xl`}>{positiveNO}</p><br />
                    <p className="mb-5">Current Positive leads</p>
                  </div>
                </div>
                {!Object.values(itemPositions).includes("Positive")}
              </Droppable>
            </div>
            <div className="rounded bg-white border-solid m-10 w-5/12 h-3/6">
              <Droppable id="Negative" className="h-full">
                <div className="h-full w-full">
                  <div className="flex justify-between">
                    <p className="text-left p-2">Negative</p>
                    <div className="text-center border border-blue-950 rounded-full p-2 w-2/6">Drop Here</div>
                  </div>
                  <div className="text-center p-4">
                    <p className={`number ${animateNegative ? 'animate' : ''} text-8xl`}>{negativeNO}</p><br />
                    <p className="mb-5">Current Negative leads</p>
                  </div>
                </div>
                {!Object.values(itemPositions).includes("Negative")}
              </Droppable>
            </div>
          </div>
          <div className="flex w-full">
          <div className="rounded bg-white border-solid m-10 w-[90%] h-3/6 justify-center">
              <Droppable id="Pending" className="h-full w-full">
                <div className="h-full w-full">
                  <div className="flex justify-between">
                    <p className="text-left p-2">Pending</p>
                    <div className="text-center border border-blue-950 rounded-full p-2 w-2/6">Drop Here</div>
                  </div>
                  <div className="text-center p-4">
                    <p className={`number ${animateNegative ? 'animate' : ''} text-8xl`}>{negativeNO}</p><br />
                    <p className="mb-5">Current Pending leads</p>
                  </div>
                </div>
                {!Object.values(itemPositions).includes("Pending")}
              </Droppable>
            </div>
          </div>
        </div>

        <DragOverlay>
          {activeId ? (
            <div className="std-card">{draggableItems.find((item) => item.id === activeId)?.content}</div>
          ) : null}
        </DragOverlay>

        {/* Confirmation message - need to fix currently display as overlay*/}
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

