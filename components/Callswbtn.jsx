"use client";

import React, { useState } from "react";
import { Button } from './ui/button';


function Callswbtn(props) {
    const [activeCall, setActiveCall] = useState(props.activeCall); 
  return (
    <div className="flex justify-center -space-x-2">
        <Button
          variant={activeCall === "call1" ? "default" : "outline"}
          onClick={() => setActiveCall("call1")}
          className="w-2/5"
        >
          Call 1
        </Button>
        <Button
          variant={activeCall === "call2" ? "default" : "outline"}
          onClick={() => setActiveCall("call2")}
          className="w-2/5"
        >
          Call 2
        </Button>
      </div>
  )
}

export default Callswbtn;