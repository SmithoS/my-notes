const unit = {
    template: `
    <div id="unit">
        <div class="pageDescription">
            <h2>グループ、ユニット</h2>
            <p>
                ラブライブシリーズに登場するスクールアイドルのグループ、ユニットです。<br />
                名称がついているものだけ記載しています。
            </p>
        </div>
        <div class="list">
            <table>
                <thead>
                    <tr>
                        <th>名前</th>
                        <th>グループ/ユニットカラー</th>
                        <th>メンバー</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(u, idx) of units">
                        <td>{{ u.name }}</td>
                        <td class="color">{{ u.color }}</td>
                        <td>{{ u.members }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="annotation">
            <p>
                グループ、ユニットのカラー名称はそれぞれ以下から取得しています。
                <ul>
                    <li>Aqoursユニット：ユニット別2nd LoveLiveのブレード</li>
                    <li>Saint Snow：1s GIGのブレード</li>
                    <li>虹学ユニット：UNIT LIVE & FAN MEETINGのブレード</li>
                </ul>
            </p>
            <p>
                「虹ヶ咲学園スクールアイドル同好会」はグループなのか？それを載せるなら「アイドル研究部」「スクールアイドル部」は？と言われそうだが載せています。
            </p>
        </div>
    </div>
`,
data() {
    return {
        units: []
    }
},
created () {
    this.fetchData()
},
watch: {
    '$route': 'fetchData'
},
methods: {
    fetchData () {
        const me = this;
        me.units = baseGroups;
    }
}
};