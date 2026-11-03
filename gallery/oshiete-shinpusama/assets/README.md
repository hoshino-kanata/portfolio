# 教えて神父さま — 編集・公開ガイド

`oshiete-shinpusama` フォルダ全体を、既存サイトの `gallery/oshiete-shinpusama/` に配置します。フォルダ直下は `index.html` と `assets/` だけです。

```text
oshiete-shinpusama/
├── index.html
└── assets/
    ├── shinpusama.css             全ページのスタイル
    ├── shinpusama.js              設定・作品一覧・ビューア・保存抑止
    ├── shinpusama-petal.js        ヒーロー内だけに表示する3D装飾
    ├── lib/
    │   ├── animation.min.js       GSAPとScrollTrigger（元のライセンス表記を保持）
    │   └── three.module.min.js    Three.js
    ├── works/                    作品画像・紹介画像・小説TXT
    ├── tools/build-local-data.py ローカル直開き用本文の更新ツール
    └── README.md                 このガイド
```

CSSは1本、編集するJavaScriptは本体と3D用の2本に統合しています。`lib/` は動作に必要なライブラリなので残しています。Node.jsやnpmでのビルド作業は不要です。

## VSCodeで確認・公開する

1. ZIPをすべて解凍します。
2. 古い `gallery/oshiete-shinpusama/` を今回の同名フォルダで置き換えます。上書きコピーだけでは旧ファイルが残るため、古いフォルダは必要に応じて別の場所へバックアップしてから置き換えてください。
3. VSCodeのLive Serverで `index.html` を開いて確認します。
4. Gitの変更一覧で、旧CSS・JS・仮原稿の削除と、`assets/` 以下の追加を確認してから、普段の手順でコミット・プッシュします。

GitHub Pagesに配置するときも、`index.html` と `assets/` をセットで反映してください。新しい構成は `/gallery/oshiete-shinpusama/` のようなサブディレクトリで動作します。

このZIPの作成では、本番の `main` ブランチや公開サイトへの反映は行っていません。GitHubの受け渡し専用ブランチにはZIPだけを置いています。

## 作品を追加・編集する

作品管理は **`assets/shinpusama.js` の先頭**にまとめています。

- `CONFIG`：開催年、フォームURL、募集予定日、カウントダウン、作品の保存先
- `WORKS`：番号、タイトル、英字見出し、作者、作者X、作品ファイル、色など
- `index.html` の `guideTemplate`：世界観の人物紹介・用語集
- `assets/shinpusama.css`：見た目。世界観・ライト効果・保存抑止もこの1本に統合済み
- `assets/works/`：UTF-8の原稿TXTと画像。作品の元データは変更していません

`CONFIG.worksDir` は `"assets/works/"` です。`WORKS` の `src`・`file` は、これまでと同じく作品フォルダからの相対パスだけを書きます。

```js
{ id:"w09", no:"09", hero:false, type:"image", src:"w09/illustration.webp",
  word:"LIGHT", title:"作品タイトル", ja:"",
  author:"作者名", x:"https://x.com/account" },
```

この例では画像を `assets/works/w09/illustration.webp` に置きます。タイトルを表示しない場合は `title:"", titleless:true` にします。新しい投稿作品は `hero:false` にして、Confessionとメニューに表示します。

漫画は `type:"manga", count:8, ext:".webp", rtl:true` のように設定し、`assets/works/w09/001.webp` から連番で置きます。すべての漫画で最初の1ページは単独表示し、その後を2・3、4・5ページの見開きにします。スマホはページごとの縦スクロールです。

小説は `type:"novel", file:"story.txt"` と指定します。原稿のルビ・傍点は次の記法を使えます。

```text
｜言葉《ことば》
漢字《かんじ》
《《ここに傍点》》
［画像：illustration.webp｜挿絵の説明］
```

## ローカルでの確認

VSCodeのLive Serverを推奨します。HTTP配信ではTXTを直接読むため、原稿を編集すればそのまま反映されます。

`index.html` のダブルクリックでも画像・小説は表示できます。ブラウザーの制限により3D装飾はHTTP配信時だけ読み込みます。小説は `shinpusama.js` の末尾にまとめた本文データを使います。直接開く方式でTXTの変更を反映する場合だけ、サイトのフォルダで次を実行してください。

```sh
python3 assets/tools/build-local-data.py
```

Windowsでは `py -3 assets/tools/build-local-data.py` です。更新されるのは `shinpusama.js` 末尾の自動生成部分だけで、先頭の作品設定は維持されます。

重複する `local-preview.html`、単独の `local-texts.js`、仮原稿、サンプル画像、未参照のOTFは削除しました。使用する英字フォントはCSSに内蔵しています。Google Fontsへ接続できない場合は端末の明朝体に切り替わります。

## 維持している仕様

世界観00はメニューとヒーローに残し、Confessionには表示しません。Confessionは01〜08の作品を上下2段に並べ、メニューは番号順です。ヒーローは00〜05だけで、投稿作品06〜08は除外しています。08のマルボロさんの作品は題名・日本語説明なし、Xリンク付きです。

3Dの紙片・コイン・星はヒーローの枠内だけに表示し、ConfessionやAbout・作品ページには重なりません。画像の右クリック・ドラッグ、本文の選択・コピーの抑止も維持しています。公開データの取得やスクリーンショットの完全な防止はできません。

募集は継続中です。Aboutは `2027.07.06` を表示し、日本時間の同日23:59:59までカウントダウンします。次回募集予定日は2027年7月7日です。
