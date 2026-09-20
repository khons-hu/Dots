import test from 'node:test';
import assert from 'node:assert/strict';
import {createService} from './service.mjs';
test('React adapter supports all original levels and isolates players',async()=>{
 const a=createService(),b=createService();
 for(let level=1;level<=5;level++){const {data}=await a.newGame(level);assert.equal(data.dots.length,level+3);assert.equal(data.powerUps.length,0);assert.equal(data.gameState,'PLAYING');}
 assert.equal((await b.fetchGameBoard()).data.dots.length,4);
});
test('buy and use are separate, with original +2 multiplier and finite inventory',async()=>{
 const previous=Math.random;Math.random=()=>0;
 const s=createService();await s.newGame(1);Math.random=previous;
 await s.selectDot(0,0);await s.selectDot(0,1);
 let {data}=await s.executeDots();assert.equal(data.score,2);assert.equal(data.remainingMoves,19);
 data=(await s.buyPowerUp('ScoreMultiplier')).data;assert.equal(data.score,0);assert.equal(data.powerUps[0].name,'ScoreMultiplier');
 await s.applyPowerUp('ScoreMultiplier',1,1);
 await s.selectDot(3,0);await s.selectDot(3,1);
 data=(await s.executeDots()).data;assert.equal(data.score,6);
 await s.applyPowerUp('ExtraMoves',1,1);assert.equal((await s.fetchGameBoard()).data.remainingMoves,18);
 await s.buyPowerUp('ExtraMoves');data=(await s.applyPowerUp('ExtraMoves',1,1)).data;assert.equal(data.remainingMoves,23);assert.equal(data.powerUps.length,0);
});
test('invalid selection clears and invalid execution does not spend a move',async()=>{
 const s=createService();await s.selectDot(0,0);await s.selectDot(3,3);
 assert.equal((await s.fetchGameBoard()).data.dots.flat().filter(d=>d.selected).length,0);
 assert.equal((await s.executeDots()).data.remainingMoves,20);
 assert.equal((await s.buyPowerUp('Bomb')).data.powerUps.length,0);
});
