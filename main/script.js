//#region  initialize canvas

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

//#region set canvas dimensions

canvas.width = 1000;
canvas.height = 600;
//debugger;

//#endregion

//#region draw on canvas
let photo = new Image();
let isDraggable = false;

let currentX = canvas.width / 2;
let currentY = 0;

window.onload = function () {
    drawBoxes();
    fillBoxesWithText();
    drawPhoto(0);
}

function drawBoxes() {

    let boxWidth = 150, boxHeight = 150;

    // rectangles background color;
    ctx.fillStyle = 'yellow';
    // top-left corner box
    ctx.fillRect(0, 0, boxWidth, boxHeight);
    // top-right corner box
    ctx.fillRect(canvas.width - 150, 0, boxWidth, boxHeight);
    // bottom-left corner box
    ctx.fillRect(0, canvas.height - 150, boxWidth, boxHeight);
    // bottom-right corner box
    ctx.fillRect(canvas.width - 150, canvas.height - 150, boxWidth, boxHeight);
}


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

function drawPhoto(currentY) {

    photo = new Image();

    photo.src = '../assets/photos/mountain1.jpg';

    ctx.drawImage(photo, canvas.width / 2 - photo.width / 2, currentY);
    ctx.clearRect(canvas.width / 2 - photo.width / 2, 0, photo.width - 20, photo.height);
    //photo.onload = animate(photo); //load image

    photo.addEventListener('load', function () {

        _MouseEvents();

        let timeInterval = 20; //todo change it to 7 

        interval = setInterval(function () {

            return function () {
                ctx.clearRect(canvas.width / 2 - photo.width / 2, currentY, photo.width, photo.height);

                currentY += 1;

                ctx.drawImage(photo, canvas.width / 2 - photo.width / 2, currentY);

                if (currentY > canvas.height) {
                    currentY = 0;
                }
            };
        }(), timeInterval);
    });
}

//#region mouse events

function _MouseEvents() {
    canvas.onmousedown = function (e) {

        debugger;

        var mouseX = e.pageX - this.offsetLeft;
        var mouseY = e.pageY - this.offsetTop;


        if (mouseX >= (currentX - photo.width / 2) &&
            mouseX <= (currentX + photo.width / 2) &&
            mouseY >= (currentY - photo.height / 2) &&
            mouseY <= (currentY + photo.height / 2)) {
            isDraggable = true;
            //currentX = mouseX;
            //currentY = mouseY;
        }
    };
    canvas.onmousemove = function (e) {

        if (isDraggable) {
            currentX = e.pageX - this.offsetLeft;
            currentY = e.pageY - this.offsetTop;
        }
    };
    canvas.onmouseup = function (e) {
        isDraggable = false;
    };
    canvas.onmouseout = function (e) {
        isDraggable = false;
    };
}




//#endregion
