# Notes

## ユーザーの好み・前提（2026-10-15 の聞き取り）
- 目的：自社 AI サービスの設計の参考にしたい（買うか作るかの判断ではない）。
- 関心のある用途：企業のリスク監視。まず全体像から。
- Claude routine：実際に使っている。routine の基本説明は不要。
- 言葉：日本語。やさしい言葉で、短く。ただし略しすぎて分かりにくくしない。技術用語は英語のまま残してよい（前回の学習でも同じ方針）。
- 作業フォルダ：ユーザーがアプリで開けるよう、リポジトリ内の learn/ 以下に置く（前回の learn/slides/ と同じ方針）。このワークスペースは learn/teach/dataminr/。

## 公開先
- コースの artifact：https://claude.ai/artifact/GuPnce1ovj9hoLeyu7Fqtz（非公開。index.html が本体）
- 更新するときは、同じ index.html を file_path にし、root を learn/teach/dataminr、files に lessons/・reference/・assets/ を相対パスで渡して公開しなおす（別の会話からは url を指定して read してから）。

## 運用メモ
- index.html は artifact の本体ページなので doctype などを書かない。lessons/・reference/ の HTML は単体でも開けるよう、doctype つきの完全な HTML にする。
- 共通部品：assets/style.css（色・文字・レイアウト・クイズ・壁の表・流れ図）、assets/quiz.js（クイズと「思い出す練習」）。新しいレッスンもこれを使う。
- クイズの結果は保存していない。理解の証拠は、レッスン末尾の「思い出す練習」の答えをチャットで送ってもらって集める。届いたら learning-records に書く。
- 用語（レッスン 0001 で導入）：まとめ役（routine）／警報役（Dataminr）、5 つの壁＝速さ・視野・規模・記憶・選別。理解が確認できたら GLOSSARY に入れる。
- 調査の生データは research-notes/（A 公式情報、B 技術、C 限界と批判、D routine の仕様、E 自作の壁）。各主張に URL・日付・引用つき。

## 次の候補
- 0002「Dataminr の限界」：通知の多さと調整の手間、正確さを保証しない契約、公開情報だけ、X への依存と規約（抗議行動の監視の禁止）、位置は推定、地域と言語のかたより、監視をめぐる批判、価格。材料は research-notes/C-limits.md。限界を「自社サービスの入りどころ」として読む練習にする。
- その先：データを使う権利の取り方（開いたデータ・契約・日本の情報源）、最小構成の設計（常時動く検知 → API で routine を起動して文脈づけ）。
