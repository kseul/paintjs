// canvas의 픽셀을 다룰 영역(사이즈)를 불러오기 & 가져오기 & 지정하기
// canvas.width = 700;
// canvas.height = 700;
// canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
// canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;
console.log("a");

// 변수 정의 DOM요소에서 불러오기
const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const reset = document.getElementById("jsReset");

const INITIAL_COLOR = "#2c2c2c";

//캔버스 사이즈 가져오기
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

//context의 defalut를 설정
ctx.fillStyle = "white"; //
ctx.fillRect(0, 0, canvas.width, canvas.height); // 디폴트 이미지배경색 지정(안하면 투명)
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

//painthing 함수
let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
  // if(filling===false){  // 이 부분을 추가해서 드래그했을 때 선이 표시 안되도록 조정
  // }
}

//mouse 동작 관련 함수
function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (painting === false) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

//컬러 변환 함수
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

//사이즈 변환 함수
function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

// 페인트or채우기 모드 변환 함수
function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "paint";
  }
}

// 페인트 채우기 함수
function handleCanvasClick() {
  if (filling === true) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}

//핸들컨텍스트메뉴 함수
function handleCM(event) {
  event.preventDefault(); //우클릭방지 (canvas에서 자체적으로 지원하는 우클릭 저장 방지 )
}

//세이브 함수
function handleSaveClick() {
  const link = document.createElement("a");
  const image = canvas.toDataURL();
  link.href = image;
  link.download = "Hello😎";

  link.click();
}

//리셋 함수
function handleReset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

//이벤트
if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("mousedown", handleCanvasClick); // click > mousedown으로 변경
  canvas.addEventListener("contextmenu", handleCM);
}

// 사이즈조정(Range)
if (range) {
  range.addEventListener("input", handleRangeChange);
}

//모드
if (mode) {
  mode.addEventListener("click", handleModeClick);
}

//세이브
if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

//리셋
if (reset) {
  reset.addEventListener("click", handleReset);
}

// 컬러 배열 생성
Array.from(colors).forEach((colorItem) =>
  colorItem.addEventListener("click", handleColorClick)
);
