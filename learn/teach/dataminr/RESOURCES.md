# Dataminr Resources

## Knowledge

### Dataminr の中身（技術）
- [Aerospike「Dataminr」導入事例](https://aerospike.com/resources/customer-stories/dataminr/)
  Dataminr の技術責任者 2 人（Guy Dassa、Tony Du）が本番の流れを語る。50 以上のモデル、入力の 95% 以上の削減、予測 AI と生成 AI の分担。データベース会社の宣伝記事でもあるので性能の話は割り引く。Use for: 中の流れ、規模の壁。0001 の一次資料。
- [Alex Jaimes（Dataminr 主任科学者）CEWIT 2023 講演スライド](https://www.stonybrook.edu/cewit-conference-new/_media/cewit-keynote-november-2023-alex-jaimes-public.pdf)
  「LLM だけには（まだ）頼れない」理由（費用・速さ・ハルシネーション）、速さと費用の工夫、未解決の課題（重複、リアルタイムの裏づけ、偽情報）。Use for: LLM をどこに使い、どこに使わないかの設計判断。
- [米国特許 US 8,719,302 B2（2009 年出願）](https://patents.google.com/patent/US8719302B2/en)
  複数の時間幅でのクラスタリング、移動平均などの基準とのずれでの判定、利用者の要望とのマッチング。公開資料で唯一、検知の手順が最後まで書かれている。Use for: 記憶の壁、検知の中心の考え方。
- [Jaimes「Multi-modal understanding and summarization…」（2019）](https://www.dataminr.com/blog/multi-modal-understanding-and-summarization-of-critical-events-for-emergency-response)
  航空機の信号（ADS-B）の異常検知と、アラート文の自動生成。「検知から配信まで 5 秒未満」。Use for: 速さの壁、センサーの使い方。
- [CrisisLTLSum（EMNLP Findings 2022、Dataminr の著者）](https://aclanthology.org/2022.findings-emnlp.400.pdf)
  ツイートの流れから出来事の時系列を作る手順（絞り込み → 固有名詞と場所 → オンライン・クラスタリング → 重複の除去）。Use for: 自作の検知部分を設計するとき。
- [Real-time Event Detection for Emergency Response（KDD 2021 チュートリアル、Jaimes・Tetreault）](https://www.cs.rochester.edu/~tetreaul/kdd2021-tutorial.html)
  Dataminr の研究者による体系的な解説（中身は未読）。Use for: 検知技術を体系的に学ぶとき。

### Dataminr の製品と数字（公式。数字は自己申告）
- [Dataminr「AI Platform」](https://www.dataminr.com/ai-platform)
  情報源 100 万以上、150 以上の言語、1 日 43TB 以上、約 50 万件の出来事、自社 LLM 50 以上。Use for: 数字の確認（ページごとに食い違いがある点に注意）。
- [Dataminr「Corporate Security」](https://www.dataminr.com/products/corporate-security/)
  企業向けの用途（人・拠点とイベント・事業継続）と機能。Use for: 企業のリスク監視でできること。
- [プレスリリース：First Alert Advanced と米国防総省の契約（2026-08-26）](https://www.dataminr.com/press/announcement/dataminr-launches-first-alert-advanced-awarded-dow-contract/)
  最新の機能（Agentic Corroboration、数時間先の予測）と、汎用モデルだけに頼らない理由についての CTO の発言。Use for: 現在の製品の姿。

### 限界と批判（独立した情報源が中心）
- [米国会計検査院（GAO）入札異議の決定 B-418730.5, .6（2021）](https://www.gao.gov/products/b-418730.5%2Cb-418730.6)
  米空軍が Twitter の全投稿へのアクセスを重視し、283% 高い Dataminr を選んだ記録。Use for: データの堀の証拠。
- [Dataminr が LAPD に出した 2016 年の資料（Brennan Center 公開）](https://www.brennancenter.org/sites/default/files/2021-09/H.%20Dataminr%20Trial%202016.pdf)
  Twitter の全投稿の契約、位置情報つき投稿は 2〜3%、位置推定は最大約 60%、「ノイズはない」という当時の主張。Use for: 視野と選別の壁、宣伝と実際の比較。
- [The Intercept（2020-07-09）](https://theintercept.com/2020/07/09/twitter-dataminr-police-spy-surveillance-black-lives-matter-protests/)・[（2020-10-21）](https://theintercept.com/2020/10/21/dataminr-twitter-surveillance-racial-profiling/)・[（2024-03-25）](https://theintercept.com/2024/03/25/elon-musk-x-dataminr-surveillance-privacy/)
  監視をめぐる批判、人の関与の度合い、2023 年時点の X の全投稿へのアクセス。Dataminr の反論も載っている。Use for: 倫理と規約のリスク。
- [AWS Marketplace「Dataminr First Alert」](https://aws.amazon.com/marketplace/pp/prodview-7eav2xsxvnupy)
  G2 のレビューの転載（通知の多さ、調整の手間）と掲載価格（1 ユーザー 1 年 3 万ドル）。Use for: 利用者の声と価格。
- [Dataminr「First Alert Master Subscription Agreement」（2026-03）](https://www.dataminr.com/legal/firstalert-msa/)
  正確さ・速さを保証しない条項、X の投稿の使い方の制限。Use for: 契約上の限界。
- [Kraft & Usbeck「The Ethical Risks of Analyzing Crisis Events on Social Media with Machine Learning」（2022）](https://arxiv.org/abs/2210.03352)
  利用者のかたより、言語のかたより。Use for: 地域・言語の偏り。
- [Imran ほか「Processing Social Media Messages in Mass Emergency: A Survey」（2015）](https://arxiv.org/abs/1407.7071)
  危機時のソーシャルメディア処理の総説。位置情報を持つ投稿は約 2%。Use for: 分野の全体像。

### routine と自作の壁
- [Claude Code Docs「Automate work with routines」](https://code.claude.com/docs/en/routines)
  最短 1 時間、毎回新しいセッション、API 起動の上限、監視ツールから routine を起こす例（Alert triage）。Use for: routine でできることの確認。
- [X API 料金](https://docs.x.com/x-api/getting-started/pricing)・[X Developer Agreement](https://docs.x.com/developer-terms/agreement)
  1 件 0.005 ドル、月 300 万件まで。監視や抗議行動の監視の禁止。Use for: データを使う権利の壁。
- [Bluesky「Consuming the firehose」](https://bsky.network/docs/consuming-the-firehose/)
  認証なしで使える開いたストリーム。Use for: 自作の入り口。
- [Earle ほか「Twitter earthquake detection」（USGS、2011）](https://www.usgs.gov/publications/twitter-earthquake-detection-earthquake-monitoring-a-social-world)
  短い期間の平均と長い期間の平均の比較で地震を検知。約 75% を 2 分以内。Use for: 記憶の壁を越える最小の方法。
- [Kleinberg「Bursty and Hierarchical Structure in Streams」（KDD 2002）](https://www.cs.cornell.edu/home/kleinber/bhs.pdf)
  出来事を「急な高まり（バースト）」として捉える古典。Use for: 検知の理論。
- [Petrović ほか「Streaming First Story Detection with application to Twitter」（NAACL 2010）](https://aclanthology.org/N10-1021.pdf)
  ストリームから新しい話題を速く見つける手法。投稿の大半は出来事ではないことも示す。Use for: 規模の壁。
- [Bucher & Martini（2024）](https://arxiv.org/abs/2406.08660)
  分類では、専用に調整したモデルが調整なしの大きな LLM を上回る。Use for: どこに LLM を使うか。

## Wisdom (Communities)

- [ISCRAM](https://iscram.org/)
  危機対応の情報システムの学会（2004 年〜、2000 本以上の論文を公開）。Use for: ソーシャルメディアでの検知の限界について、研究者と実務家の知見を得る。
- [ASIS International](https://www.asisonline.org/)
  セキュリティ管理者の国際団体（1955 年〜、世界に 240 以上の支部）。日本の支部があるかは未確認なので、公式サイトの支部検索で確かめる。Use for: 企業のセキュリティ担当者が道具をどう比べているかを聞く。
- [Bellingcat](https://www.bellingcat.com/) とボランティア・コミュニティ
  公開情報の調査と検証の技術を学べる。Use for: アラートの裏どり（選別の壁）の実技。
- [海外安全官民協力会議（外務省）](https://www.anzen.mofa.go.jp/anzen_info/kanminkyo.html)
  外務省と、海外で活動する企業・団体の会議（2003 年発足）。参加は約 23 の企業・団体に限られるが、会合の資料が公開されている。Use for: 日本企業の海外安全の実務を知る。

## Gaps
- Dataminr の本番システムについての論文や技術ブログ（ストリーム処理の構成）は見つかっていない。
- 誤検知率・見逃し率などの独立した評価がない。
- Dataminr と X の現在の契約条件（価格・期間・独占かどうか）が公開されていない。
- 日本での導入事例と日本語の情報源が乏しい。NEC ネッツエスアイの販売契約が続いているかも不明。
- 競合（Samdesk、Crisis24、LifeRaft、Seerist など）との独立した比較がない。
- G2・Gartner Peer Insights・Capterra のレビューは、調査ツールから直接読めなかった（AWS の転載のみ）。
