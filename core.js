import {records,wordIndex} from './data.js';
export const MAX_INPUT=5000;
export function tone(value){
 return value.toLowerCase().replace(/([a-zü:]+)([1-5])/g,(_,raw,n)=>{
  const s=raw.replace(/u:/g,'ü');if(n==='5')return s;
  let i=s.indexOf('a');if(i<0)i=s.indexOf('e');if(i<0&&s.includes('ou'))i=s.indexOf('o');
  if(i<0)for(let j=s.length-1;j>=0;j--)if('iouü'.includes(s[j])){i=j;break;}
  const marks={a:'āáǎà',e:'ēéěè',i:'īíǐì',o:'ōóǒò',u:'ūúǔù',ü:'ǖǘǚǜ'};
  if(i>=0)return s.slice(0,i)+marks[s[i]][Number(n)-1]+s.slice(i+1);
  if(s==='m'||s==='n'||s==='ng')return s[0]+['̄','́','̌','̀'][Number(n)-1]+s.slice(1);
  return s;
 });
}
export function candidates(text){
 const out=[];for(const id of wordIndex[text]||[]){const [word,numbered,english,japanese,method]=records[id],spelling=tone(numbered);let c=out.find(x=>x.spelling===spelling);if(!c){c={spelling,evidence:[]};out.push(c);}c.evidence.push({word,numbered,english,japanese,method});}
 // 単独の「說／说」は一般的な「話す」の読みを先頭にする。
 if(text==='說'||text==='说')out.sort((a,b)=>Number(b.spelling==='shuō')-Number(a.spelling==='shuō'));
 return out;
}
export function makeToken(text){const options=candidates(text);return {text,options,selected:options.length?0:null};}
const isHan=c=>/\p{Script=Han}/u.test(c);
export function segmentLine(line){
 const chars=Array.from(line),tokens=[];
 for(let i=0;i<chars.length;){
  let end=i,word='';
  // 既存の辞書索引を直接参照し、大量のMapを起動時に作らない。
  for(let j=i;j<Math.min(chars.length,i+30)&&isHan(chars[j]);j++){word+=chars[j];if(Object.prototype.hasOwnProperty.call(wordIndex,word))end=j+1;}
  if(end>i){tokens.push(makeToken(chars.slice(i,end).join('')));i=end;continue;}
  let j=i+1;
  if(!isHan(chars[i])){const type=/\s/u.test(chars[i])?'space':/[\p{L}\p{N}\p{M}]/u.test(chars[i])?'latin':'punct';while(j<chars.length&&!isHan(chars[j])&&(type==='space'?/\s/u.test(chars[j]):type==='latin'?/[\p{L}\p{N}\p{M}]/u.test(chars[j]):!/\s|[\p{L}\p{N}\p{M}]/u.test(chars[j])))j++;tokens.push({text:chars.slice(i,j).join(''),options:[],selected:null,kind:type});}
  else tokens.push(makeToken(chars[i]));i=j;
 }
 return tokens;
}
export function analyse(text){if(text.length>MAX_INPUT)throw new Error(`入力は${MAX_INPUT}文字までです。`);return text.replace(/\r\n?/g,'\n').split('\n').map(segmentLine);}
export function splitToken(tokens,index){const token=tokens[index];if(token.kind||Array.from(token.text).length<2)return false;tokens.splice(index,1,...Array.from(token.text).map(makeToken));return true;}
export function mergeNext(tokens,index){const a=tokens[index],b=tokens[index+1];if(!a||!b||a.kind||b.kind)return false;tokens.splice(index,2,makeToken(a.text+b.text));return true;}
export function chosen(token){return token.selected===null?null:token.options[token.selected]||null;}
export function lineReading(tokens){return tokens.map(t=>t.kind?t.text:chosen(t)?.spelling||(t.options.length?'〔未選択〕':'〔未収録〕')).join(' ');}
export function choose(token,index){if(!Number.isInteger(index)||index<0||index>=token.options.length)throw new RangeError('候補が存在しません');token.selected=index;}
