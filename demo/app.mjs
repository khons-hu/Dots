import {Game} from './game.mjs';
import {messages,choose} from './i18n.mjs';
const $=id=>document.getElementById(id);let saved;try{saved=localStorage.getItem('dots-language');}catch{}
let lang=choose(saved,navigator.languages||[navigator.language]),game=new Game(),notice='ready';
const t=key=>messages[lang][key];const symbols=['●','◆','■','▲'];
function draw(){
 document.documentElement.lang=lang;$('language').value=lang;
 document.querySelectorAll('[data-t]').forEach(e=>e.textContent=t(e.dataset.t));
 $('score').textContent=game.score;$('moves').textContent=game.moves;$('multiplier').textContent='×'+game.multiplier;
 $('goals').replaceChildren(...game.counts.map((count,c)=>{const span=document.createElement('span'),icon=document.createElement('i');icon.className='c'+c;icon.textContent=symbols[c];span.title=t('colors')[c];span.setAttribute('aria-label',t('colors')[c]+' '+count+'/'+game.target);span.append(icon,document.createTextNode(Math.min(count,game.target)+'/'+game.target));return span;}));
 const focus=document.activeElement?.dataset?.index;
 $('board').style.setProperty('--size',game.size);
 $('board').replaceChildren(...game.board.map((c,i)=>{const b=document.createElement('button');b.className='dot c'+c;b.dataset.index=i;b.setAttribute('aria-label',`${t('colors')[c]} ${Math.floor(i/game.size)+1}, ${i%game.size+1}`);b.setAttribute('aria-pressed',game.selected.includes(i));b.disabled=game.state!=='playing';const icon=document.createElement('i');icon.textContent=symbols[c];icon.setAttribute('aria-hidden','true');b.append(icon);b.onclick=()=>{notice=game.select(i)?'ready':'invalid';draw();};return b;}));
 if(focus!==undefined)$('board').children[Number(focus)]?.focus({preventScroll:true});
 $('execute').disabled=game.selected.length<2||game.state!=='playing';$('clear').disabled=!game.selected.length;
 $('status').textContent=t(game.state==='playing'?notice:game.state);
 $('powers').replaceChildren(...[['bomb','bomb'],['moves','extra'],['double','double']].map(([kind,label])=>{const b=document.createElement('button');b.textContent=`${t(label)} · ${game.price(kind)} ${t('score').toLowerCase()} (${game.stock[kind]})`;b.disabled=game.state!=='playing'||game.score<game.price(kind)||!game.stock[kind]||(kind==='bomb'&&!game.selected.length);b.onclick=()=>{game.power(kind);notice='ready';draw();};return b;}));
}
$('execute').onclick=()=>{game.execute();notice='ready';draw();};$('clear').onclick=()=>{game.clear();notice='ready';draw();};
$('restart').onclick=()=>{if((game.score||game.selected.length||game.counts.some(Boolean))&&!confirm(t('confirm')))return;game=new Game(Number($('level').value));notice='ready';draw();};
$('language').onchange=()=>{lang=choose($('language').value);try{localStorage.setItem('dots-language',lang);}catch{}draw();};
$('theme').onclick=()=>{const value=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=value;try{localStorage.setItem('dots-theme',value);}catch{}};
$('board').onkeydown=e=>{const i=Number(e.target.dataset.index);if(!Number.isInteger(i))return;const delta={ArrowLeft:-1,ArrowRight:1,ArrowUp:-game.size,ArrowDown:game.size}[e.key];if(delta!==undefined){e.preventDefault();$('board').children[Math.max(0,Math.min(game.board.length-1,i+delta))]?.focus();}};
draw();
