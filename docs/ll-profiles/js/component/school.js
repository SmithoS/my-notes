const school = {
    template: `
    <div id="school">
        <div class="pageDescription">
            <h2>学校</h2>
            <p>
                ラブライブシリーズに登場する学校です。
            </p>
        </div>
        <div class="list">
            <table>
                <thead>
                    <tr>
                        <th>名前</th>
                        <th>所属生徒</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(s, idx) of schools">
                        <td>{{ s.name }}</td>
                        <td>{{ s.members }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="annotation">
            <p>
                「高坂雪歩」「絢瀬亜里沙」については進学後の国立音ノ木坂学院に記載しています。
            </p>
            <p>
                「高海千歌」「桜内梨子」「渡辺曜」「津島善子」「国木田花丸」「黒澤ルビィ」の５人については浦の星女学院と統廃合後の静真高等学校の両方に記載しています。
            </p>
            <p>
                「桜内梨子」については転校前の国立音ノ木坂学院。転校後の浦の星女学院。統廃合後の静真高等学校の３箇所に記載しています。
            </p>
            <p>
              「桜坂しずく」「近江彼方」「エマ・ヴェルデ（エマ）」の３人については元々の出身である学校と転校後の虹ヶ咲学園の両方に記載しています。
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
        me.schools = baseSchools;
    }
}
};