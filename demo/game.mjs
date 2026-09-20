// Browser adaptation of the 2023 Java game. State belongs to one player/tab.
export const levels = [[4,20],[5,15],[6,10],[7,12],[8,16]];
export class Game {
 constructor(level=1,random=Math.random){
  if(!Number.isInteger(level)||!levels[level-1])throw Error('Invalid level');
  this.random=random;this.level=level;[this.size,this.moves]=levels[level-1];
  this.target=Math.floor(this.size*this.size/4);this.score=0;this.multiplier=1;
  this.counts=[0,0,0,0];this.selected=[];this.state='playing';
  this.stock={bomb:Math.floor(this.moves/2),moves:Math.floor(this.moves/2),double:Math.floor(this.moves/2)};
  this.board=Array.from({length:this.size*this.size},()=>this.color());this.ensurePair();
 }
 color(){return Math.min(3,Math.max(0,Math.floor(this.random()*4)));}
 adjacent(a,b){return Math.abs(Math.floor(a/this.size)-Math.floor(b/this.size))+Math.abs(a%this.size-b%this.size)===1;}
 select(i){
  if(this.state!=='playing'||!Number.isInteger(i)||i<0||i>=this.board.length)return false;
  const at=this.selected.indexOf(i);
  if(at>=0){this.selected=this.selected.slice(0,at);return true;}
  if(this.selected.length){const last=this.selected.at(-1);if(!this.adjacent(i,last)||this.board[i]!==this.board[last])return false;}
  this.selected.push(i);return true;
 }
 clear(){this.selected=[];}
 remove(indices){
  for(const i of new Set(indices)){this.counts[this.board[i]]++;this.board[i]=null;this.score+=this.multiplier;}
  for(let col=0;col<this.size;col++){
   const left=[];for(let row=0;row<this.size;row++){const v=this.board[row*this.size+col];if(v!==null)left.push(v);}
   while(left.length<this.size)left.unshift(this.color());
   for(let row=0;row<this.size;row++)this.board[row*this.size+col]=left[row];
  }
  this.clear();this.state=this.counts.every(v=>v>=this.target)?'won':this.moves<=0?'lost':'playing';
  if(this.state==='playing')this.ensurePair();
 }
 execute(){if(this.state!=='playing'||this.selected.length<2)return false;this.moves--;this.remove(this.selected);return true;}
 ensurePair(){
  for(let i=0;i<this.board.length;i++)for(const j of [i+1,i+this.size])if(j<this.board.length&&this.adjacent(i,j)&&this.board[i]===this.board[j])return;
  this.board[1]=this.board[0]; // Avoid an unplayable board without a random retry loop.
 }
 price(kind){return {bomb:this.target,moves:Math.floor(this.size*this.size/6),double:Math.floor(this.size*this.size/8)}[kind];}
 power(kind,center=this.selected.at(-1)){
  const price=this.price(kind);
  if(this.state!=='playing'||price===undefined||this.stock[kind]<=0||this.score<price)return false;
  if(kind==='bomb'&&(!Number.isInteger(center)||center<0||center>=this.board.length))return false;
  this.score-=price;this.stock[kind]--;
  if(kind==='moves')this.moves+=5;
  if(kind==='double')this.multiplier*=2;
  if(kind==='bomb'){
   const indices=[];for(let i=0;i<this.board.length;i++)if(Math.abs(Math.floor(i/this.size)-Math.floor(center/this.size))<=1&&Math.abs(i%this.size-center%this.size)<=1)indices.push(i);
   this.remove(indices);
  }
  return true;
 }
}
