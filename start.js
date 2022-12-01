const img1 = document.getElementById('img1');
const img2 = document.getElementById('img2');
const round = document.getElementById('round');

let files = ["./asset/1.png",
    "./asset/2.png",
    "./asset/3.png",
    "./asset/4.png",
    "./asset/5.png",
    "./asset/6.png",
    "./asset/7.png",
    "./asset/8.png",];
    
let files1 = ["./asset/9.png",
    "./asset/10.png",
    "./asset11.png",
    "./asset/12.png",
    "./asset/13.png",
    "./asset/14.png",
    "./asset/15.png",
    "./asset/16.png",];// 사진 배열



    let Arr = new Array();
for (var i = 0; i < 8; i++) {
    Arr.push(0);
}

let sum = [];
let sum1 = [];

let length = files.length;
let number = files.length;

Array.prototype.shuffle = function () {
    while (length) {
        let index = Math.floor((length--) * Math.random());

        let temp = this[length];

        this[length] = this[index];

        this[index] = temp; // 배열 랜덤
    }
    return this;
}


files.shuffle();

let imgs8 = new Array();
let imgs4 = new Array();
let imgs2 = new Array();

for (let i = 0; i < files.length; i++) {
    imgs8[i] = new Image();
    imgs8[i].src = files[i];// 이미지 로딩
}

let indexNum = 0;

img1.src = imgs8[indexNum].src;
img2.src = imgs8[indexNum + 1].src;
// 사진 두개씩 띄워주는 거

let roundNum = 8;
// 토너먼트 라운드

function change(e) {
    // 8강 시작
    if (roundNum == number) { // 여기에 ... 
        if (e.id === "img1") {
            Arr[indexNum]++;
        } else {
            Arr[indexNum + 1]++;
        }
        indexNum += 2;

        if (indexNum >= 8) {
            for (let i = 0; i < 8; i++) {
                if (Arr[i] == 0) {
                    files[i] = Arr[i];
                }
            }
            for (let i = 0; i < 8; i++) {
                if (files[i] == 0) {
                    files.splice(i, 1); // 배열 제외
                    Arr.splice(i, 1);
                    i--;
                }
            }
            // 8강 끝났을 때


            // 4강으로 전환
            indexNum = 0;
            roundNum = 4;
            
            // 배열 랜덤 x
            for (let i = 0; i < 4; i++) {
                sum[i] = files[i];
            }

            for (let i = 0; i < 4; i++) {
                imgs4[i] = new Image();
                imgs4[i].src = files[i];
            }

            img1.src = imgs4[indexNum].src
            img2.src = imgs4[indexNum + 1].src
            round.innerHTML = `<div>4강</div>`
        }
        // 8강이 계속 되고있을 때
        else if (indexNum < 8) { //indexNum
            imageLoad8()
        }
    } // 4강 시작 + 8강 시작 끝
    else if (roundNum == number / 2) {
        if (e.id === "img1") {
            Arr[indexNum]++;
        } else {
            Arr[indexNum + 1]++;
        }

        indexNum += 2;

        // 4강 끝났을 때
        if (indexNum >= 4) {
            for (let i = 0; i < 4; i++) {
                if (Arr[i] == 1) {
                    sum[i] = Arr[i];
                }
            }
            for (let i = 0; i < 4; i++) {
                if (sum[i] == 1) {
                    sum.splice(i, 1);
                    Arr.splice(i, 1);
                    i--;
                }
            }

            indexNum = 0;
            roundNum = 2;

            for (let i = 0; i < 2; i++) {
                imgs2[i] = new Image();
                imgs2[i].src = sum[i];
            }

            for (let i = 0; i < 2; i++) {
                sum1[i] = sum[i];
            }

            img1.src = imgs2[indexNum].src
            img2.src = imgs2[indexNum + 1].src
            round.innerHTML = "<div>결승</div>"
        }
        else if (indexNum < 4) {
            imageLoad4();
        }
    } // 4강
    else if (roundNum == number / 4) {
        if (e.id === "img1") {
            img2.remove();
            round.innerHTML = "<div>우승</div>"
        } else {    
            img1.remove();
            round.innerHTML = "<div>우승</div>"
        }
    } // 결승
}

function imageLoad4() {
    img1.src = imgs4[indexNum].src;
    img2.src = imgs4[indexNum + 1].src;
}

function imageLoad8() {
    img1.src = imgs8[indexNum].src;
    img2.src = imgs8[indexNum + 1].src;
}
