var app = new Vue({
    el: '#app',
    data: {
        musumes: onsenMusumes,
        filterTarget: {
            llcv: false,
            umacv: false,
            deremasucv: false,
            mirisitacv: false,
            shanimasucv: false,
            bandoricv: false,
            starlightcv: false,
            asarutocv: false,
            d4djcv: false
        }
    },
    methods: {
        getMusumeUrl(url) {
            return "https://onsen-musume.jp" + url;
        },
        changeList() {
            const me = this;
            me.musumes = onsenMusumes.filter((m) => {
                let rtn = true;
                if (me.filterTarget.llcv) {
                    rtn = rtn && m.llcv != ""; 
                }
                if (me.filterTarget.umacv) {
                    rtn = rtn && m.umacv != ""; 
                }
                if (me.filterTarget.deremasucv) {
                    rtn = rtn && m.deremasucv != ""; 
                }
                if (me.filterTarget.mirisitacv) {
                    rtn = rtn && m.mirisitacv != ""; 
                }
                if (me.filterTarget.shanimasucv) {
                    rtn = rtn && m.shanimasucv != ""; 
                }
                if (me.filterTarget.bandoricv) {
                    rtn = rtn && m.bandoricv != ""; 
                }
                if (me.filterTarget.starlightcv) {
                    rtn = rtn && m.starlightcv != ""; 
                }
                if (me.filterTarget.asarutocv) {
                    rtn = rtn && m.asarutocv != ""; 
                }
                if (me.filterTarget.d4djcv) {
                    rtn = rtn && m.d4djcv != ""; 
                }

                return rtn;
            });
        }
    }
});