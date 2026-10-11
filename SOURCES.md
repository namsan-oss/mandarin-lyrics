# 中国語の歌詞で発音練習：出典・利用条件
## 辞書
CC-CEDICT / MDBG、CC BY-SA 4.0。
https://www.mdbg.net/chinese/dictionary?page=cc-cedict
https://creativecommons.org/licenses/by-sa/4.0/
元データ：https://www.mdbg.net/chinese/export/cedict/cedict_1_0_ts_utf-8_mdbg.txt.gz
2026-10-11取得。出典原文を保持し、純漢字の単語・数字付きピンインを持つ項目を索引化。簡体字・繁体字の両方で同じ項目を参照。辞書にない読みを生成しない。先頭候補を仮に選択、一般語を固有名詞・姓より先に表示するが、文脈判定ではない。
辞書の意味は英語原文を保持。名前のピンインで以前作成した日本語訳は、漢字・数字付きピンイン・英語原文が完全一致するものだけ再利用。一部の単語にCodexによるAI翻訳・要約を追加（試作、全件人手校閲済みではない）。辞書・索引・日本語訳はCC BY-SA 4.0。自動翻訳とAI翻訳を区別して表示。
## 単語音声
端末内の普通話音声をWeb Speech APIで取得（localService=true、zh-CN/zh-TW/cmn）。外部の音声APIや遠隔音声を使用しない。音声がない環境では理由を表示しボタンを無効化。単語の漢字全体を音声合成へ渡す。選択したピンインを音声へ指定する機能はないため、多音字は辞書の表示と一致しない場合がある。歌唱ではなく話し言葉の自動読み。連読変調の品質は端末・音声による。
参考：https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisVoice/localService
https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesisUtterance
## 入力・コード
歌詞や既存楽曲を同梱せず、練習例は独自の短文。入力はブラウザ内で処理し、保存・localStorage・DB・外部AI送信をしない。辞書へのリンクを押すとその単語の辞書ページへ移動する。アプリコードはMIT（LICENSE-CODE.txt）、辞書と訳にはMITを適用しない。
