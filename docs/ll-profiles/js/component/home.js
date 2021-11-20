const home = {
    template: `
    <div id="home">
        <div class="pageDescription">
            <h2>スクールアイドル　プロフィール</h2>
            <p>
                ラブライブシリーズに登場するスクールアイドルのプロフィールです。
            </p>
        </div>
        <div class="filter">
            <div>
                <h3>絞り込み　プロジェクト</h3>
                <ul>
                    <li>
                        <input type="checkbox" id="mujirushi" v-model="filterTarget.mujirushi" v-on:change="filter()" />
                        <label for="mujirushi" class="mujirushi">ラブライブ！</label>
                    </li>
                    <li>
                        <input type="checkbox" id="sunshine" v-model="filterTarget.sunshine" v-on:change="filter()" />
                        <label for="sunshine" class="sunshine">ラブライブ！サンシャイン!!</label>
                    </li>
                    <li>
                        <input type="checkbox" id="nijigaku" v-model="filterTarget.nijigaku" v-on:change="filter()" />
                        <label for="nijigaku" class="nijigaku">虹ヶ咲学園スクールアイドル同好会</label>
                    </li>
                    <li>
                        <input type="checkbox" id="superstar" v-model="filterTarget.superstar" v-on:change="filter()" />
                        <label for="superstar" class="superstar">ラブライブ！スーパースター!!</label>
                    </li>
                    <li>
                        <input type="checkbox" id="sukufesu" v-model="filterTarget.sukufesu" v-on:change="filter()" />
                        <label for="sukufesu" class="sukufesu">スクフェス</label>
                    </li>
                    <li>
                        <input type="checkbox" id="allstars" v-model="filterTarget.allstars" v-on:change="filter()" />
                        <label for="allstars" class="allstars">スクスタ</label>
                    </li>
                </ul>
            </div>
            <div>
                <h3>表示内容</h3>
                <ul>
                    <li>
                        <input type="radio" id="showSimple" v-model="showTarget" value="simple"/>
                        <label for="showSimple">簡易表示</label>
                    </li>
                    <li>
                        <input type="radio" id="showNormal" v-model="showTarget" value="normal"/>
                        <label for="showNormal">通常表示</label>
                    </li>
                    <li>
                        <input type="radio" id="showDetail" v-model="showTarget" value="detai"/>
                        <label for="showDetail">詳細表示</label>
                    </li>
                </ul>
            </div>
        </div>
        <div class="list">
            <table>
                <thead>
                    <tr>
                        <th v-on:click="sort('name')">
                            名前
                            {{ getSortMark('name') }}
                        </th>
                        <th v-on:click="sort('age')" v-if="showTarget == 'normal' || showTarget == 'detai'">
                            年齢
                            {{ getSortMark('age') }}
                        </th>
                        <th v-on:click="sort('birthday')">
                            誕生日
                            {{ getSortMark('birthday') }}
                        </th>
                        <th v-on:click="sort('height')" v-if="showTarget == 'normal' || showTarget == 'detai'">
                            身長
                            {{ getSortMark('height') }}
                        </th>
                        <th v-on:click="sort('bust')" v-if="showTarget == 'detai'">
                            バスト
                            {{ getSortMark('bust') }}
                        </th>
                        <th v-on:click="sort('waist')" v-if="showTarget == 'detai'">
                            ウエスト
                            {{ getSortMark('waist') }}
                        </th>
                        <th v-on:click="sort('hips')" v-if="showTarget == 'detai'">
                            ヒップ
                            {{ getSortMark('hips') }}
                        </th>
                        <th v-on:click="sort('colorCode')">
                            メンバーカラー
                            {{ getSortMark('colorCode') }}
                        </th>
                        <th v-on:click="sort('cv')" v-if="showTarget == 'normal' || showTarget == 'detai'">
                            CV
                            {{ getSortMark('cv') }}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(p, idx) of profiles">
                        <td>{{ p.name }}</td>
                        <td v-if="showTarget == 'normal' || showTarget == 'detai'">{{ p.age }}</td>
                        <td>{{ p.birthday }}</td>
                        <td v-if="showTarget == 'normal' || showTarget == 'detai'">{{ p.height }}</td>
                        <td v-if="showTarget == 'detai'">{{ p.bust }}</td>
                        <td v-if="showTarget == 'detai'">{{ p.waist }}</td>
                        <td v-if="showTarget == 'detai'">{{ p.hips }}</td>
                        <td class="color"><span class="colorCircle" v-bind:style="getColorCircleStyle(p.colorCode)"></span> {{ p.color }}</td>
                        <td v-if="showTarget == 'normal' || showTarget == 'detai'">{{ p.cv }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="annotation">
            <p>
                スクールアイドルのメンバーカラー名称はそれぞれ以下から取得しています。
                <ul>
                    <li>μ's、Aqours、Saint Snow：ラブライブ！フェス時のブレード</li>
                    <li>虹学：虹学4thライブのブレード</li>
                    <li>Liella!：Liella! 1stライブのブレード</li>
                </ul>
            </p>
            <p>
                「高咲侑」も意図して一覧に載せています。
            </p>
            <p>
                虹ヶ咲学園スクールアイドル同好会アニメ中に出てきた虹ヶ咲学園以外のメンバー（近江遥や綾小路姫乃）は現時点では「スクフェス」に分類しています。
            </p>
        </div>
    </div>
`,
data() {
    return {
        calcProfiles: [],
        profiles: [],
        sortTarget: {
            target: "id",
            direction: 1
        },
        filterTarget: {
            mujirushi: true,
            sunshine: true,
            nijigaku: true,
            superstar: true,
            sukufesu: true,
            allstars: true
        },
        showTarget: "simple"
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
        me.calcProfiles = baseProlifes.map((p) => {
            let colorCode = p.colorCode;
            if (colorCode.length != 6 ) colorCode = "ffffff";
            p.colorObj = new Color(colorCode);
            return p;
        });
        me.profiles = me.calcProfiles;
        this.changeList();
    },
    getColorCircleStyle(colorCode) {
        if (colorCode != null && colorCode.length == 6) {
            return {
                "background-color": "#" + colorCode
            };
        } else {
            return {
                "background-color": "rgba(0, 0, 0, 0)"
            };
        }
    },
    getSortMark(e) {
        const me = this;
        let mark = " ";
        if (me.sortTarget.target == e) {
            mark = me.sortTarget.direction > 0 ? "▲" : "▼";
        }
        return mark;
    },
    filter() {
        this.changeList();
    },
    sort(e) {
        const me = this;
        if (me.sortTarget.target == e) {
            me.sortTarget.direction = me.sortTarget.direction * -1;
        } else {
            me.sortTarget.target = e;
            me.sortTarget.direction = 1;
        }

        me.changeList();
    },
    changeList() {
        const me = this;
        let list = me.calcProfiles.filter((i) => {
            const series = i.series;
            return me.filterTarget[series];
        });


        if (me.sortTarget.target == "colorCode") {
            // 色についてはRGBの距離を計算して並び替える

            let beforeColor = null;
            if (me.sortTarget.direction > 0) {
                beforeColor = new Color("000000");
            } else {
                beforeColor = new Color("ffffff");
            }
            let sortedList = [];
            while (sortedList.length < list.length) {
                let nearestProfile = null;
                let nearestDistance = Number.MAX_VALUE;

                for (const p of list) {
                    if (sortedList.findIndex((s) => {
                        return s.id == p.id;
                    }) >= 0) {
                        continue;
                    }
                    if (nearestProfile == null) {
                        nearestProfile = p;
                        nearestDistance = p.colorObj.getDistance(beforeColor);
                        continue;
                    } else {
                        let currentDistance = p.colorObj.getDistance(beforeColor);
                        if (currentDistance < nearestDistance) {
                            nearestProfile = p;
                            nearestDistance = currentDistance;
                        }
                    }
                }

                beforeColor = nearestProfile.colorObj;
                sortedList.push(nearestProfile);
            }

            list = sortedList;
        } else if (me.sortTarget.target == "age") {
            // 年齢については誕生日も考慮する
            list.sort((a, b) => {
                let d = 0;
                const ageA = a.age != "-" ? a.age : 99;
                const ageB = b.age != "-" ? b.age : 99;
                if (ageA < ageB) {
                    d = -1;
                } else if (ageA > ageB) {
                    d = 1;
                } else {
                    let sortAbirthday = a.birthday;
                    let sortBbirthday = b.birthday;

                    // 誕生日が不明な子は3/31（年度末）固定とする
                    if (sortAbirthday == "?"  || sortBbirthday == "-") sortAbirthday = "3/31";
                    if (sortBbirthday == "?"  || sortBbirthday == "-") sortBbirthday = "3/31";

                    if (sortAbirthday.startsWith("01") || sortAbirthday.startsWith("02") || sortAbirthday.startsWith("03")) {
                        sortAbirthday = String(parseInt(sortAbirthday.substr(0, 2), 10) + 12) + sortAbirthday.substr(3);
                    } 
                    if (sortBbirthday.startsWith("01") || sortBbirthday.startsWith("02") || sortBbirthday.startsWith("03")) {
                        sortBbirthday = String(parseInt(sortBbirthday.substr(0, 2), 10) + 12) + sortBbirthday.substr(3);
                    } 
                    d = sortAbirthday < sortBbirthday ? 1 : -1;
                }
                return d * me.sortTarget.direction;
            });
        } else if (["height", "bust", "waist", "hips"].includes(me.sortTarget.target)) {
            list.sort((a, b) => {
                const aVal = a[me.sortTarget.target] == "-" ? 999 : a[me.sortTarget.target];
                const bVal = b[me.sortTarget.target] == "-" ? 999 : b[me.sortTarget.target];
                const rtn = aVal < bVal ? -1 : 1;
                return rtn * me.sortTarget.direction;
            });
        } else {
            list.sort((a, b) => {
                const rtn = a[me.sortTarget.target] < b[me.sortTarget.target] ? -1 : 1;
                return rtn * me.sortTarget.direction;
            });
        }

        me.profiles = list;
    }
}
};