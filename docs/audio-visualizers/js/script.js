window.addEventListener("load", () => {

    // ローカルから音声ファイルを指定して再生できるように設定
    const audio = document.getElementById("audio1");
    const fileInput = document.getElementById('file1');
    fileInput.addEventListener('change', (event) => {
        let input = event.target;
        if (input.files.length == 0) {
            return;
        }
        const file = input.files[0];
        if (!file.type.match('audio.*')) {
            alert("音声ファイルを選択してね。");
            return;
        }
        const reader = new FileReader();
        reader.onload = () => {
            audio.src = reader.result;
        };
        reader.readAsDataURL(file);
    });



    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext('2d');
    const logo = document.getElementById("logo");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // オーディオビジュアライザーの線のクラス
    // これを複数描写することでオーディオビジュアライザーを表現している
    class Bar {
        constructor(x, y, width, height, color, index) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.color = color;
            this.index = index;
        }
        update(val) {
            const sound = val * 500;
            if (sound > this.height) {
                this.height = sound;
            } else {
                this.height -= this.height * 0.04;
            }
        }
        draw(context) {
            context.strokeStyle = this.color;
            context.lineWidth = this.width;
            context.save();
            context.rotate(this.index * 0.043);
            context.beginPath();
            // ベジェ曲線を描く
            context.bezierCurveTo(this.x / 2, this.y / 2, this.height * -0.5 - 150, this.height + 50 , this.x, this.y);
            context.stroke();
            if (this.index > 100) {
                // 周りの円とその脚の直線を描く
                context.beginPath();
                context.arc(this.x, this.y + 20 + this.height / 2, this.height * 0.07, 0, Math.PI * 2);
                context.stroke();
                context.beginPath();
                context.moveTo(this.x, this.y + 10);
                context.lineTo(this.x, this.y + 10 + this.height / 2);
                context.stroke();
            }
            context.restore();
        }
    }

    // 音声処理用クラス
    // ※参考にしたサンプルはマイクの音を拾う仕様だったので、クラス名が「Microphone」になっている。
    class Microphone {
        constructor(fftSize) {
            const me = this;
            me.initialized = false;
            me.fftSize = fftSize;
        }
        doInitialize() {
            const me = this;
            const stream = audio.captureStream();

            me.audioContext = new AudioContext();
            me.microphone = me.audioContext.createMediaStreamSource(stream);
            me.analyser = me.audioContext.createAnalyser();
            me.analyser.fftSize = me.fftSize;
            const bufferLength = me.analyser.frequencyBinCount;
            me.dataArray = new Uint8Array(bufferLength);
            me.microphone.connect(me.analyser);

            me.initialized = true;
        }
        getSamples() {
            this.analyser.getByteTimeDomainData(this.dataArray);
            let normSample = [...this.dataArray].map(e => e/128 - 1);
            return normSample;
        }
        getVolume() {
            this.analyser.getByteTimeDomainData(this.dataArray);
            let normSample = [...this.dataArray].map(e => e/128 - 1);
            let sum = 0;
            for (const v of normSample) {
                sum += v * v;
            }
            const volume = Math.sqrt(sum / normSample.length);
            return volume;
        }
    }

    const fftSize = 512;
    const microphone = new Microphone(fftSize);
    let bars = [];
    for (let i = 1; i < (fftSize / 2); i++) {
        bars.push(new Bar(0, i * 0.6, 1, 0, `hsl(${i * 2}, 100%, 50%, 0.8)`, i));
    }

    audio.addEventListener("play", () => {
        microphone.doInitialize();
    });

    let softVolume = 0;
    function animate() {
        if (microphone.initialized) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const samples = microphone.getSamples();
            const volume = microphone.getVolume();
            ctx.save();
            ctx.translate(canvas.width / 2, canvas.height / 2);
            bars.forEach((bar, i) => {
                bar.update(samples[i]);
                bar.draw(ctx);
            });
            ctx.restore();

            softVolume = softVolume * 0.5 + volume * 0.5;
            logo.style.transform = `translate(-50%, -50%) scale(${1 + softVolume}, ${1 + softVolume})`;
        }
        requestAnimationFrame(animate);
    }
    animate();
});