export function mandarinVoices(voices){return voices.filter(v=>v.localService&&/^(zh[-_](CN|TW)|cmn(?:[-_]|$))/i.test(v.lang)).sort((a,b)=>{const rank=v=>(/CN/i.test(v.lang)?0:10)+(/Ting-Ting|Meijia|Xiaoxiao/i.test(v.name||'')?0:1);return rank(a)-rank(b);});}
export class WordPlayer{
 constructor(onState=()=>{},synth=globalThis.speechSynthesis,makeUtterance=text=>new SpeechSynthesisUtterance(text)){this.synth=synth;this.makeUtterance=makeUtterance;this.onState=onState;this.generation=0;this.utterance=null;}
 voices(){return mandarinVoices(this.synth?.getVoices()||[]);}
 stop(){this.generation++;this.synth?.cancel();this.utterance=null;this.onState({state:'idle'});}
 play(text,voice,rate=0.85){this.stop();const generation=this.generation;if(!voice?.localService||!this.voices().some(v=>v.voiceURI===voice.voiceURI)){this.onState({state:'error',message:'端末内の普通話音声が見つかりません。'});return;}
 const u=this.makeUtterance(text);u.voice=voice;u.lang=voice.lang;u.rate=rate;this.utterance=u;
 u.onstart=()=>{if(generation===this.generation)this.onState({state:'playing',label:text});};
 u.onend=()=>{if(generation===this.generation){this.utterance=null;this.onState({state:'idle'});}};
 u.onerror=()=>{if(generation===this.generation){this.utterance=null;this.onState({state:'error',message:'音声を再生できませんでした。'});}};
 this.onState({state:'loading',label:text});try{this.synth.speak(u);}catch{u.onerror();}
 }
}
