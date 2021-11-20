class Color {
    /**
     * コンストラクタ
     * @param {*} hexString 
     */
    constructor(hexString) {

        // HEX
        this.hex = hexString;

        // RGBに変換
        const hexVal = parseInt(hexString, 16);
        this.r = hexVal>>16&0xff;
        this.g = hexVal>>8&0xff;
        this.b = hexVal>>0&0xff;

        // HEVに変換
        const maxRGB = Math.max(this.r, this.g, this.b);
        const minRGB = Math.min(this.r, this.g, this.b);
        const ss = Math.round(255 * (maxRGB - minRGB) / maxRGB);
        const vv = maxRGB;

        let hh = 0;
        if (this.r == this.g && this.g == this.b) {
            hh = 0;
        } else {
            if (this.r == maxRGB) {
                hh = Math.round(60 * ((this.g - this.b) / (maxRGB - minRGB)));
            } else if (this.g == maxRGB) {
                hh = Math.round(60 * ((this.b - this.r) / (maxRGB - minRGB))) + 120;
            } else {
                hh = Math.round(60 * ((this.r - this.g) / (maxRGB - minRGB))) + 240;
            }
            if (hh < 0) {
                hh = hh + 360;
            }
        }


        this.h = hh;
        this.s = ss;
        this.v = vv;
      }

    getDistance(col) {
        return Math.sqrt(Math.pow(this.r - col.r, 2) + Math.pow(this.g - col.g, 2) + Math.pow(this.b - col.b, 2));
    }
}