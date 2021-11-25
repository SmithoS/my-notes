let app = new Vue({
    el: '#app',
    data: {
        members: [],
        baloon: {
            isShow: false,
            title: "",
            body: ""
        }
    },
    created: function() {
        this.members.push({
            name: "メンバー",
            technique: 0,
            matchAttribute: false,
            bordAttributeBounus: 0,
            boardCriticalBounus: 0,
            criticalSence: false,
            calcCriticalPercent: 0
        });
    },
    methods: {
        calcCriticalPercent() {
            const me = this;
            for (let member of me.members) {
                const b01 = member.matchAttribute ? 20 : 0;
                const b02 = member.criticalSence ? 15 : 0;
                member.calcCriticalPercent = 0.003 * parseFloat(member.technique) * ((100 + b01 + parseFloat(member.bordAttributeBounus)) / 100) + parseFloat(member.boardCriticalBounus) + b02;
            }
        },
        showBaloon(idx) {
            const me = this;
            switch (idx) {
                case 1:
                    me.baloon.title = "テクニック値とは";
                    me.baloon.body = "スクールアイドルのライブ時のテクニック値";
                    me.baloon.how = "ライブ編成で表示されているテクニックの値を入力する";
                    break;
                case 2:
                    me.baloon.title = "属性一致とは";
                    me.baloon.body = "スクールアイドルとライブ楽曲の属性が同じ場合はプラス補正がかかる";
                    me.baloon.how = "スクールアイドルとライブ楽曲の属性が同じ場合はONにする";
                    break;
                case 3:
                    me.baloon.title = "絆ボード一致補正とは";
                    me.baloon.body = "絆ボードによるライブ楽曲の属性が同じ場合のステータスアップ率";
                    me.baloon.body = "絆ボードによるライブ楽曲の属性が同じ場合のステータスアップ率を入力する";
                    break;
                case 4:
                    me.baloon.title = "絆ボードクリティカル補正とは";
                    me.baloon.body = "絆ボードによるクリティカル率アップの補正";
                    me.baloon.how = "絆ボードによるクリティカル率アップの値を入力する";
                    break;
                case 5:
                    me.baloon.title = "クリティカルセンス";
                    me.baloon.body = "隠しパラメータ";
                    me.baloon.how = "該当スクールアイドルの全ステータス開放時にテクニック＞他のステータスとなる場合はONにする";
                    break;
            }
            me.baloon.isShow = true;
        },
        closeBaloon() {
            const me = this;
            me.baloon.isShow = false;
        }
    }

})