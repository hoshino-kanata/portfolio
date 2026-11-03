# 教えて神父さま — 本番反映用ZIP

このブランチはファイルの受け渡し専用です。公開サイトのmainへの反映は行っていません。

[本番反映用ZIPをダウンロード](https://github.com/hoshino-kanata/portfolio/raw/refs/heads/delivery/oshiete-shinpusama-20261103/downloads/oshiete-shinpusama-production.zip)

ZIPをすべて解凍し、既存の `gallery/oshiete-shinpusama/` をZIP内の同名フォルダで置き換えてください。上書きコピーだけでは旧ファイルが残るため、必要なら古いフォルダを別の場所へバックアップしてから置き換えます。VSCodeのLive Serverで `index.html` を開き、確認後に普段の手順でコミット・プッシュできます。

直下は `index.html` と `assets/` のみです。CSSは `assets/shinpusama.css` の1本、編集用JavaScriptは `assets/shinpusama.js` と `assets/shinpusama-petal.js` の2本に統合しました。動作に必要なライブラリは `assets/lib/`、画像と小説は `assets/works/` にあります。

作品管理用の `CONFIG` と `WORKS` は `assets/shinpusama.js` の先頭です。詳しい編集・公開手順は `assets/README.md` を参照してください。

仮原稿・サンプル画像・未参照のOTF・重複プレビューHTMLを削除し、使用している作品31ファイルは内容をそのまま保持しています。PC・スマホで、実際の公開先と同じサブディレクトリの構成を確認済みです。

この受け渡しブランチは受領後に削除できます。
