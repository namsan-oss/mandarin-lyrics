// Dictionary data: CC BY-SA 4.0. See SOURCES.md.
export let records=[],wordIndex=Object.create(null);
export async function loadData(fetcher=globalThis.fetch.bind(globalThis)){
 const response=await fetcher(new URL('./data.json',import.meta.url));
 if(!response.ok)throw new Error('辞書の読み込みに失敗しました（'+response.status+'）');
 const data=await response.json();
 if(!Array.isArray(data.records)||!data.wordIndex)throw new Error('辞書データが不正です。');
 records=data.records;wordIndex=data.wordIndex;
}
