const discography = [
    {
        "name": "アップルミント",
        "img": "./img/jkt01.jpg",
        "releaseDate": "2014.11.12",
        "songs": [
            "1：アップルミント",
            "2：Breezin'",
            "3：Sweet Rain",
            "4：ONE WAY",
            "5：Growing Going",
            "6：オレンジ",
            "7：キックとパンチどっちがいい？",
            "8：Merry Go",
            "9：ピンク・マゼンダ",
            "10：泣きべそパンダはどこへ行った",
            "11：ドーナツ",
        ]
    },
    {
        "name": "Blooming!",
        "img": "./img/jkt02.jpg",
        "releaseDate": "2015.07.22",
        "songs": [
            "1：Blooming!",
            "2：スニーカーフューチャーガール",
            "3：Like a Bird",
            "4：最後の花火",
            "5：Go! My Cruising!",
            "6：Let it shine",
            "7：ハルカカナタ",
            "8：いざゆけ!ペガサス号",
            "9：妄想ストーリーテラー",
            "10：Daydream",
            "11：with you",
        ]
    },
    {
        "name": "Bitter Kiss",
        "img": "./img/jkt03.jpg",
        "releaseDate": "2016.02.10",
        "songs": [
            "1：afraid...",
            "2：シリアス",
            "3：MELODY",
            "4：キリステロ",
            "5：Ruby eclipse",
            "6：絶望アンバランス",
        ]
    },
    {
        "name": "Sweet Tears",
        "img": "./img/jkt04.jpg",
        "releaseDate": "2016.02.10",
        "songs": [
            "1：Floating Heart",
            "2：color station",
            "3：リードを外して",
            "4：笑わないで",
            "5：Sweet Dreamer",
            "6：Party Hour Surprise!",
        ]
    },
    {
        "name": "SUMILE SMILE",
        "img": "./img/jkt05.jpg",
        "releaseDate": "2016.11.30",
        "songs": [
            "1.SUMILE SMILE",
            "2.Everlasting Parade",
            "3.SUMILE SMILE(Instrumental) ",
            "4.Everlasting Parade(Instrumental)",
        ]
    },
    {
        "name": "ICECREAM GIRL",
        "img": "./img/jkt06.jpg",
        "releaseDate": "2017.09.13",
        "songs": [
            "1.What you want!",
            "2.Yellow SweetMV",
            "3.Say Goodbye,Say Hello",
            "4.Close to you",
            "5.Holiday",
            "6.Under Control",
            "7.カレイドスコープロンド",
            "8.Blue Flower",
            "9.Frozen",
            "10.EARNEST WISH",
            "11.SUMILE SMILEMV",
            "12.Ordinary",
        ]
    },
    {
        "name": "So Happy",
        "img": "./img/jkt07.jpg",
        "releaseDate": "2018.05.09",
        "songs": [
            "1.So Happy",
            "2.Sweet Little Journey",
            "3.So Happy",
            "4.Sweet Little Journey",
        ]
    },
    {
        "name": "AYA UCHIDA Complete Box",
        "img": "./img/jkt08.jpg",
        "releaseDate": "2018.07.18",
        "songs": [
            "沢山あるので省略",
        ]
    },
    {
        "name": "Sign／Candy Flavor",
        "img": "./img/jkt09.jpg",
        "releaseDate": "2019.03.06",
        "songs": [
            "1.Sign",
            "2.Candy Flavor",
            "3.Sign　(Instrumental)",
            "4.Candy Flavor　(Instrumental)",
        ]
    },
    {
        "name": "Ephemera",
        "img": "./img/jkt10.jpg",
        "releaseDate": "2019.11.27",
        "songs": [
            "01. DECORATE",
            "02. カレンデュラ、揺れる",
            "03. Inferior Mirage",
            "04. ANSWER",
            "05. グロー",
            "06. ソレイユを臨んで",
            "07. Our Wind",
            "08. Beautiful world",
            "09. Sign",
            "10. Candy Flavor",
            "11. リボンシュシュ",
        ]
    },
    {
        "name": "Reverb",
        "img": "./img/jkt11.jpg",
        "releaseDate": "2020.03.04",
        "songs": [
            "1.Reverb",
            "2.声",
            "3.Reverb(Instrumental)",
            "4.声(Instrumental)",
        ]
    },
    {
        "name": "∞リボンをギュッと∞",
        "img": "./img/jkt12.jpg",
        "releaseDate": "2021.02.22",
        "songs": [
            "1.∞リボンをギュッと∞ (ぐんまちゃんダンス)"
        ]
    },
    {
        "name": "ぐんまちゃん えかきうた",
        "img": "./img/jkt13.jpg",
        "releaseDate": "2021.03.03",
        "songs": [
            "1.ぐんまちゃん えかきうた"
        ]
    },
    {
        "name": "Pale Blue",
        "img": "./img/jkt14.jpg",
        "releaseDate": "2021.06.02",
        "songs": [
            "1.Pale Blue",
            "2.Destiny",
            "3.Pale Blue (Instrumental)",
            "4.Destiny (Instrumental)",
        ]
    },
    {
        "name": "Canary Yellow",
        "img": "./img/jkt15.jpg",
        "releaseDate": "2021.11.10",
        "songs": [
            "1.Canary Yellow",
            "2.KANRANSHA",
            "3.Canary Yellow (Instrumental)",
            "4.KANRANSHA (Instrumental)",
        ]
    }
];

var app = new Vue({
    el: '#app',
    data: {
        list: [],
        newSelectItem: {},
        oldSelectItem: {},
    },
    created: function() {
        // 16個を円上に並べて配置するため、要素は16以上欲しい
        // また、選択中の要素の切り替えモーションを「偶数/奇数番目が切り替わる」とこで実現しているため、一覧が偶数個になるようにしておきたい
        const me = this;
        let lst = [];
        while (lst.length < 16 || lst.length % 2 == 1) {
            lst = lst.concat(JSON.parse(JSON.stringify(discography)));
        }
        for (i = 0; i < lst.length; i++) {
            lst[i].id = i;
            lst[i].index = (i + 8) % lst.length;
        }
        lst[0].isSelect = true;
        me.list = lst;
        me.newSelectItem = lst[0];
        me.oldSelectItem = lst[0];
    },
    methods: {
        moveMenu(moveSpan) {
            const me = this;
            for (let itm of me.list) {
                let nexIdx = itm.index + moveSpan;
                if (nexIdx < 0) nexIdx += me.list.length;
                nexIdx = (nexIdx) % me.list.length;

                itm.index = nexIdx;
                itm.isSelect = (nexIdx == 8);
            }

            setTimeout(()=> {
                me.moveSelectItem();
            }, 500);
        },
        moveSelectItem() {
            const me = this;
            me.oldSelectItem = me.newSelectItem;
            me.newSelectItem = me.list.find((itm) => {
                return itm.isSelect;
            });
        }
    }
});