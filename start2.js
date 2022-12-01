const img1 = document.getElementById("3");
const img2 = document.getElementById("4");
const round = document.getElementById("round");
const modal = document.getElementById("myModal");
const span = document.getElementsByClassName("close")[0];
const restart = document.getElementById("restart");
const MAX_ROUND = 8;
let NowRound = MAX_ROUND;
let files1 = [];
let index = 0;
let arr = [];
round.innerHTML = `${NowRound}강`; // 라운드 수
for (let i = 1; i <= MAX_ROUND; i++) {
    files1.push(`./asset/${i}.png`); // 모든 이미지 배열
}
Array.prototype.shuffle = function () {
    let length = files1.length;
    while (length) {
        let index = Math.floor(length-- * Math.random());
        let temp = this[length];
        this[length] = this[index];
        this[index] = temp; // 배열 랜덤
    }
    return this;
};
window.onload = () => {
    files1.shuffle();
    img1.src = files1[index];
    img2.src = files1[index + 1];
    index += 2;
    reTry();
};
function reTry() {
    arr = [];
    for (let i = 0; i < MAX_ROUND; i++) {
        if (files1[i] !== "") {
            arr.push(files1[i]); // 라운드에 따른 이미지 배열
        }
    }
}
function final() {
    round.innerHTML = `결승`;
    img1.addEventListener('click', function () {
        img2.remove();
        img1.src = arr[0];
        scene(); // 모달 창 띄우기
    })
    img2.addEventListener('click', function () {
        img1.remove();
        img2.src = arr[1];
        scene();
    })
}
if (NowRound === 2) {
    final(); // 마지막 라운드 시작
}
function change(e) {
    if (NowRound !== 1) {
        if (e !== undefined) {
            if (e.id === "1") {
                files1[files1.indexOf(arr[index - 1])] = "";
            } else {
                files1[files1.indexOf(arr[index - 2])] = "";
            }
        }
        if (NowRound === 2) {
            final();
        } else {
            round.innerHTML = `${NowRound}강`;
        }
        if (index >= NowRound && index !== 2) {
            // 이번 라운드가 끝나면
            reTry();
            index = 0;
            NowRound /= 2;
            change();
            return;
        }
        img1.src = arr[index];
        img2.src = arr[index + 1];
        index += 2;
    }
}
span.onclick = function () {
    modal.style.display = "none";
}
function scene() {
    round.innerHTML = `우승`;
    modal.style.display = "block";
}
restart.onclick = function () {
    location.reload();
}