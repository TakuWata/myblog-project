import React from 'react';

import './style.css';

const Author = () => {
    return (
        <div className="author">
            <img className = "ui medium circular image" src="https://storage.tenki.jp/storage/static-images/suppl/article/image/2/27/279/27937/1/large.jpg" />
            <div>
                パンダ
            </div>
            <div>
            ジャイアントパンダ（Ailuropoda melanoleuca）は、哺乳綱食肉目クマ科ジャイアントパンダ属に分類される食肉類。
            白と黒にはっきりと分かれた体毛が際立った特徴である。
            ジャイアントパンダ属の、唯一現生する1種。四川と秦嶺の2亜種が知られる（後記「#分類」を参照）。
            単に「パンダ」と呼ぶ時はこの3種を指し、レッサーパンダはそのまま呼ばれる事が多い。
            中国大陸で進化し、アバ・チベット族チャン族自治州域内が主たる生息地である。
            現在では中華人民共和国のごく限られた地域（四川省・陝西省など）にわずかな頭数が残存する
            竹食などの草食傾向が比較的高い雑食性の大型哺乳類。
            </div>

        </div>
    );
}

export default Author;