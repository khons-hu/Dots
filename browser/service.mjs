import {Game} from '../demo/game.mjs';
const kinds={Bomb:'bomb',ExtraMoves:'moves',ScoreMultiplier:'double'};
const colors=['RED','GREEN','BLUE','YELLOW'];
export function createService(){
 let game=new Game(),owned=[];
 const snapshot=()=>{
  const data={score:game.score,remainingMoves:game.moves,gameState:game.state.toUpperCase(),powerUps:owned.map(name=>({name})),
   dots:Array.from({length:game.size},(_,r)=>Array.from({length:game.size},(_,c)=>({color:colors[game.board[r*game.size+c]],selected:game.selected.includes(r*game.size+c),y:r}))),
   powerUpShop:{availableBombs:Array(game.stock.bomb).fill(null),availableExtraMoves:Array(game.stock.moves).fill(null),availableScoreMultipliers:Array(game.stock.double).fill(null),bombPrice:game.price('bomb'),extraMovesPrice:game.price('moves'),scoreMultiplierPrice:game.price('double')}};
  colors.forEach((color,i)=>{const name=color[0]+color.slice(1).toLowerCase();data[`executed${name}Dots`]=game.counts[i];data[`needed${name}DotsToBeExecuted`]=game.target;});
  return Promise.resolve({data});
 };
 return {
  fetchGameBoard:snapshot,
  newGame(level){game=new Game(level);owned=[];return snapshot();},
  selectDot(row,col){const i=row*game.size+col;if(!game.selected.includes(i)&&!game.select(i))game.clear();return snapshot();},
  executeDots(){game.execute();return snapshot();},
  buyPowerUp(name){const kind=kinds[name];if(game.state==='playing'&&kind&&game.stock[kind]>0&&game.score>=game.price(kind)){game.score-=game.price(kind);game.stock[kind]--;owned.push(name);}return snapshot();},
  applyPowerUp(name,row,col){
   const index=owned.indexOf(name);
   if(game.state!=='playing'||index<0)return snapshot();
   if(name==='Bomb'&&(!Number.isInteger(row)||!Number.isInteger(col)||row<0||col<0||row>=game.size||col>=game.size))return snapshot();
   owned.splice(index,1);
   if(name==='ExtraMoves')game.moves+=5;
   if(name==='ScoreMultiplier')game.multiplier+=2;
   if(name==='Bomb'){game.remove(game.board.map((_,i)=>i).filter(i=>Math.abs(Math.floor(i/game.size)-row)<=1&&Math.abs(i%game.size-col)<=1));}
   return snapshot();
  }
 };
}
export default createService();
