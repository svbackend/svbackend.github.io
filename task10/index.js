var drawPlant = document.querySelector('.draw'),
    angleValue = document.getElementById('angle'),
    iterValue = document.getElementById('iter'),
    angle = 25,
    lineLength = 3,
    lineColor = 'rgba(0,40,0,0.5)',
    plantNum = 0;
var plantSp = [
    'F+[[X]-X]-F[-FX]+X',
];


main(angle, plantNum, 5);

drawPlant.addEventListener('click', () => {
    var angle = Number(angleValue.value);
    var iter = Number(iterValue.value);
    var plantNum = Number(document.getElementById('plants').value);
    main(angle, plantNum, iter);
});


function main(angle, plantNum, iter) {


    function disp(sentense) {

        var canvas = document.getElementById('canvas');
        var c = canvas.getContext('2d');
        var w = canvas.width = document.body.clientWidth;
        var h = canvas.height = document.body.clientHeight;

        function line(x, y, x1, y1) {
            c.beginPath();
            c.moveTo(x, y);
            c.lineTo(x1, y1);
            c.strokeStyle = lineColor;
            c.stroke();
        }

        function toRad(num) {
            return num * Math.PI / 180;
        }

        var ang = angle;
        var long = lineLength;

        function draw() {
            c.translate(w / 2, h);
            for (let i = 0; i < sentense.length; i++) {

                var br = sentense.charAt(i);
                if (br == 'F') {
                    line(0, 0, 0, -long);
                    c.translate(0, -long);
                } else if (br == '-') {
                    c.rotate(-toRad(ang));
                } else if (br == '[') {
                    c.save();
                } else if (br == ']') {
                    c.restore();
                } else if (br == '+') {
                    c.rotate(toRad(ang));
                }
            }
        }

        draw();

    }


    var sentense = 'X';
    var rules = [];
    rules[0] = {
        a: 'X',
        b: plantSp[plantNum]
    };

    rules[1] = {
        a: 'F',
        b: 'FF'
    };

    function generate() {
        let nextSentense = '';
        for (let i = 0; i < sentense.length; i++) {
            let br = sentense.charAt(i);
            let found = false;
            for (let j = 0; j < rules.length; j++) {
                if (br == rules[j].a) {
                    found = true;
                    nextSentense += rules[j].b;
                    break;
                }
            }
            if (!found) {
                nextSentense += br;
            }
        }
        sentense = nextSentense;
        disp(sentense);

    }

    function painPlant() {
        for (let i = 0; i < iter; i++) {
            generate();
        }
    }

    painPlant();

}


function CL(val) {
    console.log(val);
}

function toDeg(num) {
    return num * 180 / Math.PI;
}

function rect(color, x, y, w, h) {
    c.fillStyle = color;
    c.fillRect(x, y, w, h);
}

function triangle(color, xA, yA, xB, yB, xC, yC) {
    c.beginPath();
    c.moveTo(xA, yA);
    c.lineTo(xB, yB);
    c.lineTo(xC, yC);
    c.fillStyle = color;
    c.fill();
    c.closePath();

}

function circ(color, x, y, r, beginPoint, afterPoint, direction) {
    if (typeof beginPoint == "undefined") beginPoint = 0;
    if (typeof afterPoint == "undefined") afterPoint = Math.PI * 2;
    if (typeof direction == "undefined") direction = true;
    c.beginPath();
    c.fillStyle = color;
    c.arc(x, y, r, beginPoint, afterPoint, direction);
    c.fill();
}

class Rect {
    constructor(color, x, y, w, h) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }

    drawRect() {
        c.fillStyle = color;
        c.fillRect(this.x, this.y, this.w, this.h);
    }
}

class Circ {
    constructor(color, x, y, r, beginPoint, afterPoint, direction) {
        this.color = color;
        this.x = x;
        this.y = y;
        this.r = r;
        this.beginPoint = beginPoint;
        this.afterPoint = afterPoint;
        this.direction = direction;
        if (typeof this.beginPoint == "undefined") this.beginPoint = 0;
        if (typeof this.afterPoint == "undefined") this.afterPoint = Math.PI * 2;
        if (typeof this.direction == "undefined") this.direction = true;
    }

    drawCirc() {
        c.beginPath();
        c.fillStyle = this.color;
        c.arc(this.x, this.y, this.r, this.beginPoint, this.afterPoint, this.direction);
        c.fill();
        c.stroke();
    }
}
