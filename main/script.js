//#region  initialize canvas

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//#region set canvas dimensions

canvas.width = 1000;
canvas.height = 600;

debugger;

// get Bounding Client Rect
// var BB = canvas.getBoundingClientRect();
// var offsetX = BB.left;
// var offsetY = BB.top;
// var WIDTH = canvas.width;
// var HEIGHT = canvas.height;

// // drag related variables
// var dragok = false;
// var startX;
// var startY;
//#endregion

//#endregion

//#region draw on canvas
let img = new Image();
let isDraggable = false;

let currentX = canvas.width / 2;
let currentY = 0;

//let currentY = 0;

// box style
ctx.fillStyle = 'blue';

//#region fillRect (x-axis,currentY-axis,boxWidth,boxHeight)

let boxWidth = 150, boxHeight = 150;

function drawBoxes() {

    // top-left corner box
    ctx.fillRect(0, 0, boxWidth, boxHeight);
    // top-right corner box
    ctx.fillRect(canvas.width - 150, 0, boxWidth, boxHeight);
    // bottom-left corner box
    ctx.fillRect(0, canvas.height - 150, boxWidth, boxHeight);
    // bottom-right corner box
    ctx.fillRect(canvas.width - 150, canvas.height - 150, boxWidth, boxHeight);
}

drawBoxes();

//#endregion

//#region write inside boxes

function fillBoxesWithText() {

    ctx.font = '20px Arial';
    //ctx.fillStyle='white';

    let boxPadding = 20;

    ctx.strokeText('Japanese', boxPadding, boxPadding);
    ctx.strokeText('Chinese', canvas.width - 100 - boxPadding, boxPadding);
    ctx.strokeText('Korean', boxPadding, canvas.height - 100);
    ctx.strokeText('Thai', canvas.width - 100, canvas.height - 100);
}

fillBoxesWithText();

//#endregion

//#region  photo

function drawPhoto(currentY) {

    img = new Image();

    img.src = '../assets/photos/mountain1.jpg';

    ctx.drawImage(img, canvas.width / 2 - img.width / 2, currentY);
    ctx.clearRect(canvas.width / 2 - img.width / 2, 0, img.width - 20, img.height);
    //img.onload = animate(img); //load image

    img.addEventListener('load', function () {

        let timeInterval = 20; //todo change it to 7 

        interval = setInterval(function () {

            return function () {
                ctx.clearRect(canvas.width / 2 - img.width / 2, currentY, img.width, img.height);

                currentY += 1;

                ctx.drawImage(img, canvas.width / 2 - img.width / 2, currentY);

                if (currentY > canvas.height) {
                    currentY = 0;
                }
            };
        }(), timeInterval);
    });

}

drawPhoto(0);

//#region mouse events

// canvas.onmousedown = function (e) {
//     debugger;
//     clearInterval(interval);

//     var mouseX = e.pageX - this.offsetLeft;
//     var mouseY = e.pageY - this.offsetTop;

//     // currentY = img.getAbsolutePosition().y;

//     if (mouseX >= (currentX - img.width / 2) &&
//         mouseX <= (currentX + img.width / 2) &&
//         mouseY >= (currentY - img.height / 2) &&
//         mouseY <= (currentY + img.height / 2)) {
//         isDraggable = true;
//     }
// };

// canvas.onmouseup = function (e) {
//     isDraggable = false;
// };

// canvas.onmouseout = function (e) {
//     isDraggable = false;
// };

// canvas.onmousemove = function (e) {
//     if (isDraggable) {
//         currentX = e.pageX - this.offsetLeft;
//         currentY = e.pageY - this.offsetTop;
//     }
// };

//#endregion

//#endregion
