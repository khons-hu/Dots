import React from "react";
import Dot from "../dots-game/src/components/game/Dot.jsx";
function GameBoard({dots,onSelectDot,onExecute}) {
 return <><div className="browser-board" style={{'--size':dots.length}} aria-label="Dots board">{dots.flatMap((row,r)=>row.map((dot,c)=><Dot key={`${r}-${c}`} dot={dot} label={`${dot.color} ${r+1}, ${c+1}`} onSelectDot={()=>onSelectDot(r,c)} onExecute={onExecute}/>))}</div><div className="text-center"><button className="btn btn-primary" onClick={onExecute}>Execute dots</button></div></>;
}
export default GameBoard;
