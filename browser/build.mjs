import {build} from 'esbuild';
import {mkdir,cp,writeFile,readFile} from 'node:fs/promises';
import {resolve} from 'node:path';
await mkdir('dist',{recursive:true});
await cp('dots-game/public/images','dist/images',{recursive:true});
await cp('dots-game/public/sound.mp3','dist/sound.mp3');
await build({entryPoints:['browser/main.jsx'],bundle:true,minify:true,outdir:'dist',loader:{'.js':'jsx'},alias:{'react-spring':'@react-spring/web'},define:{'process.env.PUBLIC_URL':'""','process.env.NODE_ENV':'"production"'},plugins:[{name:'browser-game',setup(b){b.onResolve({filter:/^\.\/GameBoard$/},()=>({path:resolve('browser/GameBoard.jsx')}));b.onResolve({filter:/dotsGameBoardService\.js$/},()=>({path:resolve('browser/service.mjs')}));b.onLoad({filter:/\.module\.css$/},async args=>({contents:await readFile(args.path,'utf8'),loader:'local-css'}));}}]});
await writeFile('dist/index.html','<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="Play Patrick’s original 2023 Dots React game in your browser."><title>Dots · 2023</title><link rel="icon" href="/images/dots/dots_logo.png"><link rel="stylesheet" href="/main.css"></head><body><div id="root"></div><script src="/main.js" defer></script></body></html>');
